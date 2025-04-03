import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Faq } from "@shared/schema";

const FaqSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { data: faqs, isLoading, error } = useQuery<Faq[]>({
    queryKey: ['/api/faqs'],
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
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section id="faq" className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={textVariants}
        >
          <span className="text-secondary uppercase tracking-wider font-display font-medium">FAQ</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">Frequently Asked Questions</h2>
          <p className="text-neutral-400">
            Find answers to common questions about our architectural services and process.
          </p>
        </motion.div>
        
        <motion.div 
          className="max-w-3xl mx-auto"
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
      </div>
    </section>
  );
};

export default FaqSection;
