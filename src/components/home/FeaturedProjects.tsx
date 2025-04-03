import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/ProjectCard";
import { Project } from "@shared/schema";

const FeaturedProjects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
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
    <section id="projects" className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <motion.div 
            className="max-w-2xl"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={textVariants}
          >
            <span className="text-secondary uppercase tracking-wider font-display font-medium">Our Portfolio</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">Featured Projects</h2>
            <p className="text-neutral-400">
              Explore our diverse portfolio of innovative architectural projects spanning residential, commercial, cultural, and public spaces.
            </p>
          </motion.div>
          
          <motion.div 
            className="mt-6 md:mt-0"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={textVariants}
          >
            <Link href="/projects">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                View All Projects <i className='bx bx-right-arrow-alt ml-2'></i>
              </Button>
            </Link>
          </motion.div>
        </div>
        
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
          ) : (
            projects?.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <ProjectCard project={project} />
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
