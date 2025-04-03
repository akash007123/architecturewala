import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import TestimonialCard from "@/components/TestimonialCard";
import { Testimonial } from "@shared/schema";

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  
  const { data: testimonials, isLoading, error } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
  });
  
  // Auto-slide testimonials
  useEffect(() => {
    if (!testimonials || testimonials.length <= 1) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials]);
  
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0
    })
  };
  
  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  return (
    <section id="testimonials" className="py-20 bg-neutral-100" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={textVariants}
        >
          <span className="text-secondary uppercase tracking-wider font-display font-medium">Testimonials</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">What Our Clients Say</h2>
          <p className="text-neutral-400">
            The feedback from our clients reflects our commitment to excellence and client satisfaction.
          </p>
        </motion.div>
        
        <motion.div 
          className="relative testimonial-slider"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={textVariants}
        >
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-8 rounded-lg shadow-sm border border-neutral-200 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded mb-6"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-6"></div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                    <div>
                      <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-32"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-red-500">
              Failed to load testimonials. Please try again later.
            </div>
          ) : testimonials && testimonials.length > 0 ? (
            <>
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                  {[0, 1, 2].map((offset) => {
                    const index = (currentIndex + offset) % testimonials.length;
                    return testimonials[index] ? (
                      <TestimonialCard key={testimonials[index].id} testimonial={testimonials[index]} />
                    ) : null;
                  })}
                </motion.div>
              </AnimatePresence>
              
              <div className="flex justify-center mt-10">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full mx-1 ${
                      index === currentIndex ? 'bg-secondary' : 'bg-neutral-300'
                    }`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center text-neutral-500">No testimonials available.</div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
