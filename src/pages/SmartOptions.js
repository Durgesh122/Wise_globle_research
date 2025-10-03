

import { FaLightbulb, FaBolt, FaLock } from 'react-icons/fa';
import { Trans } from '../i18nShim';
import { Link } from 'react-router-dom';


import { Helmet } from 'react-helmet-async';
const SmartOptions = () => (
  <>
      <Helmet>
        <title>Smart Options - Wise Global Research</title>
        <meta name="description" content="Smart Options page — Wise Global Research." />
        <link rel="canonical" href="https://wiseglobalresearch.com/smartoptions" />
      </Helmet>
<div className="container mx-auto py-12 px-4 max-w-5xl text-white">
    <h1 className="text-4xl font-extrabold mb-4 text-center text-white"><Trans i18nKey="pages.SmartOptions.smart-options">Smart Options</Trans></h1>
    <p className="text-lg mb-6 text-center text-white">
      Smart Options service is specifically designed for option traders trading who want to take advantage of short term stock price movement. Wise Global Research Analyst provides the recommendations to intraday traders to optimize every market movement. We have a team of analysts who are specialized in Tracking F&amp;O market and keep a complete track of all the national and international events and Major Sectors and blend it with technical analysis to predict the market moves.<br/><br/><Trans i18nKey="pages.SmartOptions.our-timely-generated-technical-recommend"><Trans i18nKey="pages.SmartOptions.our-timely-generated-technical-recommend-1">Our timely generated technical recommendations provide adequate time to enter in trades. Our recommendations are supreme blend of Technical and fundamental research.</Trans></Trans></p>

    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-2 text-white"><Trans i18nKey="pages.SmartOptions.smart-options-features">Smart Options Features</Trans></h2>
      <ul className="list-disc pl-6 text-base mb-4 text-white">
        <li><Trans i18nKey="pages.SmartOptions.we-provides-2-3-intraday-stock-recommend"><Trans i18nKey="pages.SmartOptions.we-provides-2-3-intraday-stock-recommend-1">We provides 2-3 Intraday stock recommendation’s (as per market conditions).</Trans></Trans></li>
        <li><Trans i18nKey="pages.SmartOptions.all-recommendation-will-have-2-tgt-with-"><Trans i18nKey="pages.SmartOptions.all-recommendation-will-have-2-tgt-with--1">All recommendation will have 2 TGT with proper Stop loss.</Trans></Trans></li>
        <li><Trans i18nKey="pages.SmartOptions.timely-follow-ups-of-all-the-trade-signa"><Trans i18nKey="pages.SmartOptions.timely-follow-ups-of-all-the-trade-signa-1">Timely Follow Ups of all the trade signals</Trans></Trans></li>
        <li><Trans i18nKey="pages.SmartOptions.proper-time-for-entry-amp-exit-in-recomm"><Trans i18nKey="pages.SmartOptions.proper-time-for-entry-amp-exit-in-recomm-1">Proper time for entry &amp; exit in recommendations.</Trans></Trans></li>
        <li><Trans i18nKey="pages.SmartOptions.nifty-and-bank-nifty-trend-and-support-a"><Trans i18nKey="pages.SmartOptions.nifty-and-bank-nifty-trend-and-support-a-1">Nifty and Bank Nifty Trend and Support and resistance.</Trans></Trans></li>
        <li><Trans i18nKey="pages.SmartOptions.carefully-analysis-market-direction"><Trans i18nKey="pages.SmartOptions.carefully-analysis-market-direction-1">Carefully Analysis Market direction.</Trans></Trans></li>
        <li><Trans i18nKey="pages.SmartOptions.concise-information-of-domestic-amp-worl"><Trans i18nKey="pages.SmartOptions.concise-information-of-domestic-amp-worl-1">Concise information of Domestic &amp; World Market.</Trans></Trans></li>
        
        
      </ul>
    </div>

    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-2 text-white"><Trans i18nKey="pages.SmartOptions.trading-rules-every-trader-must-follow"><Trans i18nKey="pages.SmartOptions.trading-rules-every-trader-must-follow-1">Trading Rules Every Trader Must Follow</Trans></Trans></h2>
      <ul className="list-decimal pl-6 text-base mb-4 text-white">
        <li><Trans i18nKey="pages.SmartOptions.do-not-over-trade">Do not over trade.</Trans></li>
        
        <li><Trans i18nKey="pages.SmartOptions.have-to-trade-on-each-recommendation-wit"><Trans i18nKey="pages.SmartOptions.have-to-trade-on-each-recommendation-wit-1">Have to trade on each Recommendation with same quantity according to Research Team.</Trans></Trans></li>
        <li><Trans i18nKey="pages.SmartOptions.profit-and-loss-is-subject-to-market-ris"><Trans i18nKey="pages.SmartOptions.profit-and-loss-is-subject-to-market-ris-1">Profit and Loss is subject to market risk and there is no guarantee or assurance for it.</Trans></Trans></li>
        <li><Trans i18nKey="pages.SmartOptions.never-be-emotional">Never be emotional.</Trans></li>
        <li><Trans i18nKey="pages.SmartOptions.beware-of-overnight-risk">Beware of overnight risk.</Trans></li>
        <li><Trans i18nKey="pages.SmartOptions.always-trade-with-a-stop-loss"><Trans i18nKey="pages.SmartOptions.always-trade-with-a-stop-loss-1">Always trade with a stop loss.</Trans></Trans></li>
        <li><Trans i18nKey="pages.SmartOptions.don-t-look-back-and-rue-trades"><Trans i18nKey="pages.SmartOptions.don-t-look-back-and-rue-trades-1">Don’t look back and rue trades.</Trans></Trans></li>
        <li><Trans i18nKey="pages.SmartOptions.don-t-over-leverage-in-a-volatile-market"><Trans i18nKey="pages.SmartOptions.don-t-over-leverage-in-a-volatile-market-1">Don’t over leverage in a volatile market.</Trans></Trans></li>
        <li><Trans i18nKey="pages.SmartOptions.costs-matter-a-lot-when-you-are-a-trader"><Trans i18nKey="pages.SmartOptions.costs-matter-a-lot-when-you-are-a-trader-1">Costs matter a lot when you are a trader.</Trans></Trans></li>
        <li><Trans i18nKey="pages.SmartOptions.trading-begins-with-protecting-your-capi"><Trans i18nKey="pages.SmartOptions.trading-begins-with-protecting-your-capi-1">Trading begins with protecting your capital.</Trans></Trans></li>
        <li><Trans i18nKey="pages.SmartOptions.not-doing-anything-is-also-a-trading-str"><Trans i18nKey="pages.SmartOptions.not-doing-anything-is-also-a-trading-str-1">Not doing anything is also a trading strategy.</Trans></Trans></li>
        <li><Trans i18nKey="pages.SmartOptions.profit-is-what-is-booked-all-else-is-boo"><Trans i18nKey="pages.SmartOptions.profit-is-what-is-booked-all-else-is-boo-1">Profit is what is booked; all else is book profits.</Trans></Trans></li>
      </ul>
    </div>

    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-2 text-white"><Trans i18nKey="pages.SmartOptions.sample-calls">Sample Calls</Trans></h2>
  <div className="bg-white/10 rounded-lg p-4 text-left text-base text-white font-mono"><Trans i18nKey="pages.SmartOptions.buy-centuryply-above-512-target-518-524-"><Trans i18nKey="pages.SmartOptions.buy-centuryply-above-512-target-518-524--1">BUY CENTURYPLY ABOVE 512 TARGET 518 524 STOPLOSS 505</Trans></Trans></div>
    </div>

    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-2 text-white"><Trans i18nKey="pages.SmartOptions.pricing-plan-for-smart-options"><Trans i18nKey="pages.SmartOptions.pricing-plan-for-smart-options-1">Pricing Plan For Smart Options</Trans></Trans></h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
        <div className="border rounded-xl p-6 shadow-md bg-white/30 flex flex-col items-center">
          <h3 className="text-xl font-bold mb-2 text-white"><Trans i18nKey="pages.SmartOptions.smart-options">Smart Options</Trans></h3>
          <div className="text-3xl font-extrabold text-white mb-2">₹12,500 <span className="text-base font-normal"><Trans i18nKey="pages.SmartOptions.monthly">/ Monthly</Trans></span></div>
          <div className="mb-2 text-white"><Trans i18nKey="pages.SmartOptions.2-to-3-calls-in-a-day">2 to 3 Calls in a Day</Trans></div>
          <Link to="/payment">
            <button type="button" className="bg-[var(--primary-green)] text-white px-6 py-2 rounded-lg font-semibold mt-2"><Trans i18nKey="pages.SmartOptions.payment">Payment</Trans></button>
          </Link>
          <div className="text-xs text-white mt-2"><Trans i18nKey="pages.SmartOptions.note-pricing-are-excluding-gst-18"><Trans i18nKey="pages.SmartOptions.note-pricing-are-excluding-gst-18-2">Note: Pricing are excluding GST (18%)</Trans></Trans></div>
        </div>
        <div className="border rounded-xl p-6 shadow-md bg-white/30 flex flex-col items-center">
          <h3 className="text-xl font-bold mb-2 text-white"><Trans i18nKey="pages.SmartOptions.smart-options">Smart Options</Trans></h3>
          <div className="text-3xl font-extrabold text-white mb-2">₹35,500 <span className="text-base font-normal"><Trans i18nKey="pages.SmartOptions.quarterly">/ Quarterly</Trans></span></div>
          <div className="mb-2 text-white"><Trans i18nKey="pages.SmartOptions.2-to-3-calls-in-a-day">2 to 3 Calls in a Day</Trans></div>
          <Link to="/payment">
            <button type="button" className="bg-[var(--primary-green)] text-white px-6 py-2 rounded-lg font-semibold mt-2"><Trans i18nKey="pages.SmartOptions.payment">Payment</Trans></button>
          </Link>
          <div className="text-xs text-white mt-2"><Trans i18nKey="pages.SmartOptions.note-pricing-are-excluding-gst-18"><Trans i18nKey="pages.SmartOptions.note-pricing-are-excluding-gst-18-1">Note: Pricing are excluding GST (18%)</Trans></Trans></div>
        </div>
      </div>
    </div>

    

    {/* Why Choose Us Section */}
    <div className="my-12">
      <h2 className="text-2xl font-bold mb-4 text-center text-white"><Trans i18nKey="pages.SmartOptions.why-choose-smart-options">Why Choose Smart Options?</Trans></h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/20 rounded-lg p-6 flex flex-col items-center">
          <FaLightbulb className="text-4xl mb-2 text-yellow-300" />
          <h3 className="font-bold text-lg mb-1 text-white"><Trans i18nKey="pages.SmartOptions.expert-research">Expert Research</Trans></h3>
          <p className="text-white text-center"><Trans i18nKey="pages.SmartOptions.our-team-combines-technical-and-fundamen"><Trans i18nKey="pages.SmartOptions.our-team-combines-technical-and-fundamen-1">Our team combines technical and fundamental analysis for the most reliable recommendations.</Trans></Trans></p>
        </div>
        <div className="bg-white/20 rounded-lg p-6 flex flex-col items-center">
          <FaBolt className="text-4xl mb-2 text-blue-300" />
          <h3 className="font-bold text-lg mb-1 text-white"><Trans i18nKey="pages.SmartOptions.real-time-support">Real-Time Support</Trans></h3>
          <p className="text-white text-center"><Trans i18nKey="pages.SmartOptions.get-instant-help-and-trade-updates-from-"><Trans i18nKey="pages.SmartOptions.get-instant-help-and-trade-updates-from--1">Get instant help and trade updates during Indian market hours.</Trans></Trans></p>
        </div>
        <div className="bg-white/20 rounded-lg p-6 flex flex-col items-center">
          <FaLock className="text-4xl mb-2 text-green-300" />
          <h3 className="font-bold text-lg mb-1 text-white"><Trans i18nKey="pages.SmartOptions.trusted-by-traders">Trusted by Traders</Trans></h3>
          <p className="text-white text-center"><Trans i18nKey="pages.SmartOptions.hundreds-of-options-traders-rely-on-our-"><Trans i18nKey="pages.SmartOptions.hundreds-of-options-traders-rely-on-our--1">Hundreds of options traders rely on our signals for consistent results.</Trans></Trans></p>
        </div>
      </div>
    </div>

    {/* FAQ Section */}
    <div className="my-12">
      <h2 className="text-2xl font-bold mb-4 text-center text-white"><Trans i18nKey="pages.SmartOptions.frequently-asked-questions"><Trans i18nKey="pages.SmartOptions.frequently-asked-questions-1">Frequently Asked Questions</Trans></Trans></h2>
      <div className="max-w-3xl mx-auto">
        <div className="mb-4">
          <h3 className="font-semibold text-white"><Trans i18nKey="pages.SmartOptions.q-how-will-i-receive-the-recommendations"><Trans i18nKey="pages.SmartOptions.q-how-will-i-receive-the-recommendations-1">Q: How will I receive the recommendations?</Trans></Trans></h3>
          <p className="text-white">A: Recommendations are delivered via SMS on your registered contact channel.</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-white"><Trans i18nKey="pages.SmartOptions.q-can-i-get-support-if-i-have-questions"><Trans i18nKey="pages.SmartOptions.q-can-i-get-support-if-i-have-questions-1">Q: Can I get support if I have questions?</Trans></Trans></h3>
          <p className="text-white">A: Our support team is available during Indian market hours.</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-white"><Trans i18nKey="pages.SmartOptions.q-is-there-a-refund-policy"><Trans i18nKey="pages.SmartOptions.q-is-there-a-refund-policy-1">Q: Is there a refund policy?</Trans></Trans></h3>
          <p className="text-white"><Trans i18nKey="pages.SmartOptions.a-please-refer-to-our-terms-and-conditio"><Trans i18nKey="pages.SmartOptions.a-please-refer-to-our-terms-and-conditio-1">A: Please refer to our terms and conditions or contact support for refund-related queries.</Trans></Trans></p>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <Link to="/contact">
          <button type="button" className="bg-[var(--primary-green)] text-white px-8 py-3 rounded-lg font-bold text-lg shadow hover:bg-green-700 transition">Enquiry Now</button>
        </Link>
      </div>
    </div>
  </div>
  </>
);

export default SmartOptions;
