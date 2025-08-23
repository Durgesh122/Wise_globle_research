import React from 'react';

import { Trans } from '../i18nShim';
function Demo() {
  return (
    <div
      className="py-16 px-6 bg-white text-gray-800 max-w-4xl mx-auto"
      data-aos="fade-up"
    >
      <h1
        className="text-3xl md:text-4xl font-bold font-josefin mb-6 text-center"
        data-aos="fade-down"
      ><Trans i18nKey="pages.Demo.free-demo-calls">Free Demo Calls</Trans></h1>

      <p
        className="text-base leading-relaxed text-gray-700 mb-4 text-center"
        data-aos="fade-right"
      ><Trans i18nKey="pages.Demo.experience-the-quality-of-our-stock-advi">Experience the quality of our stock advisory with</Trans><strong><Trans i18nKey="pages.Demo.2-3-free-calls">2–3 free calls</Trans></strong><Trans i18nKey="pages.Demo.before-you-decide-to-subscribe">before you decide to subscribe.</Trans></p>

      <div className="text-center space-y-4 mt-6">
        <p
          className="text-lg font-semibold text-gray-800"
          data-aos="zoom-in"
        ><Trans i18nKey="pages.Demo.call-us-now">📞 Call Us Now</Trans></p>
        <a
          href="tel:9977909494"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          data-aos="flip-up"
        >
          99779 09494
        </a>

        <p
          className="text-lg font-semibold text-gray-800 mt-4"
          data-aos="zoom-in"
        ><Trans i18nKey="pages.Demo.chat-on-whatsapp">💬 Chat on WhatsApp</Trans></p>
        <a
          href="https://wa.me/919977909494"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          data-aos="flip-up"
        ><Trans i18nKey="pages.Demo.message-on-whatsapp">Message on WhatsApp</Trans></a>
      </div>
    </div>
  );
}

export default Demo;
