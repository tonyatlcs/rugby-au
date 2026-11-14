import { Suspense, type ReactNode } from "react";
import { getSite } from "@/lib/server/sites/retrieve-site/retrieve-site";
import { SiteEditorLayout } from "@/features/site/layouts/SiteEditorLayout/SiteEditorLayout";
import type { SiteParam } from "@/lib/server/sites/retrieve-site/retrieve-site.schema";
import { PageEditorProvider } from "@/providers/PageEditor";

type LayoutProps = {
  children: ReactNode;
  params: Promise<SiteParam>;
};

export default function Layout(props: LayoutProps) {
  return (
    <Suspense fallback={<p>Loading website…</p>}>
      <SiteLayoutContent {...props} />
    </Suspense>
  );
}

async function SiteLayoutContent({ children, params }: LayoutProps) {
  const { siteId } = await params;
  const { siteInformation, pageInformation } = await getSite({ siteId });
  return (
    <PageEditorProvider>
      <SiteEditorLayout
        siteInformation={siteInformation}
        pageInformation={pageInformation}
      >
        {children}
      </SiteEditorLayout>
    </PageEditorProvider>
  );
}
