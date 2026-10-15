import Navbar from "@/components/ui/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AchievementsStrip from "@/components/sections/AchievementsStrip";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import SkillsSection from "@/components/sections/SkillsSection";
import CertificatesGallery from "@/components/sections/CertificatesGallery";
import PersonalGallerySection from "@/components/sections/PersonalGallerySection";
import EducationSection from "@/components/sections/EducationSection";
import ContactSection from "@/components/sections/ContactSection";
import VoiceAgent from "@/components/ui/VoiceAgent";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[#00F5D4] selection:text-[#090B10]">
      {/* Sticky Global Navigation */}
      <Navbar />

      <main className="flex-grow">
        {/* 1. Hero Section with 3D WebGL background */}
        <HeroSection />

        {/* 2. Headline Achievements Count-Up Strip */}
        <AchievementsStrip />

        {/* 3. About & Engineering Philosophy */}
        <AboutSection />

        {/* 4. Projects: Featured Case Studies + Expandable Grid + Open Source */}
        <ProjectsSection />

        {/* 5. Experience Timeline with Certificate Modals */}
        <ExperienceSection />

        {/* 6. Skills Categories & Frontier Exploring */}
        <SkillsSection />

        {/* 7. Certificates & Awards Gallery with Lightbox */}
        <CertificatesGallery />

        {/* 8. Authentic Journey & Personal Hackathon Gallery */}
        <PersonalGallerySection />

        {/* 9. Education & Academic Rigor */}
        <EducationSection />

        {/* 10. Contact Dispatcher & Direct Channels */}
        <ContactSection />
      </main>

      {/* Interactive AI Voice Guide Agent */}
      <VoiceAgent />

      {/* 11. Footer with Back-to-Top */}
      <Footer />
    </div>
  );
}
