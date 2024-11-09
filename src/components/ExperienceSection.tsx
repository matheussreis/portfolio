import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { useAppContext } from '@/context';
import { Badge } from '@/components/ui/Badge';
import { useTranslation } from 'react-i18next';
import { I18nExperienceItemKey } from '@/types';
import { experienceKeys, experienceSkillMapping } from '@/constants';
import { useDateFormatter } from '@/hooks/use-date-formatter';

const baseKey = 'sections.experience';

export default function ExperienceSection() {
  const { t } = useTranslation('translation');
  const { refs } = useAppContext();

  return (
    <motion.section
      id="experience"
      ref={refs.experience}
      className="bg-secondary p-8 min-h-[50vh] text-secondary-foreground select-none sm:p-6 md:p-6"
    >
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
        {t(`${baseKey}.title`)}
      </h1>
      <div className="my-4 flex flex-col gap-4">
        {experienceKeys.map(
          (experienceKey: I18nExperienceItemKey, index: number) => {
            const skills = experienceSkillMapping[experienceKey].map((skill) =>
              t(
                `${baseKey}.data.${experienceKey}.skills.${skill}` as 'sections.experience.data.item1.skills.js'
              )
            );

            return (
              <ExperienceItem
                key={`${t(`${baseKey}.title`)}-${index}`}
                company={t(`${baseKey}.data.${experienceKey}.company`)}
                role={t(`${baseKey}.data.${experienceKey}.role`)}
                skills={skills}
                startDate={
                  new Date(
                    t(`${baseKey}.data.${experienceKey}.startDate`) ?? undefined
                  )
                }
                endDate={
                  t(`${baseKey}.data.${experienceKey}.endDate`)
                    ? new Date(t(`${baseKey}.data.${experienceKey}.endDate`))
                    : null
                }
              />
            );
          }
        )}
      </div>
      <span className="sr-only">{t(`${baseKey}.sr-title`)}</span>
    </motion.section>
  );
}

interface ExperienceItemProps {
  role: string;
  company: string;
  skills: Array<string>;
  startDate: Date;
  endDate?: Date | null | undefined;
}

function ExperienceItem({
  role,
  company,
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
          <div>
            <CardTitle className="text-2xl mb-1">{role}</CardTitle>
            <CardDescription className="text-lg font-semibold text-primary">
              {company}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="text-sm">
            {experienceRange}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge key={index} variant="outline">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
