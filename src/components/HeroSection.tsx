import { motion } from 'framer-motion';
import { useAppContext } from '@/context';
import { useTranslation } from 'react-i18next';

export default function HeroSection() {
  const { t } = useTranslation();
  const { refs } = useAppContext();

  return (
    <motion.section
      id="home"
      ref={refs.home}
      className="text-primary-foreground bg-primary p-4 min-h-[50vh] md:min-h-[80vh] flex flex-col justify-center"
    >
      <h1 className="font-bold text-center text-3xl lg:text-4xl mx-2 lg:mx-20 select-none">
        {t('sections.hero.description')}
      </h1>
      <span className="sr-only">{t('sections.hero.sr-title')}</span>
    </motion.section>
  );
}
