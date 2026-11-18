import type { GlobalCssVars } from "./GlobalCssVars.types";
import { buildGlobalStyles } from "./GlobalCssVars.utils";

/** Server / first render / var mode: var() references, identical on server and client */
export const GLOBAL_CSS_VARS: GlobalCssVars = buildGlobalStyles(null);
