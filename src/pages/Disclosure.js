import React from 'react';
import { Trans, useTranslation } from '../i18nShim';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

function Disclosure() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t('pages.Disclosure.disclosure-wise-global-research', 'Disclosure | Wise Global Research')}</title>
        <meta name="description" content="Read the disclosure and important information for Wise Global Research Services Pvt. Ltd." />
        <meta property="og:title" content="Disclosure | Wise Global Research" />
        <meta property="og:description" content="Read the disclosure and important information for Wise Global Research Services Pvt. Ltd." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wiseglobalresearch.com/disclosure" />
        <meta name="twitter:title" content="Disclosure | Wise Global Research" />
        <meta name="twitter:description" content="Read the disclosure and important information for Wise Global Research Services Pvt. Ltd." />
      </Helmet>
      <motion.div
        className="py-16 px-6 text-white"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center"><Trans i18nKey="pages.Disclosure.disclosure">Disclosure</Trans></h1>
          <div className="space-y-6 text-base leading-relaxed">
            <p><Trans i18nKey="pages.Disclosure.the-purpose-of-the-document-is-to-provid"><Trans i18nKey="pages.Disclosure.the-purpose-of-the-document-is-to-provid-1">The purpose of the Document is to provide essential information about the Research and recommendation Services in a manner to assist and enable the prospective client/client in making an informed decision for engaging in Research and recommendation services before investing.</Trans></Trans></p>
            <p>
              <strong><Trans i18nKey="pages.Disclosure.descriptions-about-wise-global-research-"><Trans i18nKey="pages.Disclosure.descriptions-about-wise-global-research--1">Descriptions about “Wise Global Research Services Pvt Ltd.”</Trans></Trans></strong><br /><Trans i18nKey="pages.Disclosure.wise-global-research-services-pvt-ltd-ai"><Trans i18nKey="pages.Disclosure.wise-global-research-services-pvt-ltd-ai-1">Wise Global Research Services Pvt Ltd. aims to provide research and recommendations services to the clients. Analyst aligns its interests with those of the client and seeks to provide the best-suited services.</Trans></Trans></p>
            <p>
              <strong><Trans i18nKey="pages.Disclosure.terms-and-conditions-of-research-and-rec"><Trans i18nKey="pages.Disclosure.terms-and-conditions-of-research-and-rec-1">Terms and conditions of Research and Recommendation Services.</Trans></Trans></strong><br />
              Recommendations are shared via official, registered communication channels. Please act only on recommendations shared through official channels. Telephonic support, where applicable, is provided to clarify recommendations; no separate recommendations are provided over phone calls.
            </p>
            <p>
              The information or advice or consultation provided on the site or by us is purely an area of research, which is susceptible to the constant changes in the market. No such information or recommendations or consultation can be held against us and the same is nothing more than our professional service based on our technical expertise, which may vary from other experts. The subscriber or user voluntarily agrees to take into consideration our inputs while making investments. Wise Global Research Services Pvt Ltd. shall not be responsible or liable for any loss.
            </p>
            <p>
              We at Wise Global Research Services Pvt Ltd. hold all rights to terminate or modify the subscription of any subscribers from our services at any time.Wise Global Research Services Pvt Ltd. will have the exclusive right to change or modify our policies, disclosures, and information provided on our platform without any notice. All visitors and subscribers to our site shall deem to have accepted the same.
            </p>
            <p>
              Wise Global Research Services Pvt Ltd. does not provide any guarantees in the stock market/share market. Every individual will be responsible for his or her own fund/buying/selling. We at Wise Global Research Services Pvt Ltd. will have no legal responsibility or liability towards any loss of health, wealth, or damages.
            </p>
            <p>
              Recommendations given to you are based on Wise Global Research Services Pvt Ltd. judgments and the information available at a particular point in time. However, Wise Global Research Services Pvt Ltd. or its employees are not responsible for the losses or gains made through the recommendations. Clients are advised to exercise our recommendations at their own risk. Wise Global Research Services Pvt Ltd. shall not be responsible for the failure of connectivity of network and internet for any reason. Stock market investments and trading are subject to market risk, in case of any full or partial capital loss, Wise Global Research Services Pvt Ltd. or any of its employees are not responsible and not liable for any compensation.
            </p>
            <p><Trans i18nKey="pages.Disclosure.user-visitor-or-subscriber-agrees-by-mak"><Trans i18nKey="pages.Disclosure.user-visitor-or-subscriber-agrees-by-mak-1">User, visitor, or subscriber agrees by making a fee payment that he has read and agreed to our terms & conditions and various disclosures.</Trans></Trans></p>
            <p>
              <strong><Trans i18nKey="pages.Disclosure.disclosures-with-respect-to-research-and"><Trans i18nKey="pages.Disclosure.disclosures-with-respect-to-research-and-1">Disclosures with respect to Research and Recommendations Services</Trans></Trans></strong><br /><Trans i18nKey="pages.Disclosure.wise-global-research-services-pvt-ltd-ma"><Trans i18nKey="pages.Disclosure.wise-global-research-services-pvt-ltd-ma-1">Wise Global Research Services Pvt Ltd. may have a financial interest or actual/beneficial ownership in the securities recommended in its personal portfolio. Details of the same may be referred to through the disclosures made at the time of advice.</Trans></Trans></p>
            <p>
              There are no actual or potential conflicts of interest arising from any connection to or association with any issuer of products/ securities, including any material information or facts that might compromise its objectivity or independence in the carrying on of Research Analyst services. Such conflict of interest shall be disclosed to the client as and when they arise.
            </p>
            <p><Trans i18nKey="pages.Disclosure.wise-global-research-services-pvt-ltd-or"><Trans i18nKey="pages.Disclosure.wise-global-research-services-pvt-ltd-or-5">Wise Global Research Services Pvt Ltd. or its employee or its associates have not received any compensation from the subject company in the past 12 months.</Trans></Trans></p>
            <p>
              Wise Global Research Services Pvt Ltd. or its employee or its associates have received any compensation for investment banking or merchant banking or brokerage services from the subject company in the past 12 months. Wise Global Research Services Pvt Ltd. or its employee or its associates have not received any compensation for products or services other than above from the subject company in the past 12 months.
            </p>
            <p><Trans i18nKey="pages.Disclosure.wise-global-research-services-pvt-ltd-or-1"><Trans i18nKey="pages.Disclosure.wise-global-research-services-pvt-ltd-or-4">Wise Global Research Services Pvt Ltd. or its employee or its associates have not received any compensation or other benefits from the Subject Company or 3rd party in connection with the research report/ recommendation.</Trans></Trans></p>
            <p><Trans i18nKey="pages.Disclosure.the-subject-company-was-not-a-client-of-"><Trans i18nKey="pages.Disclosure.the-subject-company-was-not-a-client-of--1">The subject company was not a client of Wise Global Research Services Pvt Ltd. t or its employee or its associates during twelve months preceding the date of distribution of the research report and recommendation services provided.</Trans></Trans></p>
            <p><Trans i18nKey="pages.Disclosure.wise-global-research-services-pvt-ltd-or-2"><Trans i18nKey="pages.Disclosure.wise-global-research-services-pvt-ltd-or-3">Wise Global Research Services Pvt Ltd. or its employee or its associates has not served as an officer, director, or employee of the subject company.</Trans></Trans></p>
            <p><Trans i18nKey="pages.Disclosure.wise-global-research-services-pvt-ltd-ha"><Trans i18nKey="pages.Disclosure.wise-global-research-services-pvt-ltd-ha-1">Wise Global Research Services Pvt Ltd. have not been engaged in the market-making activity of the subject company</Trans></Trans></p>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Disclosure;
