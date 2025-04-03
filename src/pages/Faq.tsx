import { useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { motion, useInView } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Faq as FaqType } from "@shared/schema";
import BackToTop from "@/components/home/BackToTop";

const Faq = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { data: faqs, isLoading, error } = useQuery<FaqType[]>({
    queryKey: ['/api/faqs'],
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
  
  // Additional FAQ categories for tabs
  const categoryFaqs = {
    process: [
      {
        question: "What is your architectural design process?",
        answer: "Our design process typically involves six key phases: initial consultation, concept development, schematic design, design development, construction documentation, and construction administration. We maintain open communication throughout the entire process and involve clients in key decision-making."
      },
      {
        question: "How long does an architectural project typically take?",
        answer: "Project timelines vary based on complexity, scale, and specific requirements. A residential project might take 6-12 months from concept to completion, while larger commercial projects can span 18-36 months. During our initial consultation, we'll provide a more accurate timeline based on your specific project needs."
      },
      {
        question: "Do you handle all aspects of the construction process?",
        answer: "While we primarily focus on architectural design and planning, we offer comprehensive project management services to oversee construction. We collaborate with trusted contractors, engineers, and specialists to ensure your project is executed according to design specifications and quality standards."
      }
    ],
    services: [
      {
        question: "What architectural services do you offer?",
        answer: "We offer a comprehensive range of architectural services including architectural design, interior design, urban planning, sustainable design, project management, and 3D visualization. Each service can be tailored to meet the specific needs of your project."
      },
      {
        question: "Do you work on residential and commercial projects?",
        answer: "Yes, we have extensive experience in both residential and commercial architecture. Our portfolio includes custom homes, multi-family housing, office buildings, retail spaces, cultural centers, and more."
      },
      {
        question: "Can you help with renovations and additions to existing buildings?",
        answer: "Absolutely. We specialize in thoughtful renovations and additions that respect the existing structure while meeting contemporary needs and standards. We'll work closely with you to understand your vision and create a design that enhances the property."
      }
    ],
    sustainability: [
      {
        question: "How do you incorporate sustainability into your designs?",
        answer: "Sustainability is integral to our design philosophy. We incorporate energy-efficient systems, sustainable materials, passive design strategies, and water conservation measures. We also consider site orientation, natural lighting, and ventilation to minimize environmental impact while creating comfortable, healthy spaces."
      },
      {
        question: "Do you have experience with green building certifications?",
        answer: "Yes, we have experience with various green building certification programs including LEED, WELL, Passive House, and Living Building Challenge. We can guide you through the certification process and help you achieve your sustainability goals."
      },
      {
        question: "What are the benefits of sustainable architecture?",
        answer: "Sustainable architecture offers numerous benefits including reduced operating costs through energy and water efficiency, improved indoor air quality and occupant comfort, reduced environmental impact, and potential tax incentives or rebates. Additionally, sustainable buildings often command higher property values and demonstrate a commitment to environmental stewardship."
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>FAQ | Arcology</title>
        <meta name="description" content="Find answers to commonly asked questions about architectural services, our design process, sustainability practices, and more." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black z-0">
          <img
            src="https://images.unsplash.com/photo-1531973819741-e27a5ae2cc7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&h=900&q=80"
            alt="Architecture office"
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
            Frequently Asked Questions
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-white text-xl md:text-2xl max-w-3xl mx-auto opacity-90"
          >
            Find answers to common questions about our architectural services
          </motion.p>
        </div>
      </section>

      {/* Main FAQ Section */}
      <section className="py-20 bg-white" ref={ref}>
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <span className="text-secondary uppercase tracking-wider font-display font-medium">Have Questions?</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">We Have Answers</h2>
            <p className="text-neutral-400">
              Browse through our frequently asked questions to find information about our services, process, and more.
            </p>
          </motion.div>
          
          <div className="max-w-3xl mx-auto">
            <Tabs defaultValue="general" className="mb-12">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="process">Process</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general">
                <motion.div
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={containerVariants}
                >
                  {isLoading ? (
                    // Loading skeleton
                    Array(5).fill(0).map((_, i) => (
                      <div key={i} className="border-b border-neutral-200 py-5 animate-pulse">
                        <div className="flex justify-between items-center">
                          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-5 w-5 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    ))
                  ) : error ? (
                    <div className="text-center text-red-500">
                      Failed to load FAQs. Please try again later.
                    </div>
                  ) : (
                    <Accordion type="single" collapsible className="w-full">
                      {faqs?.map((faq) => (
                        <motion.div key={faq.id} variants={itemVariants}>
                          <AccordionItem value={`item-${faq.id}`} className="border-b border-neutral-200 py-2">
                            <AccordionTrigger className="font-serif text-lg font-bold text-primary hover:no-underline">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-neutral-500">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        </motion.div>
                      ))}
                    </Accordion>
                  )}
                </motion.div>
              </TabsContent>
              
              <TabsContent value="process">
                <Accordion type="single" collapsible className="w-full">
                  {categoryFaqs.process.map((faq, index) => (
                    <AccordionItem key={index} value={`process-${index}`} className="border-b border-neutral-200 py-2">
                      <AccordionTrigger className="font-serif text-lg font-bold text-primary hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-neutral-500">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
              
              <TabsContent value="services">
                <Accordion type="single" collapsible className="w-full">
                  {categoryFaqs.services.map((faq, index) => (
                    <AccordionItem key={index} value={`services-${index}`} className="border-b border-neutral-200 py-2">
                      <AccordionTrigger className="font-serif text-lg font-bold text-primary hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-neutral-500">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
              
              <TabsContent value="sustainability">
                <Accordion type="single" collapsible className="w-full">
                  {categoryFaqs.sustainability.map((faq, index) => (
                    <AccordionItem key={index} value={`sustainability-${index}`} className="border-b border-neutral-200 py-2">
                      <AccordionTrigger className="font-serif text-lg font-bold text-primary hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-neutral-500">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Still Have Questions Section */}
      <section className="py-20 bg-neutral-100">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-6">Still Have Questions?</h2>
            <p className="text-neutral-500 text-lg mb-8 max-w-2xl mx-auto">
              If you couldn't find the answer to your question, feel free to contact us directly. We're here to help!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="text-secondary text-4xl mb-4">
                  <i className='bx bx-envelope'></i>
                </div>
                <h3 className="font-serif text-xl font-bold text-primary mb-3">Email Us</h3>
                <p className="text-neutral-500 mb-4">
                  Send us your questions and we'll get back to you promptly.
                </p>
                <a href="mailto:info@arcology.com" className="text-secondary hover:text-secondary/80 transition-colors">
                  info@arcology.com
                </a>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="text-secondary text-4xl mb-4">
                  <i className='bx bx-phone'></i>
                </div>
                <h3 className="font-serif text-xl font-bold text-primary mb-3">Call Us</h3>
                <p className="text-neutral-500 mb-4">
                  Speak directly with one of our architectural experts.
                </p>
                <a href="tel:+15559876543" className="text-secondary hover:text-secondary/80 transition-colors">
                  +1 (555) 987-6543
                </a>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="text-secondary text-4xl mb-4">
                  <i className='bx bx-chat'></i>
                </div>
                <h3 className="font-serif text-xl font-bold text-primary mb-3">Schedule a Consultation</h3>
                <p className="text-neutral-500 mb-4">
                  Book a time to discuss your project in detail.
                </p>
                <Link href="/contact">
                  <a className="text-secondary hover:text-secondary/80 transition-colors">
                    Book Now
                  </a>
                </Link>
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
              Let's work together to bring your architectural vision to life. Contact us today to begin the journey.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-secondary hover:bg-secondary/80 text-white font-medium shadow-lg">
                  Contact Us
                </Button>
              </Link>
              
              <Link href="/services">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary">
                  Explore Our Services
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

export default Faq;
