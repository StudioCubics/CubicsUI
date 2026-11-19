import { PageLayout, SearchInput } from "@cubicsui/components";

export default function Page() {
  return (
    <PageLayout title={<code>{"<SearchInput/>"}</code>}>
      <h2>Usage</h2>
      <h3>Default</h3>
      <SearchInput />
      <SearchInput triggerType="icon" />
      <hr />
      <h3>resultType="popover"</h3>
      <SearchInput resultType="popover" />
      <SearchInput triggerType="icon" resultType="popover" />
      <hr />
      <h3>resultType="dialog"</h3>
      <SearchInput resultType="dialog" />
      <SearchInput triggerType="icon" resultType="dialog" />
    </PageLayout>
  );
}
