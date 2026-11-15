import { Suspense, type ReactNode } from "react";
import { getSite } from "@/lib/server/sites/retrieve-site/retrieve-site";
import { SiteEditorLayout } from "@/features/site/layouts/SiteEditorLayout/SiteEditorLayout";
import type { SiteParam } from "@/lib/server/sites/retrieve-site/retrieve-site.schema";
import { SiteEditorProvider } from "@/providers/SiteEditor";

type LayoutProps = {
  children: ReactNode;
  params: Promise<SiteParam>;
};

async function SiteLayoutContent(props: LayoutProps) {
  const { siteId } = await props.params;
  const { siteInformation, pageInformation } = await getSite({ siteId });
  return (
    <SiteEditorProvider
      siteInformation={siteInformation}
      pageInformation={pageInformation}
    >
      <SiteEditorLayout>{props.children}</SiteEditorLayout>
    </SiteEditorProvider>
  );
}

export default function Layout(props: LayoutProps) {
  return (
    <Suspense fallback={<p>Loading website…</p>}>
      <SiteLayoutContent {...props} />
    </Suspense>
  );
}
