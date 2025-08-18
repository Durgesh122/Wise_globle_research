// src/pages/Terms.js
import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

function Terms() {
  return (
    <div
      className="container mx-auto px-4 py-12 min-h-screen bg-transparent text-white"
      data-aos="fade-in"
    >
      <motion.h1
        className="text-3xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Terms & Conditions
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="terms-content text-white leading-relaxed break-words max-w-3xl mx-auto"
      >
        <section className="mb-8">
            <motion.p
            className="mb-2 text-white/90"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Dear Client, Welcome to “Wise Global Research Services Pvt Ltd.”…!!! By accessing this website and any of its pages, you are agreeing to these Terms and Conditions. You also agree that Wise Global Research Services Pvt Ltd. can modify or alter the Terms and Conditions of the use of this service without any liability and prior notice.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <FaCheckCircle className="inline text-green-500 mr-1" /> Please go through the terms & conditions.
          </motion.p>
        </section>

        <section className="mb-8">
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
            Wise Global Research Services Pvt Ltd. always provides recommendations with proper stop loss. It is mandatory for clients to maintain stop loss in each and every trading recommendation of us. Wise Global Research Services Pvt Ltd. will not be liable in cases where client fails to maintain given stop loss given by SMS.
          </motion.p>
        </section>

        <section className="mb-8">
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
            All the services/trading recommendation are provided only via SMS, telephonic support is provided to client only upon the SMS provided by us, if client opt that (depending on services) in a written request from client, we do not render any services/trading recommendation over phone call, it is only a support to overcome any kind of misinterpretation of trading recommendation provided by us via SMS.
          </motion.p>
        </section>

        <section className="mb-8">
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.5 }}>
            Wise Global Research Services Pvt Ltd. will not be held responsible for any kind of delay in SMS for any reason (Due to 3rd Party technical failure, please read carefully this term in Disclaimer).
          </motion.p>
        </section>

        <section className="mb-8">
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.5 }}>
            Client needs to trade on each & every recommendation/trading calls provided by us for better result.
          </motion.p>
        </section>

        <section className="mb-8">
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7, duration: 0.5 }}>
            If you are encountering any issue immediately contact us at support@wiseglobalresearch.com
          </motion.p>
        </section>

        <section className="mb-8">
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8, duration: 0.5 }}>
            In order to enjoy full benefits of services client needs to complete his package.
          </motion.p>
        </section>

        <section className="mb-8">
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9, duration: 0.5 }}>
            Service will start post completion of KYC as per norms. Service tenure will be applicable as per the package.
          </motion.p>
        </section>

        <section className="mb-8">
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0, duration: 0.5 }}>
            Investment in NSE/BSE/MCX/Stock Market is subject to market risk. Client need to follow all the given technical levels & instructions in a strict manner.
          </motion.p>
        </section>

        <section className="mb-8">
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1, duration: 0.5 }}>
            We do not offer any type of guaranteed service, surety and fixed profit commitment plan. We do not have services related to any type of profit sharing or portfolio management services.
          </motion.p>
        </section>

        <section className="mb-8">
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2, duration: 0.5 }}>
            We suggest you not to work on personal recommendation given by associates of company. You have paid the service charges in the company to receive the recommendations on SMS.
          </motion.p>
        </section>

        <section className="mb-8">
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.3, duration: 0.5 }}>
            You are not supposed to give your De-mat login id, password to any of our employees. Neither company nor any of the employees are responsible for your losses, it will be at your own risk.
          </motion.p>
        </section>

        <section className="mb-8">
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.4, duration: 0.5 }}>
            Wise Global Research Services Pvt Ltd. takes all the necessary measures related to risk and rewards involved in markets before delivering any advice to client but we do not take the responsibility of any kind of losses occurred on trades.
          </motion.p>
        </section>

        <section className="mb-8">
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.5, duration: 0.5 }}>
            Payment of Fee: Subscription Fee is paid in advance followed by KYC process. It is assumed that client has made payment with his free consent. Profit and loss which is the result of the trading and investment will be totally borne by the client. Subscription fees once paid is Non-Refundable. However, if a client is having any kind of issue, they may raise their complaints regarding refund which may be considered as per the terms & condition of Wise Global Research Services Pvt Ltd. Exceptional cases exclude Profit & Loss incurred on recommendations rendered, Availability of client for placing trades or other market associated reasons affecting capital & same in nature.
          </motion.p>
        </section>

        <section className="mb-8">
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.6, duration: 0.5 }}>
            Kind Attention for all traders/investors: Wise Global Research Services Pvt Ltd. will render services only after receiving all credentials i.e., KYC for acknowledgement of mutual well-being.
          </motion.p>
        </section>

        <section className="mb-8">
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.7, duration: 0.5 }}>
            We take the security of our client transactions very seriously. For this reason, we ask that you NOT allow children or other unauthorized family members or friends to access your credit cards, debit cards or your account at the payment site to ensure that no one pays for services without your permission.
          </motion.p>
        </section>

        <section className="mb-8">
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.8, duration: 0.5 }}>
            By making a payment for Services on our site, you acknowledge that you have read and agreed to the above our Terms and Conditions along with Refund Policy.
          </motion.p>
        </section>

        <section className="mb-8">
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.9, duration: 0.5 }}>
            We as a merchant shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any Transaction, on Account of the Cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time.
          </motion.p>
        </section>

        <section className="mb-8">
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.0, duration: 0.5 }}>
            Wise Global Research Services Pvt Ltd. does not suggest taking loan for investment purpose, as the investment in Equity/Derivative/Commodity market is risky by nature.
          </motion.p>
        </section>

        <section className="mb-8">
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.1, duration: 0.5 }}>
            It is hereby voluntarily agreed between the parties hereto that any dispute or difference arising between the parties to this deed with regard to execution, meaning, working or interpretation of this deed including monetary claims etc. shall be subject to the exclusive jurisdiction of the Courts at Indore, Madhya Pradesh (India) and except courts at Indore, no other court in India shall have jurisdiction in this regard.
          </motion.p>
        </section>

        <section className="mb-8">
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.2, duration: 0.5 }}>
            Wise Global Research Services Pvt Ltd. shall not be liable for any misrepresentation, falsification, and deception or for any lack of availability of services through the website, even if the same are advertised for on the website.
          </motion.p>
        </section>

        <section className="mb-8">
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.3, duration: 0.5 }}>
            No judgment or warranty or representation is made with respect to the accuracy, timeliness, or suitability of the content of other services or sites to which these screens link, and Wise Global Research Services Pvt Ltd. shall not be responsible therefore Wise Global Research Services Pvt Ltd. shall not be liable if the customer downloads any information from this website.
          </motion.p>
        </section>

        <section className="mb-8">
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.4, duration: 0.5 }}>
            Further, Wise Global Research Services Pvt Ltd. shall not be liable if the customer makes a copy, modifies, uploads, downloads, other notices or legends contained in any such information or otherwise distributes any service or content from this website.
          </motion.p>
        </section>

        <section className="mb-8">
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.5, duration: 0.5 }}>
            Wise Global Research Services Pvt Ltd. reserves the right at any time and from time to time to modify or discontinue, temporarily or permanently, the service (or any part thereof) with or without notice at any time. You agree that Wise Global Research Services Pvt Ltd. shall not be liable to you or to any third party for any modification, suspension or discontinuance of the service.
          </motion.p>
        </section>

        <section className="mb-8">
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.6, duration: 0.5 }}>
            Registration: In order to use Wise Global Research Services Pvt Ltd., you must provide certain personal information as per regulations.
          </motion.p>
        </section>

        <section className="mb-8">
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.7, duration: 0.5 }}>
            For all Terms & Conditions please refer our Webpage <a href="https://wiseglobalresearch.com" className="text-blue-500 hover:underline">https://wiseglobalresearch.com</a>
          </motion.p>
        </section>

        <section className="mb-8">
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.8, duration: 0.5 }}>
            Any surfing and reading of the information are the acceptance of this Terms & Condition. All Rights Reserved with Wise Global Research Services Pvt Ltd.
          </motion.p>
        </section>
      </motion.div>
    </div>
  );
}

export default Terms;
