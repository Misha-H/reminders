import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema/*',
  verbose: true,
  strict: true,
} satisfies Config;
