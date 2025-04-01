import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Compass, 
  PenTool, 
  Home, 
  Building2, 
  Trees, 
  Ruler,
  Clock,
  BadgeCheck
} from 'lucide-react';

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      icon: Compass,
      title: 'Architectural Design',
      description: 'Innovative and functional designs that bring your vision to life while meeting all technical requirements.'
    },
    {
      icon: PenTool,
      title: 'Interior Design',
      description: 'Creating harmonious interior spaces that reflect your style and enhance functionality.'
    },
    {
      icon: Home,
      title: 'Residential Architecture',
      description: 'Custom home designs that perfectly balance aesthetics with practical living spaces.'
    },
    {
      icon: Building2,
      title: 'Commercial Projects',
      description: 'Modern commercial spaces that boost productivity and reflect your brand identity.'
    },
    {
      icon: Trees,
      title: 'Landscape Design',
      description: 'Sustainable outdoor spaces that complement your architecture and enhance the environment.'
    },
    {
      icon: Ruler,
      title: 'Project Planning',
      description: 'Comprehensive planning services ensuring your project stays on track and within budget.'
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: 'Timely Delivery',
      description: 'We understand the importance of time and ensure project completion within agreed timelines.'
    },
    {
      icon: BadgeCheck,
      title: 'Quality Assurance',
      description: 'Every project undergoes rigorous quality checks to meet the highest standards.'
    }
  ];

  return (
    <section className="py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We offer comprehensive architectural and design services tailored to your specific needs,
            ensuring excellence in every project we undertake.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <service.icon className="h-12 w-12 text-gray-800 mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-gray-900 rounded-2xl p-12 text-white">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Why Choose Us</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our commitment to excellence and attention to detail sets us apart in the industry.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex items-start space-x-4"
              >
                <benefit.icon className="h-8 w-8 text-white" />
                <div>
                  <h4 className="text-xl font-bold mb-2">{benefit.title}</h4>
                  <p className="text-gray-300">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;