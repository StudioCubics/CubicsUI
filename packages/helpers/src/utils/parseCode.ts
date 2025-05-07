import { parse } from "@babel/parser";
import { recursive } from "babel-walk";

/**
 * Converts provided code as ECMAScript program to AST using `@babel/parser` and walks throught the AST to extract all the imports and require statements
 * @param {string} code The code to convert to AST
 * @returns Array containing the imports and require sources
 */
export default function parseCode(code: string): string[] {
  const ast = parse(code, {
    sourceType: "unambiguous",
    // TODO add more plugins
    plugins: ["jsx", "typescript"],
  });
  const imports: string[] = [];
  const visitors = recursive({
    // Handle ES module imports
    ImportDeclaration: (node) => {
      imports.push(node.source.value);
      // push to imports
    },
    // Handle CommonJS require calls
    CallExpression: (node) => {
      if (node.callee.type === "Identifier" && node.callee.name === "require") {
        const arg = node.arguments[0];
        if (arg && arg.type === "StringLiteral") {
          imports.push(arg.value);
        }
      }
    },
  });
  // Walk the AST looking for imports and requires
  visitors(ast);
  return imports;
}
