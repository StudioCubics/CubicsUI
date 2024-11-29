import { KVBase } from "../../components/button/reactButton";

export function genPropsTypes(
  name: string,
  props: KVBase[],
  inherits?: string
) {
  let allProps = "";
  props.forEach((prop) => {
    allProps =
      allProps + `${prop.key}${prop.optional ? "?" : ""}: ${prop.value};`;
  });
  return `type ${name} = {${allProps}}${inherits ?? ""};`;
}
