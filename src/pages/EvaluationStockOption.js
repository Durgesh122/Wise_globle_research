import React from 'react';
import { Trans } from '../i18nShim';
import { FaChartLine, FaRegClock, FaUserCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';


import { Helmet } from 'react-helmet-async';
const EvaluationStockOption = () => (
  <>
      <Helmet>
        <title>Evaluation Stock Option - Wise Global Research</title>
        <meta name="description" content="Evaluation Stock Option page — Wise Global Research." />
        <link rel="canonical" href="https://wiseglobalresearch.com/evaluationstockoption" />
      </Helmet>
<div className="container mx-auto py-8 px-4 sm:px-6 max-w-4xl text-white">
    <h1 className="text-4xl font-extrabold mb-4 text-center text-white"><Trans i18nKey="pages.EvaluationStockOption.evaluation-stock-option"><Trans i18nKey="pages.EvaluationStockOption.evaluation-stock-option-1">Evaluation Stock Option</Trans></Trans></h1>
    <p className="text-lg mb-6 text-center text-white">
      Evaluation Stock Option service is specifically designed for option traders who want to take advantage of short-term stock price movement. Wise Global Research Analyst provides recommendations to intraday traders to optimize every market movement. Our team of analysts specializes in tracking the F&O market, major sectors, and blends technical analysis with national and international events to predict market moves. Our timely technical recommendations provide adequate time to enter trades and are a supreme blend of technical and fundamental research.
    </p>
    <p className="text-lg mb-6 text-center text-white">
      <Trans i18nKey="pages.EvaluationStockOption.a-pure-intraday-product-where-customers-">
        <Trans i18nKey="pages.EvaluationStockOption.a-pure-intraday-product-where-customers--1">
          A pure intraday product, where customers receive Stock Option recommendations in NSE. This product is designed for new customers who want to evaluate our recommendations in the Stock Option market.
        </Trans>
      </Trans>
    </p>

    {/* What We Offer */}
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-2 text-white"><Trans i18nKey="pages.EvaluationStockOption.what-we-offer">What We Offer</Trans></h2>
      <ul className="list-disc pl-6 text-base mb-4 text-white">
        <li><Trans i18nKey="pages.EvaluationStockOption.2-3-intraday-stock-option-recommendation"><Trans i18nKey="pages.EvaluationStockOption.2-3-intraday-stock-option-recommendation-1">2-3 Intraday stock option recommendations (as per market conditions).</Trans></Trans></li>
        <li><Trans i18nKey="pages.EvaluationStockOption.each-recommendation-will-have-2-targets-"><Trans i18nKey="pages.EvaluationStockOption.each-recommendation-will-have-2-targets--1">Each recommendation will have 2 targets with proper stop loss.</Trans></Trans></li>
        <li><Trans i18nKey="pages.EvaluationStockOption.timely-follow-ups-of-all-trade-signals"><Trans i18nKey="pages.EvaluationStockOption.timely-follow-ups-of-all-trade-signals-1">Timely follow-ups of all trade signals.</Trans></Trans></li>
        <li><Trans i18nKey="pages.EvaluationStockOption.proper-time-for-entry-exit-in-recommenda"><Trans i18nKey="pages.EvaluationStockOption.proper-time-for-entry-exit-in-recommenda-1">Proper time for entry & exit in recommendations.</Trans></Trans></li>
        <li><Trans i18nKey="pages.EvaluationStockOption.nifty-and-bank-nifty-trend-support-and-r"><Trans i18nKey="pages.EvaluationStockOption.nifty-and-bank-nifty-trend-support-and-r-1">Nifty and Bank Nifty trend, support, and resistance levels.</Trans></Trans></li>
        <li><Trans i18nKey="pages.EvaluationStockOption.careful-analysis-of-market-direction-and"><Trans i18nKey="pages.EvaluationStockOption.careful-analysis-of-market-direction-and-1">Careful analysis of market direction and concise domestic & world market information.</Trans></Trans></li>
      </ul>
      <div className="bg-white/10 rounded-lg p-4 mt-4 text-left">
        <span className="font-semibold text-white"><Trans i18nKey="pages.EvaluationStockOption.sample-call">Sample Call:</Trans></span>
        <div className="text-white mt-2 font-mono"><Trans i18nKey="pages.EvaluationStockOption.buy-dixon-14500-ce-above-720-tgt-800-900-sl-620"><Trans i18nKey="pages.EvaluationStockOption.buy-dixon-14500-ce-above-720-tgt-800-900-sl-620-1">BUY DIXON 14500 CE ABOVE 720 TGT 800 900 SL 620</Trans></Trans></div>
      </div>
    </div>

    {/* Trading Rules */}
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-2 text-white"><Trans i18nKey="pages.EvaluationStockOption.trading-rules-every-trader-must-follow"><Trans i18nKey="pages.EvaluationStockOption.trading-rules-every-trader-must-follow-1">Trading Rules Every Trader Must Follow</Trans></Trans></h2>
      <ul className="list-decimal pl-6 text-base mb-4 text-white">
        <li><Trans i18nKey="pages.EvaluationStockOption.do-not-over-trade"><Trans i18nKey="pages.EvaluationStockOption.do-not-over-trade-1">Do not over trade.</Trans></Trans></li>
        
        <li><Trans i18nKey="pages.EvaluationStockOption.trade-each-recommendation-with-the-same-"><Trans i18nKey="pages.EvaluationStockOption.trade-each-recommendation-with-the-same--1">Trade each recommendation with the same quantity as advised by the Research Team.</Trans></Trans></li>
        <li><Trans i18nKey="pages.EvaluationStockOption.profit-and-loss-are-subject-to-market-ri"><Trans i18nKey="pages.EvaluationStockOption.profit-and-loss-are-subject-to-market-ri-1">Profit and loss are subject to market risk; there is no guarantee or assurance.</Trans></Trans></li>
        <li><Trans i18nKey="pages.EvaluationStockOption.never-be-emotional-while-trading"><Trans i18nKey="pages.EvaluationStockOption.never-be-emotional-while-trading-1">Never be emotional while trading.</Trans></Trans></li>
        <li><Trans i18nKey="pages.EvaluationStockOption.beware-of-overnight-risk"><Trans i18nKey="pages.EvaluationStockOption.beware-of-overnight-risk-1">Beware of overnight risk.</Trans></Trans></li>
        <li><Trans i18nKey="pages.EvaluationStockOption.always-trade-with-a-stop-loss"><Trans i18nKey="pages.EvaluationStockOption.always-trade-with-a-stop-loss-1">Always trade with a stop loss.</Trans></Trans></li>
        <li><Trans i18nKey="pages.EvaluationStockOption.don-t-look-back-and-regret-past-trades"><Trans i18nKey="pages.EvaluationStockOption.don-t-look-back-and-regret-past-trades-1">Don’t look back and regret past trades.</Trans></Trans></li>
        <li><Trans i18nKey="pages.EvaluationStockOption.don-t-over-leverage-in-a-volatile-market"><Trans i18nKey="pages.EvaluationStockOption.don-t-over-leverage-in-a-volatile-market-1">Don’t over-leverage in a volatile market.</Trans></Trans></li>
        <li><Trans i18nKey="pages.EvaluationStockOption.costs-matter-a-lot-when-you-are-a-trader"><Trans i18nKey="pages.EvaluationStockOption.costs-matter-a-lot-when-you-are-a-trader-1">Costs matter a lot when you are a trader.</Trans></Trans></li>
        <li><Trans i18nKey="pages.EvaluationStockOption.protect-your-capital-first-trading-begin"><Trans i18nKey="pages.EvaluationStockOption.protect-your-capital-first-trading-begin-1">Protect your capital first—trading begins with risk management.</Trans></Trans></li>
        <li><Trans i18nKey="pages.EvaluationStockOption.sometimes-not-trading-is-also-a-valid-st"><Trans i18nKey="pages.EvaluationStockOption.sometimes-not-trading-is-also-a-valid-st-1">Sometimes, not trading is also a valid strategy.</Trans></Trans></li>
        <li><Trans i18nKey="pages.EvaluationStockOption.profit-is-what-is-booked-all-else-is-jus"><Trans i18nKey="pages.EvaluationStockOption.profit-is-what-is-booked-all-else-is-jus-1">Profit is what is booked; all else is just on paper.</Trans></Trans></li>
      </ul>
    </div>

  {/* Removed explicit SMS/support-hours footer per policy */}

    {/* Pricing Plan */}
    <div className="mb-8 text-center">
      <h2 className="text-2xl font-bold mb-2 text-white"><Trans i18nKey="pages.EvaluationStockOption.pricing-plan-for-evaluation-stock-option"><Trans i18nKey="pages.EvaluationStockOption.pricing-plan-for-evaluation-stock-option-1">Pricing Plan For Evaluation Stock Option</Trans></Trans></h2>
      <div className="flex justify-center">
        <div className="border rounded-xl p-6 shadow-md bg-white/30 flex flex-col items-center max-w-xs w-full">
          <h3 className="text-xl font-bold mb-2 text-white"><Trans i18nKey="pages.EvaluationStockOption.option-evaluation-pack"><Trans i18nKey="pages.EvaluationStockOption.option-evaluation-pack-1">Option Evaluation Pack</Trans></Trans></h3>
          <div className="text-3xl font-extrabold text-white mb-2">₹5,100 <span className="text-base font-normal"><Trans i18nKey="pages.EvaluationStockOption.10-days">/ weekly</Trans></span></div>
          <div className="mb-2 text-white"><Trans i18nKey="pages.EvaluationStockOption.2-to-3-calls-in-a-day"><Trans i18nKey="pages.EvaluationStockOption.2-to-3-calls-in-a-day-1">2 to 3 Calls in a Day</Trans></Trans></div>
          <Link to="/payment">
            <button className="bg-[var(--primary-green)] text-white px-6 py-2 rounded-lg font-semibold mt-2"><Trans i18nKey="pages.EvaluationStockOption.payment">Payment</Trans></button>
          </Link>
          <div className="text-xs text-white mt-2"><Trans i18nKey="pages.EvaluationStockOption.note-prices-are-excluding-gst-18"><Trans i18nKey="pages.EvaluationStockOption.note-prices-are-excluding-gst-18-1">Note: Prices are excluding GST (18%)</Trans></Trans></div>
        </div>
      </div>
    </div>

    {/* Why Choose Us Section */}
    <div className="my-12">
      <h2 className="text-2xl font-bold mb-4 text-center text-white"><Trans i18nKey="pages.EvaluationStockOption.why-choose-evaluation-stock-option"><Trans i18nKey="pages.EvaluationStockOption.why-choose-evaluation-stock-option-1">Why Choose Evaluation Stock Option?</Trans></Trans></h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/20 rounded-lg p-6 flex flex-col items-center">
          <FaChartLine className="text-4xl mb-2 text-blue-300" />
          <h3 className="font-bold text-lg mb-1 text-white"><Trans i18nKey="pages.EvaluationStockOption.expert-research">Expert Research</Trans></h3>
          <p className="text-white text-center"><Trans i18nKey="pages.EvaluationStockOption.our-team-combines-technical-and-fundamen"><Trans i18nKey="pages.EvaluationStockOption.our-team-combines-technical-and-fundamen-1">Our team combines technical and fundamental analysis for the most reliable stock option recommendations.</Trans></Trans></p>
        </div>
        <div className="bg-white/20 rounded-lg p-6 flex flex-col items-center">
          <FaRegClock className="text-4xl mb-2 text-yellow-300" />
          <h3 className="font-bold text-lg mb-1 text-white"><Trans i18nKey="pages.EvaluationStockOption.timely-updates">Timely Updates</Trans></h3>
          <p className="text-white text-center"><Trans i18nKey="pages.EvaluationStockOption.get-instant-trade-signals-and-support-du"><Trans i18nKey="pages.EvaluationStockOption.get-instant-trade-signals-and-support-du-1">Get instant trade signals and support during Indian market hours.</Trans></Trans></p>
        </div>
        <div className="bg-white/20 rounded-lg p-6 flex flex-col items-center">
          <FaUserCheck className="text-4xl mb-2 text-green-400" />
          <h3 className="font-bold text-lg mb-1 text-white"><Trans i18nKey="pages.EvaluationStockOption.trusted-by-traders"><Trans i18nKey="pages.EvaluationStockOption.trusted-by-traders-1">Trusted by Traders</Trans></Trans></h3>
          <p className="text-white text-center"><Trans i18nKey="pages.EvaluationStockOption.hundreds-of-option-traders-rely-on-our-s"><Trans i18nKey="pages.EvaluationStockOption.hundreds-of-option-traders-rely-on-our-s-1">Hundreds of option traders rely on our signals for consistent results.</Trans></Trans></p>
        </div>
      </div>
    </div>

    {/* FAQ Section */}
    <div className="my-12">
      <h2 className="text-2xl font-bold mb-4 text-center text-white"><Trans i18nKey="pages.EvaluationStockOption.frequently-asked-questions"><Trans i18nKey="pages.EvaluationStockOption.frequently-asked-questions-1">Frequently Asked Questions</Trans></Trans></h2>
      <div className="max-w-3xl mx-auto">
        <div className="mb-4">
          <h3 className="font-semibold text-white"><Trans i18nKey="pages.EvaluationStockOption.q-how-will-i-receive-the-recommendations"><Trans i18nKey="pages.EvaluationStockOption.q-how-will-i-receive-the-recommendations-1">Q: How will I receive the recommendations?</Trans></Trans></h3>
          <p className="text-white">A: Recommendations are delivered via your registered contact channel.</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-white"><Trans i18nKey="pages.EvaluationStockOption.q-can-i-get-support-if-i-have-questions"><Trans i18nKey="pages.EvaluationStockOption.q-can-i-get-support-if-i-have-questions-1">Q: Can I get support if I have questions?</Trans></Trans></h3>
          <p className="text-white">A: Our support team is available during Indian market hours.</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-white"><Trans i18nKey="pages.EvaluationStockOption.q-is-there-a-refund-policy"><Trans i18nKey="pages.EvaluationStockOption.q-is-there-a-refund-policy-1">Q: Is there a refund policy?</Trans></Trans></h3>
          <p className="text-white"><Trans i18nKey="pages.EvaluationStockOption.a-please-refer-to-our-terms-and-conditio"><Trans i18nKey="pages.EvaluationStockOption.a-please-refer-to-our-terms-and-conditio-1">A: Please refer to our terms and conditions or contact support for refund-related queries.</Trans></Trans></p>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <Link to="/contact">
          <button className="bg-[var(--primary-green)] text-white px-8 py-3 rounded-lg font-bold text-lg shadow hover:bg-green-700 transition">Enquiry Now</button>
        </Link>
      </div>
    </div>

  </div>
  </>
);

export default EvaluationStockOption;