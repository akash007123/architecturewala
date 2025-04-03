import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const WhyChooseUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };
  
  const reasons = [
    {
      icon: 'bx-bulb',
      title: 'Innovative Approach',
      description: 'We embrace creative problem-solving and cutting-edge technology to push architectural boundaries.'
    },
    {
      icon: 'bx-certification',
      title: 'Expert Team',
      description: 'Our architects and designers are industry leaders with extensive experience and diverse specializations.'
    },
    {
      icon: 'bx-leaf',
      title: 'Sustainability Focus',
      description: 'Environmental responsibility is integral to our design process and material selection.'
    },
    {
      icon: 'bx-conversation',
      title: 'Client-Centered',
      description: 'We listen actively to your needs and involve you throughout the entire design process.'
    }
  ];

  return (
    <section className="py-20 bg-primary text-white" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={textVariants}
        >
          <span className="text-secondary uppercase tracking-wider font-display font-medium">Why Choose Us</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mt-2 mb-4">What Sets Us Apart</h2>
          <p className="text-neutral-200">
            We combine innovative design thinking with technical excellence to deliver exceptional architectural solutions.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {reasons.map((reason, index) => (
            <motion.div 
              key={index} 
              className="text-center"
              variants={itemVariants}
            >
              <div className="bg-white/10 rounded-full p-4 inline-flex justify-center items-center mb-4 w-16 h-16">
                <i className={`bx ${reason.icon} text-secondary text-2xl`}></i>
              </div>
              <h3 className="font-serif text-xl font-bold mb-3">{reason.title}</h3>
              <p className="text-neutral-200">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
