import { defineAgent } from "eve";

/**
 * Career-planning specialist. The root agent delegates the research-heavy task of
 * building a grounded 30/60/90-day plan: it reads the profile, ranks real jobs, runs
 * skill-gap analysis, and structures the plan via create_career_plan. It never saves.
 * Saving stays with the root, which owns the human-approval step.
 */
export default defineAgent({
  description:
    "Career-planning specialist. Delegate to it to build a 30/60/90-day plan toward a target role: phased milestones, weekly milestones, project ideas, skills to learn, and which real jobs to apply to first. Pass the goal/target role and any constraints (timeframe, available time) in `message`. It returns the structured plan. It does NOT save — the parent handles approval and save_career_plan.",
  model: "anthropic/claude-sonnet-5",
  reasoning: "medium",
});
