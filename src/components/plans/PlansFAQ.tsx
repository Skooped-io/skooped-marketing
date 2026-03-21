'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    q: 'Do I need to know anything about websites?',
    a: 'Not at all. We handle everything from design to launch. You just tell us about your business and we take it from there.',
  },
  {
    q: 'How is this different from Wix or Squarespace?',
    a: "Wix and Squarespace are DIY tools — you build it yourself. With Skooped, we build and manage everything for you. Think of it like the difference between a grocery store and a personal chef.",
  },
  {
    q: 'Do I own my website?',
    a: "Yes, 100%. Your domain, your content, your site. If you ever leave (though we hope you won't), we hand everything over.",
  },
  {
    q: 'How long until my site is live?',
    a: 'Most sites go live within 3–7 business days of receiving your info and payment.',
  },
  {
    q: 'Is there a setup fee or contract?',
    a: 'No setup fee. No contract. You pay month-to-month and can cancel anytime with 30 days notice.',
  },
  {
    q: 'How long does SEO take to show results?',
    a: 'Typically 60–90 days for noticeable improvement in Google rankings. One of our clients went from 200 impressions to over 8,000 in just 3 months.',
  },
  {
    q: 'Will my phone actually ring more?',
    a: "That's the goal. Better Google visibility + an optimized website = more calls from people already searching for your service.",
  },
  {
    q: 'Is your team really AI?',
    a: "It's a mix. Our AI agents handle the repetitive daily tasks (posting, monitoring, responding to reviews). Our human team handles strategy, builds your site, and is always available via email/phone.",
  },
  {
    q: 'Who do I actually talk to if I have questions?',
    a: "You'll have a real human contact — Jake Anderson, our founder — plus email and phone support. We're a small team that actually picks up.",
  },
  {
    q: 'What if I already have a website?',
    a: "We can work with what you have, do a full redesign, or migrate you to our platform. We'll assess your current site for free and recommend the best path.",
  },
]

export default function PlansFAQ() {
  return (
    <section className="bg-[#FDFAF7] py-16 px-6">
      <h2 className="text-3xl font-black text-center text-[#361C24] mb-8">
        Frequently Asked Questions
      </h2>

      <Accordion type="single" collapsible className="max-w-3xl mx-auto">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={String(i)}>
            <AccordionTrigger className="font-medium text-[#361C24] text-left hover:no-underline">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-[#7A6458] leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
