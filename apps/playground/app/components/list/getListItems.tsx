import type { ListItemProps } from "@cubicsui/components";
import type { SetState } from "@cubicsui/types";

export function getListItems(props: {
  color: ListItemProps["color"];
  setSelected: SetState<string>;
}): ListItemProps[] {
  const { color, setSelected } = props;
  return [
    {
      type: "item",
      id: "s1",
      onClick: () => setSelected("s1"),
      children: "Enabled item",
    },
    {
      type: "item",
      id: "s2",
      onClick: () => setSelected("s2"),
      children: "Selected item",
    },
    {
      type: "item",
      id: "s3",
      children: "Disabled item",
      disabled: true,
    },
    {
      type: "collapsible",
      id: `${color}-rm-dis`,
      children: "Collapsible",
      nodes: [
        { type: "separator" },
        {
          type: "item",
          id: `s4-1`,
          onClick: () => setSelected("s4-1"),
          children: "Collapsible Child 1",
        },
        {
          type: "collapsible",
          id: `${color}-c-gc`,
          children: "Collapsible Child 2",
          nodes: [
            {
              type: "item",
              id: `s4-2-1`,
              children: "Collapsible Grand Child 1",
              onClick: () => setSelected("s4-2-1"),
            },
            {
              type: "item",
              id: `s4-2-2`,
              children: "Collapsible Grand Child 2",
              onClick: () => setSelected("s4-2-2"),
            },
          ],
        },
        {
          type: "item",
          id: `s5`,
          onClick: () => setSelected("s5"),
          children: "Collapsible Child 3",
        },
      ],
    },
  ];
}
