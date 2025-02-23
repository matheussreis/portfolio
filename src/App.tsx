import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ExperienceSection from './components/ExperienceSection';
import EducationSection from './components/EducationSection';
import ProjectSection from './components/ProjectSection';
import Footer from './components/Footer';
import SkillSection from './components/SkillSection';

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
