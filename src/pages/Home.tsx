import { Helmet } from "react-helmet";
import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FaqSection from "@/components/home/FaqSection";
import BlogSection from "@/components/home/BlogSection";
import ContactSection from "@/components/home/ContactSection";
import CtaSection from "@/components/home/CtaSection";
import PopupCta from "@/components/home/PopupCta";
import BackToTop from "@/components/home/BackToTop";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Arcology - Architecture Design & Development</title>
        <meta name="description" content="Award-winning architectural design and development services for visionary projects." />
      </Helmet>

      <Hero />
      <AboutSection />
      <ServicesSection />
      <WhyChooseUs />
      <FeaturedProjects />
      <TestimonialsSection />
      <FaqSection />
      <BlogSection />
      <CtaSection />
      <ContactSection />
      <PopupCta />
      <BackToTop />
    </>
  );
};

export default Home;
