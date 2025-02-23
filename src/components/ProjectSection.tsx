import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { useAppContext } from '@/context';
import { ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { projectKeys, projectTechnologyMapping } from '@/constants';

const baseKey = 'sections.projects';

export default function ProjectSection() {
  const { t } = useTranslation();
  const { refs } = useAppContext();

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
          {projectKeys.map((projectKey) => {
            const technologies = projectTechnologyMapping[projectKey].map(
              (technology) =>
                t(
                  `${baseKey}.data.${projectKey}.technologies.${technology}` as 'sections.projects.data.item1.technologies.php'
                )
            );

            return (
              <ProjectListItem
                key={projectKey}
                title={t(`${baseKey}.data.${projectKey}.name`)}
                type={t(`${baseKey}.data.${projectKey}.type.name`)}
                typeClassName={
                  t(`${baseKey}.data.${projectKey}.type.style`) as 'default'
                }
                description={t(`${baseKey}.data.${projectKey}.description`)}
                technologies={technologies}
                href={t(`${baseKey}.data.${projectKey}.href`)}
              />
            );
          })}
        </div>
      </div>
      <span className="sr-only">{t(`${baseKey}.sr-title`)}</span>
    </motion.section>
  );
}

interface ProjectListItemProps {
  title: string;
  type: string;
  description: string;
  technologies: Array<string>;
  typeClassName: 'outline' | 'default';
  href?: string;
}

function ProjectListItem({
  title,
  type,
  description,
  technologies,
  typeClassName,
  href,
}: ProjectListItemProps) {
  const { t } = useTranslation();

  return (
    <Card className="flex flex-col gap-2 w-full">
      <CardHeader>
        <div className="flex flex-col gap-3 items-baseline">
          <Badge className="rounded-xs" variant={typeClassName}>
            {type}
          </Badge>
          <CardTitle className="text-xl">{title}</CardTitle>
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
