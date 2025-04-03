import { motion } from "framer-motion";
import { Link } from "wouter";
import { Project } from "../../shared/schema";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="group relative rounded-lg overflow-hidden shadow-lg h-80">
      <img 
        src={project.imageUrl} 
        alt={project.title} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-0 transition-opacity duration-300 p-6 flex flex-col justify-end group-hover:opacity-100">
        <h3 className="font-serif text-xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-neutral-200 mb-4">{project.description}</p>
        <Link href={`/projects/${project.slug}`}>
          <a className="inline-flex items-center text-secondary hover:text-secondary/80 transition-colors">
            View Project <i className='bx bx-right-arrow-alt ml-2'></i>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
