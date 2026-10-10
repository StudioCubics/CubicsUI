export const PACKAGE_MANAGERS = ["npm", "pnpm", "yarn", "bun", "deno"] as const;
export type PackageManager = (typeof PACKAGE_MANAGERS)[number];

type Parsed = {
  verb: string;
  /** positional args (packages, script names, ...) */
  args: string[];
  dev: boolean;
  global: boolean;
  /** any other flags, forwarded as is */
  flags: string[];
};

const INSTALL_VERBS = ["i", "install", "add"];
const REMOVE_VERBS = ["uninstall", "remove", "rm", "un"];
const CREATE_VERBS = ["create", "init"];

function parse(tokens: string[]): Parsed {
  const [verb = "", ...rest] = tokens;
  const parsed: Parsed = {
    verb,
    args: [],
    dev: false,
    global: false,
    flags: [],
  };
  for (const token of rest) {
    if (token === "-D" || token === "--save-dev") parsed.dev = true;
    else if (token === "-g" || token === "--global") parsed.global = true;
    else if (token.startsWith("-")) parsed.flags.push(token);
    else parsed.args.push(token);
  }
  return parsed;
}

/** deno needs the `npm:` specifier prefix on every package */
const toDenoSpecifier = (pkg: string) => `npm:${pkg}`;

const join = (...parts: (string | false | undefined)[]) =>
  parts.filter(Boolean).join(" ");

function convertInstall(pm: PackageManager, p: Parsed): string {
  const { args, dev, global, flags } = p;
  if (args.length === 0 && !global) return join(pm, "install", ...flags);

  switch (pm) {
    case "npm":
      return join("npm i", dev && "-D", global && "-g", ...flags, ...args);
    case "pnpm":
      return join("pnpm add", dev && "-D", global && "-g", ...flags, ...args);
    case "yarn":
      return global
        ? join("yarn global add", ...flags, ...args)
        : join("yarn add", dev && "-D", ...flags, ...args);
    case "bun":
      return join("bun add", dev && "-d", global && "-g", ...flags, ...args);
    case "deno":
      return global
        ? join("deno install -g", ...args.map(toDenoSpecifier))
        : join("deno add", dev && "--dev", ...args.map(toDenoSpecifier));
  }
}

function convertRemove(pm: PackageManager, p: Parsed): string {
  const cmd = pm === "npm" ? "uninstall" : "remove";
  return join(
    pm,
    cmd,
    p.global && (pm === "yarn" ? undefined : "-g"),
    ...p.args,
  );
}

function convertRun(pm: PackageManager, p: Parsed): string {
  const runner = pm === "deno" ? "task" : "run";
  return join(pm, runner, ...p.args, ...p.flags);
}

function convertCreate(pm: PackageManager, p: Parsed): string {
  const [name = "", ...rest] = p.args;
  if (pm === "deno")
    return join("deno run -A", toDenoSpecifier(`create-${name}`), ...rest);
  return join(pm, "create", name, ...rest);
}

function convertExec(pm: PackageManager, tokens: string[]): string {
  switch (pm) {
    case "npm":
      return join("npx", ...tokens);
    case "pnpm":
      return join("pnpm dlx", ...tokens);
    case "yarn":
      return join("yarn dlx", ...tokens);
    case "bun":
      return join("bunx", ...tokens);
    case "deno": {
      const [bin = "", ...rest] = tokens;
      return join("deno run -A", toDenoSpecifier(bin), ...rest);
    }
  }
}

/** Converts a line written with `npm`/`npx` into `pm`'s equivalent */
export function convertNpmLine(line: string, pm: PackageManager): string {
  const trimmed = line.trim();
  const tokens = trimmed.split(/\s+/);
  const [bin, ...rest] = tokens;
  if (bin !== "npm" && bin !== "npx") return line; // blank lines, comments, etc.
  if (pm === "npm") return line;
  if (bin === "npx") return convertExec(pm, rest);

  const parsed = parse(rest);
  if (INSTALL_VERBS.includes(parsed.verb)) return convertInstall(pm, parsed);
  if (REMOVE_VERBS.includes(parsed.verb)) return convertRemove(pm, parsed);
  if (CREATE_VERBS.includes(parsed.verb)) return convertCreate(pm, parsed);
  if (parsed.verb === "run" || parsed.verb === "run-script")
    return convertRun(pm, { ...parsed, verb: "run" });
  if (parsed.verb === "test" || parsed.verb === "start")
    return convertRun(pm, { ...parsed, args: [parsed.verb, ...parsed.args] });

  // Unknown subcommand swap the binary only
  return join(pm, ...rest);
}

/** Converts multi line npm snippet into one snippet per package manager */
export function toPkgManagerCommands(
  code: string,
): Record<PackageManager, string> {
  const lines = code.split("\n");
  return Object.fromEntries(
    PACKAGE_MANAGERS.map((pm) => [
      pm,
      lines.map((line) => convertNpmLine(line, pm)).join("\n"),
    ]),
  ) as Record<PackageManager, string>;
}
