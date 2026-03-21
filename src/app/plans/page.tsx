import PlansHeader from '@/components/plans/PlansHeader'
import PricingCards from '@/components/plans/PricingCards'
import ComparisonTable from '@/components/plans/ComparisonTable'
import PlansFAQ from '@/components/plans/PlansFAQ'

export const metadata = {
  title: 'Plans & Pricing | Skooped.io',
  description: 'Simple flat-rate plans for local businesses. From $49/mo.',
}

export default function PlansPage() {
  return (
    <>
      <PlansHeader />
      <PricingCards />
      <ComparisonTable />
      <PlansFAQ />
    </>
  )
}
