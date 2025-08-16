import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import ant2Image from '../assets/images/Ant2.jpg';
import mlImage from '../assets/images/MoneyLaundering.jpg';

const AntiMoneyLaundering = () => {
  const { t } = useTranslation();
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-5 text-white">
      <h1 className="mt-8 text-3xl font-bold">{t('antiMoneyLaundering.title')}</h1>
      <img src={ant2Image} alt="Anti-Money Laundering Overview" className="w-full rounded-lg shadow" />
      <div className="prose dark:prose-dark max-w-none">
        <p>{t('antiMoneyLaundering.p1')}</p>
        <p>{t('antiMoneyLaundering.p2')}</p>
        <p>{t('antiMoneyLaundering.p3')}</p>
        <p>{t('antiMoneyLaundering.p4')}</p>

        <h2>{t('antiMoneyLaundering.h2')}</h2>
        <p>{t('antiMoneyLaundering.p5')}</p>
        {/* Process figure */}
        <img src={mlImage} alt="Money Laundering Process" className="w-full rounded-lg shadow" />

        <h2>{t('antiMoneyLaundering.h2_controls')}</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li><Trans i18nKey="antiMoneyLaundering.li1" components={{ strong: <strong /> }} /></li>
          <li><Trans i18nKey="antiMoneyLaundering.li2" components={{ strong: <strong /> }} /></li>
          <li><Trans i18nKey="antiMoneyLaundering.li3" components={{ strong: <strong /> }} /></li>
          <li><Trans i18nKey="antiMoneyLaundering.li4" components={{ strong: <strong /> }} /></li>
          <li><Trans i18nKey="antiMoneyLaundering.li5" components={{ strong: <strong /> }} /></li>
        </ol>
      </div>
    </div>
  );
};
export default AntiMoneyLaundering;