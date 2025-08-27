
import { FaLightbulb, FaBolt, FaLock } from 'react-icons/fa';
import { Trans } from '../i18nShim';
import { Link } from 'react-router-dom';

const InfinityClub = () => (
  <div className="container mx-auto py-12 px-4 max-w-5xl text-white">
    <h1 className="text-4xl font-extrabold mb-4 text-center text-white"><Trans i18nKey="pages.InfinityClub.infinity-club">Infinity Club</Trans></h1>
    <p className="text-lg mb-6 text-center text-white">
      In Infinity Club, we provide you Future and Option intraday recommendations with proper target &amp; Stop loss in NSE Stock Market. The Pack is specially designed for traders who’s working in all segment of NSE market with proper research-based recommendations and believes in limited but quality trades. Our highly experienced teams always focus on proper entry and exit time of customer; we provide you research on the in-depth analysis using technical and fundamental analysis.
    </p>

    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-2 text-white"><Trans i18nKey="pages.InfinityClub.infinity-club-features">Infinity Club Features</Trans></h2>
      <ul className="list-disc pl-6 text-base mb-4 text-white">
        <li><Trans i18nKey="pages.InfinityClub.we-provides-2-3-intraday-positional-reco"><Trans i18nKey="pages.InfinityClub.we-provides-2-3-intraday-positional-reco-1">We provides 2-3 Intraday/Positional recommendation’s (as per market conditions).</Trans></Trans></li>
        <li><Trans i18nKey="pages.InfinityClub.all-recommendation-will-have-2-tgt-with-"><Trans i18nKey="pages.InfinityClub.all-recommendation-will-have-2-tgt-with--1">All recommendation will have 2 TGT with proper Stop loss.</Trans></Trans></li>
        <li><Trans i18nKey="pages.InfinityClub.timely-follow-ups-of-all-the-trade-signa"><Trans i18nKey="pages.InfinityClub.timely-follow-ups-of-all-the-trade-signa-1">Timely Follow Ups of all the trade signals</Trans></Trans></li>
        <li><Trans i18nKey="pages.InfinityClub.proper-time-for-entry-amp-exit-in-recomm"><Trans i18nKey="pages.InfinityClub.proper-time-for-entry-amp-exit-in-recomm-1">Proper time for entry &amp; exit in recommendations.</Trans></Trans></li>
        <li><Trans i18nKey="pages.InfinityClub.nifty-and-bank-nifty-trend-and-support-a"><Trans i18nKey="pages.InfinityClub.nifty-and-bank-nifty-trend-and-support-a-1">Nifty and Bank Nifty Trend and Support and resistance.</Trans></Trans></li>
        <li><Trans i18nKey="pages.InfinityClub.carefully-analysis-market-direction"><Trans i18nKey="pages.InfinityClub.carefully-analysis-market-direction-1">Carefully Analysis Market direction.</Trans></Trans></li>
        <li><Trans i18nKey="pages.InfinityClub.concise-information-of-domestic-amp-worl"><Trans i18nKey="pages.InfinityClub.concise-information-of-domestic-amp-worl-1">Concise information of Domestic &amp; World Market.</Trans></Trans></li>
        
        
      </ul>
      <p className="text-base mb-2 text-white"><Trans i18nKey="pages.InfinityClub.trading-rules-that-every-trader-must-stu"><Trans i18nKey="pages.InfinityClub.trading-rules-that-every-trader-must-stu-1">Trading rules that every trader must studious follow.</Trans></Trans></p>
    </div>

    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-2 text-white"><Trans i18nKey="pages.InfinityClub.trading-rules-every-trader-must-follow"><Trans i18nKey="pages.InfinityClub.trading-rules-every-trader-must-follow-1">Trading Rules Every Trader Must Follow</Trans></Trans></h2>
      <ul className="list-decimal pl-6 text-base mb-4 text-white">
        <li><Trans i18nKey="pages.InfinityClub.do-not-over-trade">Do not over trade.</Trans></li>
  {/* Removed SMS-only rule per policy */}
        <li><Trans i18nKey="pages.InfinityClub.have-to-trade-on-each-recommendation-wit"><Trans i18nKey="pages.InfinityClub.have-to-trade-on-each-recommendation-wit-1">Have to trade on each Recommendation with same quantity according to Research Team.</Trans></Trans></li>
        <li><Trans i18nKey="pages.InfinityClub.profit-and-loss-is-subject-to-market-ris"><Trans i18nKey="pages.InfinityClub.profit-and-loss-is-subject-to-market-ris-1">Profit and Loss is subject to market risk and there is no guarantee or assurance for it.</Trans></Trans></li>
        <li><Trans i18nKey="pages.InfinityClub.never-be-emotional">Never be emotional.</Trans></li>
        <li><Trans i18nKey="pages.InfinityClub.beware-of-overnight-risk">Beware of overnight risk.</Trans></li>
        <li><Trans i18nKey="pages.InfinityClub.always-trade-with-a-stop-loss"><Trans i18nKey="pages.InfinityClub.always-trade-with-a-stop-loss-1">Always trade with a stop loss.</Trans></Trans></li>
        <li><Trans i18nKey="pages.InfinityClub.don-t-look-back-and-rue-trades"><Trans i18nKey="pages.InfinityClub.don-t-look-back-and-rue-trades-1">Don’t look back and rue trades.</Trans></Trans></li>
        <li><Trans i18nKey="pages.InfinityClub.don-t-over-leverage-in-a-volatile-market"><Trans i18nKey="pages.InfinityClub.don-t-over-leverage-in-a-volatile-market-1">Don’t over leverage in a volatile market.</Trans></Trans></li>
        <li><Trans i18nKey="pages.InfinityClub.costs-matter-a-lot-when-you-are-a-trader"><Trans i18nKey="pages.InfinityClub.costs-matter-a-lot-when-you-are-a-trader-1">Costs matter a lot when you are a trader.</Trans></Trans></li>
        <li><Trans i18nKey="pages.InfinityClub.trading-begins-with-protecting-your-capi"><Trans i18nKey="pages.InfinityClub.trading-begins-with-protecting-your-capi-1">Trading begins with protecting your capital.</Trans></Trans></li>
        <li><Trans i18nKey="pages.InfinityClub.not-doing-anything-is-also-a-trading-str"><Trans i18nKey="pages.InfinityClub.not-doing-anything-is-also-a-trading-str-1">Not doing anything is also a trading strategy.</Trans></Trans></li>
        <li><Trans i18nKey="pages.InfinityClub.profit-is-what-is-booked-all-else-is-boo"><Trans i18nKey="pages.InfinityClub.profit-is-what-is-booked-all-else-is-boo-1">Profit is what is booked; all else is book profits.</Trans></Trans></li>
      </ul>
    </div>

    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-2 text-white"><Trans i18nKey="pages.InfinityClub.sample-calls">Sample Calls</Trans></h2>
      <div className="bg-white/10 rounded-lg p-4 text-center text-base text-white font-mono"><Trans i18nKey="pages.InfinityClub.buy-angelone-2300-ce-above-65-target-75-"><Trans i18nKey="pages.InfinityClub.buy-angelone-2300-ce-above-65-target-75--1">BUY ANGELONE 2300 CE ABOVE 65 TARGET 75 90 STOPLOSS 50</Trans></Trans></div>
    </div>

    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-2 text-white text-center"><Trans i18nKey="pages.InfinityClub.pricing-plan-for-infinity-club"><Trans i18nKey="pages.InfinityClub.pricing-plan-for-infinity-club-1">Pricing Plan For Infinity Club</Trans></Trans></h2>
      <div className="flex justify-center">
        <div className="border rounded-xl p-6 shadow-md bg-white/30 flex flex-col items-center w-full max-w-md">
          <h3 className="text-xl font-bold mb-2 text-white"><Trans i18nKey="pages.InfinityClub.infinity-club">Infinity Club</Trans></h3>
          <div className="text-3xl font-extrabold text-white mb-2">₹1,51,000 <span className="text-base font-normal"><Trans i18nKey="pages.InfinityClub.quarterly">/ Quarterly</Trans></span></div>
          <div className="mb-2 text-white"><Trans i18nKey="pages.InfinityClub.2-to-3-calls-in-a-day">2 to 3 Calls in a Day</Trans></div>
          <Link to="/payment">
            <button className="bg-[var(--primary-green)] text-white px-6 py-2 rounded-lg font-semibold mt-2"><Trans i18nKey="pages.InfinityClub.payment">Payment</Trans></button>
          </Link>
          <div className="text-xs text-white mt-2"><Trans i18nKey="pages.InfinityClub.note-pricing-are-excluding-gst-18"><Trans i18nKey="pages.InfinityClub.note-pricing-are-excluding-gst-18-1">Note: Pricing are excluding GST (18%)</Trans></Trans></div>
        </div>
      </div>
    </div>

    

    {/* Why Choose Us Section */}
    <div className="my-12">
      <h2 className="text-2xl font-bold mb-4 text-center text-white"><Trans i18nKey="pages.InfinityClub.why-choose-infinity-club">Why Choose Infinity Club?</Trans></h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/20 rounded-lg p-6 flex flex-col items-center">
          <FaLightbulb className="text-4xl mb-2 text-yellow-300" />
          <h3 className="font-bold text-lg mb-1 text-white"><Trans i18nKey="pages.InfinityClub.expert-research">Expert Research</Trans></h3>
          <p className="text-white text-center"><Trans i18nKey="pages.InfinityClub.our-team-combines-technical-and-fundamen"><Trans i18nKey="pages.InfinityClub.our-team-combines-technical-and-fundamen-1">Our team combines technical and fundamental analysis for the most reliable recommendations.</Trans></Trans></p>
        </div>
        <div className="bg-white/20 rounded-lg p-6 flex flex-col items-center">
          <FaBolt className="text-4xl mb-2 text-blue-300" />
          <h3 className="font-bold text-lg mb-1 text-white"><Trans i18nKey="pages.InfinityClub.real-time-support">Real-Time Support</Trans></h3>
          <p className="text-white text-center">Get help and trade updates during Indian market hours.</p>
        </div>
        <div className="bg-white/20 rounded-lg p-6 flex flex-col items-center">
          <FaLock className="text-4xl mb-2 text-green-300" />
          <h3 className="font-bold text-lg mb-1 text-white"><Trans i18nKey="pages.InfinityClub.trusted-by-traders">Trusted by Traders</Trans></h3>
          <p className="text-white text-center"><Trans i18nKey="pages.InfinityClub.hundreds-of-f-amp-o-traders-rely-on-our-"><Trans i18nKey="pages.InfinityClub.hundreds-of-f-amp-o-traders-rely-on-our--1">Hundreds of F&amp;O traders rely on our signals for consistent results.</Trans></Trans></p>
        </div>
      </div>
    </div>

    {/* FAQ Section */}
    <div className="my-12">
      <h2 className="text-2xl font-bold mb-4 text-center text-white"><Trans i18nKey="pages.InfinityClub.frequently-asked-questions"><Trans i18nKey="pages.InfinityClub.frequently-asked-questions-1">Frequently Asked Questions</Trans></Trans></h2>
      <div className="max-w-3xl mx-auto">
        <div className="mb-4">
          <h3 className="font-semibold text-white"><Trans i18nKey="pages.InfinityClub.q-how-will-i-receive-the-recommendations"><Trans i18nKey="pages.InfinityClub.q-how-will-i-receive-the-recommendations-1">Q: How will I receive the recommendations?</Trans></Trans></h3>
          <p className="text-white">A: Recommendations are shared via your registered contact channel.</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-white"><Trans i18nKey="pages.InfinityClub.q-can-i-get-support-if-i-have-questions"><Trans i18nKey="pages.InfinityClub.q-can-i-get-support-if-i-have-questions-1">Q: Can I get support if I have questions?</Trans></Trans></h3>
          <p className="text-white">A: Yes, support is available during Indian market hours for any queries.</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-white"><Trans i18nKey="pages.InfinityClub.q-is-there-a-refund-policy"><Trans i18nKey="pages.InfinityClub.q-is-there-a-refund-policy-1">Q: Is there a refund policy?</Trans></Trans></h3>
          <p className="text-white"><Trans i18nKey="pages.InfinityClub.a-please-refer-to-our-terms-and-conditio"><Trans i18nKey="pages.InfinityClub.a-please-refer-to-our-terms-and-conditio-1">A: Please refer to our terms and conditions or contact support for refund-related queries.</Trans></Trans></p>
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

export default InfinityClub;
