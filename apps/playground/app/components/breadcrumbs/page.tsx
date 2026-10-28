import {
  Breadcrumbs,
  type BreadcrumbsProps,
  Button,
} from "@cubicsui/components";
import { renderCrumbs } from "./crumbs";
import { Hybrid } from "./hybrid";
import { PathnameExample } from "./pathname";
import { RenderItem } from "./renderItem";

export default function Page() {
  return (
    <main className="main">
      <h1>
        <code>{"<Breadcrumbs/>"}</code>
      </h1>
      <h2>Sizes</h2>
      <section>
        {(["xs", "sm", "md", "lg", "xl"] as BreadcrumbsProps["size"][]).map(
          (s) => (
            <div className={"row_separator column"} key={s}>
              <h3>{s}</h3>
              <Breadcrumbs size={s}>{renderCrumbs()}</Breadcrumbs>
            </div>
          ),
        )}
      </section>
      <h2>Colors</h2>
      <section>
        {(
          [
            "primary",
            "secondary",
            "tertiary",
            "error",
            "warn",
            "success",
          ] as BreadcrumbsProps["color"][]
        ).map((c) => (
          <div className={"row_separator column"} key={c}>
            <h3>{c}</h3>
            <Breadcrumbs color={c}>{renderCrumbs()}</Breadcrumbs>
          </div>
        ))}
      </section>
      <h2>Hybrid</h2>
      <Hybrid />

      <h2>
        Custom <code>renderItem</code>
      </h2>
      <RenderItem />

      <h2>Using with usePathname</h2>
      <PathnameExample />

      <h2>Custom boundaryCount and siblingCount</h2>
      <section>
        <h3>
          <code>boundaryCount=1</code>, <code>siblingCount=0</code>,{" "}
          <code>defaultSelected=4</code>
        </h3>
        {/*  boundaryCount 1, siblingCount 0 -> 1 … 5 … 10 */}
        {/*  Each click on an ellipsis reveals 1 crumb next to the active crumb:
            first …  -> 1 … 4 5 … 10, then 1 2 3 4 5 … 10
            second … -> 1 … 5 6 … 10, then 1 … 5 6 7 8 9 10 (last leftover crumb is never hidden by an ellipsis) */}
        <Breadcrumbs boundaryCount={1} siblingCount={0} defaultSelected={4}>
          {renderCrumbs()}
        </Breadcrumbs>
        <h3>
          <code>boundaryCount=1</code>, <code>siblingCount=1</code>,{" "}
          <code>defaultSelected=4</code>
        </h3>
        {/*  More context around the active crumb -> 1 … 4 5 6 … 10 */}
        {/*  Each click reveals 3 crumbs (siblingCount * 2 + 1), so both gaps open fully in one click:
            first …  -> 1 2 3 4 5 6 … 10
            second … -> 1 … 4 5 6 7 8 9 10 */}
        <Breadcrumbs boundaryCount={1} siblingCount={1} defaultSelected={4}>
          {renderCrumbs()}
        </Breadcrumbs>
        <h3>
          <code>boundaryCount=2</code>, <code>siblingCount=0</code>,{" "}
          <code>defaultSelected=4</code>
        </h3>
        {/*  Two crumbs at each edge -> 1 2 … 5 … 9 10 */}
        {/*  first …  -> 1 2 3 4 5 … 9 10 (only 1 crumb was hidden after the reveal, so the gap closes)
            second … -> 1 2 … 5 6 … 9 10, then 1 2 … 5 6 7 8 9 10 */}
        <Breadcrumbs boundaryCount={2} siblingCount={0} defaultSelected={4}>
          {renderCrumbs()}
        </Breadcrumbs>
        <h3>
          <code>boundaryCount=0</code>, <code>siblingCount=1</code>,{" "}
          <code>defaultSelected=0</code>
        </h3>
        {/*  Window shifts instead of shrinking at the start -> 1 2 3 … */}
        <Breadcrumbs boundaryCount={0} siblingCount={1} defaultSelected={0}>
          {renderCrumbs()}
        </Breadcrumbs>
        <h3>
          <code>boundaryCount=0</code>, <code>siblingCount=1</code>,{" "}
          <code>defaultSelected=9</code>
        </h3>
        {/*  Window shifts instead of shrinking at the end -> … 8 9 10 */}
        <Breadcrumbs boundaryCount={0} siblingCount={1} defaultSelected={9}>
          {renderCrumbs()}
        </Breadcrumbs>
      </section>
      <h2>Custom separator and ellipsis</h2>
      <section>
        {/*  Custom separator and ellipsis */}
        <Breadcrumbs separator="/" ellipsis="..." defaultSelected={4}>
          {renderCrumbs()}
        </Breadcrumbs>
      </section>

      <h2>Passthrough props</h2>
      <section>
        {/*  Div props pass-through (needs ...rest spread on the root in the component) */}
        <Breadcrumbs
          aria-label="Breadcrumb"
          data-testid="breadcrumbs"
          className="my-breadcrumbs"
        >
          {renderCrumbs()}
        </Breadcrumbs>
      </section>

      <h2>Disabled child</h2>
      <section>
        <Breadcrumbs>
          <Button>Crumb 1</Button>
          <Button disabled>Crumb 2 disabled</Button>
          <Button>Crumb 2</Button>
          <Button>Crumb 2</Button>
        </Breadcrumbs>
      </section>
    </main>
  );
}
