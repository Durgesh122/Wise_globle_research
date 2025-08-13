import React from 'react';
import { useTranslation } from 'react-i18next';
import ant2Image from '../assets/images/Ant2.jpg';
import mlImage from '../assets/images/MoneyLaundering.jpg';

const AntiMoneyLaundering = () => {
  const { t } = useTranslation();
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-5 text-white">
      <h1 className="mt-8 text-3xl font-bold">{t('aml_page.title')}</h1>
      <img src={ant2Image} alt="Anti-Money Laundering Overview" className="w-full rounded-lg shadow" />
      <div className="prose dark:prose-dark max-w-none">
        <p>Anti-Money Laundering (AML) is a set of policies, procedures, and technologies that prevents money laundering. It is implemented within government systems and large financial institutions to monitor potentially fraudulent activity. Anti-Money Laundering (AML) policies are guidelines and processes developed by financial organizations to detect, prevent, and report potential money laundering activities. These rules maintain regulatory compliance and contribute to worldwide efforts to prevent financial crime.</p>
        <p>Anti-Money Laundering (AML) is a set of policies, procedures, and technologies that prevents money laundering.</p>
        <p>There are three major steps in money laundering (placement, layering, and integration), and various controls are put in place to monitor suspicious activity that could be involved in money laundering.</p>
        <p>Some anti-money laundering controls include knowing your customers, software filtering, and implementing holding periods.</p>

        <h2>Money Laundering – Process</h2>
        <p>The figure below shows the three steps in money laundering and some of the controls that are used to prevent it. Money laundering is carried out through placement in a financial institution carrying out a series of transactions to disguise its original source (layering) and obtaining/using the cleaned money (integration).</p>
        {/* Process figure */}
        <img src={mlImage} alt="Money Laundering Process" className="w-full rounded-lg shadow" />

        <h2>Anti-Money Laundering – Controls</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li><strong>Criminalization</strong>: Many governments, financial institutions, and businesses impose controls to prevent money laundering. The first is criminalization by the government. The United Nations Convention Against Transnational Organized Crime has set forth guidelines that help governments to prosecute individuals involved in money laundering schemes.</li>
          <li><strong>Know Your Customers</strong>: Financial institutions must also have “know your customer” policies in place to help prevent money laundering. This involves monitoring the activity of clients and understanding the types of transactions that should raise red flags. Financial institutions are required to report suspicious activity to a financial investigation unit.</li>
          <li><strong>Record Management and Software Filtering</strong>: Financial institutions and businesses also keep detailed records of transactions and implement software that can flag suspicious activity. Customer data can be classified based on varying levels of suspicion, and transactions denied if they meet certain criteria.</li>
          <li><strong>Holding Period</strong>: Many banks require deposits to remain in an account for a designated number of days (usually around five). This holding period helps manage risk associated with money being moved through banks to launder money.</li>
          <li><strong>New Technology</strong>: The technology used to identify suspicious activity linked to money laundering continues to evolve and become more accurate. Technologies, such as AI and Big Data software, allow these systems to become more sophisticated.</li>
        </ol>
      </div>
    </div>
  );
};
export default AntiMoneyLaundering;
