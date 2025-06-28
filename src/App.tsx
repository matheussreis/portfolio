import { lazy, Suspense } from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Spinner from './components/ui/Spinner';
import HeroSection from '@/components/HeroSection';

const SkillSection = lazy(() => import('@/components/SkillSection'));
const ProjectSection = lazy(() => import('@/components/ProjectSection'));
const EducationSection = lazy(() => import('@/components/EducationSection'));
const ExperienceSection = lazy(() => import('@/components/ExperienceSection'));

export default function App() {
  return (
    <>
      <Navbar />
      <main className="flex-grow min-h-screen">
        <HeroSection />
        <Suspense fallback={<Spinner />}>
          <ExperienceSection />
          <SkillSection />
          <EducationSection />
          <ProjectSection />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
