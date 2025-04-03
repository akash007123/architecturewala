import { useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import GoogleMap from "@/components/ui/google-map";
import { insertContactSchema } from "@shared/schema";
import BackToTop from "@/components/home/BackToTop";

// Extend the contact schema with validation
const formSchema = insertContactSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });
  
  const contactMutation = useMutation({
    mutationFn: (data: FormValues) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
        variant: "default",
      });
      form.reset();
      setSubmitted(true);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  const onSubmit = (data: FormValues) => {
    contactMutation.mutate(data);
  };
  
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

  return (
    <>
      <Helmet>
        <title>Contact Us | Arcology</title>
        <meta name="description" content="Get in touch with Arcology's architectural design team to discuss your project or inquire about our services." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black z-0">
          <img
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&h=900&q=80"
            alt="Modern architecture office"
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
            Get In Touch
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-white text-xl md:text-2xl max-w-3xl mx-auto opacity-90"
          >
            Let's discuss how we can bring your architectural vision to life
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white" ref={ref}>
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <span className="text-secondary uppercase tracking-wider font-display font-medium">Contact Us</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">We're Here to Help</h2>
            <p className="text-neutral-400">
              Have a project in mind or questions about our services? Reach out to us and we'll get back to you as soon as possible.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                  <div className="text-green-500 text-5xl mb-4">
                    <i className='bx bx-check-circle'></i>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">Message Received!</h3>
                  <p className="text-neutral-600 mb-4">
                    Thank you for reaching out. One of our team members will get back to you shortly.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setSubmitted(false)}
                    className="mt-2"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-neutral-500 font-medium">Full Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="John Doe" 
                                {...field} 
                                className="w-full px-4 py-3 border border-neutral-200 rounded-md focus:ring-2 focus:ring-secondary"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-neutral-500 font-medium">Email Address</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="john@example.com" 
                                type="email"
                                {...field} 
                                className="w-full px-4 py-3 border border-neutral-200 rounded-md focus:ring-2 focus:ring-secondary"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-500 font-medium">Phone Number</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="+1 (555) 123-4567" 
                              type="tel"
                              {...field} 
                              className="w-full px-4 py-3 border border-neutral-200 rounded-md focus:ring-2 focus:ring-secondary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-500 font-medium">Service Interested In</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-full px-4 py-3 border border-neutral-200 focus:ring-2 focus:ring-secondary">
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="architectural-design">Architectural Design</SelectItem>
                              <SelectItem value="interior-design">Interior Design</SelectItem>
                              <SelectItem value="urban-planning">Urban Planning</SelectItem>
                              <SelectItem value="sustainable-design">Sustainable Design</SelectItem>
                              <SelectItem value="project-management">Project Management</SelectItem>
                              <SelectItem value="3d-visualization">3D Visualization</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-500 font-medium">Your Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your project..." 
                              {...field} 
                              rows={5}
                              className="w-full px-4 py-3 border border-neutral-200 rounded-md focus:ring-2 focus:ring-secondary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 shadow-md"
                      disabled={contactMutation.isPending}
                    >
                      {contactMutation.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              )}
            </motion.div>
            
            <motion.div className="space-y-8" variants={itemVariants}>
              <div>
                <h3 className="font-serif text-xl font-bold text-primary mb-4">Our Office</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="text-secondary mr-4 mt-1">
                      <i className='bx bx-map text-xl'></i>
                    </div>
                    <div>
                      <p className="text-neutral-500">
                        123 Architecture Avenue, <br />
                        Design District, <br />
                        New York, NY 10001
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="text-secondary mr-4 mt-1">
                      <i className='bx bx-phone text-xl'></i>
                    </div>
                    <div>
                      <p className="text-neutral-500">
                        +1 (555) 987-6543
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="text-secondary mr-4 mt-1">
                      <i className='bx bx-envelope text-xl'></i>
                    </div>
                    <div>
                      <p className="text-neutral-500">
                        info@arcology.com
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="text-secondary mr-4 mt-1">
                      <i className='bx bx-time text-xl'></i>
                    </div>
                    <div>
                      <p className="text-neutral-500">
                        Monday - Friday: 9:00 AM - 6:00 PM <br />
                        Saturday: 10:00 AM - 2:00 PM <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-serif text-xl font-bold text-primary mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-primary hover:bg-primary/80 flex items-center justify-center text-white transition-colors" aria-label="Instagram">
                    <i className='bx bxl-instagram'></i>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-primary hover:bg-primary/80 flex items-center justify-center text-white transition-colors" aria-label="LinkedIn">
                    <i className='bx bxl-linkedin'></i>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-primary hover:bg-primary/80 flex items-center justify-center text-white transition-colors" aria-label="Pinterest">
                    <i className='bx bxl-pinterest'></i>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-primary hover:bg-primary/80 flex items-center justify-center text-white transition-colors" aria-label="Twitter">
                    <i className='bx bxl-twitter'></i>
                  </a>
                </div>
              </div>
              
              <GoogleMap className="h-64 rounded-lg overflow-hidden shadow-sm" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Preview Section */}
      <section className="py-20 bg-neutral-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <span className="text-secondary uppercase tracking-wider font-display font-medium">FAQ</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary">Common Questions</h2>
              <p className="text-neutral-500 leading-relaxed mb-6">
                Find quick answers to frequently asked questions about our architectural services.
              </p>
              
              <div className="space-y-6">
                <div className="border-b border-neutral-200 pb-4">
                  <h3 className="font-serif text-lg font-bold text-primary mb-2">What is your architectural design process?</h3>
                  <p className="text-neutral-500">
                    Our design process typically involves six key phases: initial consultation, concept development, schematic design, design development, construction documentation, and construction administration.
                  </p>
                </div>
                
                <div className="border-b border-neutral-200 pb-4">
                  <h3 className="font-serif text-lg font-bold text-primary mb-2">How long does an architectural project typically take?</h3>
                  <p className="text-neutral-500">
                    Project timelines vary based on complexity, scale, and specific requirements. A residential project might take 6-12 months from concept to completion, while larger commercial projects can span 18-36 months.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-serif text-lg font-bold text-primary mb-2">Do you handle all aspects of the construction process?</h3>
                  <p className="text-neutral-500">
                    While we primarily focus on architectural design and planning, we offer comprehensive project management services to oversee construction and ensure your project is executed according to specifications.
                  </p>
                </div>
              </div>
              
              <div className="pt-4">
                <Button variant="outline" className="bg-white">
                  <a href="/faq" className="inline-flex items-center">
                    View All FAQs <i className='bx bx-right-arrow-alt ml-2'></i>
                  </a>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=900&q=80" 
                  alt="Architectural consultation" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-2/3 h-2/3 bg-primary rounded-lg -z-10 opacity-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-neutral-200 text-lg mb-8 max-w-2xl mx-auto">
              Let's transform your ideas into architectural reality. Our team is excited to hear about your project and help bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-secondary hover:bg-secondary/80 text-white font-medium shadow-lg">
                Start Your Project
              </Button>
              
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary">
                Explore Our Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      <BackToTop />
    </>
  );
};

export default Contact;
