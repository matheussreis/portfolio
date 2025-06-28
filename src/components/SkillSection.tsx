import {
  DiGit,
  DiJavascript,
  DiJqueryLogo,
  DiLinux,
  DiMsqlServer,
  DiMysql,
  DiNodejs,
  DiPhp,
  DiReact,
  DiSymfony,
} from 'react-icons/di';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';
import { motion } from 'framer-motion';
import { skillKeys } from '@/constants';
import SugarCrm from '@/icons/SugarCrm';
import { CgMonday } from 'react-icons/cg';
import { SiTalend } from 'react-icons/si';
import { useAppContext } from '@/context';
import { useTranslation } from 'react-i18next';
import { BiLogoTypescript } from 'react-icons/bi';
import { VariantProps } from 'class-variance-authority';
import { Card, CardContent } from '@/components/ui/Card';
import { IoLogoCss3, IoLogoHtml5 } from 'react-icons/io';
import { IconBaseProps, IconType } from 'react-icons/lib';
import { I18nSkillItemKey, I18nSkillTypeKey } from '@/types';
import { Badge, badgeVariants } from '@/components/ui/Badge';
import { Briefcase, GraduationCap, Book } from 'lucide-react';
import { RiNextjsFill, RiTailwindCssFill } from 'react-icons/ri';

const baseKey = 'sections.skills';

const skillIconClass = 'fill-secondary-foreground';

const createIcon = (
  IconComponent: IconType,
  size?: string | number | undefined,
  className?: string
) => <IconComponent size={size} className={className} />;

const createSkillIcon = (IconComponent: IconType) => {
  return createIcon(IconComponent, 40, skillIconClass);
};

const iconSkillMapping = {
  html: createSkillIcon(IoLogoHtml5),
  css: createSkillIcon(IoLogoCss3),
  js: createSkillIcon(DiJavascript),
  jquery: createSkillIcon(DiJqueryLogo),
  php: createSkillIcon(DiPhp),
  symfony: createSkillIcon(DiSymfony),
  mysql: createSkillIcon(DiMysql),
  mssql: createSkillIcon(DiMsqlServer),
  react: createSkillIcon(DiReact),
  nextjs: createSkillIcon(RiNextjsFill),
  node: createSkillIcon(DiNodejs),
  linux: createSkillIcon(DiLinux),
  monday: createSkillIcon(CgMonday),
  git: createSkillIcon(DiGit),
  talend: createSkillIcon(SiTalend),
  tailwind: createSkillIcon(RiTailwindCssFill),
  typescript: createSkillIcon(BiLogoTypescript),
  sugarcrm: <SugarCrm className={skillIconClass} />,
};

const iconSkillTypeMapping: Record<
  I18nSkillTypeKey,
  React.FC<IconBaseProps>
> = {
  professional: (props: IconBaseProps) => createIcon(Briefcase, props.size),
  academic: (props: IconBaseProps) => createIcon(GraduationCap, props.size),
  'self-taught': (props: IconBaseProps) => createIcon(Book, props.size),
};

const badgeSkillTypeVariantMapping: Record<
  I18nSkillTypeKey,
  VariantProps<typeof badgeVariants>['variant']
> = {
  professional: 'emerald',
  academic: 'amber',
  'self-taught': 'purple',
};

export default function SkillSection() {
  const { t } = useTranslation();
  const { refs } = useAppContext();

  const skillTypeKeys = Object.keys(
    t(`${baseKey}.types`, {
      returnObjects: true,
    })
  ) as I18nSkillTypeKey[];

  const getSkillTypes = (skillKey: I18nSkillItemKey) => {
    const skillTypes = t(`${baseKey}.data.${skillKey}.type`, {
      returnObjects: true,
    }) as I18nSkillTypeKey[];

    return skillTypes.map((type) => ({
      key: type,
      value: t(`${baseKey}.types.${type}`),
    }));
  };

  return (
    <motion.section
      id="skills"
      ref={refs.skills}
      className="bg-primary p-6 min-h-[35vh] select-none lg:p-8"
    >
      <header className="flex flex-col md:flex-row lg:flex-row justify-between gap-2">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground">
          {t(`${baseKey}.title`)}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-primary-foreground/90">
          {skillTypeKeys.map((skillTypeKey) => {
            const Icon = iconSkillTypeMapping[skillTypeKey];

            return (
              <Badge
                key={skillTypeKey}
                variant={badgeSkillTypeVariantMapping[skillTypeKey]}
                className="flex flex-row gap-1 items-stretch"
              >
                <Icon size={15} />
                {t(`${baseKey}.types.${skillTypeKey}`)}
              </Badge>
            );
          })}
        </div>
      </header>
      <div className="my-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {skillKeys.map((skillKey) => {
          return (
            <SkillSectionItem
              key={skillKey}
              title={t(`${baseKey}.data.${skillKey}.title`)}
              skillKey={skillKey}
              types={getSkillTypes(skillKey)}
            />
          );
        })}
      </div>
      <span className="sr-only">{t(`${baseKey}.sr-title`)}</span>
    </motion.section>
  );
}

interface SkillSectionItemProps {
  title: string;
  skillKey: I18nSkillItemKey;
  types: { key: I18nSkillTypeKey; value: string }[];
}

function SkillSectionItem({ title, skillKey, types }: SkillSectionItemProps) {
  return (
    <Card className="overflow-hidden p-2 h-50">
      <CardContent className="p-2 h-full">
        <div className="flex flex-col gap-2 h-full">
          <div className="flex flex-col items-center justify-center text-center h-full gap-4">
            {iconSkillMapping[skillKey]}
            <h2 className="text-xs">{title}</h2>
          </div>
          <div className="flex flex-row gap-1 justify-center">
            {types.map((type) => {
              const Icon = iconSkillTypeMapping[type.key];
              return (
                <TooltipProvider key={type.key}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge variant={badgeSkillTypeVariantMapping[type.key]}>
                        <Icon size={10} />
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{type.value}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
