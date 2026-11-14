import { Suspense, type ReactNode } from "react";
import { getSite } from "@/lib/server/sites/retrieve-site/retrieve-site";
import SiteEditorLayout from "@/features/site/layouts/SiteEditorLayout/SiteEditorLayout";
import type { OnboardingStep } from "@/features/site/pages/SiteEditorPage/components/OnboardingStepsSection/OnboardingStepsSection";
import type { SiteParam } from "@/lib/server/sites/retrieve-site/retrieve-site.schema";

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

async function SiteLayoutContent({
  children,
  params,
}: LayoutProps) {
  const { siteId } = await params;
  const { siteInformation, pageInformation } = await getSite({ siteId });
  const stepInfo: OnboardingStep[] = [
    {
      id: "create-website",
      title: "Create your website",
      subtitle: siteInformation.url || "",
      completed: true,
      active: false,
    },
    {
      id: "add-first-page",
      title: "Add your first page",
      subtitle: "Most sites start with a Home page.",
      completed: false,
      active: true,
    },
    {
      id: "publish-site",
      title: "Publish your site",
      subtitle: "Make it live for your members.",
      completed: false,
      active: false,
    },
  ];

  return (
    <SiteEditorLayout siteInformation={siteInformation} pageInformation={pageInformation} stepInfo={stepInfo}>
      {children}
    </SiteEditorLayout>
  );
}
