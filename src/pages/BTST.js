import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BTST = () => {
  const [showReport, setShowReport] = useState(false);

  const sections = [
    {
      title: "What is BTST?",
      points: [
        "BTST (Buy Today, Sell Tomorrow) is a short-term trading strategy where investors buy a stock today and sell it the next day before taking delivery.",
        "It allows traders to take advantage of overnight price movements without locking in capital for the settlement period.",
        "Unlike intraday trading, BTST positions can benefit from after-hours news and global market movements.",
        "This strategy works best in trending markets with high liquidity stocks that show consistent momentum patterns.",
      ],
    },
    {
      title: "How Our BTST Research Works",
      points: [
        "Our SEBI-registered analysts track high-volume stocks and technical breakouts using proprietary algorithms.",
        "We send 1–3 BTST research reports per day, each with clear entry, target, and stop-loss levels.",
        "Our research is backed by real-time market analysis, global cues, and sentiment indicators.",
        "Each research report includes detailed technical rationale and risk assessment parameters.",
        "Subscribers receive alerts 30 minutes before market close for optimal entry timing.",
      ],
    },
    {
      title: "SEBI Compliance & Transparency",
      points: [
        "All research reports are issued by certified analysts under SEBI Registration INHXXXXXXXX.",
        "We maintain clear separation between research and any other commercial activity.",
        "Performance reports and disclosures are available upon request.",
        "Full compliance with SEBI Research Analyst Regulations 2014 (including disclosures of interest).",
        "Quarterly audit of research accuracy and risk management processes.",
      ],
    },
    {
      title: "Why Choose Us?",
      points: [
        "Our research is based on verified trades from the past 12 months.",
        "Real-time alerts via SMS, email, and WhatsApp with instant execution updates.",
        "Dedicated research support for all subscribers with direct analyst access.",
        "Clear risk-reward ratio in every research report (minimum 1:2 ratio maintained).",
        "Weekly performance review webinars and monthly portfolio health checks.",
        "Customized position sizing guidance based on your risk appetite.",
      ],
    },
    {
      title: "Risk Management Framework",
      points: [
        "Strict maximum exposure limit of 5% capital per BTST trade.",
        "Automated stop-loss triggers with 1% trailing mechanism.",
        "Volatility-adjusted position sizing based on ATR indicators.",
        "Blackout periods during earnings announcements and major economic events.",
        "Three-tier verification process before any research report is released.",
      ],
    },
    {
      title: "Subscription Plans",
      points: [
        "Basic Plan: 5 BTST research reports per week with SMS alerts (₹2,999/month)",
        "Premium Plan: 10-15 BTST research reports with WhatsApp priority (₹4,999/month)",
        "Institutional Plan: Unlimited research reports + dedicated analyst (₹9,999/month)",
        "All plans include weekend strategy sessions and monthly review reports.",
      ],
    },
  ];

  const sampleReport = {
    date: "July 15, 2025",
    stock: "RELIANCE (NSE)",
    analysis: [
      "Strong breakout above ₹2,850 resistance with 2x average volume",
      "MACD showing bullish crossover on daily chart",
      "OI buildup in 2900CE options indicating upward momentum",
      "Global crude prices trending favorably for energy sector"
    ],
    research: {
      entry: "₹2,865-2,880",
      target: "₹2,950 (2.4% upside)",
      stopLoss: "₹2,830 (1.7% downside)",
      holdingPeriod: "1 day",
      riskReward: "1:1.4"
    },
    disclaimer: "This is for informational purposes only. Past performance is not indicative of future results. Consult a qualified financial professional before investing."
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 bg-transparent text-white relative">
      {/* Sample Report Modal */}
      {showReport && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setShowReport(false)}
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-900 rounded-xl max-w-2xl w-full border border-white/10 overflow-hidden"
          >
            <div className="p-6 border-b border-white/10">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">BTST Sample Report</h3>
                <button 
                  onClick={() => setShowReport(false)}
                  className="text-white/50 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-white/60 mt-1">Generated on {sampleReport.date}</p>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-white/5 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2">{sampleReport.stock}</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-white/60">Entry Range</p>
                    <p className="font-medium">{sampleReport.research.entry}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Target</p>
                    <p className="font-medium text-green-400">{sampleReport.research.target}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Stop Loss</p>
                    <p className="font-medium text-red-400">{sampleReport.research.stopLoss}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Risk/Reward</p>
                    <p className="font-medium">{sampleReport.research.riskReward}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-3">Technical Rationale</h4>
                <ul className="space-y-3">
                  {sampleReport.analysis.map((point, i) => (
                    <li key={i} className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 bg-white rounded-full mt-2 mr-2"></span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 p-4 rounded-lg text-sm">
                <h4 className="font-bold mb-2">Execution Guidelines</h4>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Enter only if price sustains above ₹2,860 for 15 minutes</li>
                  <li>Book partial profits at ₹2,920 (50% position)</li>
                  <li>Move stop-loss to cost if price reaches ₹2,900</li>
                  <li>Do not carry position if global markets turn negative overnight</li>
                </ul>
              </div>

              <div className="text-xs text-white/50 border-t border-white/10 pt-4">
                {sampleReport.disclaimer}
              </div>
            </div>

            <div className="bg-white/5 px-6 py-4 border-t border-white/10">
              <button 
                onClick={() => setShowReport(false)}
                className="w-full py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition"
              >
                Close Report
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 max-w-4xl mx-auto px-4"
      >
        <div className="inline-block mb-6">
          <div className="text-sm font-semibold bg-white/10 px-4 py-1 rounded-full mb-3 border border-white/20">
            Short-Term Trading Strategy
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          BTST (Buy Today, Sell Tomorrow)
        </h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Maximize overnight opportunities with SEBI-compliant, data-backed research from certified analysts.
        </p>
      </motion.div>

      {/* Content */}
      <div className="max-w-5xl mx-auto space-y-16">
        {sections.map((section, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="inline-block w-2 h-2 bg-white rounded-full mr-3"></span>
              {section.title}
            </h2>
            <div className="space-y-4 leading-relaxed text-white/80">
              {section.points.map((point, pIdx) => (
                <div
                  key={pIdx}
                  className="flex items-start"
                >
                  <span className="inline-block w-1.5 h-1.5 bg-white/50 rounded-full mt-2 mr-3"></span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-20 text-center"
      >
        <motion.button 
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowReport(true)}
          className="px-8 py-3 font-semibold bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all text-white"
        >
          View BTST Sample Report
        </motion.button>
        <p className="mt-3 text-sm text-white/60">
          Only available to eligible retail and institutional investors under SEBI norms.
        </p>
      </motion.div>

      {/* Performance Metrics */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-24 max-w-5xl mx-auto"
      >
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h2 className="text-2xl font-bold mb-6 text-center">Performance Metrics (Last 6 Months)</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold">2.8%</div>
              <div className="text-sm mt-2">Average Return per Trade</div>
            </div>
            <div className="bg-white/10 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold">1:2.1</div>
              <div className="text-sm mt-2">Average Risk/Reward</div>
            </div>
          </div>
          <div className="mt-6 text-sm text-white/60 text-center">
            *Past performance is not indicative of future results. Based on 128 executed BTST research reports between Jan-Jun 2025
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BTST;
