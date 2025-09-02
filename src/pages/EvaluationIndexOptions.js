
import React from 'react';
import { Trans } from '../i18nShim';
import { FaChartLine, FaRegClock, FaUserCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const EvaluationIndexOptions = () => (
  <div className="container mx-auto py-12 px-4 max-w-5xl text-white">
    <h1 className="text-4xl font-extrabold mb-4 text-center text-white"><Trans i18nKey="pages.EvaluationIndexOptions.evaluation-index-options"><Trans i18nKey="pages.EvaluationIndexOptions.evaluation-index-options-1">Evaluation Index Options</Trans></Trans></h1>
    <p className="text-lg mb-6 text-center text-white">
      Evaluation Index Options service is specifically designed for option traders trading with precise technical research recommendations for Index Options. We provide recommendations to intraday traders to optimize every market movement. Nearly 1-2 intraday recommendations are given daily in Nifty and Bank Nifty Options, as per market conditions. Our timely technical recommendations provide adequate time to enter and exit trades. Our team of analysts specializes in tracking the F&O market, major sectors, and blends technical analysis with national and international events to predict market moves.
    </p>
  <p className="text-base mb-6 text-center text-white"><Trans i18nKey="pages.EvaluationIndexOptions.a-pure-intraday-product-where-customers-"><Trans i18nKey="pages.EvaluationIndexOptions.a-pure-intraday-product-where-customers--1">A pure intraday product, where customers receive Index Option recommendations in NSE. This product is designed for new customers who want to evaluate our recommendations in the Stock Option market.</Trans></Trans></p>

    {/* What We Offer */}
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-2 text-white"><Trans i18nKey="pages.EvaluationIndexOptions.what-we-offer">What We Offer</Trans></h2>
      <ul className="list-disc pl-6 text-base mb-4 text-white">
        <li><Trans i18nKey="pages.EvaluationIndexOptions.1-2-intraday-positional-recommendations-"><Trans i18nKey="pages.EvaluationIndexOptions.1-2-intraday-positional-recommendations--1">1-2 Intraday/Positional recommendations in Nifty and Bank Nifty Options (as per market conditions).</Trans></Trans></li>
        <li><Trans i18nKey="pages.EvaluationIndexOptions.each-recommendation-includes-2-targets-a"><Trans i18nKey="pages.EvaluationIndexOptions.each-recommendation-includes-2-targets-a-1">Each recommendation includes 2 targets and a proper stop loss.</Trans></Trans></li>
        <li><Trans i18nKey="pages.EvaluationIndexOptions.timely-follow-ups-and-updates-on-all-tra"><Trans i18nKey="pages.EvaluationIndexOptions.timely-follow-ups-and-updates-on-all-tra-1">Timely follow-ups and updates on all trade signals.</Trans></Trans></li>
        <li><Trans i18nKey="pages.EvaluationIndexOptions.clear-entry-and-exit-timings-for-every-r"><Trans i18nKey="pages.EvaluationIndexOptions.clear-entry-and-exit-timings-for-every-r-1">Clear entry and exit timings for every recommendation.</Trans></Trans></li>
        <li><Trans i18nKey="pages.EvaluationIndexOptions.nifty-and-bank-nifty-trend-support-and-r"><Trans i18nKey="pages.EvaluationIndexOptions.nifty-and-bank-nifty-trend-support-and-r-1">Nifty and Bank Nifty trend, support, and resistance levels.</Trans></Trans></li>
        <li><Trans i18nKey="pages.EvaluationIndexOptions.careful-analysis-of-market-direction-and"><Trans i18nKey="pages.EvaluationIndexOptions.careful-analysis-of-market-direction-and-1">Careful analysis of market direction and concise domestic & world market information.</Trans></Trans></li>
        
        
      </ul>
    </div>

    {/* Trading Rules */}
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-2 text-white"><Trans i18nKey="pages.EvaluationIndexOptions.trading-rules-every-trader-must-follow"><Trans i18nKey="pages.EvaluationIndexOptions.trading-rules-every-trader-must-follow-1">Trading Rules Every Trader Must Follow</Trans></Trans></h2>
      <ul className="list-decimal pl-6 text-base mb-4 text-white">
        <li><Trans i18nKey="pages.EvaluationIndexOptions.do-not-over-trade"><Trans i18nKey="pages.EvaluationIndexOptions.do-not-over-trade-1">Do not over trade.</Trans></Trans></li>
        
        <li><Trans i18nKey="pages.EvaluationIndexOptions.trade-each-recommendation-with-the-same-"><Trans i18nKey="pages.EvaluationIndexOptions.trade-each-recommendation-with-the-same--1">Trade each recommendation with the same quantity as advised by the Research Team.</Trans></Trans></li>
        <li><Trans i18nKey="pages.EvaluationIndexOptions.profit-and-loss-are-subject-to-market-ri"><Trans i18nKey="pages.EvaluationIndexOptions.profit-and-loss-are-subject-to-market-ri-1">Profit and loss are subject to market risk; there is no guarantee or assurance.</Trans></Trans></li>
        <li><Trans i18nKey="pages.EvaluationIndexOptions.never-be-emotional-while-trading"><Trans i18nKey="pages.EvaluationIndexOptions.never-be-emotional-while-trading-1">Never be emotional while trading.</Trans></Trans></li>
        <li><Trans i18nKey="pages.EvaluationIndexOptions.beware-of-overnight-risk"><Trans i18nKey="pages.EvaluationIndexOptions.beware-of-overnight-risk-1">Beware of overnight risk.</Trans></Trans></li>
        <li><Trans i18nKey="pages.EvaluationIndexOptions.always-trade-with-a-stop-loss"><Trans i18nKey="pages.EvaluationIndexOptions.always-trade-with-a-stop-loss-1">Always trade with a stop loss.</Trans></Trans></li>
        <li><Trans i18nKey="pages.EvaluationIndexOptions.don-t-look-back-and-regret-past-trades"><Trans i18nKey="pages.EvaluationIndexOptions.don-t-look-back-and-regret-past-trades-1">Don’t look back and regret past trades.</Trans></Trans></li>
        <li><Trans i18nKey="pages.EvaluationIndexOptions.don-t-over-leverage-in-a-volatile-market"><Trans i18nKey="pages.EvaluationIndexOptions.don-t-over-leverage-in-a-volatile-market-1">Don’t over-leverage in a volatile market.</Trans></Trans></li>
        <li><Trans i18nKey="pages.EvaluationIndexOptions.costs-matter-a-lot-when-you-are-a-trader"><Trans i18nKey="pages.EvaluationIndexOptions.costs-matter-a-lot-when-you-are-a-trader-1">Costs matter a lot when you are a trader.</Trans></Trans></li>
        <li><Trans i18nKey="pages.EvaluationIndexOptions.protect-your-capital-first-trading-begin"><Trans i18nKey="pages.EvaluationIndexOptions.protect-your-capital-first-trading-begin-1">Protect your capital first—trading begins with risk management.</Trans></Trans></li>
        <li><Trans i18nKey="pages.EvaluationIndexOptions.sometimes-not-trading-is-also-a-valid-st"><Trans i18nKey="pages.EvaluationIndexOptions.sometimes-not-trading-is-also-a-valid-st-1">Sometimes, not trading is also a valid strategy.</Trans></Trans></li>
        <li><Trans i18nKey="pages.EvaluationIndexOptions.profit-is-what-is-booked-all-else-is-jus"><Trans i18nKey="pages.EvaluationIndexOptions.profit-is-what-is-booked-all-else-is-jus-1">Profit is what is booked; all else is just on paper.</Trans></Trans></li>
      </ul>
    </div>

    {/* Sample Calls (moved below Trading Rules as requested) */}
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-2 text-white"><Trans i18nKey="pages.EvaluationIndexOptions.sample-calls">Sample Calls</Trans></h2>
      <div className="bg-white/10 rounded-lg p-4 text-left text-base text-white font-mono">
        <Trans i18nKey="pages.EvaluationIndexOptions.buy-banknifty-02-mar-40400-pe-above-460-"><Trans i18nKey="pages.EvaluationIndexOptions.buy-banknifty-02-mar-40400-pe-above-460--1">BUY BANKNIFTY 02 MAR 40400 PE ABOVE 460 TARGET 540 620 STOPLOSS 370</Trans></Trans>
      </div>
    </div>

  {/* Removed explicit SMS/support-hours footer per policy */}

    {/* Pricing Plan */}
    <div className="mb-8 text-center">
      <h2 className="text-2xl font-bold mb-2 text-white"><Trans i18nKey="pages.EvaluationIndexOptions.pricing-plan-for-evaluation-index-option"><Trans i18nKey="pages.EvaluationIndexOptions.pricing-plan-for-evaluation-index-option-1">Pricing Plan For Evaluation Index Options</Trans></Trans></h2>
      <div className="flex justify-center">
        <div className="border rounded-xl p-6 shadow-md bg-white/30 flex flex-col items-center max-w-xs w-full">
          <h3 className="text-xl font-bold mb-2 text-white"><Trans i18nKey="pages.EvaluationIndexOptions.index-evaluation-pack"><Trans i18nKey="pages.EvaluationIndexOptions.index-evaluation-pack-1">Index Evaluation Pack</Trans></Trans></h3>
          <div className="text-3xl font-extrabold text-white mb-2">₹5,100 <span className="text-base font-normal"><Trans i18nKey="pages.EvaluationIndexOptions.10-days">/ weekly</Trans></span></div>
          <div className="mb-2 text-white"><Trans i18nKey="pages.EvaluationIndexOptions.1-to-2-calls-in-a-day"><Trans i18nKey="pages.EvaluationIndexOptions.1-to-2-calls-in-a-day-1">1 to 2 Calls in a Day</Trans></Trans></div>
          <Link to="/payment">
            <button className="bg-[var(--primary-green)] text-white px-6 py-2 rounded-lg font-semibold mt-2"><Trans i18nKey="pages.EvaluationIndexOptions.payment">Payment</Trans></button>
          </Link>
          <div className="text-xs text-white mt-2"><Trans i18nKey="pages.EvaluationIndexOptions.note-prices-are-excluding-gst-18"><Trans i18nKey="pages.EvaluationIndexOptions.note-prices-are-excluding-gst-18-1">Note: Prices are excluding GST (18%)</Trans></Trans></div>
        </div>
      </div>
    </div>

    {/* Why Choose Us Section */}
    <div className="my-12">
      <h2 className="text-2xl font-bold mb-4 text-center text-white"><Trans i18nKey="pages.EvaluationIndexOptions.why-choose-evaluation-index-options"><Trans i18nKey="pages.EvaluationIndexOptions.why-choose-evaluation-index-options-1">Why Choose Evaluation Index Options?</Trans></Trans></h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/20 rounded-lg p-6 flex flex-col items-center">
          <FaChartLine className="text-4xl mb-2 text-blue-300" />
          <h3 className="font-bold text-lg mb-1 text-white"><Trans i18nKey="pages.EvaluationIndexOptions.expert-research"><Trans i18nKey="pages.EvaluationIndexOptions.expert-research-1">Expert Research</Trans></Trans></h3>
          <p className="text-white text-center"><Trans i18nKey="pages.EvaluationIndexOptions.our-team-combines-technical-and-fundamen"><Trans i18nKey="pages.EvaluationIndexOptions.our-team-combines-technical-and-fundamen-1">Our team combines technical and fundamental analysis for the most reliable index option recommendations.</Trans></Trans></p>
        </div>
        <div className="bg-white/20 rounded-lg p-6 flex flex-col items-center">
          <FaRegClock className="text-4xl mb-2 text-yellow-300" />
          <h3 className="font-bold text-lg mb-1 text-white"><Trans i18nKey="pages.EvaluationIndexOptions.timely-updates">Timely Updates</Trans></h3>
          <p className="text-white text-center"><Trans i18nKey="pages.EvaluationIndexOptions.get-instant-trade-signals-and-support-du"><Trans i18nKey="pages.EvaluationIndexOptions.get-instant-trade-signals-and-support-du-1">Get instant trade signals and support during Indian market hours.</Trans></Trans></p>
        </div>
        <div className="bg-white/20 rounded-lg p-6 flex flex-col items-center">
          <FaUserCheck className="text-4xl mb-2 text-green-400" />
          <h3 className="font-bold text-lg mb-1 text-white"><Trans i18nKey="pages.EvaluationIndexOptions.trusted-by-traders"><Trans i18nKey="pages.EvaluationIndexOptions.trusted-by-traders-1">Trusted by Traders</Trans></Trans></h3>
          <p className="text-white text-center"><Trans i18nKey="pages.EvaluationIndexOptions.hundreds-of-option-traders-rely-on-our-s"><Trans i18nKey="pages.EvaluationIndexOptions.hundreds-of-option-traders-rely-on-our-s-1">Hundreds of option traders rely on our signals for consistent results.</Trans></Trans></p>
        </div>
      </div>
    </div>

    {/* FAQ Section */}
    <div className="my-12">
      <h2 className="text-2xl font-bold mb-4 text-center text-white"><Trans i18nKey="pages.EvaluationIndexOptions.frequently-asked-questions"><Trans i18nKey="pages.EvaluationIndexOptions.frequently-asked-questions-1">Frequently Asked Questions</Trans></Trans></h2>
      <div className="max-w-3xl mx-auto">
        <div className="mb-4">
          <h3 className="font-semibold text-white"><Trans i18nKey="pages.EvaluationIndexOptions.q-how-will-i-receive-the-recommendations"><Trans i18nKey="pages.EvaluationIndexOptions.q-how-will-i-receive-the-recommendations-1">Q: How will I receive the recommendations?</Trans></Trans></h3>
          <p className="text-white">A: Recommendations are delivered via your registered contact channel.</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-white"><Trans i18nKey="pages.EvaluationIndexOptions.q-can-i-get-support-if-i-have-questions"><Trans i18nKey="pages.EvaluationIndexOptions.q-can-i-get-support-if-i-have-questions-1">Q: Can I get support if I have questions?</Trans></Trans></h3>
          <p className="text-white">A: Our support team is available during Indian market hours.</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-white"><Trans i18nKey="pages.EvaluationIndexOptions.q-is-there-a-refund-policy"><Trans i18nKey="pages.EvaluationIndexOptions.q-is-there-a-refund-policy-1">Q: Is there a refund policy?</Trans></Trans></h3>
          <p className="text-white"><Trans i18nKey="pages.EvaluationIndexOptions.a-please-refer-to-our-terms-and-conditio"><Trans i18nKey="pages.EvaluationIndexOptions.a-please-refer-to-our-terms-and-conditio-1">A: Please refer to our terms and conditions or contact support for refund-related queries.</Trans></Trans></p>
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

export default EvaluationIndexOptions;