import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiShield, FiCpu, FiActivity } from 'react-icons/fi';

const SmartIndexOption = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const cardHover = {
    hover: {
      scale: 1.05,
      boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
      transition: {
        type: 'spring',
        stiffness: 300,
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-900 text-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <motion.section
        className="bg-gradient-to-r from-indigo-500 to-purple-600 text-center py-20 lg:py-32"
        variants={itemVariants}
      >
        <div className="container mx-auto px-4">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4"
            variants={itemVariants}
          >
            Smart Index Option
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Harness the power of AI to trade index options with precision. Get predictive insights and automated strategies to maximize your gains.
          </motion.p>
          <motion.button
            className="mt-8 bg-white text-indigo-500 font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition duration-300"
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
          >
            Start Trading Smarter
          </motion.button>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section className="py-20" variants={containerVariants}>
        <div className="container mx-auto px-4">
          <motion.h2 className="text-3xl md:text-4xl font-bold text-center mb-12" variants={itemVariants}>
            What is Smart Index Option?
          </motion.h2>
          <div className="flex flex-wrap -mx-4">
            <motion.div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0" variants={itemVariants}>
              <img src="https://via.placeholder.com/600x400" alt="Smart Index Option" className="rounded-lg shadow-lg" loading="lazy"/>
            </motion.div>
            <motion.div className="w-full lg:w-1/2 px-4" variants={itemVariants}>
              <p className="text-lg mb-4">
                Smart Index Option is an advanced trading platform that uses artificial intelligence to analyze index options and identify high-probability trading opportunities. Our proprietary algorithms scan the market in real-time to provide you with a significant edge.
              </p>
              <p className="text-lg">
                We empower traders with predictive analytics, automated strategy execution, and comprehensive risk management tools, all designed to enhance your trading performance and profitability.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Key Features Section */}
      <motion.section className="bg-gray-800 py-20" variants={containerVariants}>
        <div className="container mx-auto px-4">
          <motion.h2 className="text-3xl md:text-4xl font-bold text-center mb-12" variants={itemVariants}>
            Key Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div className="bg-gray-700 p-8 rounded-lg text-center" variants={itemVariants} {...cardHover}>
              <FiCpu className="text-5xl text-indigo-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">AI-Powered Insights</h3>
              <p>Leverage our advanced AI to get predictive insights and trading signals for index options.</p>
            </motion.div>
            <motion.div className="bg-gray-700 p-8 rounded-lg text-center" variants={itemVariants} {...cardHover}>
              <FiActivity className="text-5xl text-purple-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Automated Trading</h3>
              <p>Execute your strategies with precision using our automated trading bots.</p>
            </motion.div>
            <motion.div className="bg-gray-700 p-8 rounded-lg text-center" variants={itemVariants} {...cardHover}>
              <FiShield className="text-5xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Robust Risk Management</h3>
              <p>Protect your capital with our integrated risk management and analysis tools.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section className="py-20" variants={containerVariants}>
        <div className="container mx-auto px-4">
          <motion.h2 className="text-3xl md:text-4xl font-bold text-center mb-12" variants={itemVariants}>
            How It Works
          </motion.h2>
          <div className="flex flex-col md:flex-row justify-center items-center">
            <motion.div className="w-full md:w-1/3 p-4 text-center" variants={itemVariants}>
              <div className="bg-gray-800 p-8 rounded-full w-24 h-24 mx-auto flex items-center justify-center mb-4">
                <span className="text-3xl font-bold">1</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Connect Your Broker</h3>
              <p>Securely connect your brokerage account to our platform.</p>
            </motion.div>
            <motion.div className="w-full md:w-1/3 p-4 text-center" variants={itemVariants}>
              <div className="bg-gray-800 p-8 rounded-full w-24 h-24 mx-auto flex items-center justify-center mb-4">
                <span className="text-3xl font-bold">2</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Configure Your Strategy</h3>
              <p>Set up your trading parameters and risk tolerance.</p>
            </motion.div>
            <motion.div className="w-full md:w-1/3 p-4 text-center" variants={itemVariants}>
              <div className="bg-gray-800 p-8 rounded-full w-24 h-24 mx-auto flex items-center justify-center mb-4">
                <span className="text-3xl font-bold">3</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Activate Smart Trading</h3>
              <p>Let our AI engine trade on your behalf, 24/7.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section className="bg-gray-800 py-20" variants={containerVariants}>
        <div className="container mx-auto px-4">
          <motion.h2 className="text-3xl md:text-4xl font-bold text-center mb-12" variants={itemVariants}>
            Our Plans
          </motion.h2>
          <div className="flex flex-wrap justify-center -mx-4">
            <motion.div className="w-full md:w-1/2 lg:w-1/3 p-4" variants={itemVariants}>
              <div className="bg-gray-700 p-8 rounded-lg text-center" {...cardHover}>
                <h3 className="text-2xl font-bold mb-4">Essential</h3>
                <p className="text-4xl font-bold mb-4">$199<span className="text-lg">/mo</span></p>
                <ul className="text-left mb-8">
                  <li className="flex items-center mb-2"><FiCheckCircle className="text-green-500 mr-2" /> AI-Powered Trading Signals</li>
                  <li className="flex items-center mb-2"><FiCheckCircle className="text-green-500 mr-2" /> Basic Risk Analysis</li>
                  <li className="flex items-center mb-2"><FiCheckCircle className="text-green-500 mr-2" /> Email Support</li>
                </ul>
                <button className="bg-indigo-500 text-white font-bold py-3 px-8 rounded-full hover:bg-indigo-600 transition duration-300">Choose Plan</button>
              </div>
            </motion.div>
            <motion.div className="w-full md:w-1/2 lg:w-1/3 p-4" variants={itemVariants}>
              <div className="bg-purple-600 p-8 rounded-lg text-center" {...cardHover}>
                <h3 className="text-2xl font-bold mb-4">Performance</h3>
                <p className="text-4xl font-bold mb-4">$399<span className="text-lg">/mo</span></p>
                <ul className="text-left mb-8">
                  <li className="flex items-center mb-2"><FiCheckCircle className="text-white mr-2" /> Advanced AI Strategies</li>
                  <li className="flex items-center mb-2"><FiCheckCircle className="text-white mr-2" /> Automated Trading Bots</li>
                  <li className="flex items-center mb-2"><FiCheckCircle className="text-white mr-2" /> Priority Support</li>
                  {/* Portfolio Analytics item removed as per request */}
                </ul>
                <button className="bg-white text-purple-600 font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition duration-300">Choose Plan</button>
              </div>
            </motion.div>
            <motion.div className="w-full md:w-1/2 lg:w-1/3 p-4" variants={itemVariants}>
              <div className="bg-gray-700 p-8 rounded-lg text-center" {...cardHover}>
                <h3 className="text-2xl font-bold mb-4">Alpha</h3>
                <p className="text-4xl font-bold mb-4">Contact Us</p>
                <ul className="text-left mb-8">
                  <li className="flex items-center mb-2"><FiCheckCircle className="text-green-500 mr-2" /> All Performance Features</li>
                  <li className="flex items-center mb-2"><FiCheckCircle className="text-green-500 mr-2" /> Dedicated Quant Analyst</li>
                  <li className="flex items-center mb-2"><FiCheckCircle className="text-green-500 mr-2" /> Custom Strategy Backtesting</li>
                  <li className="flex items-center mb-2"><FiCheckCircle className="text-green-500 mr-2" /> Institutional-Grade API</li>
                </ul>
                <button className="bg-indigo-500 text-white font-bold py-3 px-8 rounded-full hover:bg-indigo-600 transition duration-300">Contact Us</button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Performance Section */}
      <motion.section className="py-20" variants={containerVariants}>
        <div className="container mx-auto px-4">
          <motion.h2 className="text-3xl md:text-4xl font-bold text-center mb-12" variants={itemVariants}>
            Our Performance Edge
          </motion.h2>
          <div className="bg-gray-800 p-8 rounded-lg">
            <img src="https://via.placeholder.com/1200x400" alt="Performance Chart" className="rounded-lg" loading="lazy"/>
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section className="bg-gray-800 py-20" variants={containerVariants}>
        <div className="container mx-auto px-4">
          <motion.h2 className="text-3xl md:text-4xl font-bold text-center mb-12" variants={itemVariants}>
            What Our Clients Are Saying
          </motion.h2>
          <div className="flex flex-wrap -mx-4">
            <motion.div className="w-full md:w-1/2 lg:w-1/3 p-4" variants={itemVariants}>
              <div className="bg-gray-700 p-8 rounded-lg">
                <p className="text-lg mb-4">"Smart Index Option has completely changed the way I trade. The AI is incredibly powerful and has significantly boosted my profits."</p>
                <p className="font-bold">- Sarah K.</p>
              </div>
            </motion.div>
            <motion.div className="w-full md:w-1/2 lg:w-1/3 p-4" variants={itemVariants}>
              <div className="bg-gray-700 p-8 rounded-lg">
                <p className="text-lg mb-4">"The automated trading feature is a game-changer. It executes my strategies flawlessly, even when I'm not watching the market."</p>
                <p className="font-bold">- Mark R.</p>
              </div>
            </motion.div>
            <motion.div className="w-full md:w-1/2 lg:w-1/3 p-4" variants={itemVariants}>
              <div className="bg-gray-700 p-8 rounded-lg">
                <p className="text-lg mb-4">"The level of analysis and support is top-notch. I feel much more confident in my trading decisions with Smart Index Option."</p>
                <p className="font-bold">- Jennifer L.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section className="py-20" variants={containerVariants}>
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.h2 className="text-3xl md:text-4xl font-bold text-center mb-12" variants={itemVariants}>
            Frequently Asked Questions
          </motion.h2>
          <div className="space-y-4">
            <motion.div className="bg-gray-800 p-6 rounded-lg" variants={itemVariants}>
              <h3 className="text-xl font-bold">Which indices do you support?</h3>
              <p className="mt-2">We support all major global indices, including the S&P 500, NASDAQ, Dow Jones, FTSE 100, and more.</p>
            </motion.div>
            <motion.div className="bg-gray-800 p-6 rounded-lg" variants={itemVariants}>
              <h3 className="text-xl font-bold">Is my brokerage account safe?</h3>
              <p className="mt-2">Yes, we use bank-level encryption and secure API connections to protect your account. We never have direct access to your funds.</p>
            </motion.div>
            <motion.div className="bg-gray-800 p-6 rounded-lg" variants={itemVariants}>
              <h3 className="text-xl font-bold">Can I customize the trading bots?</h3>
              <p className="mt-2">Yes, our Pro and Alpha plans allow for full customization of trading bots to fit your specific strategies and risk tolerance.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-center py-20" variants={itemVariants}>
        <div className="container mx-auto px-4">
          <motion.h2 className="text-3xl md:text-4xl font-bold mb-4" variants={itemVariants}>
            Ready to Revolutionize Your Index Option Trading?
          </motion.h2>
          <motion.p className="text-lg md:text-xl max-w-3xl mx-auto mb-8" variants={itemVariants}>
            Join Smart Index Option today and unlock the future of trading.
          </motion.p>
          <motion.button
            className="bg-white text-indigo-500 font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition duration-300"
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
          >
            Get Started Now
          </motion.button>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default SmartIndexOption;