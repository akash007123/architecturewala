import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Users, Building, Lightbulb } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { icon: Award, label: 'Years of Experience', value: '25+' },
    { icon: Users, label: 'Happy Clients', value: '500+' },
    { icon: Building, label: 'Projects Completed', value: '1000+' },
    { icon: Lightbulb, label: 'Design Awards', value: '50+' },
  ];

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">About ArchVision</h2>
          <p className="text-lg text-gray-600 mb-8">
            Since 1998, we've been at the forefront of architectural innovation, creating spaces that inspire, 
            transform, and endure. Our passion for excellence and commitment to sustainable design has made us 
            a leader in the architectural industry.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="p-6 bg-gray-50 rounded-lg"
              >
                <div className="flex justify-center mb-4">
                  <stat.icon className="h-8 w-8 text-gray-800" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Modern Architecture"
              className="rounded-lg shadow-xl"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600 mb-6">
              We envision a future where architecture seamlessly blends innovation with sustainability, 
              creating spaces that not only meet the needs of today but anticipate the demands of tomorrow.
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600 mb-6">
              To deliver exceptional architectural solutions that transform communities, inspire individuals, 
              and set new standards for sustainable design excellence.
            </p>
            <button className="bg-gray-800 text-white px-8 py-3 rounded-full hover:bg-gray-700 transition-colors duration-300">
              Learn More About Us
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;