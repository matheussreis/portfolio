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
import { useAppContext } from '@/context';
import { ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';

const baseKey = 'sections.projects';

export default function ProjectSection() {
  const { t } = useTranslation();
  const { refs } = useAppContext();

  const projectItems = t(`${baseKey}.data`, {
    returnObjects: true,
  }) as I18nProjectItem[];

  return (
    <motion.section
      id="projects"
      ref={refs.projects}
      className="bg-primary p-6 min-h-[50vh] text-primary-foreground select-none lg:p-8"
    >
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
        {t(`${baseKey}.title`)}
      </h1>
      <div className="my-4">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {projectItems.map((project) => {
            return (
              <ProjectListItem
                key={project.name}
                name={project.name}
                type={project.type}
                description={project.description}
                technologies={project.technologies}
                href={project.href}
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
}: I18nProjectItem) {
  const { t } = useTranslation();

  return (
    <Card className="flex flex-col gap-2 w-full">
      <CardHeader>
        <div className="flex flex-col gap-3 items-baseline">
          <Badge className="rounded-xs" variant={type.style}>
            {type.name}
          </Badge>
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
          <Button className={href ? '' : 'hover:bg-primary/50'} asChild>
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                {t(`${baseKey}.buttons.view-project`)}
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            ) : (
              <span className="inline-flex items-center bg-primary/50 hover:bg-primary/50">
                {t(`${baseKey}.buttons.view-project`)}
              </span>
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
