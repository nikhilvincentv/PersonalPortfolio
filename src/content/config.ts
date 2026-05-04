import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    student_names: z.string().default("Nikhil Vincent"),
    grade: z.union([z.string(), z.number()]).optional(),
    year: z.number(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    summary: z.string(),
    story: z.string().optional(),
    hero_image: z.string(),
    gallery: z.array(z.string()).default([]),
    links: z
      .array(
        z.object({
          label: z.string(),
          url: z.string().url()
        })
      )
      .default([]),
    awards: z.string().optional(),
    featured: z.boolean().default(false)
  })
});

const research = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    year: z.number(),
    summary: z.string(),
    methods: z.array(z.string()).default([]),
    results: z.array(z.string()).default([]),
    writeup_link: z.string().url().optional(),
    media_links: z
      .array(
        z.object({
          label: z.string(),
          url: z.string().url()
        })
      )
      .default([])
  })
});

const achievements = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    year: z.number(),
    rank: z.string(),
    organization: z.string(),
    proof_link: z.string().url().optional()
  })
});

const leadership = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    role: z.string(),
    impact: z.string(),
    year: z.number(),
    link: z.string().url().optional()
  })
});

const profile = defineCollection({
  type: "data",
  schema: z.object({
    full_name: z.string(),
    preferred_name: z.string(),
    school_program: z.string(),
    intended_major: z.string(),
    gpa: z.string(),
    test_scores: z.string(),
    contact_email: z.string().email(),
    linkedin_url: z.string().url(),
    primary_color: z.string(),
    secondary_color: z.string()
  })
});

export const collections = {
  projects,
  research,
  achievements,
  leadership,
  profile
};
