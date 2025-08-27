
import { FaLightbulb, FaBolt, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const UniversalCash = () => (
  <div className="container mx-auto py-12 px-4 max-w-5xl text-white">
  <h1 className="text-4xl font-extrabold mb-4 text-center text-white">Universal Cash</h1>
    <p className="text-lg mb-6 text-center text-white">
      Universal Cash provides cash-segment recommendations (intraday / BTST / positional) for the NSE stock market with clear targets and stop‑loss levels. This pack is designed for traders focused on the cash segment who prefer a small number of high‑quality, research-backed trades. Our experienced research team provides in-depth technical and fundamental analysis and shares recommendations via your registered contact channel.
    </p>

    <div className="mb-8">
  <h2 className="text-2xl font-bold mb-2 text-white">Infinity Club Features</h2>
    <ul className="list-disc pl-6 text-base mb-4 text-white">
  <li>We provide 2–3 intraday/positional recommendations per day (subject to market conditions).</li>
  <li>All recommendations include two targets and a clear stop‑loss.</li>
  <li>Timely follow-ups for all trade signals.</li>
  <li>Precise entry and exit timing for recommendations.</li>
  <li>NIFTY and Bank NIFTY trend analysis with support and resistance levels.</li>
  <li>Careful analysis of market direction.</li>
  <li>Concise domestic and global market updates.</li>
  
  
    </ul>
  <p className="text-base mb-2 text-white">Trading rules that every trader must studiously follow.</p>
    </div>

    <div className="mb-8">
  <h2 className="text-2xl font-bold mb-2 text-white">Trading Rules Every Trader Must Follow</h2>
  <ul className="list-decimal pl-6 text-base mb-4 text-white">
  <li>Do not overtrade.</li>
  <li>Trade each recommendation with the same quantity as advised by the Research Team.</li>
  <li>Profit and loss are subject to market risk; there is no guarantee.</li>
  <li>Do not trade emotionally.</li>
  <li>Be mindful of overnight risk.</li>
  <li>Always use a stop‑loss.</li>
  <li>Don't revisit closed trades to regret them.</li>
  <li>Avoid over‑leveraging in volatile markets.</li>
  <li>Minimize costs; they materially affect trading returns.</li>
  <li>Protect your capital first.</li>
  <li>Sometimes the best action is to do nothing.</li>
  <li>Only booked profits count; unrealized gains are not realized until closed.</li>
    </ul>
    </div>

    <div className="mb-8">
  <h2 className="text-2xl font-bold mb-2 text-white">Sample Calls</h2>
  <div className="bg-white/10 rounded-lg p-4 text-center text-base text-white font-mono">BUY ANGELONE 2300 CE ABOVE 65 TARGET 75 90 STOPLOSS 50</div>
    </div>

    <div className="mb-8">
  <h2 className="text-2xl font-bold mb-4 text-white text-center">Pricing Plan For Universal Cash</h2>
      <div className="flex justify-center mb-4">
        <div className="border rounded-xl p-6 shadow-md bg-white/30 flex flex-col items-center w-full max-w-md mx-auto">
          <h3 className="text-xl font-bold mb-2 text-white">Universal Cash</h3>
          <div className="text-3xl font-extrabold text-white mb-2">₹1,51,000 <span className="text-base font-normal">/ Quarterly</span></div>
          <div className="mb-2 text-white">2 to 3 Calls in a Day</div>
          <Link to="/payment" className="w-full">
            <button className="w-full bg-[var(--primary-green)] text-white px-6 py-2 rounded-lg font-semibold mt-2">Payment</button>
          </Link>
          <div className="text-xs text-white mt-2">Note: Pricing excludes GST (18%)</div>
        </div>
      </div>
    </div>

    

    {/* Why Choose Us Section */}
    <div className="my-12">
  <h2 className="text-2xl font-bold mb-4 text-center text-white">Why Choose Universal Cash?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/20 rounded-lg p-6 flex flex-col items-center">
          <FaLightbulb className="text-4xl mb-2 text-yellow-300" />
          <h3 className="font-bold text-lg mb-1 text-white">Expert Research</h3>
          <p className="text-white text-center">Our team combines technical and fundamental analysis for the most reliable recommendations.</p>
        </div>
        <div className="bg-white/20 rounded-lg p-6 flex flex-col items-center">
          <FaBolt className="text-4xl mb-2 text-blue-300" />
          <h3 className="font-bold text-lg mb-1 text-white">Real-Time Support</h3>
          <p className="text-white text-center">Get help and trade updates during Indian market hours.</p>
        </div>
        <div className="bg-white/20 rounded-lg p-6 flex flex-col items-center">
          <FaLock className="text-4xl mb-2 text-green-300" />
          <h3 className="font-bold text-lg mb-1 text-white">Trusted by Traders</h3>
          <p className="text-white text-center">Hundreds of cash segment traders rely on our signals for consistent results.</p>
        </div>
      </div>
    </div>

    {/* FAQ Section */}
    <div className="my-12">
  <h2 className="text-2xl font-bold mb-4 text-center text-white">Frequently Asked Questions</h2>
      <div className="max-w-3xl mx-auto">
        <div className="mb-4">
          <h3 className="font-semibold text-white">Q: How will I receive the recommendations?</h3>
          <p className="text-white">A: Recommendations are shared via your registered contact channel.</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-white">Q: Can I get support if I have questions?</h3>
          <p className="text-white">A: Yes, support is available during Indian market hours for any queries.</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-white">Q: Is there a refund policy?</h3>
          <p className="text-white">A: Please refer to our terms and conditions or contact support for refund-related queries.</p>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <Link to="/contact">
          <button className="bg-[var(--primary-green)] text-white px-8 py-3 rounded-lg font-bold text-lg shadow hover:bg-green-700 transition">Enquiry Now</button>
        </Link>
      </div>
    </div>
  </div>
);

export default UniversalCash;