import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Geen automatisch gegenereerde AGENTS.md / CLAUDE.md in de repo.
  agentRules: false,
};

export default nextConfig;
