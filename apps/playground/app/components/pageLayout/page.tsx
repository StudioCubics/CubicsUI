import { Card, PageLayout, type PageLayoutProps } from "@cubicsui/components";
import { SidebarLayoutExample } from "./sidebarLayout";
import { SamplePageLayout } from "./utils";

export default function Page() {
  return (
    <PageLayout title={<code>{"<PageLayout/>"}</code>}>
      <h2>Sample</h2>
      <p>Card height is 700px and width is 100%</p>
      <Card disablePadding removeBg fixedHeight="700px" variant="outlined">
        <SamplePageLayout />
      </Card>

      <h2>Sizes</h2>
      <p>Card height is 700px and width is 100%</p>
      {(["xs", "sm", "md", "lg", "xl"] as PageLayoutProps["size"][]).map(
        (s) => (
          <div className={"row_separator column"} key={s}>
            <h3>{s}</h3>
            <Card
              disablePadding
              removeBg
              fixedHeight="700px"
              variant="outlined"
            >
              <SamplePageLayout size={s} />
            </Card>
          </div>
        ),
      )}
      <h2>
        Using with <code>{"<SidebarLayout/>"}</code>
      </h2>
      <SidebarLayoutExample />
    </PageLayout>
  );
}
