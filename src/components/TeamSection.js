import React from 'react';
import { motion } from 'framer-motion';
import { FaUserTie, FaChartLine, FaDatabase, FaLightbulb } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { itemVariants, cardVariants } from '../utils/animationVariants';

const TeamSection = () => {
  const { t } = useTranslation();
  const icons = [
    <FaUserTie className="text-3xl sm:text-4xl" />,
    <FaChartLine className="text-3xl sm:text-4xl" />,
    <FaDatabase className="text-3xl sm:text-4xl" />,
    <FaLightbulb className="text-3xl sm:text-4xl" />,
  ];
  const team = t('home.teamSection.members', { returnObjects: true });

  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
      <div className="container">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12"
          variants={itemVariants}
        >
          {t('home.teamSection.heading')}
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              className="bg-white/20 backdrop-blur-lg rounded-xl p-4 sm:p-6 shadow-md border-2 border-white/30 hover:shadow-2xl"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex items-center mb-4">
                {icons[index]}
                <h3 className="text-lg sm:text-xl font-bold ml-4">{member.name}</h3>
              </div>
              <p className="text-sm sm:text-base font-semibold mb-2">{member.role}</p>
              <p className="text-xs sm:text-sm mb-2">{member.experience}</p>
              <ul className="text-xs sm:text-sm list-disc ml-6">
                {member.expertise.map((exp, idx) => (
                  <li key={idx}>{exp}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TeamSection;