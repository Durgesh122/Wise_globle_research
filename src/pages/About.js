
import React from 'react';
import { useTranslation } from 'react-i18next';

const steps = [
  {
    img: 'https://images.unsplash.com/photo-1515168833906-d2a3b82b1e2e?auto=format&fit=facearea&w=128&q=80',
    title: 'Customer-Centric Approach',
    desc: 'Prioritize customer needs, preferences, and feedback to tailor products/services, enhancing satisfaction and loyalty, fostering long-term relationships.'
  },
  {
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=128&q=80',
    title: 'Risk Mitigation',
    desc: 'Identify, assess, and address potential threats to minimize negative impacts on operations, finances, reputation, and stakeholder interests.'
  },
  {
    img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=facearea&w=128&q=80',
    title: 'Creative Solutions',
    desc: 'Think innovatively to devise unique, effective answers to challenges, leveraging imagination, resourcefulness, and diverse perspectives for problem-solving success.'
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
              <img src={step.img} alt={t(`about_page.steps.${idx}.title`)} className="object-cover w-16 h-16" />
            </div>
            <h3 className="text-xl font-bold mb-2">{t(`about_page.steps.${idx}.title`)}</h3>
            <p className="text-white/80">{t(`about_page.steps.${idx}.desc`)}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);}
export default About;