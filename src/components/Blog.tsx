import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

const Blog = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const blogPosts = [
    {
      title: 'The Future of Sustainable Architecture',
      excerpt: 'Exploring innovative sustainable design practices and their impact on modern architecture.',
      image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      date: 'Mar 15, 2024',
      author: 'Sarah Johnson',
      category: 'Sustainability',
      readTime: '5 min read'
    },
    {
      title: 'Integrating Smart Technology in Home Design',
      excerpt: 'How smart home technology is revolutionizing residential architecture and design.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      date: 'Mar 12, 2024',
      author: 'Michael Chen',
      category: 'Technology',
      readTime: '4 min read'
    },
    {
      title: 'Minimalism in Modern Architecture',
      excerpt: 'Understanding the principles and applications of minimalist design in contemporary buildings.',
      image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      date: 'Mar 10, 2024',
      author: 'Emma Davis',
      category: 'Design',
      readTime: '6 min read'
    }
  ];

  const categories = [
    'All', 'Sustainability', 'Technology', 'Design', 'Innovation', 'Interior Design'
  ];

  return (
    <section className="py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Architecture Blog</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest trends, insights, and innovations in architecture and design.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="px-6 py-2 rounded-full bg-white text-gray-600 hover:bg-gray-900 hover:text-white transition-colors duration-300"
            >
              {category}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white px-4 py-1 rounded-full text-sm font-medium text-gray-600">
                  {post.readTime}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {post.date}
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {post.author}
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-500">{post.category}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <button className="flex items-center text-gray-900 font-medium hover:text-gray-600 transition-colors duration-300">
                  Read More
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <button className="bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300 inline-flex items-center">
            View All Articles
            <ArrowRight className="h-5 w-5 ml-2" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;