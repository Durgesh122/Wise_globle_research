
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Trans } from '../i18nShim';
const steps = [
  {
    img: 'https://www.mvmgroup.rs/wp-content/uploads/2023/01/istrazivanje-trzista-copy-1024x1024.webp',
    titleKey: 'pages.About.steps.research.title',
    title: 'Research & Analysis',
    descKey: 'pages.About.steps.research.desc',
    desc: 'In-depth market research and data-driven analysis focused on Indian markets.'
  },
  {
    img: 'https://corporater.com/wp-content/uploads/2023/10/Corporater_Strategy-Execution-Process.webp',
    titleKey: 'pages.About.steps.strategy.title',
    title: 'Strategy & Execution',
    descKey: 'pages.About.steps.strategy.desc',
    desc: 'Tailored trading and investment strategies designed to meet client goals.'
  },
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmFxpK-nU4qoM4tWU5Yj-nCQde18ePj9NDBQ&s',
    titleKey: 'pages.About.steps.support.title',
    title: 'Ongoing Support',
    descKey: 'pages.About.steps.support.desc',
    desc: 'Continuous monitoring, reporting, and client support to adapt to market changes.'
  }
];

const About = () => {
  return (
  <div className="min-h-screen bg-transparent">
    <Helmet>
      <title>About Wise Global Research</title>
      <meta name="description" content="Wise Global Research — market insights, recommendations and research for Indian financial markets." />
      <link rel="canonical" href="https://wiseglobalresearch.com/about" />
    </Helmet>
    <div className="container mx-auto px-4 py-12">
  <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center text-adaptive"><Trans i18nKey="pages.About.title">About Wise Global Research</Trans></h1>
  <p className="text-lg text-center mb-8 text-adaptive/90"><Trans i18nKey="pages.About.subtitle">We provide market research, analytics, and actionable investment insights tailored for Indian investors and traders.</Trans></p>

          <div className="max-w-3xl mx-auto text-center mb-8">
      <p className="text-lg text-adaptive/90"><Trans i18nKey="pages.About.intro.lead">We prioritize what matters most: clear, practical, and research-backed guidance so you can make confident investment decisions.</Trans></p>
            <div className="mt-4 text-adaptive/80 text-left md:text-center">
              <p>
                <Trans i18nKey="pages.About.intro.body">Wise Global Research is a SEBI registered analyst company dedicated to empowering you with straightforward, meaningful, and actionable recommendations and solutions, enabling you to confidently build wealth for any purpose. Committed to offering unbiased opinions backed by thorough research, we focus on providing valuable insights to participants in the Indian market.</Trans>
              </p>
            </div>
          </div>

      <div className="flex flex-col md:flex-row justify-center gap-8 mb-10">
        <div className="bg-white/30 rounded-xl p-6 flex-1 text-center">
          <h2 className="text-2xl font-bold mb-2 text-adaptive"><Trans i18nKey="pages.About.sections.whoWeAre.title">Who we are</Trans></h2>
          <p className="text-adaptive/80"><Trans i18nKey="pages.About.sections.whoWeAre.desc">A SEBI-registered analyst firm focused on delivering unbiased, actionable market research for Indian exchanges.</Trans></p>
        </div>
        <div className="bg-white/30 rounded-xl p-6 flex-1 text-center">
          <h2 className="text-2xl font-bold mb-2 text-adaptive"><Trans i18nKey="pages.About.sections.ourMission.title">Our mission</Trans></h2>
          <p className="text-adaptive/80"><Trans i18nKey="pages.About.sections.ourMission.desc">To empower retail and institutional investors with clear, compliance-aware research and strategies.</Trans></p>
        </div>
        <div className="bg-white/30 rounded-xl p-6 flex-1 text-center">
          <h2 className="text-2xl font-bold mb-2 text-adaptive"><Trans i18nKey="pages.About.sections.ourVision.title">Our vision</Trans></h2>
          <p className="text-adaptive/80"><Trans i18nKey="pages.About.sections.ourVision.desc">To become a trusted source of market intelligence for Indian financial participants.</Trans></p>
        </div>
      </div>

        <div className="text-center mb-10">
      <span className="inline-block bg-green-600 text-adaptive px-6 py-3 rounded-lg text-lg font-semibold shadow"><Trans i18nKey="pages.About.contact.cta">Need help?</Trans> <a href="tel:+919977909494" className="underline ml-2 text-adaptive" aria-label="Call Wise Global Research">+91 9977909494</a></span>
        </div>

      <h2 className="text-3xl font-bold mb-6 text-center"><Trans i18nKey="pages.About.howWeWork">How we work</Trans></h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {steps.map((step, idx) => (
          <div key={idx} className="bg-white/30 rounded-xl p-6 text-center flex flex-col items-center shadow">
            <div className="w-16 h-16 mb-4 flex items-center justify-center bg-green-700 rounded-full overflow-hidden">
              <img
                src={step.img}
                alt={step.title}
                className="object-cover w-16 h-16"
                decoding="async"
                loading="lazy"
                onError={(e) => { e.currentTarget.onerror = null; }}
              />
            </div>
            <h3 className="text-xl font-bold mb-2 text-adaptive"><Trans i18nKey={step.titleKey}>{step.title}</Trans></h3>
            <p className="text-adaptive/80"><Trans i18nKey={step.descKey}>{step.desc}</Trans></p>
          </div>
        ))}
      </div>
    </div>
  </div>
);}
export default About;