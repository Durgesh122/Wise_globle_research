
import React from 'react';
import { Trans } from '../i18nShim';
import { FaChartLine, FaRegClock, FaUserCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const EvaluationStockCash = () => (
  <div className="container mx-auto py-12 px-4 max-w-5xl text-white">
    <h1 className="text-4xl font-extrabold mb-4 text-center text-white"><Trans i18nKey="pages.EvaluationStockCash.evaluation-stock-cash"><Trans i18nKey="pages.EvaluationStockCash.evaluation-stock-cash-1">Evaluation Stock Cash</Trans></Trans></h1>
    <p className="text-lg mb-6 text-center text-white">
  Wise Global Research Analyst provides equity research in the NSE cash segment by dedicated and experienced Research Analysts after in-depth technical analysis. Our equity trading recommendations are produced after proper analysis of the stock market. These technical levels are generated for recommendations that can provide good movement in the market. In a volatile market, our customers should only focus on intraday research and should not carry forward any position for the next day. A pure intraday product, where customers receive stock recommendations in the NSE cash segment. This product is designed for new customers who want to evaluate our recommendations in the cash market.
    </p>

    {/* What You Will Get */}
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-2 text-white"><Trans i18nKey="pages.EvaluationStockCash.what-you-will-get">What You Will Get</Trans></h2>
      <ul className="list-disc pl-6 text-base mb-4 text-white">
        <li><Trans i18nKey="pages.EvaluationStockCash.daily-pure-intraday-stock-recommendation"><Trans i18nKey="pages.EvaluationStockCash.daily-pure-intraday-stock-recommendation-1">Daily pure intraday stock recommendations, frequency limited to 2 to 3 (as per market conditions).</Trans></Trans></li>
        <li><Trans i18nKey="pages.EvaluationStockCash.each-recommendation-will-have-2-targets-"><Trans i18nKey="pages.EvaluationStockCash.each-recommendation-will-have-2-targets--1">Each recommendation will have 2 targets with proper stop loss.</Trans></Trans></li>
        <li><Trans i18nKey="pages.EvaluationStockCash.timely-follow-ups-of-all-trade-signals"><Trans i18nKey="pages.EvaluationStockCash.timely-follow-ups-of-all-trade-signals-1">Timely follow-ups of all trade signals.</Trans></Trans></li>
        <li><Trans i18nKey="pages.EvaluationStockCash.proper-time-for-entry-exit-in-recommenda"><Trans i18nKey="pages.EvaluationStockCash.proper-time-for-entry-exit-in-recommenda-1">Proper time for entry & exit in recommendations.</Trans></Trans></li>
        <li><Trans i18nKey="pages.EvaluationStockCash.careful-analysis-of-market-direction"><Trans i18nKey="pages.EvaluationStockCash.careful-analysis-of-market-direction-1">Careful analysis of market direction.</Trans></Trans></li>
        
        
      </ul>
      <div className="bg-white/10 rounded-lg p-4 mt-4">
        <span className="font-semibold text-white"><Trans i18nKey="pages.EvaluationStockCash.sample-call">Sample Call:</Trans></span>
        <div className="text-white mt-2"><Trans i18nKey="pages.EvaluationStockCash.buy-centuryply-above-512-target-518-524-"><Trans i18nKey="pages.EvaluationStockCash.buy-centuryply-above-512-target-518-524--1">BUY CENTURYPLY ABOVE 512 TARGET 518 524 STOPLOSS 505</Trans></Trans></div>
      </div>
    </div>

    {/* Trading Rules */}
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-2 text-white"><Trans i18nKey="pages.EvaluationStockCash.trading-rules-every-trader-must-follow"><Trans i18nKey="pages.EvaluationStockCash.trading-rules-every-trader-must-follow-1">Trading Rules Every Trader Must Follow</Trans></Trans></h2>
      <ul className="list-decimal pl-6 text-base mb-4 text-white">
        <li><Trans i18nKey="pages.EvaluationStockCash.do-not-over-trade">Do not over trade.</Trans></li>
        
        <li><Trans i18nKey="pages.EvaluationStockCash.trade-each-recommendation-with-the-same-"><Trans i18nKey="pages.EvaluationStockCash.trade-each-recommendation-with-the-same--1">Trade each recommendation with the same quantity as advised by the Research Team.</Trans></Trans></li>
        <li><Trans i18nKey="pages.EvaluationStockCash.profit-and-loss-are-subject-to-market-ri"><Trans i18nKey="pages.EvaluationStockCash.profit-and-loss-are-subject-to-market-ri-1">Profit and loss are subject to market risk; there is no guarantee or assurance.</Trans></Trans></li>
        <li><Trans i18nKey="pages.EvaluationStockCash.never-be-emotional-while-trading"><Trans i18nKey="pages.EvaluationStockCash.never-be-emotional-while-trading-1">Never be emotional while trading.</Trans></Trans></li>
        <li><Trans i18nKey="pages.EvaluationStockCash.beware-of-overnight-risk"><Trans i18nKey="pages.EvaluationStockCash.beware-of-overnight-risk-1">Beware of overnight risk.</Trans></Trans></li>
        <li><Trans i18nKey="pages.EvaluationStockCash.always-trade-with-a-stop-loss"><Trans i18nKey="pages.EvaluationStockCash.always-trade-with-a-stop-loss-1">Always trade with a stop loss.</Trans></Trans></li>
        <li><Trans i18nKey="pages.EvaluationStockCash.don-t-look-back-and-regret-past-trades"><Trans i18nKey="pages.EvaluationStockCash.don-t-look-back-and-regret-past-trades-1">Don’t look back and regret past trades.</Trans></Trans></li>
        <li><Trans i18nKey="pages.EvaluationStockCash.don-t-over-leverage-in-a-volatile-market"><Trans i18nKey="pages.EvaluationStockCash.don-t-over-leverage-in-a-volatile-market-1">Don’t over-leverage in a volatile market.</Trans></Trans></li>
        <li><Trans i18nKey="pages.EvaluationStockCash.costs-matter-a-lot-when-you-are-a-trader"><Trans i18nKey="pages.EvaluationStockCash.costs-matter-a-lot-when-you-are-a-trader-1">Costs matter a lot when you are a trader.</Trans></Trans></li>
        <li><Trans i18nKey="pages.EvaluationStockCash.protect-your-capital-first-trading-begin"><Trans i18nKey="pages.EvaluationStockCash.protect-your-capital-first-trading-begin-1">Protect your capital first—trading begins with risk management.</Trans></Trans></li>
        <li><Trans i18nKey="pages.EvaluationStockCash.sometimes-not-trading-is-also-a-valid-st"><Trans i18nKey="pages.EvaluationStockCash.sometimes-not-trading-is-also-a-valid-st-1">Sometimes, not trading is also a valid strategy.</Trans></Trans></li>
        <li><Trans i18nKey="pages.EvaluationStockCash.profit-is-what-is-booked-all-else-is-jus"><Trans i18nKey="pages.EvaluationStockCash.profit-is-what-is-booked-all-else-is-jus-1">Profit is what is booked; all else is just on paper.</Trans></Trans></li>
      </ul>
    </div>

    

    {/* Pricing Plan */}
    <div className="mb-8 text-center">
      <h2 className="text-2xl font-bold mb-2 text-white"><Trans i18nKey="pages.EvaluationStockCash.pricing-plan-for-evaluation-stock-cash"><Trans i18nKey="pages.EvaluationStockCash.pricing-plan-for-evaluation-stock-cash-1">Pricing Plan For Evaluation Stock Cash</Trans></Trans></h2>
      <div className="flex justify-center">
        <div className="border rounded-xl p-6 shadow-md bg-white/30 flex flex-col items-center max-w-xs w-full">
          <h3 className="text-xl font-bold mb-2 text-white"><Trans i18nKey="pages.EvaluationStockCash.cash-evaluation-pack"><Trans i18nKey="pages.EvaluationStockCash.cash-evaluation-pack-1">Cash Evaluation Pack</Trans></Trans></h3>
          <div className="text-3xl font-extrabold text-white mb-2">₹5,100 <span className="text-base font-normal"><Trans i18nKey="pages.EvaluationStockCash.10-days">/ weekly</Trans></span></div>
          <div className="mb-2 text-white"><Trans i18nKey="pages.EvaluationStockCash.2-to-3-calls-in-a-day"><Trans i18nKey="pages.EvaluationStockCash.2-to-3-calls-in-a-day-1">2 to 3 Calls in a Day</Trans></Trans></div>
          <Link to="/payment">
            <button className="bg-[var(--primary-green)] text-white px-6 py-2 rounded-lg font-semibold mt-2"><Trans i18nKey="pages.EvaluationStockCash.payment">Payment</Trans></button>
          </Link>
          <div className="text-xs text-white mt-2"><Trans i18nKey="pages.EvaluationStockCash.note-prices-are-excluding-gst-18"><Trans i18nKey="pages.EvaluationStockCash.note-prices-are-excluding-gst-18-1">Note: Prices are excluding GST (18%)</Trans></Trans></div>
        </div>
      </div>
    </div>

    {/* Why Choose Us Section */}
    <div className="my-12">
      <h2 className="text-2xl font-bold mb-4 text-center text-white"><Trans i18nKey="pages.EvaluationStockCash.why-choose-evaluation-stock-cash"><Trans i18nKey="pages.EvaluationStockCash.why-choose-evaluation-stock-cash-1">Why Choose Evaluation Stock Cash?</Trans></Trans></h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/20 rounded-lg p-6 flex flex-col items-center">
          <FaChartLine className="text-4xl mb-2 text-blue-300" />
          <h3 className="font-bold text-lg mb-1 text-white"><Trans i18nKey="pages.EvaluationStockCash.expert-research">Expert Research</Trans></h3>
          <p className="text-white text-center"><Trans i18nKey="pages.EvaluationStockCash.our-team-combines-technical-and-fundamen"><Trans i18nKey="pages.EvaluationStockCash.our-team-combines-technical-and-fundamen-1">Our team combines technical and fundamental analysis for the most reliable stock recommendations.</Trans></Trans></p>
        </div>
        <div className="bg-white/20 rounded-lg p-6 flex flex-col items-center">
          <FaRegClock className="text-4xl mb-2 text-yellow-300" />
          <h3 className="font-bold text-lg mb-1 text-white"><Trans i18nKey="pages.EvaluationStockCash.timely-updates">Timely Updates</Trans></h3>
          <p className="text-white text-center"><Trans i18nKey="pages.EvaluationStockCash.get-instant-trade-signals-and-support-du"><Trans i18nKey="pages.EvaluationStockCash.get-instant-trade-signals-and-support-du-1">Get instant trade signals and support during Indian market hours.</Trans></Trans></p>
        </div>
        <div className="bg-white/20 rounded-lg p-6 flex flex-col items-center">
          <FaUserCheck className="text-4xl mb-2 text-green-400" />
          <h3 className="font-bold text-lg mb-1 text-white"><Trans i18nKey="pages.EvaluationStockCash.trusted-by-traders"><Trans i18nKey="pages.EvaluationStockCash.trusted-by-traders-1">Trusted by Traders</Trans></Trans></h3>
          <p className="text-white text-center"><Trans i18nKey="pages.EvaluationStockCash.hundreds-of-stock-traders-rely-on-our-si"><Trans i18nKey="pages.EvaluationStockCash.hundreds-of-stock-traders-rely-on-our-si-1">Hundreds of stock traders rely on our signals for consistent results.</Trans></Trans></p>
        </div>
      </div>
    </div>

    {/* FAQ Section */}
    <div className="my-12">
      <h2 className="text-2xl font-bold mb-4 text-center text-white"><Trans i18nKey="pages.EvaluationStockCash.frequently-asked-questions"><Trans i18nKey="pages.EvaluationStockCash.frequently-asked-questions-1">Frequently Asked Questions</Trans></Trans></h2>
      <div className="max-w-3xl mx-auto">
        <div className="mb-4">
          <h3 className="font-semibold text-white"><Trans i18nKey="pages.EvaluationStockCash.q-how-will-i-receive-the-recommendations"><Trans i18nKey="pages.EvaluationStockCash.q-how-will-i-receive-the-recommendations-1">Q: How will I receive the recommendations?</Trans></Trans></h3>
          <p className="text-white">A: Recommendations are delivered via your registered contact channel.</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-white"><Trans i18nKey="pages.EvaluationStockCash.q-can-i-get-support-if-i-have-questions"><Trans i18nKey="pages.EvaluationStockCash.q-can-i-get-support-if-i-have-questions-1">Q: Can I get support if I have questions?</Trans></Trans></h3>
          <p className="text-white">A: Our support team is available during Indian market hours.</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-white"><Trans i18nKey="pages.EvaluationStockCash.q-is-there-a-refund-policy"><Trans i18nKey="pages.EvaluationStockCash.q-is-there-a-refund-policy-1">Q: Is there a refund policy?</Trans></Trans></h3>
          <p className="text-white"><Trans i18nKey="pages.EvaluationStockCash.a-please-refer-to-our-terms-and-conditio"><Trans i18nKey="pages.EvaluationStockCash.a-please-refer-to-our-terms-and-conditio-1">A: Please refer to our terms and conditions or contact support for refund-related queries.</Trans></Trans></p>
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

export default EvaluationStockCash;
