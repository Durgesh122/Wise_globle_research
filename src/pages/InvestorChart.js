import React from 'react';
import { motion } from 'framer-motion';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1, delayChildren: 0.2, duration: 0.7, ease: 'easeOut' }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const InvestorCharter = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-trasprint text-white">
      <motion.div className="max-w-4xl mx-auto" initial="hidden" animate="visible" variants={containerVariants}>

        {/* Header */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <h2 className="text-3xl font-extrabold bg-clip-text text-white bg-gradient-to-r from-blue-400 to-purple-400">
            Investor Charter
          </h2>
          <p className="mt-2 text-white">In Respect of Research Analysts (RAs)</p>
        </motion.div>

        {/* Section A: Vision and Mission */}
        <motion.div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20 mb-8" variants={itemVariants}>
          <h3 className="text-xl font-semibold text-white border-b border-white/20 pb-2 mb-4">A. Vision and Mission Statements for Investors</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-medium text-blue-400">Vision</h4>
              <p className="text-white">Invest with knowledge & safety.</p>
            </div>
            <div>
              <h4 className="text-lg font-medium text-blue-400">Mission</h4>
              <p className="text-white">Every investor should be able to invest in right investment products based on their needs, manage and monitor them to meet their goals, access reports and enjoy financial wellness.</p>
            </div>
          </div>
        </motion.div>

        {/* Section B: Business Transacted */}
        <motion.div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20 mb-8" variants={itemVariants}>
          <h3 className="text-xl font-semibold text-white border-b border-white/20 pb-2 mb-4">B. Details of Business Transacted by the Research Analyst with Respect to the Investors</h3>
          <ul className="list-disc list-inside space-y-2 text-white">
            <li>To publish research report based on the research activities of the RA.</li>
            <li>To provide an independent unbiased view on securities.</li>
            <li>To offer unbiased recommendation, disclosing the financial interests in recommended securities.</li>
            <li>To provide research recommendation, based on analysis of publicly available information and known observations.</li>
            <li>To conduct audit annually.</li>
            <li>To ensure that all advertisements are in adherence to the provisions of the Advertisement Code for Research Analysts.</li>
            <li>To maintain records of interactions, with all clients including prospective clients (prior to onboarding), where any conversation related to the research services has taken place.</li>
          </ul>
        </motion.div>

        {/* Section C: Services Provided */}
        <motion.div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20 mb-8" variants={itemVariants}>
          <h3 className="text-xl font-semibold text-white border-b border-white/20 pb-2 mb-4">C. Details of Services Provided to Investors (No Indicative Timelines)</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-medium text-blue-400">Onboarding of Clients</h4>
              <ul className="list-disc list-inside text-white">
                <li>Sharing of terms and conditions of research services.</li>
                <li>Completing KYC of fee-paying clients.</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium text-blue-400">Disclosure to Clients</h4>
              <ul className="list-disc list-inside text-white">
                <li>To disclose information that is material for the client to make an informed decision, including details of its business activity, disciplinary history, the terms and conditions of research services, details of associates, risks and conflicts of interest, if any.</li>
                <li>To disclose the extent of use of Artificial Intelligence tools in providing research services.</li>
                <li>To disclose, while distributing a third-party research report, any material conflict of interest of such third-party research provider or provide web address that directs a recipient to the relevant disclosures.</li>
                <li>To disclose any conflict of interest of the activities of providing research services with other activities of the research analyst.</li>
              </ul>
            </div>
            <ul className="list-disc list-inside text-white space-y-2">
              <li>To distribute research reports and recommendations to the clients without discrimination.</li>
              <li>To maintain confidentiality w.r.t publication of the research report until made available in the public domain.</li>
              <li>To respect data privacy rights of clients and take measures to protect unauthorized use of their confidential information.</li>
              <li>To disclose the timelines for the services provided by the research analyst to clients and ensure adherence to the said timelines.</li>
              <li>To provide clear guidance and adequate caution notice to clients when providing recommendations for dealing in complex and high-risk financial products/services.</li>
              <li>To treat all clients with honesty and integrity.</li>
              <li>To ensure confidentiality of information shared by clients unless such information is required to be provided in furtherance of discharging legal obligations or a client has provided specific consent to share such information.</li>
            </ul>
          </div>
        </motion.div>

        {/* Section D: Grievance Redressal Mechanism */}
        <motion.div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20 mb-8" variants={itemVariants}>
          <h3 className="text-xl font-semibold text-white border-b border-white/20 pb-2 mb-4">D. Details of Grievance Redressal Mechanism and How to Access It</h3>
          <div className="space-y-4">
            <p className="text-white">1. Investor can lodge complaint/grievance against Research Analyst in the following ways:</p>
            <div>
              <h4 className="text-lg font-medium text-blue-400">Mode of Filing the Complaint with Research Analyst</h4>
              <p className="text-white">In case of any grievance/complaint, an investor may approach the concerned Research Analyst who shall strive to redress the grievance immediately, but not later than 21 days of the receipt of the grievance.</p>
            </div>
            <div>
              <h4 className="text-lg font-medium text-blue-400">Mode of Filing the Complaint on SCORES or with Research Analyst Administration and Supervisory Body (RAASB)</h4>
              <ul className="list-disc list-inside text-white">
                <li>SCORES 2.0 (a web-based centralized grievance redressal system of SEBI for facilitating effective grievance redressal in time-bound manner) (<a href="https://scores.sebi.gov.in" className="text-blue-400 hover:underline">https://scores.sebi.gov.in</a>)</li>
                <li>Two-level review for complaint/grievance against Research Analyst:
                  <ul className="list-circle list-inside ml-4">
                    <li>First review done by designated body (RAASB)</li>
                    <li>Second review done by SEBI</li>
                  </ul>
                </li>
                <li>Email to designated email ID of RAASB</li>
              </ul>
            </div>
            <p className="text-white">2. If the Investor is not satisfied with the resolution provided by the Market Participants, then the Investor has the option to file the complaint/grievance on SMARTODR platform for its resolution through online conciliation or arbitration.</p>
            <p className="text-white">With regard to physical complaints, investors may send their complaints to:</p>
            <p className="text-white font-medium">
              Office of Investor Assistance and Education, Securities and Exchange Board of India, SEBI Bhavan, Plot No.C4-A, ‘G’ Block, Bandra – Kurla Complex, Bandra (E), Mumbai-400051
            </p>
          </div>
        </motion.div>

        {/* Section E: Rights of Investors */}
        <motion.div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20 mb-8" variants={itemVariants}>
          <h3 className="text-xl font-semibold text-white border-b border-white/20 pb-2 mb-4">E. Rights of Investors</h3>
          <ul className="list-disc list-inside space-y-2 text-white">
            <li>Right to Privacy and Confidentiality</li>
            <li>Right to Transparent Practices</li>
            <li>Right to Adequate Information</li>
            <li>Right to Initial and Continuing Disclosure</li>
            <li>Right to receive information about all the statutory and regulatory disclosures</li>
            <li>Right to Awareness about Service Parameters and Turnaround Times</li>
            <li>Right to be informed of the timelines for each service</li>
            <li>Right to be Heard and Satisfactory Grievance Redressal</li>
            <li>Right to have timely redressal</li>
            <li>Right to Exit from Financial product or service in accordance with the terms and conditions agreed with the research analyst</li>
            <li>Right to receive clear guidance and caution notice when dealing in Complex and High-Risk Financial Products and Services</li>
            <li>Additional Rights to vulnerable consumers
              <ul className="list-circle list-inside ml-4">
                <li>Right to get access to services in a suitable manner even if differently abled</li>
              </ul>
            </li>
            <li>Right to provide feedback on the financial products and services used</li>
          </ul>
        </motion.div>

        {/* Section F: Expectations from Investors */}
        <motion.div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20 mb-8" variants={itemVariants}>
          <h3 className="text-xl font-semibold text-white border-b border-white/20 pb-2 mb-4">F. Expectations from the Investors (Responsibilities of Investors)</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-medium text-blue-400">Do’s</h4>
              <ul className="list-decimal list-inside text-white space-y-2">
                <li>Always deal with SEBI registered Research Analyst.</li>
                <li>Ensure that the Research Analyst has a valid registration certificate.</li>
                <li>Check for SEBI registration number.</li>
                <li>Please refer to the list of all SEBI registered Research Analyst which is available on SEBI website in the following link: <a href="https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognisedFpi=yes&intmId=14" className="text-blue-400 hover:underline">https://www.sebi.gov.in</a></li>
                <li>Always pay attention towards disclosures made in the research reports before investing.</li>
                <li>Pay your Research Analyst through banking channels only and maintain duly signed receipts mentioning the details of your payments. You may make payment of fees through Centralized Fee Collection Mechanism (CeFCoM) of RAASB if research analyst has opted for the mechanism. (Applicable for fee-paying clients only)</li>
                <li>Before buying/selling securities or applying in public offer, check for the research recommendation provided by your Research Analyst.</li>
                <li>Ask all relevant questions and clear your doubts with your Research Analyst before acting on recommendation.</li>
                <li>Seek clarifications and guidance on research recommendations from your Research Analyst, especially if it involves complex and high-risk financial products and services.</li>
                <li>Always be aware that you have the right to stop availing the service of a Research Analyst as per the terms of service agreed between you and your Research Analyst.</li>
                <li>Always be aware that you have the right to provide feedback to your Research Analyst in respect of the services received.</li>
                <li>Always be aware that you will not be bound by any clause, prescribed by the research analyst, which is contravening any regulatory provisions.</li>
                <li>Inform SEBI about Research Analyst offering assured or guaranteed returns.</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium text-blue-400">Don’ts</h4>
              <ul className="list-decimal list-inside text-white space-y-2">
                <li>Do not provide funds for investment to the Research Analyst.</li>
                <li>Don’t fall prey to luring advertisements or market rumors.</li>
                <li>Do not get attracted to limited period discount or other incentive, gifts, etc. offered by Research Analyst.</li>
                <li>Do not share login credential and password of your trading, demat or bank accounts with the Research Analyst.</li>
              </ul>
            </div>
          </div>
        </motion.div>


      </motion.div>
    </div>
  );
};

export default InvestorCharter;