import { useRef, useState } from "react";
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

// Extend the contact schema with validation
const formSchema = insertContactSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const ContactSection = () => {
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

  return (
    <section id="contact" className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={textVariants}
        >
          <span className="text-secondary uppercase tracking-wider font-display font-medium">Contact Us</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">Get In Touch</h2>
          <p className="text-neutral-400">
            Have a project in mind or questions about our services? We're here to help.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div variants={textVariants}>
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
          
          <motion.div className="space-y-8" variants={textVariants}>
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
  );
};

export default ContactSection;
