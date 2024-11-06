import { useTranslation } from 'react-i18next';

interface FormatDateByRangeSettings {
  formatter: Intl.DateTimeFormat;
  currentDateText: string;
  start: Date;
  end?: Date | null | undefined;
}

function formatDateByRange({
  formatter,
  currentDateText,
  start,
  end,
}: FormatDateByRangeSettings) {
  let formattedDate = `${formatter.format(start)} - `;

  if (!end) {
    formattedDate += currentDateText;
  } else {
    formattedDate += formatter.format(end);
  }

  return formattedDate;
}

export function useDateFormatter() {
  const { t, i18n } = useTranslation();

  const dateFormatter = new Intl.DateTimeFormat(i18n.language, {
    month: 'short',
    year: 'numeric',
  });

  const format = (start: Date, end?: Date | null | undefined) => {
    return `(${formatDateByRange.call(null, {
      formatter: dateFormatter,
      currentDateText: t('system.settings.date.currentDateText'),
      start: start,
      end,
    })})`;
  };

  return { format };
}
