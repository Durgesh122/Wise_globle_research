import React from 'react';

const AlertBar = () => {
  // Static bilingual alert message
  const notePrefix = 'कृपया ध्यान दें –';
  const messageHi = 'प्रिय ग्राहक, आपके भुगतान स्वीकार किए जाएंगे अगर आप Wise Global Research वेबसाइट पर दी गई खाता जानकारी का उपयोग करेंगे। हम केवल Wise Global Research के अलावा किसी अन्य खातों में कोई भुगतान स्वीकार नहीं करते। Wise Global Research केवल अपने खाते में प्राप्त होने वाली राशियों के लिए सेवाएं प्रदान करने के लिए जिम्मेदार होगा।';
  const messageEn = 'Pay close attention—Dear Client, your payments will be accepted if you use the account information listed on the Wise Global Research website. We do not accept any payment in any other accounts besides Wise Global Research. Wise Global Research will only be liable to provide services for the amounts received in its account.';
  const alertMessage = `${messageHi} Note: ${messageEn}`;

  React.useEffect(() => {
    // Scroll to top to ensure visibility on refresh
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 mt-5">
      <div className="container mx-auto px-4">
        <div
          className="animate-scroll whitespace-normal break-words text-sm md:text-base text-center flex items-center justify-center gap-2"
          role="status"
          aria-live="polite"
        >
          <strong className="flex-shrink-0">{notePrefix}</strong>
          <span className="max-w-full">{alertMessage}</span>
        </div>
      </div>
    </div>
  );
};

export default AlertBar;