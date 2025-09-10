
import { FaLightbulb, FaBolt, FaLock } from 'react-icons/fa';
import { Trans } from '../i18nShim';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Cash = () => (
  <div className="container mx-auto py-12 px-4 max-w-5xl text-white">
      <Helmet>
        <title>Cash Recommendations — Wise Global</title>
        <meta name="description" content="Cash-segment recommendations and trading rules for NSE stocks. Research-backed intraday and positional calls." />
        <link rel="canonical" href="https://wiseglobalresearch.com/cash" />
      </Helmet>
    <h1 className="text-4xl font-extrabold mb-4 text-center text-white"><Trans i18nKey="pages.Cash.cash">Cash</Trans></h1>
    <p className="text-lg mb-6 text-center text-white">
      Wise Global Research Analyst provides Equity research in the NSE cash segment by dedicated and experienced Research Analysts after in-depth technical analysis to our client. Our Equity trading research are produced with a high level of accuracy. We believe in such kind of volatile market our customers should only focus on intraday recommendations and should not carry forward any position for the next day. Stock cash is designed and destined to deliver returns that you deserve. It offers you nearly 2 to 3 intraday recommendations with a good level of accuracy. The recommendations are given in script traded on NSE. Our timely generated technical recommendations provide adequate time to enter in trades. Our recommendations are supreme blend of Technical and fundamental research. A pure intraday product, where customer receives stock recommendations in NSE cash segment.
    </p>

    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-2 text-white"><Trans i18nKey="pages.Cash.what-you-will-get">What You Will Get</Trans></h2>
      <ul className="list-disc pl-6 text-base mb-4 text-white">
        <li><Trans i18nKey="pages.Cash.daily-pure-intraday-stock-recommendation"><Trans i18nKey="pages.Cash.daily-pure-intraday-stock-recommendation-1">Daily pure intraday stock recommendation’s frequency is limited to 2 to 3 (as per market conditions)</Trans></Trans></li>
        <li><Trans i18nKey="pages.Cash.all-recommendation-will-have-2-tgt-with-"><Trans i18nKey="pages.Cash.all-recommendation-will-have-2-tgt-with--1">All recommendation will have 2 TGT with proper Stop loss.</Trans></Trans></li>
        <li><Trans i18nKey="pages.Cash.timely-follow-ups-of-all-the-trade-signa"><Trans i18nKey="pages.Cash.timely-follow-ups-of-all-the-trade-signa-1">Timely Follow Ups of all the trade signals</Trans></Trans></li>
        <li><Trans i18nKey="pages.Cash.proper-time-for-entry-amp-exit-in-recomm"><Trans i18nKey="pages.Cash.proper-time-for-entry-amp-exit-in-recomm-1">Proper time for entry &amp; exit in recommendations.</Trans></Trans></li>
        <li><Trans i18nKey="pages.Cash.carefully-analysis-market-direction"><Trans i18nKey="pages.Cash.carefully-analysis-market-direction-1">Carefully Analysis Market direction.</Trans></Trans></li>
        
        
      </ul>
      <p className="text-base mb-2 text-white"><Trans i18nKey="pages.Cash.trading-rules-that-every-trader-must-stu"><Trans i18nKey="pages.Cash.trading-rules-that-every-trader-must-stu-1">Trading rules that every trader must studious follow.</Trans></Trans></p>
    </div>

    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-2 text-white"><Trans i18nKey="pages.Cash.trading-rules-every-trader-must-follow"><Trans i18nKey="pages.Cash.trading-rules-every-trader-must-follow-1">Trading Rules Every Trader Must Follow</Trans></Trans></h2>
      <ul className="list-decimal pl-6 text-base mb-4 text-white">
        <li><Trans i18nKey="pages.Cash.do-not-over-trade">Do not over trade.</Trans></li>
        
        <li><Trans i18nKey="pages.Cash.have-to-trade-on-each-recommendation-wit"><Trans i18nKey="pages.Cash.have-to-trade-on-each-recommendation-wit-1">Have to trade on each Recommendation with same quantity according to Research Team.</Trans></Trans></li>
        <li><Trans i18nKey="pages.Cash.profit-and-loss-is-subject-to-market-ris"><Trans i18nKey="pages.Cash.profit-and-loss-is-subject-to-market-ris-1">Profit and Loss is subject to market risk and there is no guarantee or assurance for it.</Trans></Trans></li>
        <li><Trans i18nKey="pages.Cash.never-be-emotional">Never be emotional.</Trans></li>
        <li><Trans i18nKey="pages.Cash.beware-of-overnight-risk">Beware of overnight risk.</Trans></li>
        <li><Trans i18nKey="pages.Cash.always-trade-with-a-stop-loss">Always trade with a stop loss.</Trans></li>
        <li><Trans i18nKey="pages.Cash.don-t-look-back-and-rue-trades">Don’t look back and rue trades.</Trans></li>
        <li><Trans i18nKey="pages.Cash.don-t-over-leverage-in-a-volatile-market"><Trans i18nKey="pages.Cash.don-t-over-leverage-in-a-volatile-market-1">Don’t over leverage in a volatile market.</Trans></Trans></li>
        <li><Trans i18nKey="pages.Cash.costs-matter-a-lot-when-you-are-a-trader"><Trans i18nKey="pages.Cash.costs-matter-a-lot-when-you-are-a-trader-1">Costs matter a lot when you are a trader.</Trans></Trans></li>
        <li><Trans i18nKey="pages.Cash.trading-begins-with-protecting-your-capi"><Trans i18nKey="pages.Cash.trading-begins-with-protecting-your-capi-1">Trading begins with protecting your capital.</Trans></Trans></li>
        <li><Trans i18nKey="pages.Cash.not-doing-anything-is-also-a-trading-str"><Trans i18nKey="pages.Cash.not-doing-anything-is-also-a-trading-str-1">Not doing anything is also a trading strategy.</Trans></Trans></li>
        <li><Trans i18nKey="pages.Cash.profit-is-what-is-booked-all-else-is-boo"><Trans i18nKey="pages.Cash.profit-is-what-is-booked-all-else-is-boo-1">Profit is what is booked; all else is book profits.</Trans></Trans></li>
      </ul>
    </div>

    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-2 text-white"><Trans i18nKey="pages.Cash.sample-calls">Sample Calls</Trans></h2>
      <div className="bg-white/10 rounded-lg p-4 text-center text-base text-white font-mono"><Trans i18nKey="pages.Cash.buy-centuryply-above-512-target-518-524-"><Trans i18nKey="pages.Cash.buy-centuryply-above-512-target-518-524--1">BUY CENTURYPLY ABOVE 512 TARGET 518 524 STOPLOSS 505</Trans></Trans></div>
    </div>

    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-2 text-white"><Trans i18nKey="pages.Cash.pricing-plan-for-cash">Pricing Plan For Cash</Trans></h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
        <div className="border rounded-xl p-6 shadow-md bg-white/30 flex flex-col items-center">
          <h3 className="text-xl font-bold mb-2 text-white"><Trans i18nKey="pages.Cash.cash">Cash</Trans></h3>
          <div className="text-3xl font-extrabold text-white mb-2">₹12,500 <span className="text-base font-normal"><Trans i18nKey="pages.Cash.monthly">/ Monthly</Trans></span></div>
          <div className="mb-2 text-white"><Trans i18nKey="pages.Cash.2-to-3-calls-in-a-day">2 to 3 Calls in a Day</Trans></div>
          <Link to="/payment">
            <button className="bg-[var(--primary-green)] text-white px-6 py-2 rounded-lg font-semibold mt-2"><Trans i18nKey="pages.Cash.payment">Payment</Trans></button>
          </Link>
          <div className="text-xs text-white mt-2"><Trans i18nKey="pages.Cash.note-pricing-are-excluding-gst-18"><Trans i18nKey="pages.Cash.note-pricing-are-excluding-gst-18-2">Note: Pricing are excluding GST (18%)</Trans></Trans></div>
        </div>
        <div className="border rounded-xl p-6 shadow-md bg-white/30 flex flex-col items-center">
          <h3 className="text-xl font-bold mb-2 text-white"><Trans i18nKey="pages.Cash.cash">Cash</Trans></h3>
          <div className="text-3xl font-extrabold text-white mb-2">₹35,500 <span className="text-base font-normal"><Trans i18nKey="pages.Cash.quarterly">/ Quarterly</Trans></span></div>
          <div className="mb-2 text-white"><Trans i18nKey="pages.Cash.2-to-3-calls-in-a-day">2 to 3 Calls in a Day</Trans></div>
          <Link to="/payment">
            <button className="bg-[var(--primary-green)] text-white px-6 py-2 rounded-lg font-semibold mt-2"><Trans i18nKey="pages.Cash.payment">Payment</Trans></button>
          </Link>
          <div className="text-xs text-white mt-2"><Trans i18nKey="pages.Cash.note-pricing-are-excluding-gst-18"><Trans i18nKey="pages.Cash.note-pricing-are-excluding-gst-18-1">Note: Pricing are excluding GST (18%)</Trans></Trans></div>
        </div>
      </div>
    </div>

  {/* Removed explicit SMS/support-hours footer per policy */}

    {/* Why Choose Us Section */}
    <div className="my-12">
      <h2 className="text-2xl font-bold mb-4 text-center text-white"><Trans i18nKey="pages.Cash.why-choose-cash">Why Choose Cash?</Trans></h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/20 rounded-lg p-6 flex flex-col items-center">
          <FaLightbulb className="text-4xl mb-2 text-yellow-300" />
          <h3 className="font-bold text-lg mb-1 text-white"><Trans i18nKey="pages.Cash.expert-research">Expert Research</Trans></h3>
          <p className="text-white text-center"><Trans i18nKey="pages.Cash.our-team-combines-technical-and-fundamen"><Trans i18nKey="pages.Cash.our-team-combines-technical-and-fundamen-1">Our team combines technical and fundamental analysis for the most reliable recommendations.</Trans></Trans></p>
        </div>
        <div className="bg-white/20 rounded-lg p-6 flex flex-col items-center">
          <FaBolt className="text-4xl mb-2 text-blue-300" />
          <h3 className="font-bold text-lg mb-1 text-white"><Trans i18nKey="pages.Cash.real-time-support">Real-Time Support</Trans></h3>
          <p className="text-white text-center"><Trans i18nKey="pages.Cash.get-instant-help-and-trade-updates-from-"><Trans i18nKey="pages.Cash.get-instant-help-and-trade-updates-from--1">Get instant help and trade updates during Indian market hours.</Trans></Trans></p>
        </div>
        <div className="bg-white/20 rounded-lg p-6 flex flex-col items-center">
          <FaLock className="text-4xl mb-2 text-green-300" />
          <h3 className="font-bold text-lg mb-1 text-white"><Trans i18nKey="pages.Cash.trusted-by-traders">Trusted by Traders</Trans></h3>
          <p className="text-white text-center"><Trans i18nKey="pages.Cash.hundreds-of-cash-segment-traders-rely-on"><Trans i18nKey="pages.Cash.hundreds-of-cash-segment-traders-rely-on-1">Hundreds of cash segment traders rely on our signals for consistent results.</Trans></Trans></p>
        </div>
      </div>
    </div>

    {/* FAQ Section */}
    <div className="my-12">
      <h2 className="text-2xl font-bold mb-4 text-center text-white"><Trans i18nKey="pages.Cash.frequently-asked-questions">Frequently Asked Questions</Trans></h2>
      <div className="max-w-3xl mx-auto">
        <div className="mb-4">
          <h3 className="font-semibold text-white"><Trans i18nKey="pages.Cash.q-how-will-i-receive-the-recommendations"><Trans i18nKey="pages.Cash.q-how-will-i-receive-the-recommendations-1">Q: How will I receive the recommendations?</Trans></Trans></h3>
          <p className="text-white">A: Recommendations are delivered via your registered contact channel.</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-white"><Trans i18nKey="pages.Cash.q-can-i-get-support-if-i-have-questions"><Trans i18nKey="pages.Cash.q-can-i-get-support-if-i-have-questions-1">Q: Can I get support if I have questions?</Trans></Trans></h3>
          <p className="text-white">A: Our support team is available during Indian market hours.</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-white"><Trans i18nKey="pages.Cash.q-is-there-a-refund-policy">Q: Is there a refund policy?</Trans></h3>
          <p className="text-white"><Trans i18nKey="pages.Cash.a-please-refer-to-our-terms-and-conditio"><Trans i18nKey="pages.Cash.a-please-refer-to-our-terms-and-conditio-1">A: Please refer to our terms and conditions or contact support for refund-related queries.</Trans></Trans></p>
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

export default Cash;