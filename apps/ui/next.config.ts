import type { NextConfig } from "next";
import tsconfig from "../../tsconfig.base.json";

const nextConfig: NextConfig = {
  // Turbopack resolves inherited paths from the base config's directory.
  // Apply the shared aliases relative to this workspace instead.
  turbopack: {
    resolveAlias: Object.fromEntries(
      Object.entries(tsconfig.compilerOptions.paths).map(([alias, paths]) => [
        alias,
        paths.map((target) => `./${target}`),
      ]),
    ),
  },
  cacheComponents: true,
  partialPrefetching: true,
};

export default nextConfig;
