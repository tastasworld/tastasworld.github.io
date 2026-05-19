import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    publishDate: z.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    noindex: z.boolean().default(true),
    affiliate: z
      .object({
        rakuten: z.string().optional(),
        amazon: z.string().optional(),
      })
      .optional(),
  }),
});

export const collections = { posts };
