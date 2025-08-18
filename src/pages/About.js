
import React from 'react';
import { useTranslation } from 'react-i18next';

const steps = [
  {
    img: 'https://images.unsplash.com/photo-1515168833906-d2a3b82b1e2e?auto=format&fit=facearea&w=128&q=80',
    titleKey: 'about_page.steps.0.title',
    descKey: 'about_page.steps.0.desc'
  },
  {
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=128&q=80',
    titleKey: 'about_page.steps.1.title',
    descKey: 'about_page.steps.1.desc'
  },
  {
    img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=facearea&w=128&q=80',
    titleKey: 'about_page.steps.2.title',
    descKey: 'about_page.steps.2.desc'
  }
];

const About = () => {
  const { t } = useTranslation();
  return (
  <div className="min-h-screen bg-transparent text-white">
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb navigation removed as requested */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center">{t('about_page.title')}</h1>
      <p className="text-lg text-center mb-8 text-white/80">{t('about_page.subtitle')}</p>

      <div className="max-w-3xl mx-auto text-center mb-8">
        <h2 className="text-2xl font-extrabold mb-2 text-white">About Us — Wise Global Research</h2>
        <p className="text-lg text-white/90">We prioritize what matters most in your life.</p>
        <div className="mt-4 text-white/80 text-left md:text-center">
          <p>
            Wise Global Research is a SEBI registered analyst company dedicated to empowering you with straightforward, meaningful, and actionable recommendations and solutions, enabling you to confidently build wealth for any purpose. Committed to offering unbiased opinions backed by thorough research, we focus on providing valuable insights to participants in the Indian market.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-8 mb-10">
        <div className="bg-white/30 rounded-xl p-6 flex-1 text-center">
          <h2 className="text-2xl font-bold mb-2">{t('about_page.about_us_title')}</h2>
          <p className="text-white/80">{t('about_page.about_us_desc')}</p>
        </div>
        <div className="bg-white/30 rounded-xl p-6 flex-1 text-center">
          <h2 className="text-2xl font-bold mb-2">{t('about_page.mission_title')}</h2>
          <p className="text-white/80">{t('about_page.mission_desc')}</p>
        </div>
        <div className="bg-white/30 rounded-xl p-6 flex-1 text-center">
          <h2 className="text-2xl font-bold mb-2">{t('about_page.vision_title')}</h2>
          <p className="text-white/80">{t('about_page.vision_desc')}</p>
        </div>
      </div>

      <div className="text-center mb-10">
        <span className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow">{t('about_page.need_help')} <a href="tel:+919977909494" className="underline ml-2">+91 9977909494</a></span>
      </div>

      <h2 className="text-3xl font-bold mb-6 text-center">{t('about_page.steps_title')}</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {steps.map((step, idx) => (
          <div key={idx} className="bg-white/30 rounded-xl p-6 text-center flex flex-col items-center shadow">
            <div className="w-16 h-16 mb-4 flex items-center justify-center bg-green-700 rounded-full overflow-hidden">
              <img src={step.img} alt={t(step.titleKey)} className="object-cover w-16 h-16" />
            </div>
            <h3 className="text-xl font-bold mb-2">{t(step.titleKey)}</h3>
            <p className="text-white/80">{t(step.descKey)}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);}
export default About;