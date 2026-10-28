"use client";

import {
  Breadcrumbs,
  BreadcrumbsItem,
  Button,
  TextInput,
} from "@cubicsui/components";
import { renderCrumbs } from "./crumbs";

export function RenderItem() {
  return (
    <section>
      <h3>
        Rendering using <code>{"<Button/>"} component</code>
      </h3>
      <Breadcrumbs
        renderItem={(props) => (
          <BreadcrumbsItem as={Button} variant="contained" {...props} />
        )}
      >
        {renderCrumbs()}
      </Breadcrumbs>
      <hr />
      <h3>
        Rendering using <code>{"<TextInput/>"}</code>
      </h3>
      <Breadcrumbs
        renderItem={({ className, onClick, children }) => (
          <TextInput
            rootClass={className}
            onClick={onClick}
            beforeSurface={children}
          />
        )}
      >
        {renderCrumbs()}
      </Breadcrumbs>
    </section>
  );
}
