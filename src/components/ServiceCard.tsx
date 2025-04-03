import { motion } from "framer-motion";
import { Link } from "wouter";
import { Service } from "../../shared/schema";

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <div className="service-card p-6 rounded-lg border border-neutral-200 bg-white shadow-sm">
      <div className="text-secondary mb-4">
        <i className={`bx ${service.icon} text-4xl`}></i>
      </div>
      <h3 className="font-serif text-xl font-bold text-primary mb-3">{service.title}</h3>
      <p className="text-neutral-400 mb-4">
        {service.description}
      </p>
      <Link href={`/services/${service.slug}`}>
        <a className="inline-flex items-center text-secondary hover:text-secondary/80 transition-colors">
          Learn more <i className='bx bx-right-arrow-alt ml-2'></i>
        </a>
      </Link>
    </div>
  );
};

export default ServiceCard;
