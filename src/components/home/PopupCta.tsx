import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { insertNewsletterSchema } from "@shared/schema";

// Extend the newsletter schema with validation
const formSchema = insertNewsletterSchema.extend({
  email: z.string().email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof formSchema>;

const PopupCta = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Show popup after 5 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  
  const newsletterMutation = useMutation({
    mutationFn: (data: FormValues) => {
      return apiRequest("POST", "/api/newsletter", data);
    },
    onSuccess: () => {
      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
        variant: "default",
      });
      form.reset();
      setIsOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "There was a problem subscribing. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  const onSubmit = (data: FormValues) => {
    newsletterMutation.mutate(data);
  };
  
  const closePopup = () => {
    setIsOpen(false);
  };
  
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleOutsideClick}
        >
          <motion.div 
            className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 relative overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button 
              className="absolute top-3 right-3 text-neutral-400 hover:text-neutral-600"
              onClick={closePopup}
              aria-label="Close popup"
            >
              <i className='bx bx-x text-2xl'></i>
            </button>
            <div className="p-6">
              <div className="text-center mb-6">
                <span className="text-secondary uppercase tracking-wider font-display font-medium">Special Offer</span>
                <h3 className="font-serif text-2xl font-bold text-primary mt-2">Free Initial Consultation</h3>
              </div>
              <p className="text-neutral-500 mb-6 text-center">
                Sign up for our newsletter and receive a complimentary 30-minute consultation for your project.
              </p>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            placeholder="Your Email Address" 
                            type="email"
                            {...field} 
                            className="w-full px-4 py-3 border border-neutral-200 rounded-md focus:ring-2 focus:ring-secondary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-secondary hover:bg-secondary/80 text-white font-medium py-3 shadow-md"
                    disabled={newsletterMutation.isPending}
                  >
                    {newsletterMutation.isPending ? "Subscribing..." : "Subscribe Now"}
                  </Button>
                </form>
              </Form>
              <p className="text-neutral-400 text-xs text-center mt-4">
                By subscribing, you agree to our Privacy Policy and Terms of Service.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PopupCta;
