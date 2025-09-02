
import React from 'react';
import { Trans } from '../i18nShim';
import { FaLightbulb, FaBolt, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Metal = () => (
  <div className="container mx-auto py-12 px-4 max-w-5xl text-white">
    <h1 className="text-4xl font-extrabold mb-4 text-center text-white"><Trans i18nKey="pages.Metal.mcx-metal">MCX Metal</Trans></h1>
    <p className="text-lg mb-6 text-center text-white">
      Our MCX Metal service is tailored for traders who want to maximize their returns in Gold, Silver, Copper, and Aluminum segments of the MCX market. With a unique blend of technical and fundamental research, we provide 1-2 intraday or positional recommendations daily in metals. Our timely and accurate recommendations ensure you never miss a market opportunity. Benefit from our expert analysis of global and domestic market trends, and get real-time support for all your trading needs.
    </p>

    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-2 text-white"><Trans i18nKey="pages.Metal.what-we-offer">What We Offer</Trans></h2>
      <ul className="list-disc pl-6 text-base mb-4 text-white">
        <li><Trans i18nKey="pages.Metal.1-2-intraday-positional-recommendations-"><Trans i18nKey="pages.Metal.1-2-intraday-positional-recommendations--1">1-2 Intraday/Positional recommendations in Gold, Silver, Copper, and Aluminum (as per market conditions).</Trans></Trans></li>
        <li><Trans i18nKey="pages.Metal.each-recommendation-includes-2-targets-a"><Trans i18nKey="pages.Metal.each-recommendation-includes-2-targets-a-1">Each recommendation includes 2 targets and a proper stop loss.</Trans></Trans></li>
        <li><Trans i18nKey="pages.Metal.timely-follow-ups-and-updates-on-all-tra"><Trans i18nKey="pages.Metal.timely-follow-ups-and-updates-on-all-tra-1">Timely follow-ups and updates on all trade signals.</Trans></Trans></li>
        <li><Trans i18nKey="pages.Metal.clear-entry-and-exit-timings-for-every-r"><Trans i18nKey="pages.Metal.clear-entry-and-exit-timings-for-every-r-1">Clear entry and exit timings for every recommendation.</Trans></Trans></li>
        <li><Trans i18nKey="pages.Metal.comprehensive-analysis-of-global-and-dom"><Trans i18nKey="pages.Metal.comprehensive-analysis-of-global-and-dom-1">Comprehensive analysis of global and domestic metal markets.</Trans></Trans></li>
        
        
      </ul>
      <p className="text-base mb-2 text-white"><Trans i18nKey="pages.Metal.mcx-metal-services-are-ideal-for-traders"><Trans i18nKey="pages.Metal.mcx-metal-services-are-ideal-for-traders-1">MCX Metal Services are ideal for traders who want detailed technical and fundamental market analysis in one pack.</Trans></Trans></p>
    </div>

    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-2 text-white"><Trans i18nKey="pages.Metal.trading-rules-every-trader-must-follow"><Trans i18nKey="pages.Metal.trading-rules-every-trader-must-follow-1">Trading Rules Every Trader Must Follow</Trans></Trans></h2>
      <ul className="list-decimal pl-6 text-base mb-4 text-white">
  <li><Trans i18nKey="pages.Metal.do-not-over-trade">Do not over trade.</Trans></li>
        <li><Trans i18nKey="pages.Metal.trade-each-recommendation-with-the-same-"><Trans i18nKey="pages.Metal.trade-each-recommendation-with-the-same--1">Trade each recommendation with the same quantity as advised by the Research Team.</Trans></Trans></li>
        <li><Trans i18nKey="pages.Metal.profit-and-loss-are-subject-to-market-ri"><Trans i18nKey="pages.Metal.profit-and-loss-are-subject-to-market-ri-1">Profit and loss are subject to market risk; there is no guarantee or assurance.</Trans></Trans></li>
        <li><Trans i18nKey="pages.Metal.never-be-emotional-while-trading"><Trans i18nKey="pages.Metal.never-be-emotional-while-trading-1">Never be emotional while trading.</Trans></Trans></li>
        <li><Trans i18nKey="pages.Metal.beware-of-overnight-risk">Beware of overnight risk.</Trans></li>
        <li><Trans i18nKey="pages.Metal.always-trade-with-a-stop-loss">Always trade with a stop loss.</Trans></li>
        <li><Trans i18nKey="pages.Metal.don-t-look-back-and-regret-past-trades"><Trans i18nKey="pages.Metal.don-t-look-back-and-regret-past-trades-1">Don’t look back and regret past trades.</Trans></Trans></li>
        <li><Trans i18nKey="pages.Metal.don-t-over-leverage-in-a-volatile-market"><Trans i18nKey="pages.Metal.don-t-over-leverage-in-a-volatile-market-1">Don’t over-leverage in a volatile market.</Trans></Trans></li>
        <li><Trans i18nKey="pages.Metal.costs-matter-a-lot-when-you-are-a-trader"><Trans i18nKey="pages.Metal.costs-matter-a-lot-when-you-are-a-trader-1">Costs matter a lot when you are a trader.</Trans></Trans></li>
        <li><Trans i18nKey="pages.Metal.protect-your-capital-first-trading-begin"><Trans i18nKey="pages.Metal.protect-your-capital-first-trading-begin-1">Protect your capital first—trading begins with risk management.</Trans></Trans></li>
        <li><Trans i18nKey="pages.Metal.sometimes-not-trading-is-also-a-valid-st"><Trans i18nKey="pages.Metal.sometimes-not-trading-is-also-a-valid-st-1">Sometimes, not trading is also a valid strategy.</Trans></Trans></li>
        <li><Trans i18nKey="pages.Metal.profit-is-what-is-booked-all-else-is-jus"><Trans i18nKey="pages.Metal.profit-is-what-is-booked-all-else-is-jus-1">Profit is what is booked; all else is just on paper.</Trans></Trans></li>
      </ul>
    </div>


    

    {/* Why Choose Us Section */}
    <div className="my-12">
      <h2 className="text-2xl font-bold mb-4 text-center text-white"><Trans i18nKey="pages.Metal.why-choose-mcx-metal">Why Choose MCX Metal?</Trans></h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/20 rounded-lg p-6 flex flex-col items-center">
          <FaLightbulb className="text-4xl mb-2 text-yellow-300" />
          <h3 className="font-bold text-lg mb-1 text-white"><Trans i18nKey="pages.Metal.expert-research">Expert Research</Trans></h3>
          <p className="text-white text-center"><Trans i18nKey="pages.Metal.our-team-combines-technical-and-fundamen"><Trans i18nKey="pages.Metal.our-team-combines-technical-and-fundamen-1">Our team combines technical and fundamental analysis for the most reliable recommendations.</Trans></Trans></p>
        </div>
        <div className="bg-white/20 rounded-lg p-6 flex flex-col items-center">
          <FaBolt className="text-4xl mb-2 text-blue-300" />
          <h3 className="font-bold text-lg mb-1 text-white"><Trans i18nKey="pages.Metal.real-time-support">Real-Time Support</Trans></h3>
          <p className="text-white text-center">Get help and trade updates during Indian market hours.</p>
        </div>
        <div className="bg-white/20 rounded-lg p-6 flex flex-col items-center">
          <FaLock className="text-4xl mb-2 text-green-300" />
          <h3 className="font-bold text-lg mb-1 text-white"><Trans i18nKey="pages.Metal.trusted-by-traders">Trusted by Traders</Trans></h3>
          <p className="text-white text-center"><Trans i18nKey="pages.Metal.hundreds-of-metal-traders-rely-on-our-si"><Trans i18nKey="pages.Metal.hundreds-of-metal-traders-rely-on-our-si-1">Hundreds of metal traders rely on our signals for consistent results.</Trans></Trans></p>
        </div>
      </div>
    </div>

    {/* FAQ Section */}
    <div className="my-12">
      <h2 className="text-2xl font-bold mb-4 text-center text-white"><Trans i18nKey="pages.Metal.frequently-asked-questions">Frequently Asked Questions</Trans></h2>
      <div className="max-w-3xl mx-auto">
        <div className="mb-4">
          <h3 className="font-semibold text-white"><Trans i18nKey="pages.Metal.q-how-will-i-receive-the-recommendations"><Trans i18nKey="pages.Metal.q-how-will-i-receive-the-recommendations-1">Q: How will I receive the recommendations?</Trans></Trans></h3>
          <p className="text-white">A: Recommendations are shared via your registered contact channel.</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-white"><Trans i18nKey="pages.Metal.q-can-i-get-support-if-i-have-questions"><Trans i18nKey="pages.Metal.q-can-i-get-support-if-i-have-questions-1">Q: Can I get support if I have questions?</Trans></Trans></h3>
          <p className="text-white">A: Yes, support is available during Indian market hours for any queries.</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-white"><Trans i18nKey="pages.Metal.q-is-there-a-refund-policy">Q: Is there a refund policy?</Trans></h3>
          <p className="text-white"><Trans i18nKey="pages.Metal.a-please-refer-to-our-terms-and-conditio"><Trans i18nKey="pages.Metal.a-please-refer-to-our-terms-and-conditio-1">A: Please refer to our terms and conditions or contact support for refund-related queries.</Trans></Trans></p>
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

export default Metal;