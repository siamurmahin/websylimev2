import { agentContact, agentMarkdown, agentServices } from "@/lib/agent-content";

/*
 * A small, read-only MCP server (Model Context Protocol, Streamable HTTP, stateless
 * JSON responses) so AI assistants can look up Websy Lime's services, prices and
 * contact details. It only returns public website information; nothing can be sent,
 * booked or changed through it. Described by /.well-known/mcp/server-card.json.
 */

const PROTOCOL = "2025-06-18";
const SERVER = { name: "websylime", title: "Websy Lime", version: "1.0.0" };

const cors = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "POST, OPTIONS",
  "access-control-allow-headers": "content-type, mcp-protocol-version, mcp-session-id, accept",
};

const serviceIds = agentServices().map((s) => s.id);

const TOOLS = [
  {
    name: "get_services",
    title: "Services and prices",
    description: "List every Websy Lime service (website design, local SEO and growth, graphic design, WebsyChat, video editing) with its plans and prices in USD.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: { readOnlyHint: true },
  },
  {
    name: "get_service",
    title: "One service",
    description: "Get one service with its plans, prices and page link.",
    inputSchema: {
      type: "object",
      properties: { service: { type: "string", enum: serviceIds, description: "Which service" } },
      required: ["service"],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true },
  },
  {
    name: "get_contact_info",
    title: "Contact details",
    description: "Email, phone, WhatsApp, business hours, address and the links to book a free call or start a project.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: { readOnlyHint: true },
  },
  {
    name: "get_site_summary",
    title: "Site summary",
    description: "A Markdown summary of the whole website: services, prices, key pages, industries, FAQ and contact.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: { readOnlyHint: true },
  },
];

type Rpc = { jsonrpc?: string; id?: string | number | null; method?: string; params?: { name?: string; arguments?: Record<string, unknown> } };

function callTool(name: string | undefined, args: Record<string, unknown> = {}) {
  const json = (data: unknown) => ({ content: [{ type: "text", text: JSON.stringify(data, null, 2) }], structuredContent: data });
  switch (name) {
    case "get_services":
      return json({ services: agentServices() });
    case "get_service": {
      const s = agentServices().find((x) => x.id === args.service);
      if (!s) return { content: [{ type: "text", text: `Unknown service. Use one of: ${serviceIds.join(", ")}` }], isError: true };
      return json(s);
    }
    case "get_contact_info":
      return json(agentContact());
    case "get_site_summary":
      return { content: [{ type: "text", text: agentMarkdown() }] };
    default:
      return null;
  }
}

function handle(msg: Rpc) {
  const id = msg.id ?? null;
  const ok = (result: unknown) => ({ jsonrpc: "2.0", id, result });
  const err = (code: number, message: string) => ({ jsonrpc: "2.0", id, error: { code, message } });
  switch (msg.method) {
    case "initialize":
      return ok({
        protocolVersion: PROTOCOL,
        capabilities: { tools: { listChanged: false } },
        serverInfo: SERVER,
        instructions: "Read-only information about Websy Lime, a web design and marketing agency for home service businesses. Use get_services for prices and get_contact_info to book a call.",
      });
    case "ping":
      return ok({});
    case "tools/list":
      return ok({ tools: TOOLS });
    case "tools/call": {
      const result = callTool(msg.params?.name, msg.params?.arguments);
      return result ? ok(result) : err(-32602, `Unknown tool: ${msg.params?.name}`);
    }
    default:
      if (msg.method?.startsWith("notifications/")) return null; // notifications get no reply
      return err(-32601, `Method not found: ${msg.method}`);
  }
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: cors });
}

// No server-to-client stream: this server only answers requests.
export function GET() {
  return new Response("This MCP endpoint accepts JSON-RPC over POST.", { status: 405, headers: { ...cors, allow: "POST, OPTIONS" } });
}

export async function POST(request: Request) {
  let body: Rpc | Rpc[];
  try {
    body = await request.json();
  } catch {
    return Response.json({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } }, { status: 400, headers: cors });
  }
  const replies = (Array.isArray(body) ? body : [body]).map(handle).filter(Boolean);
  if (!replies.length) return new Response(null, { status: 202, headers: cors });
  return Response.json(Array.isArray(body) ? replies : replies[0], { headers: cors });
}
