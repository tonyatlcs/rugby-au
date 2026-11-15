import type { PageParams } from "@/lib/server/pages/retrieve-page/retrieve-page.schema";
import { getPage } from "@/lib/server/pages/retrieve-page/retrieve-page";
import { PageEditorProvider } from "@/providers/PageEditor";
import { PageEditorLayout } from "@/features/page/layouts/PageEditorLayout/PageEditorLayout";
import { Suspense, type ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
  params: Promise<PageParams>;
};

async function PageLayoutContent(props: LayoutProps) {
  const { pageId } = await props.params;
  const { summary, componentTree } = await getPage({ pageId });

  return (
    <PageEditorProvider summary={summary} componentTree={componentTree}>
      <PageEditorLayout>{props.children}</PageEditorLayout>
    </PageEditorProvider>
  );
}

export default function Layout(props: LayoutProps) {
  return (
    <Suspense fallback={<p>Loading page...</p>}>
      <PageLayoutContent {...props} />
    </Suspense>
  );
}
