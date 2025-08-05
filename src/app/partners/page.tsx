'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Handshake, Globe, BookOpen, Users, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const AnimatedSection: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 0,
}) => {
  const controls = useAnimation();
  const ref = React.useRef(null);
  // Change 'threshold' to 'amount'
  const inView = useInView(ref, { once: true, amount: 0.1 }); 

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay } },
      }}
    >
      {children}
    </motion.section>
  );
};

const PartnersPage: React.FC = () => {
  const partners = [
    {
      name: 'Global University',
      logo: '/images/partners/global-university.png',
      href: 'https://globaluniversity.edu',
      icon: BookOpen,
      tagline: 'Online Theology Degrees, From Classroom to Congregation',
      description:
        'A globally accredited institution offering comprehensive biblical and theological studies. Global University trains pastors and leaders through Spirit-empowered education across four schools and multiple languages.',
      highlights: ['HLC Accredited', 'International Programs', 'Scholarship Support'],
    },
    {
      name: 'TechCorp',
      logo: '/images/partners/techcorp.png',
      href: 'https://techcorp.com',
      icon: Globe,
      tagline: 'Providing Special Care for Your Project',
      description:
        'A trusted technology partner with years of experience delivering end-to-end solutions, from system setup to client training. TechCorp ensures your projects launch smoothly and scale effectively.',
      highlights: ['End-to-End Support', 'Client Training', 'Proven Expertise'],
    },
    {
      name: 'EduInnovate',
      logo: '/images/partners/eduinovate.png',
      href: 'https://eduinovate.org',
      icon: Users,
      tagline: 'Innovating Education for the Future',
      description:
        'A forward-thinking edtech organization focused on digital learning tools, teacher training, and scalable educational models for underserved communities worldwide.',
      highlights: ['EdTech Leadership', 'Teacher Development', 'Global Reach'],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-blue-25 to-indigo-50">
      <Header />
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Hero Section */}
        <AnimatedSection>
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
              Our Partners
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We collaborate with leading institutions and organizations to deliver world-class,
              impactful, and accessible educational experiences.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-500 mx-auto rounded-full mt-6"></div>
          </div>
        </AnimatedSection>

        {/* Partner Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {partners.map((partner, index) => (
            <AnimatedSection key={partner.name} delay={index * 0.15}>
              <motion.a
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                className="block bg-white p-7 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <partner.icon className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">{partner.name}</h3>
                </div>

                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="h-14 mx-auto mb-5 opacity-90 grayscale hover:grayscale-0 transition-grayscale"
                />

                <h4 className="text-sm font-medium text-blue-700 mb-3 text-center">
                  {partner.tagline}
                </h4>

                <p className="text-gray-600 text-sm leading-relaxed mb-4 text-center">
                  {partner.description}
                </p>

                <div className="flex flex-wrap justify-center gap-2 mb-5">
                  {partner.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="text-xs px-3 py-1 bg-blue-100 text-blue-800 rounded-full"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-center text-blue-600 hover:text-blue-700 font-medium text-sm">
                  <span>Visit Partner</span>
                  <ExternalLink className="w-4 h-4 ml-1" />
                </div>
              </motion.a>
            </AnimatedSection>
          ))}
        </div>

        {/* Become a Partner CTA */}
        <AnimatedSection>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-14 px-6 rounded-3xl shadow-2xl"
          >
            <Handshake className="w-12 h-12 mx-auto mb-5 text-white opacity-90" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-5">Become a Partner</h2>
            <p className="text-lg opacity-95 mb-8 max-w-2xl mx-auto leading-relaxed">
              Are you an institution, organization, or innovator passionate about education?
              Let’s collaborate to empower learners around the world.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-blue-700 px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Get in Touch
            </Link>
          </motion.div>
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
};

export default PartnersPage;