import type { Metadata } from 'next';
import SolutionLayout from '@/components/solutions/SolutionLayout';
import InspireExtensionBlock from '@/components/solutions/InspireExtensionBlock';
import { ROUTES, SITE_URL } from '@/lib/constants';
import { SOLUTION_DETAIL_PRICES } from '@/content/pricing';
import {
  salesFunnelSolutionEffectAfter,
  salesFunnelSolutionEffectBefore,
  salesFunnelSolutionMeta,
  salesFunnelSolutionProblem,
  salesFunnelSolutionSystemItems,
  salesFunnelSolutionTitle,
} from '@/content/sales-funnel-case-study';

export const metadata: Metadata = {
  title: salesFunnelSolutionMeta.title,
  description: salesFunnelSolutionMeta.description,
  openGraph: {
    title: salesFunnelSolutionMeta.openGraphTitle,
    description: salesFunnelSolutionMeta.openGraphDescription,
    url: `${SITE_URL}/solutions/sales-funnel`,
    images: [
      {
        url: '/og/solutions-sales-funnel.svg',
        width: 1200,
        height: 630,
        alt: salesFunnelSolutionMeta.ogAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: salesFunnelSolutionMeta.title,
    description: salesFunnelSolutionMeta.twitterDescription,
    images: ['/og/solutions-sales-funnel.svg'],
  },
};

export default function SalesFunnelPage() {
  return (
    <SolutionLayout
      title={salesFunnelSolutionTitle}
      problem={salesFunnelSolutionProblem}
      systemItems={[...salesFunnelSolutionSystemItems]}
      effectBeforeAfter={{
        before: [...salesFunnelSolutionEffectBefore],
        after: [...salesFunnelSolutionEffectAfter],
      }}
      screenKey="wizardCheckout"
      videoKey="wizard"
      caseStudyHref={ROUTES.resultsSalesFunnel}
      priceFrom={SOLUTION_DETAIL_PRICES.salesFunnel}
    >
      <div className="mb-16">
        <InspireExtensionBlock id="inspire" mapAnalyticsLocation="solution_inspire" />
      </div>
    </SolutionLayout>
  );
}
