import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { useAppContext } from '@/context';
import { I18nExperienceItem } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { useTranslation } from 'react-i18next';
import { useDateFormatter } from '@/hooks/use-date-formatter';

const baseKey = 'sections.experience';

export default function ExperienceSection() {
  const { t } = useTranslation('translation');
  const { refs } = useAppContext();

  const educationItems = t(`${baseKey}.data`, {
    returnObjects: true,
  }) as I18nExperienceItem[];

  return (
    <motion.section
      id="experience"
      ref={refs.experience}
      className="bg-secondary p-6 min-h-[50vh] text-secondary-foreground select-none lg:p-8"
    >
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
        {t('sections.experience.title')}
      </h1>
      <div className="my-4 flex flex-col gap-4 bg-primary-foreground">
        {educationItems.map((item) => (
          <Card className="w-full" key={item.company}>
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl m-0">
                {item.company}
              </CardTitle>
              <CardDescription className="text-md">
                {item.location}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {item.roles.map((role, index) => (
                <ExperienceItem
                  key={`${role.name}-${index}`}
                  description={role.description}
                  role={role.name}
                  skills={role.skills}
                  startDate={new Date(role.startDate ?? undefined)}
                  endDate={role.endDate ? new Date(role.endDate) : null}
                />
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
      <span className="sr-only">{t(`${baseKey}.sr-title`)}</span>
    </motion.section>
  );
}

interface ExperienceItemProps {
  role: string;
  description: string;
  skills: Array<string>;
  startDate: Date;
  endDate?: Date | null | undefined;
}

function ExperienceItem({
  role,
  description,
  skills,
  startDate,
  endDate,
}: ExperienceItemProps) {
  const { format } = useDateFormatter();
  const experienceRange = format(startDate, endDate);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col items-start justify-start gap-4 md:flex-row md:justify-between">
          <div className="w-full md:w-3/4">
            <CardTitle className="text-md md:text-xl mb-1 text-secondary-foreground">
              {role}
            </CardTitle>
            <CardDescription className="text-sm md:text-md">
              {description}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="text-xs md:text-sm">
            {experienceRange}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 w-full md:w-3/4">
          {skills.map((skill, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
