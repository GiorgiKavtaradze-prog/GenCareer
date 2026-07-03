import { defineAgent } from "eve";

/**
 * Recruiter-outreach specialist. The root agent delegates the focused copywriting
 * task of drafting a connection note + recruiter DM for a specific job. It generates
 * the draft via create_outreach_draft and returns it; it never saves or sends.
 * Saving stays with the root, which owns the human-approval step.
 */
export default defineAgent({
  description:
    "Recruiter-outreach specialist. Delegate to it to draft a short connection message, a longer recruiter DM, and a subject line for a specific job/recruiter. Pass the job (title/company), recruiter if known, tone, and any hooks in `message`. It returns the structured draft. It does NOT save or send — the parent handles approval and save_outreach_draft.",
  model: "anthropic/claude-sonnet-5",
  reasoning: "medium",
});
