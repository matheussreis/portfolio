import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { I18nProjectItem } from '@/types';
import { useScrollContext } from '@/context';
import { Badge } from '@/components/ui/Badge';
import { useTranslation } from 'react-i18next';
import { DiGithubBadge } from 'react-icons/di';

const baseKey = 'sections.projects';

export default function ProjectSection() {
  const { t } = useTranslation();
  const { refs } = useScrollContext();

  const projectItems = t(`${baseKey}.data`, {
    returnObjects: true,
  }) as I18nProjectItem[];

  return (
    <motion.section
      id="projects"
      ref={refs.projects}
      className="bg-primary p-6 min-h-[50vh] text-primary-foreground dark:text-secondary-foreground select-none lg:p-8"
    >
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
        {t(`${baseKey}.title`)}
      </h1>
      <div className="my-4">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projectItems.map((project) => {
            return (
              <ProjectListItem
                key={project.name}
                name={project.name}
                type={project.type}
                description={project.description}
                technologies={project.technologies}
                href={project.href}
                srHref={project.srHref}
              />
            );
          })}
        </div>
      </div>
      <span className="sr-only">{t(`${baseKey}.sr-title`)}</span>
    </motion.section>
  );
}

function ProjectListItem({
  name,
  type,
  description,
  technologies,
  href,
  srHref,
}: I18nProjectItem) {
  return (
    <Card className="flex flex-col gap-2 w-full">
      <CardHeader>
        <div className="flex flex-col gap-3">
          <div className="flex flex-row justify-between w-full">
            <Badge className="rounded-xs font-medium" variant={type.style}>
              {type.name}
            </Badge>
            {href && (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={srHref}
                className="h-5"
              >
                <DiGithubBadge className="w-6 h-6" />
              </a>
            )}
          </div>
          <CardTitle className="text-xl">{name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col gap-4 align-baseline w-full">
          <div className="flex flex-wrap gap-2">
            {technologies.map((technology) => (
              <Badge key={technology} variant="secondary">
                {technology}
              </Badge>
            ))}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
