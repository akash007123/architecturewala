import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import ServiceCard from "@/components/ServiceCard";
import { Service } from "@shared/schema";

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });
  
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

  return (
    <section id="services" className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={textVariants}
        >
          <span className="text-secondary uppercase tracking-wider font-display font-medium">Our Services</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">Comprehensive Architectural Solutions</h2>
          <p className="text-neutral-400">
            We offer a full range of architectural services tailored to meet the unique needs of each client and project.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {isLoading ? (
            // Loading skeleton
            Array(6).fill(0).map((_, i) => (
              <div key={i} className="p-6 rounded-lg border border-neutral-200 bg-white shadow-sm animate-pulse">
                <div className="w-12 h-12 rounded-full bg-gray-200 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))
          ) : error ? (
            <div className="col-span-full text-center text-red-500">
              Failed to load services. Please try again later.
            </div>
          ) : (
            services?.map((service) => (
              <motion.div key={service.id} variants={itemVariants}>
                <ServiceCard service={service} />
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
