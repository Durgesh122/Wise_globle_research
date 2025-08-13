
import { FaLightbulb, FaBolt, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ImpulseIndexOptions = () => (
  <div className="container mx-auto py-12 px-4 max-w-5xl text-white">
    <h1 className="text-4xl font-extrabold mb-4 text-center text-white">Impulse Index Options</h1>
    <p className="text-lg mb-6 text-center text-white">
      Impulse Index Options focuses on high-volatility index trading, capitalizing on rapid index movements. Our expert team provides intraday and positional recommendations in index options, with a focus on timely entry and exit, proper targets, and stop loss. The service is designed for traders who want to benefit from sharp index moves with research-backed signals and disciplined risk management.
    </p>

    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-2 text-white">What You Will Get</h2>
      <ul className="list-disc pl-6 text-base mb-4 text-white">
        <li>2-3 Intraday/Positional index option recommendations per day (as per market conditions)</li>
        <li>Each recommendation includes 2 targets and a proper stop loss</li>
        <li>Timely follow-ups on all trade signals</li>
        <li>Clear entry and exit timing in recommendations</li>
        <li>Careful analysis of market direction and volatility</li>
        <li>Concise information on Nifty, Bank Nifty, and global indices</li>
        <li>Recommendations delivered via SMS</li>
        <li>Swift real-time customer support (09:00 AM to 06:00 PM)</li>
      </ul>
      <p className="text-base mb-2 text-white">Trading rules that every trader must studious follow.</p>
    </div>

    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-2 text-white">Trading Rules Every Trader Must Follow</h2>
      <ul className="list-decimal pl-6 text-base mb-4 text-white">
        <li>Do not over trade.</li>
        <li>Only follow SMS research recommendations.</li>
        <li>Trade each recommendation with the same quantity as advised.</li>
        <li>Profit and loss are subject to market risk; no guarantee or assurance.</li>
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
        BUY NIFTY 22500 CE ABOVE 120 TARGET 135 150 STOPLOSS 105
      </div>
    </div>

    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-2 text-white">Pricing Plan For Impulse Index Options</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
        <div className="border rounded-xl p-6 shadow-md bg-white/30 flex flex-col items-center">
          <h3 className="text-xl font-bold mb-2 text-white">Impulse Index Options</h3>
          <div className="text-3xl font-extrabold text-white mb-2">₹12,500 <span className="text-base font-normal">/ Monthly</span></div>
          <div className="mb-2 text-white">2 to 3 Calls in a Day</div>
          <Link to="/payment">
            <button className="bg-[var(--primary-green)] text-white px-6 py-2 rounded-lg font-semibold mt-2">Payment</button>
          </Link>
          <div className="text-xs text-white mt-2">Note: Pricing are excluding GST (18%)</div>
        </div>
        <div className="border rounded-xl p-6 shadow-md bg-white/30 flex flex-col items-center">
          <h3 className="text-xl font-bold mb-2 text-white">Impulse Index Options</h3>
          <div className="text-3xl font-extrabold text-white mb-2">₹35,500 <span className="text-base font-normal">/ Quarterly</span></div>
          <div className="mb-2 text-white">2 to 3 Calls in a Day</div>
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
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Why Choose Impulse Index Options?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/20 rounded-lg p-6 flex flex-col items-center">
          <FaLightbulb className="text-4xl mb-2 text-yellow-300" />
          <h3 className="font-bold text-lg mb-1 text-white">Expert Research</h3>
          <p className="text-white text-center">Our team combines technical and fundamental analysis for the most reliable recommendations.</p>
        </div>
        <div className="bg-white/20 rounded-lg p-6 flex flex-col items-center">
          <FaBolt className="text-4xl mb-2 text-blue-300" />
          <h3 className="font-bold text-lg mb-1 text-white">Real-Time Support</h3>
          <p className="text-white text-center">Get instant help and trade updates from 9:00 AM to 6:00 PM, Monday to Friday.</p>
        </div>
        <div className="bg-white/20 rounded-lg p-6 flex flex-col items-center">
          <FaLock className="text-4xl mb-2 text-green-300" />
          <h3 className="font-bold text-lg mb-1 text-white">Trusted by Traders</h3>
          <p className="text-white text-center">Hundreds of index options traders rely on our signals for consistent results.</p>
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

export default ImpulseIndexOptions;
