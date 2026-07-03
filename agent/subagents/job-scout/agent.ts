import { defineAgent } from "eve";
import { z } from "zod";

/**
 * Read-only job market research specialist. The root agent delegates
 * "find and analyze the best-fit jobs" to keep heavy ranking/gap work out of
 * the main conversation context. Returns a structured shortlist (see
 * outputSchema) that the chat UI renders as rich job cards under the
 * delegation indicator; it never saves anything and never talks to the user
 * directly.
 */
export default defineAgent({
  description:
    "Read-only job scout. Delegate to it to find, rank, and gap-analyze the best-fit real jobs for the signed-in user. Give it the user's target role/constraints in `message`; it returns a structured shortlist with match scores, matched skills, and missing skills. It does not save or message the user.",
  model: "anthropic/claude-sonnet-5",
  reasoning: "low",
  outputSchema: z.object({
    summary: z
      .string()
      .describe(
        "1–2 sentence overall read: strongest realistic targets and the single highest-leverage skill to close.",
      ),
    jobs: z
      .array(
        z.object({
          jobId: z.string().optional(),
          title: z.string(),
          company: z.string().optional(),
          seniority: z.string().optional(),
          workMode: z.string().optional(),
          location: z.string().optional(),
          salaryMin: z.number().optional(),
          salaryMax: z.number().optional(),
          currency: z.string().optional(),
          matchScore: z.number().optional(),
          matchedSkills: z.array(z.string()).optional(),
          missingSkills: z.array(z.string()).optional(),
          why: z
            .string()
            .optional()
            .describe("One line: why this fits / what's the gap."),
        }),
      )
      .describe(
        "Ranked shortlist, strongest first, copied faithfully from tool results.",
      ),
  }),
});
