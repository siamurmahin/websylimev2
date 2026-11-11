"use client";

import { useEffect } from "react";

/*
 * WebMCP: lets AI agents running in the visitor's browser (e.g. Chrome's built-in
 * assistant) look up our services, prices and contact details without scraping the
 * page. Read-only: each tool asks our MCP endpoint (/api/mcp) and returns its answer.
 * Does nothing in browsers without navigator.modelContext.
 */

type ToolResult = { content: { type: "text"; text: string }[] };
type ModelContext = {
  registerTool?: (tool: {
    name: string;
    description: string;
    inputSchema: Record<string, unknown>;
    annotations?: Record<string, unknown>;
    execute: (args: Record<string, unknown>) => Promise<ToolResult>;
  }) => unknown;
  unregisterTool?: (name: string) => void;
};

const SERVICES = ["website-design", "growth", "graphic-design", "websychat", "video-editing"];

async function ask(name: string, args: Record<string, unknown> = {}): Promise<ToolResult> {
  try {
    const res = await fetch("/api/mcp", {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/call", params: { name, arguments: args } }),
    });
    const data = await res.json();
    return { content: data?.result?.content ?? [{ type: "text", text: "No answer. See https://www.websylime.com/llms.txt" }] };
  } catch {
    return { content: [{ type: "text", text: "Could not reach the site. See https://www.websylime.com/llms.txt" }] };
  }
}

const TOOLS = [
  {
    name: "get_services",
    description: "List Websy Lime's services (website design, local SEO and growth, graphic design, WebsyChat, video editing) with plans and prices in USD.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "get_service",
    description: "Get one Websy Lime service with its plans, prices and page link.",
    inputSchema: { type: "object", properties: { service: { type: "string", enum: SERVICES } }, required: ["service"] },
  },
  {
    name: "get_contact_info",
    description: "Websy Lime's email, phone, WhatsApp, hours, address and the links to book a free call or start a project.",
    inputSchema: { type: "object", properties: {} },
  },
];

export function WebMcpTools() {
  useEffect(() => {
    const mc = (navigator as Navigator & { modelContext?: ModelContext }).modelContext;
    if (!mc?.registerTool) return;
    const registered: string[] = [];
    for (const t of TOOLS) {
      try {
        mc.registerTool({ ...t, annotations: { readOnlyHint: true }, execute: (args) => ask(t.name, args) });
        registered.push(t.name);
      } catch {
        // a tool with this name is already registered (e.g. after a hot reload)
      }
    }
    return () => registered.forEach((n) => mc.unregisterTool?.(n));
  }, []);
  return null;
}
