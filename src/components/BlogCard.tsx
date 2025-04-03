import { Link } from "wouter";
import { Blog } from "@shared/schema";
import { formatDistance } from "date-fns";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  const formattedDate = formatDistance(
    new Date(blog.publishedDate),
    new Date(),
    { addSuffix: true }
  );

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
      <div className="relative h-52 overflow-hidden">
        <img 
          src={blog.imageUrl} 
          alt={blog.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center text-sm text-neutral-400 mb-3">
          <span>{formattedDate}</span>
          <span className="mx-2">•</span>
          <span>{blog.category}</span>
        </div>
        <h3 className="font-serif text-xl font-bold text-primary mb-3">{blog.title}</h3>
        <p className="text-neutral-500 mb-4 line-clamp-2">
          {blog.excerpt}
        </p>
        <Link href={`/blog/${blog.slug}`}>
          <a className="inline-flex items-center text-secondary hover:text-secondary/80 transition-colors">
            Read More <i className='bx bx-right-arrow-alt ml-2'></i>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
