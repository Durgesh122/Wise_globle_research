import { FaLightbulb, FaBolt, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SmartIndexOption = () => (
  <div className="container mx-auto py-12 px-4 max-w-5xl text-white">
    <h1 className="text-4xl font-extrabold mb-4 text-center text-white">Smart Index Option</h1>
    <p className="text-lg mb-6 text-center text-white">
      Smart Index Option service is specifically designed for option traders trading with precise technical research recommendation for Index Options. We provide the recommendations to intraday traders to optimize every market movement. It offers you nearly 1-2 intraday recommendations in a day as per market conditions with good market opportunity. The recommendations are given in Nifty and Bank Nifty Options only. Our timely generated technical recommendations provide adequate time to enter and exit in trades. We have a team of analysts who are specialized in Tracking the F&O market and keep a complete track of all the national and international events and Major Sectors and blend it with technical analysis to predict the market moves. If you are looking for Index Options research/recommendation and do not want to invest much of times then this pack are perfect for you.
    </p>

    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-2 text-white">Smart Index Option Features</h2>
      <ul className="list-disc pl-6 text-base mb-4 text-white">
        <li>We provides 1-2 Intraday/Positional recommendation’s (as per market conditions)</li>
        <li>All recommendation will have 2 TGT with proper Stop loss.</li>
        <li>Timely Follow Ups of all the trade signals</li>
        <li>Proper time for entry &amp; exit in recommendations.</li>
        <li>Nifty and Bank Nifty Trend and Support and resistance.</li>
        <li>Carefully Analysis Market direction.</li>
        <li>Concise information of Domestic &amp; World Market.</li>
        <li>Recommendations are provided through SMS.</li>
        <li>Swift real time customer support between (09:00 AM to 06:00 PM).</li>
      </ul>
      <p className="text-base mb-2 text-white">Trading rules that every trader must studious follow.</p>
    </div>

    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-2 text-white">Trading Rules Every Trader Must Follow</h2>
      <ul className="list-decimal pl-6 text-base mb-4 text-white">
        <li>Do not over trade.</li>
        <li>Only follow SMS research recommendations.</li>
        <li>Have to trade on each Recommendation with same quantity according to Research Team.</li>
        <li>Profit and Loss is subject to market risk and there is no guarantee or assurance for it.</li>
        <li>Never be emotional.</li>
        <li>Beware of overnight risk.</li>
        <li>Always trade with a stop loss.</li>
        <li>Don’t look back and rue trades.</li>
        <li>Don’t over leverage in a volatile market.</li>
        <li>Costs matter a lot when you are a trader.</li>
        <li>Trading begins with protecting your capital.</li>
        <li>Not doing anything is also a trading strategy.</li>
        <li>Profit is what is booked; all else is book profits.</li>
      </ul>
    </div>

    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-2 text-white">Sample Calls</h2>
      <div className="bg-white/10 rounded-lg p-4 text-center text-base text-white font-mono">
        BUY BANKNIFTY 40700 CE ABOVE 360 TARGET 420 480 STOPLOSS 285
      </div>
    </div>

    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-2 text-white">Pricing Plan For Smart Index Option</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
        <div className="border rounded-xl p-6 shadow-md bg-white/30 flex flex-col items-center">
          <h3 className="text-xl font-bold mb-2 text-white">Smart Index Option</h3>
          <div className="text-3xl font-extrabold text-white mb-2">₹12,500 <span className="text-base font-normal">/ Monthly</span></div>
          <div className="mb-2 text-white">1 to 2 Calls in a Day</div>
          <Link to="/payment">
            <button className="bg-[var(--primary-green)] text-white px-6 py-2 rounded-lg font-semibold mt-2">Payment</button>
          </Link>
          <div className="text-xs text-white mt-2">Note: Pricing are excluding GST (18%)</div>
        </div>
        <div className="border rounded-xl p-6 shadow-md bg-white/30 flex flex-col items-center">
          <h3 className="text-xl font-bold mb-2 text-white">Smart Index Option</h3>
          <div className="text-3xl font-extrabold text-white mb-2">₹35,500 <span className="text-base font-normal">/ Quarterly</span></div>
          <div className="mb-2 text-white">1 to 2 Calls in a Day</div>
          <Link to="/payment">
            <button className="bg-[var(--primary-green)] text-white px-6 py-2 rounded-lg font-semibold mt-2">Payment</button>
          </Link>
          <div className="text-xs text-white mt-2">Note: Pricing are excluding GST (18%)</div>
        </div>
      </div>
    </div>

    <div className="text-center text-sm text-white mt-8">
      <strong>Swift real-time customer support:</strong> 09:00 AM to 06:00 PM | <strong>All recommendations are provided through SMS.</strong>
    </div>

    {/* Why Choose Us Section */}
    <div className="my-12">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Why Choose Smart Index Option?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/20 rounded-lg p-6 flex flex-col items-center">
          <FaLightbulb className="text-4xl mb-2 text-yellow-300" />
          <h3 className="font-bold text-lg mb-1 text-white">Expert Research</h3>
          <p className="text-white text-center">Our analysts specialize in F&O market and combine technical & fundamental analysis for precise index option recommendations.</p>
        </div>
        <div className="bg-white/20 rounded-lg p-6 flex flex-col items-center">
          <FaBolt className="text-4xl mb-2 text-blue-300" />
          <h3 className="font-bold text-lg mb-1 text-white">Timely Calls</h3>
          <p className="text-white text-center">Receive 1-2 intraday/positional calls per day with clear entry, targets and stop loss.</p>
        </div>
        <div className="bg-white/20 rounded-lg p-6 flex flex-col items-center">
          <FaLock className="text-4xl mb-2 text-green-300" />
          <h3 className="font-bold text-lg mb-1 text-white">Trusted Support</h3>
          <p className="text-white text-center">Swift real time customer support between 09:00 AM to 06:00 PM for any queries.</p>
        </div>
      </div>
    </div>

    {/* FAQ Section */}
    <div className="my-12">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Frequently Asked Questions</h2>
      <div className="max-w-3xl mx-auto">
        <div className="mb-4">
          <h3 className="font-semibold text-white">Q: Which symbols do you cover?</h3>
          <p className="text-white">A: We cover Nifty and Bank Nifty options only for this pack.</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-white">Q: How will I receive the recommendations?</h3>
          <p className="text-white">A: All recommendations are sent via SMS to your registered mobile number.</p>
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

export default SmartIndexOption;