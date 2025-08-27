
import React from 'react';
const steps = [
  {
    img: 'https://images.unsplash.com/photo-1515168833906-d2a3b82b1e2e?auto=format&fit=facearea&w=128&q=80',
    title: 'Research & Analysis',
    desc: 'In-depth market research and data-driven analysis focused on Indian markets.'
  },
  {
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=128&q=80',
    title: 'Strategy & Execution',
    desc: 'Tailored trading and investment strategies designed to meet client goals.'
  },
  {
    img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=facearea&w=128&q=80',
    title: 'Ongoing Support',
    desc: 'Continuous monitoring, reporting, and client support to adapt to market changes.'
  }
];

const About = () => {
  return (
  <div className="min-h-screen bg-transparent text-white">
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb navigation removed as requested */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center">About Wise Global Research</h1>
      <p className="text-lg text-center mb-8 text-white/80">We provide market research, analytics, and actionable investment insights tailored for Indian investors and traders.</p>

      <div className="max-w-3xl mx-auto text-center mb-8">
  <p className="text-lg text-white/90">We prioritize what matters most: clear, practical, and research-backed guidance so you can make confident investment decisions.</p>
        <div className="mt-4 text-white/80 text-left md:text-center">
          <p>
            Wise Global Research is a SEBI registered analyst company dedicated to empowering you with straightforward, meaningful, and actionable recommendations and solutions, enabling you to confidently build wealth for any purpose. Committed to offering unbiased opinions backed by thorough research, we focus on providing valuable insights to participants in the Indian market.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-8 mb-10">
        <div className="bg-white/30 rounded-xl p-6 flex-1 text-center">
          <h2 className="text-2xl font-bold mb-2">Who we are</h2>
          <p className="text-white/80">A SEBI-registered analyst firm focused on delivering unbiased, actionable market research for Indian exchanges.</p>
        </div>
        <div className="bg-white/30 rounded-xl p-6 flex-1 text-center">
          <h2 className="text-2xl font-bold mb-2">Our mission</h2>
          <p className="text-white/80">To empower retail and institutional investors with clear, compliance-aware research and strategies.</p>
        </div>
        <div className="bg-white/30 rounded-xl p-6 flex-1 text-center">
          <h2 className="text-2xl font-bold mb-2">Our vision</h2>
          <p className="text-white/80">To become a trusted source of market intelligence for Indian financial participants.</p>
        </div>
      </div>

      <div className="text-center mb-10">
  <span className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow">Need help? <a href="tel:+919977909494" className="underline ml-2">+91 9977909494</a></span>
      </div>

      <h2 className="text-3xl font-bold mb-6 text-center">How we work</h2>
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
            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
            <p className="text-white/80">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);}
export default About;