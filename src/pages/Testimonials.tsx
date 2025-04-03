import { useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { motion, useInView } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import TestimonialCard from "@/components/TestimonialCard";
import { Testimonial } from "@shared/schema";
import BackToTop from "@/components/home/BackToTop";

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { data: testimonials, isLoading, error } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
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
  
  // Mock data for client videos (in a real app, this would come from an API)
  const clientVideos = [
    {
      id: 1,
      title: "Sarah's Dream Home",
      description: "Sarah shares her experience working with Arcology on her family's custom home.",
      thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80",
      videoUrl: "#"
    },
    {
      id: 2,
      title: "TechInnovate Headquarters",
      description: "David discusses the process of transforming their corporate vision into reality.",
      thumbnail: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80",
      videoUrl: "#"
    },
    {
      id: 3,
      title: "Cultural Center Impact",
      description: "Maria explains how the new cultural center has transformed their community.",
      thumbnail: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80",
      videoUrl: "#"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Testimonials | Arcology</title>
        <meta name="description" content="Hear what our clients say about working with Arcology. Real stories from real clients about their architectural journey with us." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black z-0">
          <img
            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&h=900&q=80"
            alt="Client meeting"
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
            Client Testimonials
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-white text-xl md:text-2xl max-w-3xl mx-auto opacity-90"
          >
            Real stories from our clients about their architectural journey
          </motion.p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white" ref={ref}>
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <span className="text-secondary uppercase tracking-wider font-display font-medium">Client Feedback</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">What Our Clients Say</h2>
            <p className="text-neutral-400">
              The feedback from our clients reflects our commitment to excellence and client satisfaction throughout the design and development process.
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
              ))
            ) : error ? (
              <div className="col-span-full text-center text-red-500">
                Failed to load testimonials. Please try again later.
              </div>
            ) : testimonials && testimonials.length > 0 ? (
              // Duplicate testimonials to have more content
              [...testimonials, ...testimonials].map((testimonial, index) => (
                <motion.div key={`${testimonial.id}-${index}`} variants={itemVariants}>
                  <TestimonialCard testimonial={testimonial} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center text-neutral-500">
                No testimonials available.
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Client Video Testimonials */}
      <section className="py-20 bg-neutral-100">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-secondary uppercase tracking-wider font-display font-medium">Client Stories</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">Video Testimonials</h2>
            <p className="text-neutral-400">
              Watch our clients share their experiences working with Arcology on their architectural projects.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {clientVideos.map((video) => (
              <div key={video.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-primary/80 rounded-full p-4 text-white cursor-pointer hover:bg-primary transition-colors">
                      <i className='bx bx-play text-3xl'></i>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-primary mb-2">{video.title}</h3>
                  <p className="text-neutral-500 mb-4">{video.description}</p>
                  <a href={video.videoUrl} className="inline-flex items-center text-secondary hover:text-secondary/80 transition-colors">
                    Watch Video <i className='bx bx-right-arrow-alt ml-2'></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Client Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-neutral-100 rounded-lg overflow-hidden shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="text-secondary mb-4">
                  <i className='bx bxs-quote-alt-left text-4xl'></i>
                </div>
                <p className="text-neutral-600 text-lg italic mb-6">
                  "Working with Arcology was a transformative experience. They truly listened to our needs and translated our vision into a stunning design that exceeded our expectations. Their attention to detail and commitment to sustainability aligned perfectly with our values."
                </p>
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://randomuser.me/api/portraits/women/65.jpg" 
                      alt="Sarah Johnson" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-xl">Sarah Johnson</h4>
                    <p className="text-secondary">Seaside Residence</p>
                  </div>
                </div>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=750&q=80" 
                  alt="Seaside Residence" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-secondary uppercase tracking-wider font-display font-medium">Our Track Record</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mt-2 mb-4">Client Satisfaction</h2>
            <p className="text-neutral-200">
              We take pride in our commitment to excellence and the strong relationships we build with our clients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-secondary mb-2">98%</div>
              <p className="text-neutral-200">Client Satisfaction Rate</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-secondary mb-2">85%</div>
              <p className="text-neutral-200">Repeat Clients</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-secondary mb-2">200+</div>
              <p className="text-neutral-200">Completed Projects</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-secondary mb-2">40+</div>
              <p className="text-neutral-200">Design Awards</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-6">Ready to Create Your Success Story?</h2>
            <p className="text-neutral-500 text-lg mb-8 max-w-2xl mx-auto">
              Join our satisfied clients and start your architectural journey with Arcology today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-secondary hover:bg-secondary/80 text-white font-medium shadow-lg">
                  Get Started
                </Button>
              </Link>
              
              <Link href="/projects">
                <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white">
                  Explore Our Work
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

export default Testimonials;
