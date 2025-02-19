import { motion } from 'framer-motion';
import { useAppContext } from '@/context';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';

export default function HeroSection() {
  const { t } = useTranslation();
  const { refs, scrollToSection } = useAppContext();

  return (
    <motion.section
      id="home"
      ref={refs.home}
      className="text-primary-foreground bg-primary p-4 min-h-[50vh] md:min-h-[80vh] flex flex-col justify-center items-center gap-6"
    >
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-primary-foreground font-extrabold text-5xl md:text-6xl lg:text-7xl select-none">
          {t('sections.hero.name')}
        </h1>
        <h2 className="text-primary-foreground/75 font-semibold text-2xl md:text-3xl lg:text-4xl select-none">
          {t('sections.hero.role')}
        </h2>
      </div>
      <Button
        size="lg"
        variant="secondary"
        className="focus-visible:ring-0 select-none"
        onClick={() => scrollToSection('projects')}
      >
        {t('sections.hero.buttons.view-projects')}
      </Button>
      <span className="sr-only">{t('sections.hero.sr-title')}</span>
    </motion.section>
  );
}
