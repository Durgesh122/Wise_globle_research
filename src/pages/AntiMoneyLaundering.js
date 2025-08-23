import React from 'react';
import ant2Image from '../assets/images/Ant2.jpg';
import mlImage from '../assets/images/MoneyLaundering.jpg';

const AntiMoneyLaundering = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-5 text-white">
      <h1 className="mt-8 text-3xl font-bold">Anti-Money Laundering (AML)</h1>
      <img
        src={ant2Image}
        alt="Anti-Money Laundering Overview"
        className="w-full rounded-lg shadow"
        decoding="async"
        loading="lazy"
        onError={(e) => { e.currentTarget.onerror = null; }}
      />
      <div className="prose dark:prose-dark max-w-none">
        <p>
          Anti-Money Laundering (AML) is a set of policies, procedures, and technologies that prevents money laundering. It is implemented within government systems and large financial institutions to monitor potentially fraudulent activity.
        </p>

        <p>
          AML policies are guidelines and processes developed by financial organizations to detect, prevent, and report potential money laundering activities. These rules maintain regulatory compliance and contribute to worldwide efforts to prevent financial crime.
        </p>

        <h2>Money Laundering — Overview</h2>
        <p>
          There are three major steps in money laundering: placement, layering, and integration. The process typically involves placing illicit funds into the financial system (placement), carrying out transactions to disguise the origin (layering), and returning the cleaned funds to the economy (integration).
        </p>

        <p>
          Financial institutions apply various controls to monitor suspicious activity that could be involved in money laundering. Common controls include customer due diligence, software filtering, transaction monitoring and holding periods.
        </p>

        {/* Process figure */}
        <img
          src={mlImage}
          alt="Money Laundering Process"
          className="w-full rounded-lg shadow"
          decoding="async"
          loading="lazy"
          onError={(e) => { e.currentTarget.onerror = null; }}
        />

        <h2>Anti-Money Laundering — Controls</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            <strong>Criminalization:</strong> Many governments, financial institutions, and businesses impose controls to prevent money laundering. Criminalization by authorities enables prosecution of individuals involved in laundering schemes and is supported by international agreements such as the United Nations conventions.
          </li>

          <li>
            <strong>Know Your Customer (KYC):</strong> Financial institutions must implement KYC policies to verify and monitor customer identities, understand normal transaction behavior, and identify transactions that raise red flags. Suspicious activity must be reported to the appropriate financial investigation unit.
          </li>

          <li>
            <strong>Record Management & Software Filtering:</strong> Institutions keep detailed transaction records and use software to flag suspicious activity. Customer data may be classified by risk level and transactions blocked or reviewed when certain criteria are met.
          </li>

          <li>
            <strong>Holding Periods:</strong> Some banks require deposits to remain in an account for a designated number of days (commonly around five) to reduce the speed at which funds are moved and to help detect suspicious flows.
          </li>

          <li>
            <strong>New Technology:</strong> Emerging technologies such as AI and big-data analytics improve detection accuracy. They enable sophisticated pattern recognition and real-time monitoring to identify laundering techniques more effectively.
          </li>
        </ol>

        <h2>Conclusion</h2>
        <p>
          By combining legal frameworks, careful customer screening, robust record-keeping, technology-driven monitoring, and staff training, AML programs help reduce financial crime and ensure compliance with regulatory requirements.
        </p>
      </div>
    </div>
  );
};
export default AntiMoneyLaundering;