import { useRef } from "react";
import { Helmet } from "react-helmet";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import BackToTop from "@/components/home/BackToTop";

const About = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const isInView1 = useInView(ref1, { once: true, margin: "-100px" });
  const isInView2 = useInView(ref2, { once: true, margin: "-100px" });
  const isInView3 = useInView(ref3, { once: true, margin: "-100px" });
  
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };
  
  const teamMembers = [
    {
      name: "Jessica Chen",
      role: "Principal Architect",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&h=250&q=80",
      bio: "With over 15 years of experience, Jessica leads our team with a passion for innovative, sustainable design solutions."
    },
    {
      name: "Marcus Reynolds",
      role: "Design Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&h=250&q=80",
      bio: "Marcus brings his unique artistic vision and technical expertise to create spaces that inspire and endure."
    },
    {
      name: "Sophia Rodriguez",
      role: "Interior Design Lead",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&h=250&q=80",
      bio: "Sophia specializes in creating thoughtful interior spaces that enhance the user experience and complement architectural design."
    },
    {
      name: "David Kim",
      role: "Urban Planning Specialist",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&h=250&q=80",
      bio: "David focuses on creating sustainable urban environments that prioritize community needs and environmental stewardship."
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us | Arcology</title>
        <meta name="description" content="Learn about Arcology, our team, mission, and our approach to architectural design and development." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black z-0">
          <img
            src="https://images.unsplash.com/photo-1481026469463-66327c86e544?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&h=900&q=80"
            alt="Our architecture studio"
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
            About Arcology
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-white text-xl md:text-2xl max-w-3xl mx-auto opacity-90"
          >
            A passionate team of architects and designers creating spaces that inspire
          </motion.p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white" ref={ref1}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6"
              initial="hidden"
              animate={isInView1 ? "visible" : "hidden"}
              variants={fadeIn}
            >
              <span className="text-secondary uppercase tracking-wider font-display font-medium">Our Story</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary">Creating Exceptional Spaces Since 2003</h2>
              <p className="text-neutral-500 leading-relaxed">
                Arcology was founded by a group of passionate architects who shared a vision for creating innovative spaces that harmonize with their surroundings and enhance the lives of those who inhabit them. What began as a small studio has evolved into an award-winning firm known for pushing the boundaries of architectural design.
              </p>
              <p className="text-neutral-500 leading-relaxed">
                Over the past two decades, we've built a diverse portfolio spanning residential, commercial, cultural, and public projects across the globe. Each project represents our commitment to excellence, sustainability, and thoughtful design.
              </p>
              <div className="pt-4 grid grid-cols-2 gap-4">
                <div className="border-l-4 border-secondary pl-4">
                  <h3 className="text-primary font-bold text-xl">Our Mission</h3>
                  <p className="text-neutral-500 mt-2">To create innovative spaces that inspire, function perfectly, and stand the test of time.</p>
                </div>
                <div className="border-l-4 border-secondary pl-4">
                  <h3 className="text-primary font-bold text-xl">Our Vision</h3>
                  <p className="text-neutral-500 mt-2">To lead the way in designing sustainable, beautiful environments that enhance human experience.</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial="hidden"
              animate={isInView1 ? "visible" : "hidden"}
              variants={fadeIn}
            >
              <div className="rounded-lg overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80" 
                  alt="Arcology team meeting" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-md mt-8">
                <img 
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80" 
                  alt="Our design studio" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80" 
                  alt="Arcology project" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-md mt-8">
                <img 
                  src="https://images.unsplash.com/photo-1572297794908-f2ee5a2930d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80" 
                  alt="Architectural detail" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-20 bg-neutral-100" ref={ref2}>
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            animate={isInView2 ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <span className="text-secondary uppercase tracking-wider font-display font-medium">Our Team</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">Meet The Experts</h2>
            <p className="text-neutral-400">
              Our talented team brings together diverse expertise and a shared passion for exceptional architecture.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-sm"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-primary">{member.name}</h3>
                  <p className="text-secondary font-medium mb-3">{member.role}</p>
                  <p className="text-neutral-500">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-20 bg-white" ref={ref3}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="order-2 lg:order-1"
              initial="hidden"
              animate={isInView3 ? "visible" : "hidden"}
              variants={fadeIn}
            >
              <img 
                src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&h=600&q=80" 
                alt="Our design process" 
                className="rounded-lg shadow-lg w-full"
              />
            </motion.div>
            
            <motion.div
              className="space-y-6 order-1 lg:order-2"
              initial="hidden"
              animate={isInView3 ? "visible" : "hidden"}
              variants={fadeIn}
            >
              <span className="text-secondary uppercase tracking-wider font-display font-medium">Our Approach</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary">How We Work</h2>
              <div className="space-y-4">
                <div className="flex">
                  <div className="flex-shrink-0 bg-secondary/20 rounded-full w-10 h-10 flex items-center justify-center text-secondary mr-4">
                    <span className="font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-primary text-lg">Discover</h3>
                    <p className="text-neutral-500">We begin by understanding your vision, needs, and the unique aspects of your project.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 bg-secondary/20 rounded-full w-10 h-10 flex items-center justify-center text-secondary mr-4">
                    <span className="font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-primary text-lg">Concept</h3>
                    <p className="text-neutral-500">Our team develops innovative concepts that align with your goals and respond to the site context.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 bg-secondary/20 rounded-full w-10 h-10 flex items-center justify-center text-secondary mr-4">
                    <span className="font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-primary text-lg">Refine</h3>
                    <p className="text-neutral-500">We refine designs through collaborative iterations, ensuring every detail meets our standards.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 bg-secondary/20 rounded-full w-10 h-10 flex items-center justify-center text-secondary mr-4">
                    <span className="font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-primary text-lg">Deliver</h3>
                    <p className="text-neutral-500">We oversee implementation to ensure the final result matches our shared vision.</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Link href="/contact">
                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    Start Your Project <i className='bx bx-right-arrow-alt ml-2'></i>
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Let's Create Something Amazing Together</h2>
            <p className="text-neutral-200 text-lg mb-8 max-w-2xl mx-auto">
              Whether you have a specific project in mind or just want to explore possibilities, we're here to help bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-secondary hover:bg-secondary/80 text-white font-medium shadow-lg">
                  Get in Touch
                </Button>
              </Link>
              
              <Link href="/projects">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary">
                  View Our Work
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

export default About;
