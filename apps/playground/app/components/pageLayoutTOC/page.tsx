import {
  Card,
  PageLayout,
  type PageLayoutTOCProps,
} from "@cubicsui/components";
import { SamplePageLayoutTOC } from "./utils";

export default function Page() {
  return (
    <PageLayout title={<code>{"<PageLayoutTOC/>"}</code>}>
      <h2>Sample</h2>
      <p>Card height is 700px and width is 100%</p>
      <Card disablePadding removeBg fixedHeight="700px" variant="outlined">
        <SamplePageLayoutTOC />
      </Card>

      <h2>Sizes</h2>
      <p>Card height is 700px and width is 100%</p>
      {(["xs", "sm", "md", "lg", "xl"] as PageLayoutTOCProps["size"][]).map(
        (s) => (
          <div className={"row_separator column"} key={s}>
            <h3>{s}</h3>
            <Card
              disablePadding
              removeBg
              fixedHeight="700px"
              variant="outlined"
            >
              <SamplePageLayoutTOC size={s} />
            </Card>
          </div>
        ),
      )}
    </PageLayout>
  );
}
