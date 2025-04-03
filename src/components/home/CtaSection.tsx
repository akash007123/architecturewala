import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const CtaSection = () => {
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

  return (
    <section className="py-20 bg-primary" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div 
          className="max-w-4xl mx-auto text-center text-white"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={textVariants}
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Ready to Bring Your Vision to Life?</h2>
          <p className="text-neutral-200 text-lg mb-8 max-w-2xl mx-auto">
            Let's collaborate to create spaces that inspire, function perfectly, and exceed your expectations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-secondary hover:bg-secondary/80 text-white font-medium shadow-lg">
                Start Your Project
              </Button>
            </Link>
            
            <Link href="/services">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary">
                Explore Our Services
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
