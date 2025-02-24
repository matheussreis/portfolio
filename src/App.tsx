import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import SkillSection from '@/components/SkillSection';
import ProjectSection from '@/components/ProjectSection';
import EducationSection from '@/components/EducationSection';
import ExperienceSection from '@/components/ExperienceSection';

export default function App() {
  return (
    <>
      <Navbar />
      <main className="flex-grow min-h-screen">
        <HeroSection />
        <ExperienceSection />
        <SkillSection />
        <EducationSection />
        <ProjectSection />
      </main>
      <Footer />
    </>
  );
}
