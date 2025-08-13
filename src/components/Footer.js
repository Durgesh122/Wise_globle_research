import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  FaPhone, FaEnvelope, FaMapMarkerAlt,
  FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaPalette
} from 'react-icons/fa';
import { SiX } from 'react-icons/si';
import wiseLogo from '../assets/images/wise3.png';
import { ThemeContext } from '../context/ThemeContext';

function Footer() {
  const { changeTheme, theme, gradients } = useContext(ThemeContext);
  const { background, textColor } = gradients[theme] || gradients.default;
  const { t, i18n } = useTranslation();

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'bn', label: 'বাংলা' },
    { code: 'gu', label: 'ગુજરાતી' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'mr', label: 'मराठी' },
  ];

  return (
    <>

      <footer
        style={{ background, color: textColor }}
        className="relative z-30 transition-all duration-1000 pt-8 pb-4 px-4 mx-2 my-2 border-4 border-[#64ed37] rounded-xl shadow-xl"
      >
        {/* Language Selector */}
        <div className="flex justify-end mb-2">
          <div className="flex items-center gap-2 bg-white text-black rounded shadow-md px-2 py-1">
            <span className="font-semibold text-xs">{t('footer.selectLanguage') || 'Select Language'}:</span>
            <select
              value={i18n.language}
              onChange={e => i18n.changeLanguage(e.target.value)}
              className="px-2 py-1 rounded focus:outline-none text-xs"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="max-h-[calc(100vh-200px)] custom-scrollbar px-2">
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 text-sm">
            {/* 🌟 Logo Section */}
            <div className="text-center md:text-left">
              <div className="relative inline-block w-40 h-40 mx-auto md:mx-0 shine-hover">
                <div className="absolute inset-0 rounded-full bg-white/10 blur-lg shadow-2xl z-0" />
                <div className="relative z-10 rounded-full border-4 shadow-xl transition duration-700" style={{ borderColor: '#4efc03' }}>
                  <img src={wiseLogo} alt="Wise Global Logo" className="w-40 h-40 object-contain rounded-full" />
                </div>
              </div>
              <p className="mt-4 text-sm" style={{ color: textColor }}>
                {t('footer.description')}
              </p>
              <div className="flex gap-4 justify-center md:justify-start mt-4">
                <a href="https://www.facebook.com/wiseglobalresearch/" target="_blank" rel="noreferrer"><FaFacebookF className="text-blue-600 text-lg hover:scale-110 transition" /></a>
                <a href="https://www.instagram.com/wiseglobalresearch/" target="_blank" rel="noreferrer"><FaInstagram className="text-pink-500 text-lg hover:scale-110 transition" /></a>
                <a href="https://x.com/research221711" target="_blank" rel="noreferrer"><SiX className="bg-white text-black rounded-full text-lg hover:scale-110 transition p-[2px]" /></a>
                <a href="https://www.linkedin.com/in/wise-global-research-services-63b535317/" target="_blank" rel="noreferrer"><FaLinkedinIn className="text-white text-lg hover:scale-110 transition" /></a>
                <a href="https://www.youtube.com/@WiseGlobalResearchService" target="_blank" rel="noreferrer"><FaYoutube className="text-red-600 text-lg hover:scale-110 transition" /></a>
              </div>
            </div>

            {/* Quick Links Section */}
            <div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: textColor }}>{t('footer.quickLinks')}</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="hover:text-yellow-400">→ {t('footer.aboutUs')}</Link></li>
                <li><Link to="/contact" className="hover:text-yellow-400">→ {t('footer.contact')}</Link></li>
                <li><Link to="/payment" className="hover:text-yellow-400">→ {t('footer.payment')}</Link></li>
                <li><Link to="/investor-charter" className="hover:text-yellow-400">→ {t('footer.investorCharter')}</Link></li>
                <li><Link to="/career" className="hover:text-yellow-400">→ {t('footer.currentOpenings')}</Link></li>
                <li><Link to="/guide" className="hover:text-yellow-400">→ {t('footer.guideForInvesting')}</Link></li>
                <li><Link to="/recommendation" className="hover:text-yellow-400">→ {t('footer.dailyRecommendation')}</Link></li>
              </ul>
            </div>

            {/* Useful Links Section */}
            <div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: textColor }}>{t('footer.usefulLinks')}</h3>
              <ul className="space-y-2">
                <li><Link to="/legal" className="hover:text-yellow-400">→ {t('footer.disclaimer')}</Link></li>
                <li><Link to="/disclosure" className="hover:text-yellow-400">→ {t('footer.disclosure')}</Link></li>
                <li><Link to="/privacy" className="hover:text-yellow-400">→ {t('footer.privacyPolicy')}</Link></li>
                <li><Link to="/refund" className="hover:text-yellow-400">→ {t('footer.refundPolicy')}</Link></li>
                <li><Link to="/complaint" className="hover:text-yellow-400">→ {t('footer.complaintBox')}</Link></li>
                <li><Link to="/complaint-data" className="hover:text-yellow-400">→ {t('footer.complaintData')}</Link></li>
                <li><Link to="/terms" className="hover:text-yellow-400">→ {t('footer.termsAndConditions')}</Link></li>
              </ul>
            </div>

            {/* Registration Details Section */}
            <div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: textColor }}>{t('footer.registrationDetails')}</h3>
              <ul className="space-y-1 text-sm">
                <li><strong>{t('footer.registeredName')}:</strong> WISE GLOBAL RESEARCH SERVICES PRIVATE LIMITED</li>
                <li><strong>{t('footer.principalOfficer')}:</strong> Hemraj Singh Sikarwar</li>
                <li><strong>{t('footer.gstNo')}:</strong> 23AADCW7173Q1ZO</li>
                <li><strong>{t('footer.cinNumber')}:</strong> U66190MP2024PTC069199</li>
                <li><strong>{t('footer.typeOfRegistration')}:</strong> Non – Individual</li>
                <li><strong>{t('footer.sebiRegistrationNo')}:</strong> INH000016719</li>
                <li><strong>{t('footer.bseEnlistmentNo')}:</strong> 6205</li>
                <li><strong>{t('footer.validity')}:</strong> 24-June-2024 to Perpetual</li>
                <li><strong>{t('footer.sebiOfficeDetails')}:</strong> Securities and Exchange Board of India, SEBI Bhavan. Plot No. C4-A, ‘G’ Block, Bandra-Kurla Complex, Bandra (E), Mumbai – 400051.</li>
                <li><strong>{t('footer.tollFree')}:</strong> 1800 22 7575</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 my-6" />

          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h3 className="font-semibold">{t('footer.quickContact')}</h3>
              <p><strong>WISE GLOBAL RESEARCH SERVICES PRIVATE LIMITED</strong></p>
              <p><FaEnvelope className="inline mr-2 text-yellow-400" /> support@wiseglobalresearch.com</p>
              <p><FaPhone className="inline mr-2 text-yellow-400" /> +91 9977909494</p>
              <p><FaMapMarkerAlt className="inline mr-2 text-yellow-400" /> {t('footer.registeredOfficeAddress')}: 18 AB Road, Onam Plaza, Office No 602, Old Palasiya, Indore Tukoganj, Indore, Madhya Pradesh, 452001</p>
            </div>

            <div className="text-right md:text-left space-y-2">
              <h3 className="font-semibold flex items-center gap-1"><FaPalette /> {t('footer.selectWebsiteTheme')}</h3>
              <div className="bg-white text-black rounded shadow-md overflow-hidden">
                <select
                  onChange={(e) => changeTheme(e.target.value)}
                  className="w-full px-4 py-2 pr-10 bg-white focus:outline-none"
                >
                  {Object.keys(gradients).map((key) => (
                    <option key={key} value={key}>
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Alert Marquee */}
      <div className="w-full py-2 border-t border-yellow-400 overflow-hidden" style={{ backgroundColor: '#2eed1c' }}>
        <div className="whitespace-nowrap animate-scroll text-sm">
          <p className="inline-block text-black font-medium" dangerouslySetInnerHTML={{ __html: t('footer.paymentNote') }} />
        </div>
      </div>

      <div className="bg-black text-white text-center text-xs py-2">
        {t('footer.copyright')} &nbsp;|&nbsp; {t('footer.poweredBy')} <a href="https://mrxads.com" target="_blank" rel="noopener noreferrer" className="text-yellow-400 underline">MRXADS</a>
      </div>


      {/* Developer Signature: Hidden in HTML source */}
      {/* Durgesh Rathor - Website Developer Signature */}
      {/*
        This website was developed by Durgesh Rathor.
        For verification or collaboration, contact: durgeshrathor.durgeshrathor05@gmail.com
      */}
    </>
  );
}

export default Footer;
