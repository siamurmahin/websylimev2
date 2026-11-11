import { agentMarkdown } from "@/lib/agent-content";

/** /llms.txt — a plain Markdown summary of the site for AI tools (llmstxt.org). */

export function GET() {
  return new Response(agentMarkdown(), { headers: { "content-type": "text/markdown; charset=utf-8" } });
}
