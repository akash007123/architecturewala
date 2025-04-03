import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeInOut"
      }
    })
  };

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black z-0">
        <img
          src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&h=1100&q=80"
          alt="Modern architecture"
          className="w-full h-full object-cover opacity-70"
        />
      </div>
      
      <div className="container mx-auto px-6 z-10 text-center">
        <motion.h1
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="font-serif text-4xl md:text-6xl font-bold text-white text-shadow mb-6"
        >
          Shaping Spaces <br className="hidden md:block" /> Defining Tomorrow
        </motion.h1>
        
        <motion.p
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-white text-xl md:text-2xl max-w-3xl mx-auto mb-8 opacity-90"
        >
          Award-winning architectural design and development services for visionary projects.
        </motion.p>
        
        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link href="/contact">
            <Button size="lg" className="bg-secondary hover:bg-secondary/80 text-white font-medium shadow-lg">
              Start Your Project
            </Button>
          </Link>
          
          <Link href="/services">
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary">
              Explore Services
            </Button>
          </Link>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce"
      >
        <a href="#about" aria-label="Scroll down">
          <i className='bx bx-chevron-down text-3xl'></i>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
