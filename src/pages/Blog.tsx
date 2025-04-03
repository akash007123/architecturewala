import { useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { motion, useInView } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import BlogCard from "@/components/BlogCard";
import { Blog as BlogType } from "@shared/schema";
import BackToTop from "@/components/home/BackToTop";

const Blog = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: blogs, isLoading, error } = useQuery<BlogType[]>({
    queryKey: ['/api/blogs'],
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
  const categories = blogs 
    ? ['all', ...new Set(blogs.map(blog => blog.category))] 
    : ['all'];
  
  // Filter blogs based on category and search term
  const filteredBlogs = blogs
    ? blogs.filter(blog => {
        const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;
        const matchesSearch = searchTerm === '' || 
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
          blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
      })
    : [];

  return (
    <>
      <Helmet>
        <title>Blog | Arcology</title>
        <meta name="description" content="Explore our architectural insights, design trends, and industry news in our blog." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black z-0">
          <img
            src="https://images.unsplash.com/photo-1519974719765-e6559eac2575?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&h=900&q=80"
            alt="Architectural details"
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
            Architectural Insights
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-white text-xl md:text-2xl max-w-3xl mx-auto opacity-90"
          >
            Explore our perspectives on architecture, design, and industry trends
          </motion.p>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-white" ref={ref}>
        <div className="container mx-auto px-6">
          <motion.div 
            className="mb-12"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div>
                <span className="text-secondary uppercase tracking-wider font-display font-medium">Our Blog</span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mt-2">Latest Articles</h2>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 pr-10 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
                    <i className='bx bx-search'></i>
                  </div>
                </div>
                
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent bg-white"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
          
          {blogs && blogs.length > 0 && (
            <div className="mb-16">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeIn}
              >
                <div className="relative h-96 md:h-full rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src={blogs[0].imageUrl} 
                    alt={blogs[0].title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-8 flex flex-col justify-end">
                    <div className="flex items-center text-sm text-white mb-3">
                      <span>{new Date(blogs[0].publishedDate).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span>{blogs[0].category}</span>
                    </div>
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-3">{blogs[0].title}</h3>
                    <p className="text-neutral-200 mb-4 line-clamp-2">
                      {blogs[0].excerpt}
                    </p>
                    <Link href={`/blog/${blogs[0].slug}`}>
                      <a className="inline-flex items-center text-secondary hover:text-secondary/80 transition-colors">
                        Read More <i className='bx bx-right-arrow-alt ml-2'></i>
                      </a>
                    </Link>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-8">
                  {blogs.slice(1, 3).map((blog) => (
                    <div key={blog.id} className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-1/3 h-48 rounded-lg overflow-hidden">
                        <img 
                          src={blog.imageUrl} 
                          alt={blog.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="w-full md:w-2/3">
                        <div className="flex items-center text-sm text-neutral-400 mb-2">
                          <span>{new Date(blog.publishedDate).toLocaleDateString()}</span>
                          <span className="mx-2">•</span>
                          <span>{blog.category}</span>
                        </div>
                        <h3 className="font-serif text-xl font-bold text-primary mb-2">{blog.title}</h3>
                        <p className="text-neutral-500 mb-3 line-clamp-2">
                          {blog.excerpt}
                        </p>
                        <Link href={`/blog/${blog.slug}`}>
                          <a className="inline-flex items-center text-secondary hover:text-secondary/80 transition-colors">
                            Read More <i className='bx bx-right-arrow-alt ml-2'></i>
                          </a>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {isLoading ? (
              // Loading skeleton
              Array(6).fill(0).map((_, i) => (
                <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
                  <div className="h-52 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                    <div className="h-5 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))
            ) : error ? (
              <div className="col-span-full text-center text-red-500">
                Failed to load blog posts. Please try again later.
              </div>
            ) : filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
                <motion.div key={blog.id} variants={itemVariants}>
                  <BlogCard blog={blog} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center text-neutral-500 py-12">
                <div className="text-5xl mb-4">
                  <i className='bx bx-search-alt'></i>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">No Articles Found</h3>
                <p>Try adjusting your search or filter to find what you're looking for.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchTerm("");
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </motion.div>
          
          {filteredBlogs.length > 0 && (
            <div className="mt-12 text-center">
              <Button variant="outline" className="border-neutral-200">
                Load More Articles <i className='bx bx-chevron-down ml-2'></i>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-neutral-100">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-primary rounded-lg overflow-hidden shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 text-white">
                <h2 className="font-serif text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
                <p className="text-neutral-200 mb-6">
                  Stay updated with our latest architectural insights, project features, and industry news.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent w-full sm:w-2/3 text-neutral-800"
                  />
                  <Button className="bg-secondary hover:bg-secondary/80 text-white border-none w-full sm:w-auto">
                    Subscribe
                  </Button>
                </div>
                <p className="text-neutral-300 text-xs mt-4">
                  By subscribing, you agree to our Privacy Policy and Terms of Service.
                </p>
              </div>
              <div className="hidden md:block">
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80" 
                  alt="Newsletter" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-secondary uppercase tracking-wider font-display font-medium">Explore Topics</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">Popular Categories</h2>
            <p className="text-neutral-400">
              Dive into specific topics that interest you most.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group relative h-64 rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80" 
                alt="Sustainable Architecture" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent p-6 flex flex-col justify-end">
                <h3 className="font-serif text-xl font-bold text-white mb-2">Sustainable Architecture</h3>
                <p className="text-neutral-200 mb-4">Eco-friendly design principles and innovations.</p>
              </div>
            </div>
            
            <div className="group relative h-64 rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1495540636569-9dc288761831?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80" 
                alt="Design Trends" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent p-6 flex flex-col justify-end">
                <h3 className="font-serif text-xl font-bold text-white mb-2">Design Trends</h3>
                <p className="text-neutral-200 mb-4">Current and emerging trends in architectural design.</p>
              </div>
            </div>
            
            <div className="group relative h-64 rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80" 
                alt="Technology" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent p-6 flex flex-col justify-end">
                <h3 className="font-serif text-xl font-bold text-white mb-2">Technology</h3>
                <p className="text-neutral-200 mb-4">How technology is transforming architectural practice.</p>
              </div>
            </div>
            
            <div className="group relative h-64 rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80" 
                alt="Urban Planning" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent p-6 flex flex-col justify-end">
                <h3 className="font-serif text-xl font-bold text-white mb-2">Urban Planning</h3>
                <p className="text-neutral-200 mb-4">Strategies for creating livable, sustainable cities.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BackToTop />
    </>
  );
};

export default Blog;
