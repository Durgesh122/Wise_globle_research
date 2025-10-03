// src/pages/Blogs.js
import React, { useState } from 'react';
import { Trans, useTranslation } from '../i18nShim';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaBookOpen, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Animation variants for container
const containerVariants = {
  hidden: { opacity: 0, rotateX: 30 },
  visible: {
    opacity: 1,
    rotateX: 0,
    transition: { staggerChildren: 0.2, delayChildren: 0.3, duration: 0.8 },
  },
};

// Animation variants for items
const itemVariants = {
  hidden: { y: 50, opacity: 0, rotateY: 45 },
  visible: { y: 0, opacity: 1, rotateY: 0, transition: { duration: 0.6 } },
};

// Animation for cards
const cardVariants = {
  hidden: { scale: 0.8, opacity: 0, rotateX: 60 },
  visible: { scale: 1, opacity: 1, rotateX: 0, transition: { duration: 0.6 } },
  hover: { scale: 1.05, rotateY: 10, boxShadow: '0 15px 30px rgba(255, 252, 252, 0.21)' },
};

// Blog posts data with Indian context
const posts = [
  {
    id: 1,
    title: 'Top 5 Investment Strategies for Indian Markets in 2025',
    date: 'July 12, 2025',
    excerpt: 'Explore proven strategies to grow your wealth in NSE, BSE, and MCX markets.',
    full: 'This in-depth post covers asset allocation, diversification, risk tolerance, and long-term compounding for Indian investors, with a focus on NIFTY, BANKNIFTY, and stocks like RELIANCE.',
    author: 'Arjun Malhotra',
    authorBio: 'Arjun, based in Mumbai, is a Senior Analyst with 10+ years in Indian stock markets.',
    readTime: '5 min read',
    category: 'Investment Strategies',
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600',
    relatedPosts: [2, 3],
  },
  {
    id: 2,
    title: 'Global Economic Outlook: Impact on Indian Markets',
    date: 'July 8, 2025',
    excerpt: 'Our macro analysts break down global trends affecting NSE and BSE.',
    full: 'From RBI’s monetary policies to global inflation trends, this article analyzes macroeconomic indicators influencing Indian markets, including NIFTY and MCX commodities like GOLD.',
    author: 'Priya Chopra',
    authorBio: 'Priya, from Delhi, leads our Macro Strategy Team with expertise in SEBI-compliant analysis.',
    readTime: '7 min read',
    category: 'Market Trends',
    image: 'https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg?auto=compress&cs=tinysrgb&w=600',
    relatedPosts: [1, 4],
  },
  {
    id: 3,
    title: 'SEBI Guidelines for Retail Investors Explained',
    date: 'July 1, 2025',
    excerpt: 'Understand how SEBI regulations protect Indian investors.',
    full: 'We outline key SEBI regulations including risk profiling, suitability standards, disclosures, and grievance redressal frameworks, ensuring transparency for NSE and BSE traders.',
    author: 'Sanjay Verma',
    authorBio: 'Sanjay, from Lucknow, is our Compliance Officer specializing in SEBI regulations.',
    readTime: '4 min read',
    category: 'Regulatory Insights',
    image: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=600',
    relatedPosts: [1, 5],
  },
  {
    id: 4,
    title: 'The Rise of ESG Investing in India',
    date: 'June 25, 2025',
    excerpt: 'How ESG factors are shaping investment decisions in Indian markets.',
    full: 'ESG investing is gaining traction in India, driven by demand for sustainability and corporate accountability. Learn how to integrate ESG into your NSE and BSE portfolios.',
    author: 'Ananya Menon',
    authorBio: 'Ananya, from Bengaluru, heads our Sustainable Investing Team.',
    readTime: '6 min read',
    category: 'Sustainable Investing',
    image: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=600',
    relatedPosts: [2, 6],
  },
  {
    id: 5,
    title: 'Tech Stocks Analysis: Growth vs Value in BSE',
    date: 'June 18, 2025',
    excerpt: 'Evaluating valuation metrics for Indian tech stocks.',
    full: 'Growth tech stocks like INFOSYS dominate BSE, but value investing opportunities are emerging. Learn how to navigate this shift in Indian markets.',
    author: 'Rohan Gupta',
    authorBio: 'Rohan, from Ahmedabad, is our Head of Trading Strategies.',
    readTime: '8 min read',
    category: 'Equity Analysis',
    image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=600',
    relatedPosts: [3, 6],
  },
  {
    id: 6,
    title: 'Fixed Income Strategies for Volatile Indian Markets',
    date: 'June 10, 2025',
    excerpt: 'Navigate RBI rate changes with smart bond portfolio management.',
    full: 'Key focus areas include bond laddering, duration targeting, and credit risk management to protect capital in volatile NSE and MCX markets.',
    author: 'Neha Vohra',
    authorBio: 'Neha, from Chennai, leads our Fixed Income Desk.',
    readTime: '5 min read',
    category: 'Fixed Income',
    image: 'https://images.pexels.com/photos/3184311/pexels-photo-3184311.jpeg?auto=compress&cs=tinysrgb&w=600',
    relatedPosts: [4, 5],
  },
];

// Blog categories
const categories = [
  { id: 1, name: 'Investment Strategies', description: 'Proven methods to grow wealth in NSE and BSE markets.' },
  { id: 2, name: 'Market Trends', description: 'Insights into global and Indian market dynamics.' },
  { id: 3, name: 'Regulatory Insights', description: 'Understanding SEBI and compliance for traders.' },
  { id: 4, name: 'Sustainable Investing', description: 'Focus on ESG and responsible investing in India.' },
  { id: 5, name: 'Equity Analysis', description: 'In-depth analysis of Indian stocks like RELIANCE.' },
  { id: 6, name: 'Fixed Income', description: 'Strategies for bonds and fixed-income securities.' },
];

// Featured post
const featuredPost = posts[0];

// Fallback image
const fallbackImage = 'https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg?auto=compress&cs=tinysrgb&w=600';

const Blogs = () => {
  const { t } = useTranslation();
  const [expandedIndex, setExpandedIndex] = useState(null);


  // Image error handling
  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };

  return (
    <>
      <Helmet>
        <title>{t('pages.Blogs.blogs-wise-global-research', 'Blogs | Wise Global Research')}</title>
        <meta name="description" content="Read expert blogs from Wise Global Research on stock market strategies, SEBI compliance, and investment tips for Indian investors." />
        <meta property="og:title" content="Blogs | Wise Global Research" />
        <meta property="og:description" content="Read expert blogs from Wise Global Research on stock market strategies, SEBI compliance, and investment tips for Indian investors." />
        <meta property="og:url" content="https://wiseglobalresearch.com/blogs" />
        <meta property="og:image" content="https://wiseglobalresearch.com/og-image.jpg" />
        <meta name="twitter:title" content="Blogs | Wise Global Research" />
        <meta name="twitter:description" content="Read expert blogs from Wise Global Research on stock market strategies, SEBI compliance, and investment tips for Indian investors." />
        <meta name="twitter:image" content="https://wiseglobalresearch.com/og-image.jpg" />
      </Helmet>
      <motion.div
        className="container mx-auto py-12 px-4 max-w-7xl bg-transparent"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ perspective: '1000px' }}
      >
        {/* Header Section */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <motion.div whileHover={{ scale: 1.02 }} className="inline-block mb-6">
            <div className="text-sm font-semibold bg-blue-900 px-4 py-1 rounded-full mb-3 inline-block border border-blue-300">
              <span className="text-white"><Trans i18nKey="pages.Blogs.market-insights">Market Insights</Trans></span>
            </div>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4"><Trans i18nKey="pages.Blogs.investment-insights-market-trends"><Trans i18nKey="pages.Blogs.investment-insights-market-trends-1">Investment Insights & Market Trends</Trans></Trans></h1>
          <p className="text-lg text-white max-w-2xl mx-auto"><Trans i18nKey="pages.Blogs.stay-informed-with-sebi-compliant-resear"><Trans i18nKey="pages.Blogs.stay-informed-with-sebi-compliant-resear-1">Stay informed with SEBI-compliant research articles curated by </Trans></Trans><span className="font-semibold text-blue-300"><Trans i18nKey="pages.Blogs.wise-global-research">Wise Global Research </Trans></span><Trans i18nKey="pages.Blogs.for-indian-traders">for Indian traders.</Trans></p>
        </motion.div>

        {/* Featured Post Section */}
        <motion.div
          className="transform transition-transform duration-300 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-8 mb-12"
          style={{
            WebkitBackdropFilter: 'blur(10px)',
            backdropFilter: 'blur(10px)',
          }}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        >
          <h2 className="text-3xl font-bold text-white mb-4"><Trans i18nKey="pages.Blogs.featured-post">Featured Post</Trans></h2>
          <motion.div
            className="flex flex-col md:flex-row gap-6"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <img
              src={featuredPost.image}
              alt={featuredPost.title}
              className="w-full md:w-1/3 h-64 object-cover rounded-lg"
              onError={handleImageError}
            />
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-white mb-2">{featuredPost.title}</h3>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-white">{featuredPost.date}</span>
                <span className="text-sm text-white">{featuredPost.readTime}</span>
              </div>
              <p className="text-white mb-4">{featuredPost.full}</p>
              <p className="text-white text-sm">By {featuredPost.author} - {featuredPost.authorBio}</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Blog Categories Section */}
        <motion.div className="mb-12" variants={containerVariants}>
          <h2 className="text-3xl font-bold text-white mb-6 text-center"><Trans i18nKey="pages.Blogs.explore-categories">Explore Categories</Trans></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg p-6 border-t-4 border-blue-500 text-center"
                style={{
                  WebkitBackdropFilter: 'blur(10px)',
                  backdropFilter: 'blur(10px)',
                }}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <FaBookOpen className="text-blue-300 text-4xl mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-white mb-2">{category.name}</h3>
                <p className="text-white">{category.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Blog Posts Section */}
        <motion.div className="mb-12" variants={containerVariants}>
          <h2 className="text-3xl font-bold text-white mb-6 text-center"><Trans i18nKey="pages.Blogs.recent-posts">Recent Posts</Trans></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg p-6 border-t-4 border-blue-500 flex flex-col"
                style={{
                  WebkitBackdropFilter: 'blur(10px)',
                  backdropFilter: 'blur(10px)',
                }}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  onError={handleImageError}
                />
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-medium bg-blue-900 px-2 py-1 rounded text-white">{post.readTime}</span>
                  <span className="text-xs text-white">{post.date}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{post.title}</h3>
                <p className="text-white mb-4 text-sm flex-1">
                  {expandedIndex === index ? post.full : post.excerpt}
                </p>
                <div className="mt-auto">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-white">By {post.author}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setExpandedIndex(index === expandedIndex ? null : index)}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition border border-blue-300"
                    >
                      {expandedIndex === index ? 'Show Less' : 'Read More'}
                    </motion.button>
                  </div>
                  <p className="text-white text-sm">{post.authorBio}</p>
                  {expandedIndex === index && post.relatedPosts && (
                    <div className="mt-4">
                      <h4 className="text-lg font-semibold text-white mb-2"><Trans i18nKey="pages.Blogs.related-posts">Related Posts</Trans></h4>
                      <ul className="list-disc pl-6 text-white text-sm">
                        {post.relatedPosts.map((relatedId) => {
                          const relatedPost = posts.find((p) => p.id === relatedId);
                          return (
                            <li key={relatedId}>
                              <button
                                onClick={() => console.log(`Clicked on related post: ${relatedPost?.title}`)}
                                className="text-blue-300 hover:text-blue-100"
                                style={{
                                  textDecoration: 'none',
                                  padding: 0,
                                  border: 'none',
                                  background: 'none',
                                  cursor: 'pointer',
                                }}
                              >
                                {relatedPost?.title}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center bg-transparent rounded-xl p-8 mb-12"
          variants={itemVariants}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">Stay Ahead with Wise Global</h2>
          <p className="text-white max-w-2xl mx-auto mb-6">Contact our team to explore trading solutions like Smart Options and MCX Supreme, tailored for Indian markets.</p>
          <Link
            to="/contact"
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition"
          >Enquiry Now<FaArrowRight className="inline ml-2" />
          </Link>
        </motion.div>
      </motion.div>
    </>
  );
};
export default Blogs;
