import { Testimonial } from "../../shared/schema";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-200">
      <div className="flex items-center mb-6">
        <div className="text-secondary">
          {Array(testimonial.rating).fill(0).map((_, i) => (
            <i key={i} className='bx bxs-star'></i>
          ))}
          {Array(5 - testimonial.rating).fill(0).map((_, i) => (
            <i key={i} className='bx bxs-star-half'></i>
          ))}
        </div>
      </div>
      <p className="text-neutral-500 italic mb-6">
        "{testimonial.content}"
      </p>
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <img 
            src={testimonial.imageUrl} 
            alt={testimonial.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-bold text-primary">{testimonial.name}</h4>
          <p className="text-neutral-400 text-sm">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
