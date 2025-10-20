import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, ScrollView, TextInput, KeyboardAvoidingView, Platform, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '../components/ScreenHeader';
import { colors, radii } from '../theme';
import { Crown } from 'lucide-react-native';
import { Button } from '../components/ui/Button';
import { ask, poll } from '../lib/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Board from '../components/chess/Board';
import Markdown from 'react-native-markdown-display';

type MessageRole = 'user' | 'assistant';

type ChatMessage = {
  id: string;
  role: MessageRole;
  text: string;
};

export default function AskCoach() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    { id: 'welcome', role: 'assistant', text: 'Hi! I’m your chess coach. Ask me about positions, plans, or mistakes.' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<ScrollView | null>(null);
  const pollRef = useRef<{ cancel: () => void } | null>(null);

  const canSend = useMemo(() => input.trim().length > 0, [input]);

  useEffect(() => {
    return () => {
      if (pollRef.current) {
        pollRef.current.cancel();
      }
    };
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom whenever messages change
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 0);
  }, [messages]);

  const onSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    // If a stream is ongoing, cancel it
    if (pollRef.current) {
      pollRef.current.cancel();
      pollRef.current = null;
      setIsTyping(false);
    }

    const userMsg: ChatMessage = { id: `m_${Date.now()}_u`, role: 'user', text: trimmed };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Seed assistant placeholder message
    const assistantId = `m_${Date.now()}_a`;
    const assistantMsg: ChatMessage = { id: assistantId, role: 'assistant', text: '' };
    setMessages(prev => [...prev, assistantMsg]);
    setIsTyping(true);

    // Call server to create a job, then poll for tokens
    const savedUserId = (await AsyncStorage.getItem('chesscom.username')) || undefined;
    ask(trimmed, savedUserId)
      .then(({ jobId }) => {
        startPolling(jobId, assistantId);
      })
      .catch(() => {
        setIsTyping(false);
        setMessages(prev => prev.map(m => (m.id === assistantId ? { ...m, text: 'Sorry—something went wrong starting the reply.' } : m)));
      });
  };

  function startPolling(jobId: string, assistantId: string) {
    let cancelled = false;
    let cursor = 0;

    pollRef.current = { cancel: () => { cancelled = true; } };

    const step = async () => {
      if (cancelled) return;
      try {
        const res = await poll(jobId, cursor);
        if (cancelled) return;
        if (res.tokens.length > 0) {
          // Preserve whitespace and newlines for correct Markdown formatting
          const chunk = res.tokens.join('');
          setMessages(prev => prev.map(m => (m.id === assistantId ? { ...m, text: appendChunk(m.text, chunk) } : m)));
        }
        cursor = res.nextCursor;
        if (res.done) {
          setIsTyping(false);
          pollRef.current = null;
          return;
        }
        setTimeout(step, 180);
      } catch (e) {
        // Stop on error for now
        setIsTyping(false);
        pollRef.current = null;
      }
    };

    step();
  }

  function appendChunk(current: string, chunk: string): string {
    return `${current || ''}${chunk}`;
  }

  const renderMessage = (m: ChatMessage) => {
    const isUser = m.role === 'user';
    const { cleanedText, fens } = isUser ? { cleanedText: m.text, fens: [] as string[] } : extractFensFromText(m.text);
    return (
      <View key={m.id} style={{ width: '100%', marginBottom: 12, alignItems: isUser ? 'flex-end' : 'flex-start' }}>
        <View
          style={{
            maxWidth: '85%',
            backgroundColor: isUser ? colors.coachPrimary : colors.secondaryBg,
            borderWidth: isUser ? 0 : 1,
            borderColor: isUser ? 'transparent' : colors.cardBorder,
            paddingVertical: 10,
            paddingHorizontal: 14,
            borderRadius: radii.lg,
            borderBottomRightRadius: isUser ? 4 : radii.lg,
            borderBottomLeftRadius: isUser ? radii.lg : 4,
          }}
        >
          {isUser ? (
            <Text style={{ color: '#ffffff', fontSize: 15, lineHeight: 20 }}>{cleanedText}</Text>
          ) : (
            <>
              <Markdown
                style={{
                  body: { color: colors.text, fontSize: 16, lineHeight: 22 },
                  paragraph: { marginTop: 0, marginBottom: 8 },
                  heading1: { fontSize: 18, fontWeight: '700', marginTop: 2, marginBottom: 8, color: colors.text },
                  heading2: { fontSize: 17, fontWeight: '700', marginTop: 2, marginBottom: 6, color: colors.text },
                  list_item: { marginBottom: 4 },
                  bullet_list: { marginBottom: 8 },
                  ordered_list: { marginBottom: 8 },
                  code_inline: {
                    backgroundColor: '#f3f4f6',
                    borderRadius: 6,
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace' }),
                  },
                  fence: {
                    backgroundColor: '#f3f4f6',
                    borderRadius: 8,
                    padding: 10,
                    marginVertical: 8,
                    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace' }),
                  },
                  link: { color: colors.coachPrimary, textDecorationLine: 'underline' },
                }}
                onLinkPress={(url: string) => { Linking.openURL(url).catch(() => {}); return false; }}
              >
                {normalizeMarkdownText(cleanedText || (isTyping ? '…' : ''))}
              </Markdown>
              {fens.length > 0 && (
                <View style={{ marginTop: 8 }}>
                  {fens.map((fen, idx) => (
                    <View key={`${m.id}-fen-${idx}`} style={{ marginTop: idx === 0 ? 0 : 12 }}>
                      <Board fen={fen} size={224} />
                    </View>
                  ))}
                </View>
              )}
            </>
          )}
        </View>
      </View>
    );
  };

  function extractFensFromText(text: string): { cleanedText: string; fens: string[] } {
    // Support formats:
    // - Inline: "FEN: <fen>" (first 6 space-separated fields)
    // - Fenced: ```fen\n<fen>\n``` (can include multiple)
    // - Multiple inline markers: "FEN:<fen1> ... FEN:<fen2>"

    const fens: string[] = [];
    let cleaned = text;

    // Fenced blocks first
    const fencedRegex = /```\s*fen\s*\n([\s\S]*?)```/gi;
    cleaned = cleaned.replace(fencedRegex, (_m, block) => {
      const lines = String(block).split(/\r?\n/).map(l => l.trim()).filter(Boolean);
      for (const line of lines) {
        const parts = line.split(/\s+/);
        if (parts.length >= 6) {
          fens.push(parts.slice(0, 6).join(' '));
        }
      }
      return '';
    });

    // Inline markers
    const inlineRegex = /\bFEN\s*:?\s*([^\n]+)/g;
    cleaned = cleaned.replace(inlineRegex, (_m, rest) => {
      const parts = String(rest).trim().split(/\s+/);
      if (parts.length >= 6) {
        fens.push(parts.slice(0, 6).join(' '));
        return '';
      }
      return _m; // keep if incomplete (streaming)
    });

    // Trim excess whitespace where we removed markers
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n').trim();
    return { cleanedText: cleaned, fens };
  }

  function normalizeMarkdownText(input: string): string {
    if (!input) return input;
    let s = input;
    // Ensure blank line before headings
    s = s.replace(/(^|\n)(#{1,6}\s+)/g, (m, p1, p2) => `${p1 ? '\n' : ''}${p2}`);
    // Ensure lists start on new lines and have spacing after punctuation like ":"
    s = s.replace(/(\S)(\s*)([-*]\s+)/g, (_m, prev, ws, bullet) => `${prev}\n${bullet}`);
    s = s.replace(/(\S)(\s*)(\d+\.[\)\.]?\s+)/g, (_m, prev, _ws, num) => `${prev}\n${num}`);
    // Collapse 3+ newlines to 2 to keep paragraphs tidy
    s = s.replace(/\n{3,}/g, '\n\n');
    return s.trim();
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScreenHeader title="Ask Your Coach" subtitle="Personalized guidance from your games" LeftIcon={Crown} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}>
        <View style={{ flex: 1 }}>
          <ScrollView
            ref={(ref) => { scrollRef.current = ref; }}
            contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
            keyboardShouldPersistTaps="handled"
          >
            {messages.map(renderMessage)}
            {isTyping && (
              <View style={{ width: '100%', marginBottom: 12, alignItems: 'flex-start' }}>
                <View
                  style={{
                    maxWidth: '85%',
                    backgroundColor: colors.secondaryBg,
                    borderWidth: 1,
                    borderColor: colors.cardBorder,
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    borderRadius: radii.lg,
                    borderBottomLeftRadius: 4,
                  }}
                >
                  <Text style={{ color: colors.mutedText, fontStyle: 'italic' }}>Coach is thinking…</Text>
                </View>
              </View>
            )}
          </ScrollView>

          <View
            style={{
              borderTopWidth: 1,
              borderColor: colors.cardBorder,
              backgroundColor: colors.background,
              padding: 12,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                value={input}
                onChangeText={setInput}
                placeholder="Ask about a position, plan, or mistake…"
                placeholderTextColor={colors.mutedText}
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  paddingHorizontal: 12,
                  borderWidth: 1,
                  borderColor: colors.cardBorder,
                  borderRadius: radii.md,
                  marginRight: 8,
                  color: colors.text,
                }}
                multiline
                maxLength={2000}
              />
              <Button onPress={onSend} disabled={!canSend || isTyping} variant="gold" size="md">
                Send
              </Button>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
