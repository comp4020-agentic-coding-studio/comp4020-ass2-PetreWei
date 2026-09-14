import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { courseNodeSchema } from "astro-course-university/schemas";

const weekSchema = z.coerce.number().int().min(1).max(12);
const courseNodeLoader = (dir: string) =>
  glob({ pattern: ["**/*.{md,mdx}", "!**/CLAUDE.md"], base: `src/content/${dir}` });
const teacherRefs = z.array(reference("people")).min(1);

const courseNode = <T extends z.ZodRawShape>(fields: T) => courseNodeSchema.extend(fields).loose();

const weightedMarking = z
  .object({
    mode: z.literal("weighted"),
    criteria: z
      .array(z.object({ name: z.string().trim().min(1), weight: z.number().positive() }))
      .min(1),
  })
  .superRefine((marking, ctx) => {
    const total = marking.criteria.reduce((sum, criterion) => sum + criterion.weight, 0);
    if (total !== 100) {
      ctx.addIssue({
        code: "custom",
        path: ["criteria"],
        message: `criterion weights sum to ${total}, not 100`,
      });
    }
  });

const holisticMarking = z.object({
  mode: z.literal("holistic"),
  description: z.string().trim().min(40),
});

export type TeacherRefs = z.infer<typeof teacherRefs>;
export type WeightedMarking = z.infer<typeof weightedMarking>;
export type HolisticMarking = z.infer<typeof holisticMarking>;

export const collections = {
  sessions: defineCollection({
    loader: courseNodeLoader("sessions"),
    schema: courseNode({
      week: weekSchema,
      date: z.coerce.date(),
      teachers: teacherRefs.optional(),
    }),
  }),

  assessments: defineCollection({
    loader: courseNodeLoader("assessments"),
    schema: courseNode({
      week: weekSchema,
      due: z.coerce.date(),
      weight: z.coerce.number().positive().max(100),
      marking: z.discriminatedUnion("mode", [weightedMarking, holisticMarking]).optional(),
    }),
  }),

  lectures: defineCollection({
    loader: courseNodeLoader("lectures"),
    schema: courseNode({
      week: weekSchema,
      date: z.coerce.date(),
      teachers: teacherRefs.optional(),
      slides: z
        .string()
        .regex(/^\/decks\/[a-z0-9-]+\/$/)
        .optional(),
    }),
  }),

  people: defineCollection({
    loader: courseNodeLoader("people"),
    schema: ({ image }) =>
      z
        .object({
          title: z.string().trim().min(1),
          description: z.string().trim().min(40),
          role: z.string().trim().min(1),
          contact: z.string().trim().min(1).optional(),
          affiliation: z.string().trim().min(1).optional(),
          email: z.email().optional(),
          url: z.url().optional(),
          photo: image().optional(),
          photoAlt: z.string().trim().optional(),
          published: z.coerce.boolean().default(true),
        })
        .superRefine((person, ctx) => {
          if (person.photo && !person.photoAlt) {
            ctx.addIssue({
              code: "custom",
              path: ["photoAlt"],
              message: "describe the photo when one is supplied",
            });
          }
        }),
  }),
};
