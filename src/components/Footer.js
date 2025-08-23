import React, { useContext, useEffect } from 'react';
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

  // language selector removed — static English content used
  // Language translator: integrate Google Translate widget in a safe, responsive way
  useEffect(() => {
    // Avoid running on servers or if already present
    if (typeof window === 'undefined') return;

    // If widget already initialized, skip
    if (window.google && window.google.translate && window.google.translate.TranslateElement) {
      return;
    }

    // Define the callback for when the Google Translate script loads
    window.googleTranslateElementInit = function googleTranslateElementInit() {
      try {
        // Restrict languages to Hindi, Bengali, Marathi, Tamil and Gujarati only
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'hi,bn,mr,ta,gu', // only these five languages
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          'google_translate_element'
        );
      } catch (err) {
        // ignore initialization errors (widget blocked or unsupported)
        console.warn('Google Translate init failed', err);
      }
    };

    // Inject script only once
    if (!document.getElementById('google-translate-script')) {
      const s = document.createElement('script');
      s.id = 'google-translate-script';
      s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      s.async = true;
      s.defer = true;
      s.onload = () => {
        // script loaded; callback will run
      };
      s.onerror = () => {
        console.warn('Failed to load Google Translate script');
      };
      document.body.appendChild(s);
    }

    return () => {
      // cleanup callback and optionally remove script (keep it minimal)
      try {
        delete window.googleTranslateElementInit;
      } catch (e) {
        // ignore
      }
    };
  }, []);

  // Helper to set the Google Translate cookie and trigger translation
  const translateTo = (lang) => {
    if (typeof document === 'undefined') return;
    try {
      // Set the googtrans cookie used by Google Translate widget: /en/{lang}
      const cookieValue = `/en/${lang}`;
      // set for root path
      document.cookie = `googtrans=${cookieValue}; path=/; max-age=31536000`;
      // Some older widgets also check _googtrans
      document.cookie = `_googtrans=${cookieValue}; path=/; max-age=31536000`;
      // Reload to let widget pick up the cookie and translate
      window.location.reload();
    } catch (e) {
      console.warn('translateTo failed', e);
    }
  };
  return (
    <>

      <footer
        style={{ background, color: textColor }}
        className="relative z-30 transition-all duration-1000 pt-8 pb-4 px-4 mx-2 my-2 border-4 border-[#64ed37] rounded-xl shadow-xl"
      >
  {/* Language selector removed — app uses static English text */}
        <div className="md:max-h-[calc(100vh-200px)] custom-scrollbar px-2 sm:px-0">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 text-sm">
            {/* 🌟 Logo Section */}
            <div className="text-center md:text-left">
              <div className="relative inline-block w-32 h-32 sm:w-40 sm:h-40 mx-auto md:mx-0">
                <div className="relative z-10 rounded-full border-4 shadow-xl transition duration-700" style={{ borderColor: '#4efc03' }}>
                  <img src={wiseLogo} alt="Wise Global Logo" className="w-full h-full object-contain rounded-full" />
                </div>
              </div>
              <p className="mt-4 text-sm" style={{ color: textColor }}>
                Wise Global Research Services — market research, analytics, and investment insights.
              </p>
              <div className="flex gap-4 justify-center md:justify-start mt-4">
                <a href="https://www.facebook.com/wiseglobalresearch/" target="_blank" rel="noreferrer"><FaFacebookF className="text-blue-600 text-lg hover:scale-110 transition" /></a>
                <a href="https://www.instagram.com/wiseglobalresearch/" target="_blank" rel="noreferrer"><FaInstagram className="text-pink-500 text-lg hover:scale-110 transition" /></a>
                <a href="https://x.com/research221711" target="_blank" rel="noreferrer"><SiX className="bg-white text-black rounded-full text-lg hover:scale-110 transition p-[2px]" /></a>
                <a href="https://www.linkedin.com/in/wise-global-research-services-63b535317/" target="_blank" rel="noreferrer"><FaLinkedinIn className="text-white text-lg hover:scale-110 transition" /></a>
                <a href="https://www.youtube.com/@WiseGlobalResearchService" target="_blank" rel="noreferrer"><FaYoutube className="text-red-600 text-lg hover:scale-110 transition" /></a>
              </div>
              {/* Google Translate widget */}
              <div className="mt-4">
                <div className="flex items-center gap-3">
                  <div className="text-xs mb-0" style={{ color: textColor }}>Translate site</div>
                  <div className="text-xs">
                    <select
                      aria-label="Translate site"
                      defaultValue=""
                      onChange={(e) => {
                        const v = e.target.value;
                        if (v) translateTo(v);
                      }}
                      className="bg-white text-black text-xs px-2 py-1 rounded shadow-sm"
                    >
                      <option value="" disabled>Choose</option>
                      <option value="hi">Hindi</option>
                      <option value="bn">Bengali</option>
                      <option value="mr">Marathi</option>
                      <option value="ta">Tamil</option>
                      <option value="gu">Gujarati</option>
                    </select>
                  </div>
                </div>

                {/* Hidden default widget (we use the cookie + reload approach and a compact dropdown) */}
                <div id="google_translate_element" className="mx-auto md:mx-0" style={{ display: 'none' }}></div>
              </div>
            </div>

            {/* Quick Links Section */}
            <div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: textColor }}>Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="hover:text-yellow-400">→ About Us</Link></li>
                <li><Link to="/contact" className="hover:text-yellow-400">→ Contact</Link></li>
                <li><Link to="/payment" className="hover:text-yellow-400">→ Payment</Link></li>
                <li><Link to="/investor-charter" className="hover:text-yellow-400">→ Investor Charter</Link></li>
                <li><Link to="/career" className="hover:text-yellow-400">→ Careers</Link></li>
                <li><Link to="/guide" className="hover:text-yellow-400">→ Guide for Investing</Link></li>
                <li><Link to="/recommendation" className="hover:text-yellow-400">→ Daily Recommendation</Link></li>
              </ul>
            </div>

            {/* Useful Links Section */}
            <div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: textColor }}>Useful Links</h3>
              <ul className="space-y-2">
                <li><Link to="/legal" className="hover:text-yellow-400">→ Disclaimer</Link></li>
                <li><Link to="/disclosure" className="hover:text-yellow-400">→ Disclosure</Link></li>
                <li><Link to="/privacy" className="hover:text-yellow-400">→ Privacy Policy</Link></li>
                <li><Link to="/refund" className="hover:text-yellow-400">→ Refund Policy</Link></li>
                <li><Link to="/complaint" className="hover:text-yellow-400">→ Complaint Box</Link></li>
                <li><Link to="/complaint-data" className="hover:text-yellow-400">→ Complaint Data</Link></li>
                <li><Link to="/terms" className="hover:text-yellow-400">→ Terms and Conditions</Link></li>
              </ul>
            </div>

            {/* Registration Details Section */}
            <div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: textColor }}>Registration Details</h3>
              <ul className="space-y-1 text-sm">
                <li><strong>Registered Name:</strong> WISE GLOBAL RESEARCH SERVICES PRIVATE LIMITED</li>
                <li><strong>Principal Officer:</strong> Hemraj Singh Sikarwar</li>
                <li><strong>GST No:</strong> 23AADCW7173Q1ZO</li>
                <li><strong>CIN Number:</strong> U66190MP2024PTC069199</li>
                <li><strong>Type of Registration:</strong> Non – Individual</li>
                <li><strong>SEBI Registration No:</strong> INH000016719</li>
                <li><strong>BSE Enlistment No:</strong> 6205</li>
                <li><strong>Validity:</strong> 24-June-2024 to Perpetual</li>
                <li><strong>SEBI Office Details:</strong> Securities and Exchange Board of India, SEBI Bhavan. Plot No. C4-A, ‘G’ Block, Bandra-Kurla Complex, Bandra (E), Mumbai – 400051.</li>
                <li><strong>Toll Free:</strong> 1800 22 7575</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 my-6" />

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4 text-sm">
            <div className="space-y-2">
              <h3 className="font-semibold">Quick Contact</h3>
              <p><strong>WISE GLOBAL RESEARCH SERVICES PRIVATE LIMITED</strong></p>
              <p><FaEnvelope className="inline mr-2 text-yellow-400" /> support@wiseglobalresearch.com</p>
              <p><FaPhone className="inline mr-2 text-yellow-400" /> +91 9977909494</p>
              <p><FaMapMarkerAlt className="inline mr-2 text-yellow-400 align-baseline" /> Registered Office Address: 18 AB Road, Onam Plaza, Office No 602, Old Palasiya, Indore Tukoganj, Indore, Madhya Pradesh, 452001</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold flex items-center gap-1"><FaPalette /> Select Website Theme</h3>
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
          <p className="inline-block text-black font-medium">कृपया ध्यान दें प्रिय ग्राहक, आपके भुगतान स्वीकार किए जाएंगे अगर आप Wise Global Research वेबसाइट पर दी गई खाता जानकारी का उपयोग करेंगे। हम केवल Wise Global Research के अलावा किसी अन्य खातों में कोई भुगतान स्वीकार नहीं करते। Wise Global Research केवल अपने खाते में प्राप्त होने वाली राशियों के लिए सेवाएं प्रदान करने के लिए जिम्मेदार होगा। Pay close attention—Dear Client, your payments will be accepted if you use the account information listed on the Wise Global Research website. We do not accept any payment in any other accounts besides Wise Global Research. Wise Global Research will only be liable to provide services for the amounts received in its account.</p>
        </div>
      </div>

      <div className="bg-black text-white text-center text-xs py-2">
        Copyright 2024, Wise Global Research. All Rights Reserved &nbsp;|&nbsp; Powered by <a href="https://mrxads.com" target="_blank" rel="noopener noreferrer" className="text-yellow-400 underline">MRXADS</a>
      </div>


      {/* Developer Signature: Hidden in HTML source */}
      {/* Durgesh Rathor - Website Developer Signature */}
      {/*
        This website was developed by Durgesh Rathor.
        For verification or collaboration, contact: durgeshrathor05@gmail.com
      */}
    </>
  );
}

export default Footer;
