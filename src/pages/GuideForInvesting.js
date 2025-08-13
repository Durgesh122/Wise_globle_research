import React from 'react';

function GuideForInvesting() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-2 sm:px-4 md:px-8 animate-fadein">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-white text-center drop-shadow-lg">Guide For Investing</h1>
      <div className="space-y-8 text-base sm:text-lg text-white">
        <section className="transition-transform duration-700 hover:scale-105 bg-white/30 rounded-xl p-4 shadow-lg">
          <h2 className="text-2xl font-semibold mb-2 text-white">Be Consistent</h2>
          <p>
            Continue investing both your money and time for optimal returns, maintaining consistency in your efforts. Regularly assessing your investments is essential for understanding your evolving investment needs.
          </p>
        </section>
        <section className="transition-transform duration-700 hover:scale-105 bg-white/30 rounded-xl p-4 shadow-lg">
          <h2 className="text-2xl font-semibold mb-2 text-white">Don't put all your eggs in one basket</h2>
          <p>
            Diversify your investments across different asset classes and sectors to reduce risk. Spreading your investments helps protect your portfolio from market volatility.
          </p>
        </section>
        <section className="transition-transform duration-700 hover:scale-105 bg-white/30 rounded-xl p-4 shadow-lg">
          <h2 className="text-2xl font-semibold mb-2 text-white">Stay Updated</h2>
          <p>
            Keep yourself informed about market trends, economic news, and changes in regulations. Staying updated enables you to make informed investment decisions.
          </p>
        </section>
        <section className="transition-transform duration-700 hover:scale-105 bg-white/30 rounded-xl p-4 shadow-lg">
          <h2 className="text-2xl font-semibold mb-2 text-white">Be Disciplined</h2>
          <p>
            Stick to your investment plan and avoid making impulsive decisions based on short-term market movements. Discipline is key to long-term success.
          </p>
        </section>
        <section className="transition-transform duration-700 hover:scale-105 bg-white/30 rounded-xl p-4 shadow-lg">
          <h2 className="text-2xl font-semibold mb-2 text-white">Keep aside your Emotions</h2>
          <p>
            Emotional investing can lead to poor decisions. Base your investment choices on logic, research, and your financial goals rather than emotions.
          </p>
        </section>
        <section className="transition-transform duration-700 hover:scale-105 bg-white/30 rounded-xl p-4 shadow-lg">
          <h2 className="text-2xl font-semibold mb-2 text-white">Seek Professional Help</h2>
          <p>
            If you are unsure about your investment strategy, consult a financial advisor. Professional guidance can help you align your investments with your goals and risk tolerance.
          </p>
        </section>
      </div>
      {/* Animation keyframes for fade-in */}
      <style>{`
        .animate-fadein {
          animation: fadein 1.2s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes fadein {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default GuideForInvesting;
