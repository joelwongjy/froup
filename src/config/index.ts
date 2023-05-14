import config from 'config/app.config.json';
import { format } from 'date-fns';
import { mapValues } from 'lodash';

import holidays from 'data/holidays.json';
import modRegData from 'data/modreg-schedule.json';
import { AcadYear, Semester } from 'types/modules';

export const regPeriods = [
  'Select Modules',
  'Select Tutorials / Labs',
  'Add / Swap Tutorials',
  'Submit Module Requests',
] as const;
export type RegPeriodType = (typeof regPeriods)[number];

export const SCHEDULE_TYPES = ['Undergraduate', 'Graduate'] as const;
export type ScheduleType = (typeof SCHEDULE_TYPES)[number];

export interface RegPeriod {
  type: RegPeriodType;
  name: string;
  start: string;
  startDate: Date;
  end: string;
  endDate: Date;
}

export interface Config {
  brandName: string;
  academicYear: AcadYear;
  semester: Semester;
  getSemesterKey: () => string;

  apiBaseUrl: string;
  elasticsearchBaseUrl: string;

  disqusShortname: string;
  venueFeedbackApi: string;
  moduleErrorApi: string;

  semesterNames: { [semester: string]: string };
  shortSemesterNames: { [semester: string]: string };

  /*
   * Toggle to show a notice for ST2 modules to refer to NUS's timetable.
   * Added because ModReg Round 0 (next AY data) overlaps with ST2 (prev AY)
   * data, and NUSMods rotates complete AYs.
   */
  showSt2ExamTimetable: boolean;
  st2ExamTimetableUrl: string;

  archiveYears: string[];
  examAvailability: Semester[];
  examAvailabilitySet: Set<Semester>;

  contact: {
    blog: string;
    email: string;
    privateEmail: string;
    facebook: string;
    githubOrg: string;
    githubRepo: string;
    messenger: string;
    twitter: string;
  };

  holidays: Date[];

  modRegSchedule: { [type in ScheduleType]: RegPeriod[] };
}

export function convertModRegDates(
  roundData: (typeof modRegData)[ScheduleType],
): RegPeriod[] {
  return roundData.map((data) => ({
    ...data,
    type: data.type as RegPeriodType,
    start: format(new Date(data.start), 'EEEE do LLLL, haaaa'),
    end: format(new Date(data.end), 'EEEE do LLLL, haaaa'),
    startDate: new Date(data.start),
    endDate: new Date(data.end),
  }));
}

const augmentedConfig: Config = {
  ...config,

  holidays: holidays.map((date) => new Date(date)),

  modRegSchedule: mapValues(modRegData, convertModRegDates),

  examAvailabilitySet: new Set(config.examAvailability),

  /**
   * Returns a unique key for every acad year + semester
   */
  getSemesterKey: (): string =>
    `${augmentedConfig.academicYear} ${
      augmentedConfig.semesterNames[augmentedConfig.semester]
    }`,
};

export default augmentedConfig;
