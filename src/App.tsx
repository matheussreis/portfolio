import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ExperienceSection from './components/ExperienceSection';
import EducationSection from './components/EducationSection';
import ProjectSection from './components/ProjectSection';

export default function App() {
  return (
    <>
      <Navbar />
      <main className="flex-grow min-h-screen">
        <HeroSection />
        <ExperienceSection />
        <EducationSection />
        <ProjectSection />
      </main>
    </>
  );
}
