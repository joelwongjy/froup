import { NumericWeeks } from '@typings/modules';
import { HoverLesson, Lesson } from '@typings/timetables';
import { range } from 'lodash';

import { deltas } from './arrays';

interface lessonTypeAbbrev {
  [lessonType: string]: string;
}

export const LESSON_TYPE_ABBREV: lessonTypeAbbrev = {
  'Design Lecture': 'DLEC',
  Laboratory: 'LAB',
  Lecture: 'LEC',
  'Packaged Lecture': 'PLEC',
  'Packaged Tutorial': 'PTUT',
  Recitation: 'REC',
  'Sectional Teaching': 'SEC',
  'Seminar-Style Module Class': 'SEM',
  Tutorial: 'TUT',
  'Tutorial Type 2': 'TUT2',
  'Tutorial Type 3': 'TUT3',
  Workshop: 'WS',
};

export function formatNumericWeeks(weeks: NumericWeeks): string | null {
  if (weeks.length === 13) {
    return null;
  }
  if (weeks.length === 1) {
    return `Week ${weeks[0]}`;
  }

  // Check for odd / even weeks. There are more odd weeks then even weeks, so we have to split
  // the length check.
  if (deltas(weeks).every((d) => d === 2)) {
    if (weeks[0] % 2 === 0 && weeks.length >= 6) {
      return 'Even Weeks';
    }
    if (weeks[0] % 2 === 1 && weeks.length >= 7) {
      return 'Odd Weeks';
    }
  }

  // Merge consecutive
  const processed: (number | string)[] = [];
  let start = weeks[0];
  let end = start;

  const mergeConsecutive = () => {
    if (end - start > 2) {
      processed.push(`${start}-${end}`);
    } else {
      processed.push(...range(start, end + 1));
    }
  };

  weeks.slice(1).forEach((next) => {
    if (next - end === 1) {
      // Consecutive week number - keep going
      end = next;
    } else {
      // Break = push the current chunk into processed
      mergeConsecutive();
      start = next;
      end = start;
    }
  });

  mergeConsecutive();

  return `Weeks ${processed.join(', ')}`;
}

export function getHoverLesson(lesson: Lesson): HoverLesson {
  return {
    classNo: lesson.classNo,
    moduleCode: lesson.moduleCode,
    lessonType: lesson.lessonType,
  };
}
