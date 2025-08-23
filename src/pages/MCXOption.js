
import React from 'react';
import { Trans } from '../i18nShim';
import { FaLightbulb, FaBolt, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const MCXOption = () => (
  <div className="container mx-auto py-12 px-4 max-w-5xl text-white">
    <h1 className="text-4xl font-extrabold mb-4 text-center text-white"><Trans i18nKey="pages.MCXOption.mcx-options">MCX Options</Trans></h1>
    <p className="text-lg mb-6 text-center text-white">
      MCX Options service is crafted for traders seeking actionable and timely options trading recommendations on MCX commodities. Our expert team blends technical and fundamental research to deliver 1-2 intraday or positional options calls daily in Bullions, Base Metals, and Energy. Each recommendation is delivered with clear entry, exit, targets, and stop loss, ensuring you have the edge in the options market.
    </p>

    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-2 text-white"><Trans i18nKey="pages.MCXOption.what-we-offer">What We Offer</Trans></h2>
      <ul className="list-disc pl-6 text-base mb-4 text-white">
        <li><Trans i18nKey="pages.MCXOption.1-2-intraday-positional-options-recommen"><Trans i18nKey="pages.MCXOption.1-2-intraday-positional-options-recommen-1">1-2 Intraday/Positional options recommendations in Bullions, Base Metals, and Energy (as per market conditions).</Trans></Trans></li>
        <li><Trans i18nKey="pages.MCXOption.each-recommendation-includes-2-targets-a"><Trans i18nKey="pages.MCXOption.each-recommendation-includes-2-targets-a-1">Each recommendation includes 2 targets and a proper stop loss.</Trans></Trans></li>
        <li><Trans i18nKey="pages.MCXOption.timely-follow-ups-and-updates-on-all-tra"><Trans i18nKey="pages.MCXOption.timely-follow-ups-and-updates-on-all-tra-1">Timely follow-ups and updates on all trade signals.</Trans></Trans></li>
        <li><Trans i18nKey="pages.MCXOption.clear-entry-and-exit-timings-for-every-r"><Trans i18nKey="pages.MCXOption.clear-entry-and-exit-timings-for-every-r-1">Clear entry and exit timings for every recommendation.</Trans></Trans></li>
        <li><Trans i18nKey="pages.MCXOption.comprehensive-analysis-of-market-directi"><Trans i18nKey="pages.MCXOption.comprehensive-analysis-of-market-directi-1">Comprehensive analysis of market direction and concise domestic & world market information.</Trans></Trans></li>
        <li><Trans i18nKey="pages.MCXOption.recommendations-delivered-via-sms-for-in"><Trans i18nKey="pages.MCXOption.recommendations-delivered-via-sms-for-in-1">Recommendations delivered via SMS for instant action.</Trans></Trans></li>
        <li><Trans i18nKey="pages.MCXOption.swift-real-time-customer-support-09-00-a"><Trans i18nKey="pages.MCXOption.swift-real-time-customer-support-09-00-a-1">Swift, real-time customer support (09:00 AM to 06:00 PM).</Trans></Trans></li>
      </ul>
      <p className="text-base mb-2 text-white"><Trans i18nKey="pages.MCXOption.mcx-options-services-are-ideal-for-trade"><Trans i18nKey="pages.MCXOption.mcx-options-services-are-ideal-for-trade-1">MCX Options Services are ideal for traders who want detailed technical and fundamental market analysis for options trading in one pack.</Trans></Trans></p>
    </div>

    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-2 text-white"><Trans i18nKey="pages.MCXOption.trading-rules-every-options-trader-must-"><Trans i18nKey="pages.MCXOption.trading-rules-every-options-trader-must--1">Trading Rules Every Options Trader Must Follow</Trans></Trans></h2>
      <ul className="list-decimal pl-6 text-base mb-4 text-white">
        <li><Trans i18nKey="pages.MCXOption.do-not-over-trade">Do not over trade.</Trans></li>
        <li><Trans i18nKey="pages.MCXOption.only-follow-sms-research-recommendations"><Trans i18nKey="pages.MCXOption.only-follow-sms-research-recommendations-1">Only follow SMS research recommendations.</Trans></Trans></li>
        <li><Trans i18nKey="pages.MCXOption.trade-each-recommendation-with-the-same-"><Trans i18nKey="pages.MCXOption.trade-each-recommendation-with-the-same--1">Trade each recommendation with the same quantity as advised by the Research Team.</Trans></Trans></li>
        <li><Trans i18nKey="pages.MCXOption.profit-and-loss-are-subject-to-market-ri"><Trans i18nKey="pages.MCXOption.profit-and-loss-are-subject-to-market-ri-1">Profit and loss are subject to market risk; there is no guarantee or assurance.</Trans></Trans></li>
        <li><Trans i18nKey="pages.MCXOption.never-be-emotional-while-trading"><Trans i18nKey="pages.MCXOption.never-be-emotional-while-trading-1">Never be emotional while trading.</Trans></Trans></li>
        <li><Trans i18nKey="pages.MCXOption.beware-of-overnight-risk">Beware of overnight risk.</Trans></li>
        <li><Trans i18nKey="pages.MCXOption.always-trade-with-a-stop-loss"><Trans i18nKey="pages.MCXOption.always-trade-with-a-stop-loss-1">Always trade with a stop loss.</Trans></Trans></li>
        <li><Trans i18nKey="pages.MCXOption.don-t-look-back-and-regret-past-trades"><Trans i18nKey="pages.MCXOption.don-t-look-back-and-regret-past-trades-1">Don’t look back and regret past trades.</Trans></Trans></li>
        <li><Trans i18nKey="pages.MCXOption.don-t-over-leverage-in-a-volatile-market"><Trans i18nKey="pages.MCXOption.don-t-over-leverage-in-a-volatile-market-1">Don’t over-leverage in a volatile market.</Trans></Trans></li>
        <li><Trans i18nKey="pages.MCXOption.costs-matter-a-lot-when-you-are-a-trader"><Trans i18nKey="pages.MCXOption.costs-matter-a-lot-when-you-are-a-trader-1">Costs matter a lot when you are a trader.</Trans></Trans></li>
        <li><Trans i18nKey="pages.MCXOption.protect-your-capital-first-trading-begin"><Trans i18nKey="pages.MCXOption.protect-your-capital-first-trading-begin-1">Protect your capital first—trading begins with risk management.</Trans></Trans></li>
        <li><Trans i18nKey="pages.MCXOption.sometimes-not-trading-is-also-a-valid-st"><Trans i18nKey="pages.MCXOption.sometimes-not-trading-is-also-a-valid-st-1">Sometimes, not trading is also a valid strategy.</Trans></Trans></li>
        <li><Trans i18nKey="pages.MCXOption.profit-is-what-is-booked-all-else-is-jus"><Trans i18nKey="pages.MCXOption.profit-is-what-is-booked-all-else-is-jus-1">Profit is what is booked; all else is just on paper.</Trans></Trans></li>
      </ul>
    </div>


    <div className="text-center text-sm text-white mt-8">
      <strong><Trans i18nKey="pages.MCXOption.swift-real-time-customer-support"><Trans i18nKey="pages.MCXOption.swift-real-time-customer-support-1">Swift real-time customer support:</Trans></Trans></strong><Trans i18nKey="pages.MCXOption.09-00-am-to-06-00-pm">09:00 AM to 06:00 PM |</Trans><strong><Trans i18nKey="pages.MCXOption.all-recommendations-are-provided-through"><Trans i18nKey="pages.MCXOption.all-recommendations-are-provided-through-1">All recommendations are provided through SMS.</Trans></Trans></strong>
    </div>

    {/* Why Choose Us Section */}
    <div className="my-12">
      <h2 className="text-2xl font-bold mb-4 text-center text-white"><Trans i18nKey="pages.MCXOption.why-choose-mcx-options">Why Choose MCX Options?</Trans></h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/20 rounded-lg p-6 flex flex-col items-center">
          <FaLightbulb className="text-4xl mb-2 text-yellow-300" />
          <h3 className="font-bold text-lg mb-1 text-white"><Trans i18nKey="pages.MCXOption.expert-research">Expert Research</Trans></h3>
          <p className="text-white text-center"><Trans i18nKey="pages.MCXOption.our-team-combines-technical-and-fundamen"><Trans i18nKey="pages.MCXOption.our-team-combines-technical-and-fundamen-1">Our team combines technical and fundamental analysis for the most reliable options recommendations.</Trans></Trans></p>
        </div>
        <div className="bg-white/20 rounded-lg p-6 flex flex-col items-center">
          <FaBolt className="text-4xl mb-2 text-blue-300" />
          <h3 className="font-bold text-lg mb-1 text-white"><Trans i18nKey="pages.MCXOption.real-time-support">Real-Time Support</Trans></h3>
          <p className="text-white text-center"><Trans i18nKey="pages.MCXOption.get-instant-help-and-trade-updates-from-"><Trans i18nKey="pages.MCXOption.get-instant-help-and-trade-updates-from--1">Get instant help and trade updates from 9:00 AM to 6:00 PM, Monday to Friday.</Trans></Trans></p>
        </div>
        <div className="bg-white/20 rounded-lg p-6 flex flex-col items-center">
          <FaLock className="text-4xl mb-2 text-green-300" />
          <h3 className="font-bold text-lg mb-1 text-white"><Trans i18nKey="pages.MCXOption.trusted-by-traders">Trusted by Traders</Trans></h3>
          <p className="text-white text-center"><Trans i18nKey="pages.MCXOption.hundreds-of-commodity-options-traders-re"><Trans i18nKey="pages.MCXOption.hundreds-of-commodity-options-traders-re-1">Hundreds of commodity options traders rely on our signals for consistent results.</Trans></Trans></p>
        </div>
      </div>
    </div>

    {/* FAQ Section */}
    <div className="my-12">
      <h2 className="text-2xl font-bold mb-4 text-center text-white"><Trans i18nKey="pages.MCXOption.frequently-asked-questions">Frequently Asked Questions</Trans></h2>
      <div className="max-w-3xl mx-auto">
        <div className="mb-4">
          <h3 className="font-semibold text-white"><Trans i18nKey="pages.MCXOption.q-how-will-i-receive-the-options-recomme"><Trans i18nKey="pages.MCXOption.q-how-will-i-receive-the-options-recomme-1">Q: How will I receive the options recommendations?</Trans></Trans></h3>
          <p className="text-white"><Trans i18nKey="pages.MCXOption.a-all-options-recommendations-are-sent-v"><Trans i18nKey="pages.MCXOption.a-all-options-recommendations-are-sent-v-1">A: All options recommendations are sent via SMS to your registered mobile number.</Trans></Trans></p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-white"><Trans i18nKey="pages.MCXOption.q-can-i-get-support-if-i-have-questions"><Trans i18nKey="pages.MCXOption.q-can-i-get-support-if-i-have-questions-1">Q: Can I get support if I have questions?</Trans></Trans></h3>
          <p className="text-white"><Trans i18nKey="pages.MCXOption.a-yes-our-support-team-is-available-from"><Trans i18nKey="pages.MCXOption.a-yes-our-support-team-is-available-from-1">A: Yes, our support team is available from 09:00 AM to 06:00 PM for any queries.</Trans></Trans></p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-white"><Trans i18nKey="pages.MCXOption.q-is-there-a-refund-policy">Q: Is there a refund policy?</Trans></h3>
          <p className="text-white"><Trans i18nKey="pages.MCXOption.a-please-refer-to-our-terms-and-conditio"><Trans i18nKey="pages.MCXOption.a-please-refer-to-our-terms-and-conditio-1">A: Please refer to our terms and conditions or contact support for refund-related queries.</Trans></Trans></p>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <Link to="/contact">
          <button className="bg-[var(--primary-green)] text-white px-8 py-3 rounded-lg font-bold text-lg shadow hover:bg-green-700 transition"><Trans i18nKey="pages.MCXOption.contact-us">Contact Us</Trans></button>
        </Link>
      </div>
    </div>
  </div>
);

export default MCXOption;

