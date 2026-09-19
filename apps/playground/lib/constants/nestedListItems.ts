import type { ListItemProps } from "@cubicsui/components";

export const nestedListItems = (id: string): ListItemProps[] => {
  return [
    { children: "Nested item one" },
    {
      type: "collapsible",
      id: `${id}-nested-2`,
      children: "Nested item two",
      nodes: [
        {
          children: "Nested item two one",
        },
        {
          type: "header",
          children: "Nested Header",
        },
        {
          children: "Nested item two two",
        },
        {
          type: "collapsible",
          id: `${id}-nested-2-3`,
          children: "Nested item two three",
          defaultCollapsed: true,
          nodes: [
            {
              children: "Nested item two three one",
            },
            {
              type: "header",
              children: "Header with line",
              renderLine: true,
            },
            {
              children: "Nested item two three two",
            },
          ],
        },
      ],
    },
    { type: "separator" },
    {
      children: "Nested item three",
      disabled: true,
    },
  ] as ListItemProps[];
};
