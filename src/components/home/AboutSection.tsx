import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="about" className="py-20 bg-neutral-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" ref={ref}>
          <motion.div
            className="space-y-6"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUpVariants}
          >
            <span className="text-secondary uppercase tracking-wider font-display font-medium">About Us</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary">Creating Spaces That Inspire For Over 20 Years</h2>
            <p className="text-neutral-500 leading-relaxed">
              Arcology is a renowned architectural firm dedicated to creating innovative, sustainable, and aesthetically pleasing structures that stand the test of time. Founded in 2003, we've grown from a small design studio to an award-winning firm with projects across the globe.
            </p>
            <p className="text-neutral-500 leading-relaxed">
              Our team of architects, designers, and engineers work collaboratively to deliver exceptional spaces that reflect our clients' vision while pushing the boundaries of contemporary architecture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="flex items-center gap-3">
                <span className="text-secondary text-3xl font-bold">200+</span>
                <span className="text-neutral-500">Projects Completed</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-secondary text-3xl font-bold">40+</span>
                <span className="text-neutral-500">Design Awards</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-secondary text-3xl font-bold">18</span>
                <span className="text-neutral-500">Countries Served</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="relative"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUpVariants}
          >
            <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80" 
                alt="Architectural team at work" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-secondary rounded-lg -z-10 opacity-20"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
