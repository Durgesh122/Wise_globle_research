
import React from 'react';
import { FaChartLine, FaRegClock, FaUserCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const EvaluationIndexOptions = () => (
  <div className="container mx-auto py-12 px-4 max-w-5xl text-white">
    <h1 className="text-4xl font-extrabold mb-4 text-center text-white">Evaluation Index Options</h1>
    <p className="text-lg mb-6 text-center text-white">
      Evaluation Index Options service is specifically designed for option traders trading with precise technical research recommendations for Index Options. We provide recommendations to intraday traders to optimize every market movement. Nearly 1-2 intraday recommendations are given daily in Nifty and Bank Nifty Options, as per market conditions. Our timely technical recommendations provide adequate time to enter and exit trades. Our team of analysts specializes in tracking the F&O market, major sectors, and blends technical analysis with national and international events to predict market moves.
    </p>

    {/* What We Offer */}
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-2 text-white">What We Offer</h2>
      <ul className="list-disc pl-6 text-base mb-4 text-white">
        <li>1-2 Intraday/Positional recommendations in Nifty and Bank Nifty Options (as per market conditions).</li>
        <li>Each recommendation includes 2 targets and a proper stop loss.</li>
        <li>Timely follow-ups and updates on all trade signals.</li>
        <li>Clear entry and exit timings for every recommendation.</li>
        <li>Nifty and Bank Nifty trend, support, and resistance levels.</li>
        <li>Careful analysis of market direction and concise domestic & world market information.</li>
        <li>Recommendations delivered via SMS for instant action.</li>
        <li>Swift, real-time customer support (09:00 AM to 06:00 PM).</li>
      </ul>
      <p className="text-base mb-2 text-white">A pure intraday product, where customers receive Index Option recommendations in NSE. This product is designed for new customers who want to evaluate our recommendations in the Stock Option market.</p>
      <div className="bg-white/10 rounded-lg p-4 mt-4">
        <span className="font-semibold text-white">Sample Call:</span>
        <div className="text-white mt-2">BUY BANKNIFTY 02 MAR 40400 PE ABOVE 460 TARGET 540 620 STOPLOSS 370</div>
      </div>
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

    {/* Pricing Plan */}
    <div className="mb-8 text-center">
      <h2 className="text-2xl font-bold mb-2 text-white">Pricing Plan For Evaluation Index Options</h2>
      <div className="flex justify-center">
        <div className="border rounded-xl p-6 shadow-md bg-white/30 flex flex-col items-center max-w-xs w-full">
          <h3 className="text-xl font-bold mb-2 text-white">Index Evaluation Pack</h3>
          <div className="text-3xl font-extrabold text-white mb-2">₹5,100 <span className="text-base font-normal">/ 10 Days</span></div>
          <div className="mb-2 text-white">1 to 2 Calls in a Day</div>
          <Link to="/payment">
            <button className="bg-[var(--primary-green)] text-white px-6 py-2 rounded-lg font-semibold mt-2">Payment</button>
          </Link>
          <div className="text-xs text-white mt-2">Note: Prices are excluding GST (18%)</div>
        </div>
      </div>
    </div>

    {/* Why Choose Us Section */}
    <div className="my-12">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Why Choose Evaluation Index Options?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/20 rounded-lg p-6 flex flex-col items-center">
          <FaChartLine className="text-4xl mb-2 text-blue-300" />
          <h3 className="font-bold text-lg mb-1 text-white">Expert Research</h3>
          <p className="text-white text-center">Our team combines technical and fundamental analysis for the most reliable index option recommendations.</p>
        </div>
        <div className="bg-white/20 rounded-lg p-6 flex flex-col items-center">
          <FaRegClock className="text-4xl mb-2 text-yellow-300" />
          <h3 className="font-bold text-lg mb-1 text-white">Timely Updates</h3>
          <p className="text-white text-center">Get instant trade signals and support during Indian market hours.</p>
        </div>
        <div className="bg-white/20 rounded-lg p-6 flex flex-col items-center">
          <FaUserCheck className="text-4xl mb-2 text-green-400" />
          <h3 className="font-bold text-lg mb-1 text-white">Trusted by Traders</h3>
          <p className="text-white text-center">Hundreds of option traders rely on our signals for consistent results.</p>
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

export default EvaluationIndexOptions;