import { useTranslation } from 'react-i18next';
import { DiGithubBadge } from 'react-icons/di';
import { IoLogoLinkedin } from 'react-icons/io';

const baseKey = 'layout.footer';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-background/80 backdrop-blur-sm py-8 select-none">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="flex space-x-2 mb-3">
            <a
              href={t(`${baseKey}.links.linkedin.href`)}
              className="hover:opacity-80"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">
                {t(`${baseKey}.links.linkedin.sr-title`)}
              </span>
              <IoLogoLinkedin className="h-8 w-8" />
            </a>
            <a
              href={t(`${baseKey}.links.github.href`)}
              className="hover:opacity-80"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">
                {t(`${baseKey}.links.github.sr-title`)}
              </span>
              <DiGithubBadge className="h-8 w-8" />
            </a>
          </div>
          <p className="text-base text-center">
            &copy; {new Date().getFullYear()} {t(`${baseKey}.description`)}
          </p>
        </div>
      </div>
    </footer>
  );
}
