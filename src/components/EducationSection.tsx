import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { useAppContext } from '@/context';
import { I18nEducationItem } from '@/types';
import { GraduationCap } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { useTranslation } from 'react-i18next';
import { useDateFormatter } from '@/hooks/use-date-formatter';

const baseKey = 'sections.education';

export default function EducationSection() {
  const { t } = useTranslation();
  const { refs } = useAppContext();

  const educationItems = t(`${baseKey}.data`, {
    returnObjects: true,
  }) as I18nEducationItem[];

  return (
    <motion.section
      id="education"
      ref={refs.education}
      className="bg-secondary p-6 min-h-[50vh] select-none lg:p-8"
    >
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary-foreground">
        {t(`${baseKey}.title`)}
      </h1>
      <div className="my-4 flex flex-col gap-4">
        {educationItems.map((item: I18nEducationItem, index: number) => {
          return (
            <EducationItem
              key={`${item.name}-${index}`}
              name={item.name}
              organisation={item.organisation}
              startDate={new Date(item.startDate ?? undefined)}
              endDate={item.endDate ? new Date(item.endDate) : null}
            />
          );
        })}
      </div>
      <span className="sr-only">{t(`${baseKey}.sr-title`)}</span>
    </motion.section>
  );
}

interface EducationItemProps {
  name: string;
  organisation: string;
  startDate: Date;
  endDate?: Date | null | undefined;
}

function EducationItem({
  name,
  organisation,
  startDate,
  endDate,
}: EducationItemProps) {
  const { format } = useDateFormatter();
  const educationRange = format(startDate, endDate);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="rounded-full bg-secondary/10 p-2 md:p-3">
          <GraduationCap className="h-8 w-8 md:h-10 md:w-10 text-secondary-foreground" />
        </div>
        <div>
          <CardTitle className="text-xl md:text-2xl">{name}</CardTitle>
          <CardDescription className="text-md">{organisation}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <Badge variant="secondary" className="text-xs md:text-sm">
            {educationRange}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
