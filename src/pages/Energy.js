// src/components/Energy.js

import React from 'react';
import { FaBolt, FaFire, FaLeaf } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Energy = () => (
  <div className="container mx-auto py-12 px-4 max-w-5xl text-white">


    <h1 className="text-4xl font-extrabold mb-4 text-center text-white">MCX Energy</h1>
    <p className="text-lg mb-6 text-center text-white">
      MCX Energy is crafted for traders who want to capture opportunities in Crude Oil, Natural Gas, and Coal. Our expert blend of technical and fundamental research ensures you get timely, actionable recommendations for energy commodities traded on MCX. Stay ahead with our focused, India-centric approach and SEBI-compliant services.
    </p>

    {/* What We Offer */}
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-2 text-white">What We Offer</h2>
      <ul className="list-disc pl-6 text-base mb-4 text-white">
        <li>1-2 Intraday/Positional recommendations in Crude Oil, Natural Gas, and Coal (as per market conditions).</li>
        <li>Each recommendation includes 2 targets and a proper stop loss.</li>
        <li>Timely follow-ups and updates on all trade signals.</li>
        <li>Clear entry and exit timings for every recommendation.</li>
        <li>MCX Energy trend, support, and resistance levels.</li>
        <li>Concise analysis of Indian and global energy markets.</li>
        <li>Recommendations delivered via SMS for instant action.</li>
        <li>Swift, real-time customer support (09:00 AM to 06:00 PM).</li>
      </ul>
      <p className="text-base mb-2 text-white">MCX Energy Services are ideal for traders who want focused, research-backed calls in the energy segment of MCX.</p>
    </div>

    {/* Trading Rules */}
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-2 text-white">Trading Rules Every Trader Must Follow</h2>
      <ul className="list-decimal pl-6 text-base mb-4 text-white">
        <li>Do not over trade.</li>
        <li>Only follow SMS research recommendations.</li>
        <li>Trade each recommendation with the same quantity as advised by the Research Team.</li>
        <li>Profit and loss are subject to market risk; there is no guarantee or assurance.</li>
        <li>Never be emotional while trading.</li>
        <li>Beware of overnight risk.</li>
        <li>Always trade with a stop loss.</li>
        <li>Don’t look back and regret past trades.</li>
        <li>Don’t over-leverage in a volatile market.</li>
        <li>Costs matter a lot when you are a trader.</li>
        <li>Protect your capital first—trading begins with risk management.</li>
        <li>Sometimes, not trading is also a valid strategy.</li>
        <li>Profit is what is booked; all else is just on paper.</li>
      </ul>
    </div>



    <div className="text-center text-sm text-white mt-8">
      <strong>Swift real-time customer support:</strong> 09:00 AM to 06:00 PM | <strong>All recommendations are provided through SMS.</strong>
    </div>

    {/* Why Choose Us Section */}
    <div className="my-12">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Why Choose MCX Energy?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/20 rounded-lg p-6 flex flex-col items-center">
          <FaBolt className="text-4xl mb-2 text-yellow-300" />
          <h3 className="font-bold text-lg mb-1 text-white">Energy Market Focus</h3>
          <p className="text-white text-center">Specialized research and recommendations for Crude Oil, Natural Gas, and Coal.</p>
        </div>
        <div className="bg-white/20 rounded-lg p-6 flex flex-col items-center">
          <FaFire className="text-4xl mb-2 text-red-400" />
          <h3 className="font-bold text-lg mb-1 text-white">Timely Updates</h3>
          <p className="text-white text-center">Get instant trade signals and support during Indian market hours.</p>
        </div>
        <div className="bg-white/20 rounded-lg p-6 flex flex-col items-center">
          <FaLeaf className="text-4xl mb-2 text-green-400" />
          <h3 className="font-bold text-lg mb-1 text-white">Trusted by Traders</h3>
          <p className="text-white text-center">Hundreds of energy traders rely on our signals for consistent results.</p>
        </div>
      </div>
    </div>

    {/* FAQ Section */}
    <div className="my-12">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Frequently Asked Questions</h2>
      <div className="max-w-3xl mx-auto">
        <div className="mb-4">
          <h3 className="font-semibold text-white">Q: How will I receive the recommendations?</h3>
          <p className="text-white">A: All recommendations are sent via SMS to your registered mobile number.</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-white">Q: Can I get support if I have questions?</h3>
          <p className="text-white">A: Yes, our support team is available from 09:00 AM to 06:00 PM for any queries.</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-white">Q: Is there a refund policy?</h3>
          <p className="text-white">A: Please refer to our terms and conditions or contact support for refund-related queries.</p>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <Link to="/contact">
          <button className="bg-[var(--primary-green)] text-white px-8 py-3 rounded-lg font-bold text-lg shadow hover:bg-green-700 transition">
            Contact Us
          </button>
        </Link>
      </div>
    </div>


  </div>
);

export default Energy;