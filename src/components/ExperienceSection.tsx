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
import { useDateFormatter } from '@/hooks/use-date-formatter';
import { companyKeys, companyRoleMapping, roleSkillMapping } from '@/constants';

const sectionDataKey = 'sections.experience.data';

export default function ExperienceSection() {
  const { t } = useTranslation('translation');
  const { refs } = useAppContext();

  return (
    <motion.section
      id="experience"
      ref={refs.experience}
      className="bg-secondary p-6 min-h-[50vh] text-secondary-foreground select-none lg:p-8"
    >
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
        {t('sections.experience.title')}
      </h1>
      <div className="my-4 flex flex-col gap-4 bg-[var(--primary-color-foreground)]">
        {companyKeys.map((companyKey) => (
          <Card className="w-full" key={companyKey}>
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl text-primary m-0">
                {t(`${sectionDataKey}.${companyKey}.company`)}
              </CardTitle>
              <CardDescription className="text-md">
                {t(`${sectionDataKey}.${companyKey}.location`)}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {companyRoleMapping[companyKey].map((roleKey, index) => {
                const skills = roleSkillMapping[roleKey].map((skillKey) => {
                  return t(
                    `${sectionDataKey}.${companyKey}.roles.${roleKey}.skills.${skillKey}` as never
                  );
                });

                return (
                  <ExperienceItem
                    key={`${t('sections.experience.title')}-${index}`}
                    description={t(
                      `${sectionDataKey}.${companyKey}.roles.${roleKey}.description`
                    )}
                    role={t(
                      `${sectionDataKey}.${companyKey}.roles.${roleKey}.name`
                    )}
                    skills={skills}
                    startDate={
                      new Date(
                        t(
                          `${sectionDataKey}.${companyKey}.roles.${roleKey}.startDate`
                        ) ?? undefined
                      )
                    }
                    endDate={
                      t(
                        `${sectionDataKey}.${companyKey}.roles.${roleKey}.endDate`
                      )
                        ? new Date(
                            t(
                              `${sectionDataKey}.${companyKey}.roles.${roleKey}.endDate`
                            )
                          )
                        : null
                    }
                  />
                );
              })}
            </CardContent>
          </Card>
        ))}
      </div>
      <span className="sr-only">{t('sections.experience.sr-title')}</span>
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
