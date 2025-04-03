import { useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { motion, useInView } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/ServiceCard";
import { Service } from "@shared/schema";
import BackToTop from "@/components/home/BackToTop";

const Services = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const isInView1 = useInView(ref1, { once: true, margin: "-100px" });
  const isInView2 = useInView(ref2, { once: true, margin: "-100px" });
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });
  
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
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
  
  const processSteps = [
    {
      title: "Initial Consultation",
      description: "We begin with a thorough consultation to understand your vision, needs, and project parameters.",
      icon: "bx-conversation"
    },
    {
      title: "Concept Development",
      description: "Our team explores creative solutions and develops preliminary concepts for your review.",
      icon: "bx-bulb"
    },
    {
      title: "Design Refinement",
      description: "Based on your feedback, we refine the design to ensure it perfectly aligns with your vision.",
      icon: "bx-edit"
    },
    {
      title: "Documentation",
      description: "We create detailed construction documents and specifications for implementation.",
      icon: "bx-file"
    },
    {
      title: "Construction Support",
      description: "Our team provides oversight during construction to ensure the design is executed as intended.",
      icon: "bx-building-house"
    },
    {
      title: "Project Completion",
      description: "We conduct a final review to ensure the completed project meets our quality standards.",
      icon: "bx-check-circle"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Services | Arcology</title>
        <meta name="description" content="Explore our comprehensive architectural services including design, planning, and development solutions for residential and commercial projects." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black z-0">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&h=900&q=80"
            alt="Architectural design process"
            className="w-full h-full object-cover opacity-70"
          />
        </div>
        
        <div className="container mx-auto px-6 z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-serif text-4xl md:text-6xl font-bold text-white text-shadow mb-6"
          >
            Our Services
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-white text-xl md:text-2xl max-w-3xl mx-auto opacity-90"
          >
            Comprehensive architectural solutions tailored to your unique vision
          </motion.p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white" ref={ref1}>
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            animate={isInView1 ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <span className="text-secondary uppercase tracking-wider font-display font-medium">What We Offer</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">Comprehensive Architectural Solutions</h2>
            <p className="text-neutral-400">
              From initial concept to final construction, we provide end-to-end architectural services tailored to your specific needs.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate={isInView1 ? "visible" : "hidden"}
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
                <motion.div key={service.id} variants={itemVariants} id={service.slug}>
                  <ServiceCard service={service} />
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-neutral-100" ref={ref2}>
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            animate={isInView2 ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <span className="text-secondary uppercase tracking-wider font-display font-medium">Our Process</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">How We Work</h2>
            <p className="text-neutral-400">
              We follow a structured yet flexible process to ensure your project is completed to the highest standards.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <motion.div 
                key={index}
                className="bg-white p-8 rounded-lg shadow-sm relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              >
                <div className="absolute top-0 right-0 bg-secondary/10 w-20 h-20 rounded-bl-full flex items-start justify-end p-3">
                  <span className="text-secondary font-bold text-lg">{index + 1}</span>
                </div>
                <div className="text-secondary mb-4">
                  <i className={`bx ${step.icon} text-4xl`}></i>
                </div>
                <h3 className="font-serif text-xl font-bold text-primary mb-3">{step.title}</h3>
                <p className="text-neutral-500">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-secondary uppercase tracking-wider font-display font-medium">Industries We Serve</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">Specialized Expertise</h2>
            <p className="text-neutral-400">
              We have experience across a wide range of project types, each with unique challenges and requirements.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group relative h-80 rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=750&q=80" 
                alt="Residential" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-0 transition-opacity duration-300 p-6 flex flex-col justify-end group-hover:opacity-100">
                <h3 className="font-serif text-xl font-bold text-white mb-2">Residential</h3>
                <p className="text-neutral-200 mb-4">Custom homes, multi-family dwellings, and residential developments.</p>
              </div>
            </div>
            
            <div className="group relative h-80 rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1545043052-6741a2158f72?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=750&q=80" 
                alt="Commercial" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-0 transition-opacity duration-300 p-6 flex flex-col justify-end group-hover:opacity-100">
                <h3 className="font-serif text-xl font-bold text-white mb-2">Commercial</h3>
                <p className="text-neutral-200 mb-4">Office buildings, retail spaces, and mixed-use developments.</p>
              </div>
            </div>
            
            <div className="group relative h-80 rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=750&q=80" 
                alt="Cultural" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-0 transition-opacity duration-300 p-6 flex flex-col justify-end group-hover:opacity-100">
                <h3 className="font-serif text-xl font-bold text-white mb-2">Cultural</h3>
                <p className="text-neutral-200 mb-4">Museums, galleries, theaters, and public gathering spaces.</p>
              </div>
            </div>
            
            <div className="group relative h-80 rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=750&q=80" 
                alt="Healthcare" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-0 transition-opacity duration-300 p-6 flex flex-col justify-end group-hover:opacity-100">
                <h3 className="font-serif text-xl font-bold text-white mb-2">Healthcare</h3>
                <p className="text-neutral-200 mb-4">Hospitals, clinics, and specialized medical facilities.</p>
              </div>
            </div>
            
            <div className="group relative h-80 rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1488257472613-b31f50afb7f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=750&q=80" 
                alt="Educational" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-0 transition-opacity duration-300 p-6 flex flex-col justify-end group-hover:opacity-100">
                <h3 className="font-serif text-xl font-bold text-white mb-2">Educational</h3>
                <p className="text-neutral-200 mb-4">Schools, universities, and specialized learning environments.</p>
              </div>
            </div>
            
            <div className="group relative h-80 rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=750&q=80" 
                alt="Hospitality" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-0 transition-opacity duration-300 p-6 flex flex-col justify-end group-hover:opacity-100">
                <h3 className="font-serif text-xl font-bold text-white mb-2">Hospitality</h3>
                <p className="text-neutral-200 mb-4">Hotels, resorts, restaurants, and leisure facilities.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-neutral-200 text-lg mb-8 max-w-2xl mx-auto">
              Contact us today to discuss your vision and how we can help bring it to life through innovative architectural design.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-secondary hover:bg-secondary/80 text-white font-medium shadow-lg">
                  Get in Touch
                </Button>
              </Link>
              
              <Link href="/projects">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary">
                  Explore Our Projects
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <BackToTop />
    </>
  );
};

export default Services;
