import { useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { motion, useInView } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/ProjectCard";
import { Project } from "@shared/schema";
import BackToTop from "@/components/home/BackToTop";

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
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
  
  // Get unique categories
  const categories = projects 
    ? ['all', ...new Set(projects.map(project => project.category))] 
    : ['all'];
  
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects?.filter(project => project.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>Projects | Arcology</title>
        <meta name="description" content="Explore our portfolio of innovative architectural projects spanning residential, commercial, cultural, and public spaces." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black z-0">
          <img
            src="https://images.unsplash.com/photo-1470723710355-95304d8aece4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&h=900&q=80"
            alt="Architectural project"
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
            Our Projects
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-white text-xl md:text-2xl max-w-3xl mx-auto opacity-90"
          >
            A showcase of our innovative architectural solutions
          </motion.p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-white" ref={ref}>
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-12"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <span className="text-secondary uppercase tracking-wider font-display font-medium">Our Portfolio</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">Featured Projects</h2>
            <p className="text-neutral-400 mb-8">
              Browse our diverse portfolio of projects showcasing our commitment to innovative, sustainable design.
            </p>
            
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
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
                <div key={i} className="rounded-lg overflow-hidden shadow-lg animate-pulse">
                  <div className="w-full h-80 bg-gray-200"></div>
                </div>
              ))
            ) : error ? (
              <div className="col-span-full text-center text-red-500">
                Failed to load projects. Please try again later.
              </div>
            ) : filteredProjects && filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <motion.div key={project.id} variants={itemVariants}>
                  <ProjectCard project={project} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center text-neutral-500">
                No projects found in this category.
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Featured Project Section */}
      <section className="py-20 bg-neutral-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-secondary uppercase tracking-wider font-display font-medium">Featured Project</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary">Cultural Center</h2>
              <p className="text-neutral-500 leading-relaxed">
                This award-winning public space was designed to celebrate local heritage and foster community engagement. The design harmoniously blends modern architectural elements with cultural influences, creating a vibrant gathering place for the community.
              </p>
              <p className="text-neutral-500 leading-relaxed">
                Sustainability was a key consideration, with passive design strategies, renewable energy systems, and locally-sourced materials significantly reducing the building's environmental footprint.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <div>
                  <span className="text-primary font-bold block">Location</span>
                  <span className="text-neutral-500">Portland, Oregon</span>
                </div>
                <div>
                  <span className="text-primary font-bold block">Size</span>
                  <span className="text-neutral-500">45,000 sq ft</span>
                </div>
                <div>
                  <span className="text-primary font-bold block">Completed</span>
                  <span className="text-neutral-500">2021</span>
                </div>
              </div>
              <div className="pt-4">
                <Link href="/projects/cultural-center">
                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    View Project Details <i className='bx bx-right-arrow-alt ml-2'></i>
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80" 
                  alt="Cultural Center Exterior" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg mt-8">
                <img 
                  src="https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80" 
                  alt="Cultural Center Interior" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1587097714214-ffc8d11adf38?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80" 
                  alt="Cultural Center Detail" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg mt-8">
                <img 
                  src="https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80" 
                  alt="Cultural Center Plaza" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-secondary uppercase tracking-wider font-display font-medium">Our Approach</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">Project Development Process</h2>
            <p className="text-neutral-400">
              We follow a structured methodology that ensures every project is executed with precision and care.
            </p>
          </div>
          
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-neutral-200 -translate-x-1/2"></div>
            
            <div className="space-y-12 relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="md:text-right order-2 md:order-1">
                  <h3 className="font-serif text-xl font-bold text-primary mb-3">Discovery & Research</h3>
                  <p className="text-neutral-500">
                    We begin by understanding your vision and requirements, conducting thorough site analysis and research to inform our approach.
                  </p>
                </div>
                <div className="relative order-1 md:order-2">
                  <div className="hidden md:block absolute left-0 top-1/2 w-4 h-4 rounded-full bg-secondary -translate-x-1/2 -translate-y-1/2"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1551651653-c5dcb914d809?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80" 
                    alt="Discovery Phase" 
                    className="rounded-lg shadow-lg h-60 w-full object-cover"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative">
                  <div className="hidden md:block absolute right-0 top-1/2 w-4 h-4 rounded-full bg-secondary translate-x-1/2 -translate-y-1/2"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80" 
                    alt="Concept Development" 
                    className="rounded-lg shadow-lg h-60 w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-primary mb-3">Concept Development</h3>
                  <p className="text-neutral-500">
                    We explore creative solutions, developing preliminary concepts that align with your goals and respond to the context.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="md:text-right order-2 md:order-1">
                  <h3 className="font-serif text-xl font-bold text-primary mb-3">Design Refinement</h3>
                  <p className="text-neutral-500">
                    Based on your feedback, we refine and evolve the design, addressing functional requirements and aesthetic considerations.
                  </p>
                </div>
                <div className="relative order-1 md:order-2">
                  <div className="hidden md:block absolute left-0 top-1/2 w-4 h-4 rounded-full bg-secondary -translate-x-1/2 -translate-y-1/2"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1532622785990-d2c36a76f5a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80" 
                    alt="Design Refinement" 
                    className="rounded-lg shadow-lg h-60 w-full object-cover"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative">
                  <div className="hidden md:block absolute right-0 top-1/2 w-4 h-4 rounded-full bg-secondary translate-x-1/2 -translate-y-1/2"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1580820267682-426da9456531?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80" 
                    alt="Documentation" 
                    className="rounded-lg shadow-lg h-60 w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-primary mb-3">Documentation & Approvals</h3>
                  <p className="text-neutral-500">
                    We prepare detailed construction documents and navigate approval processes to ensure compliance with regulations.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="md:text-right order-2 md:order-1">
                  <h3 className="font-serif text-xl font-bold text-primary mb-3">Construction & Completion</h3>
                  <p className="text-neutral-500">
                    We provide oversight during construction and collaborate with contractors to ensure the project is realized as designed.
                  </p>
                </div>
                <div className="relative order-1 md:order-2">
                  <div className="hidden md:block absolute left-0 top-1/2 w-4 h-4 rounded-full bg-secondary -translate-x-1/2 -translate-y-1/2"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80" 
                    alt="Construction & Completion" 
                    className="rounded-lg shadow-lg h-60 w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Ready to Bring Your Vision to Life?</h2>
            <p className="text-neutral-200 text-lg mb-8 max-w-2xl mx-auto">
              Let's collaborate to create a space that exceeds your expectations and stands the test of time.
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
          </div>
        </div>
      </section>

      <BackToTop />
    </>
  );
};

export default Projects;
