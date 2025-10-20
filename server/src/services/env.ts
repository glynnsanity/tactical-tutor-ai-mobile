import { z } from 'zod';

const EnvSchema = z.object({
  PORT: z
    .string()
    .optional()
    .transform((v) => (v ? Number(v) : 8787))
    .refine((v) => Number.isFinite(v) && v > 0, 'PORT must be a positive number'),
  OPENAI_API_KEY: z.string().optional(),
  MODEL_NAME: z.string().optional().default('gpt-4o-mini'),
});

const parsed = EnvSchema.parse(process.env);

export const env = {
  PORT: parsed.PORT as number,
  OPENAI_API_KEY: parsed.OPENAI_API_KEY,
  MODEL_NAME: parsed.MODEL_NAME,
};


