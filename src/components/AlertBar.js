import React from 'react';

const AlertBar = () => (
  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 overflow-hidden mt-8">
    <div className="container">
      <div className="animate-scroll">
        <strong>कृपया ध्यान दें –</strong> प्रिय ग्राहक, आपके भुगतान स्वीकार किए जाएंगे अगर आप Wise Global Research वेबसाइट पर दी गई खाता जानकारी का उपयोग करेंगे।
        हम केवल Wise Global Research के अलावा किसी अन्य खातों में कोई भुगतान स्वीकार नहीं करते।
        &nbsp;|&nbsp;
        <strong>Note:</strong> Dear Client, payments will be accepted only if made to the account details listed on the Wise Global Research website.
      </div>
    </div>
  </div>
);

export default AlertBar;