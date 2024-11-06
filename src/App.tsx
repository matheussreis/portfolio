import Navbar from './components/Navbar';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t } = useTranslation('translation');

  return (
    <>
      <Navbar />
      <main>
        <h1>{t('sections.hero.description')}</h1>
      </main>
    </>
  );
}
