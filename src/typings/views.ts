import { RegPeriod } from '@config';

import { Module, ModuleCondensed } from './modules';
import { ColorIndex, HoverLesson, Lesson, ModifiableLesson } from './timetables';
import { Venue, VenueList } from './venues';

export type ModuleList = ModuleCondensed[];

export interface ComponentMap {
  globalSearchInput: HTMLInputElement | null;
  downloadButton: HTMLButtonElement | null;
}

/* layout/GlobalSearch */
export type ResultType = 'VENUE' | 'MODULE' | 'SEARCH';
export const VENUE_RESULT = 'VENUE';
export const MODULE_RESULT = 'MODULE';
export const SEARCH_RESULT = 'SEARCH';

export interface SearchResult {
  readonly modules: ModuleList;
  readonly venues: VenueList;
  readonly tokens: string[];
}

export type SearchItem =
  | { readonly type: 'VENUE'; readonly venue: Venue }
  | { readonly type: 'MODULE'; readonly module: ModuleCondensed }
  | { readonly type: 'SEARCH'; readonly result: 'MODULE' | 'VENUE'; readonly term: string };

/* browse/ModuleFinderContainer */
export interface RefinementItem { key: string; doc_count?: number; missing?: boolean }
export type RefinementDisplayItem = RefinementItem & { selected: boolean };

export interface DisqusConfig {
  readonly identifier: string;
  readonly url: string;
  readonly title: string;
}

export interface SelectedLesson { date: Date; lesson: Lesson }

export interface ExamClashes { [key: string]: Module[] }

// Timetable event handlers
export type OnModifyCell = (lesson: ModifiableLesson, position: ClientRect) => void;
export type OnHoverCell = (hoverLesson: HoverLesson | null) => void;

// Incomplete typing of Mamoto's API. If you need something not here, feel free
// to declare the typing here.

export type TimeSegment = 'Morning' | 'Afternoon' | 'Evening';
export const TIME_SEGMENTS = ['Morning', 'Afternoon', 'Evening'];

export type ModuleWithColor = Module & {
  colorIndex: ColorIndex;
  hiddenInTimetable: boolean;
};

export type TombstoneModule = ModuleWithColor & {
  index: number;
};

export interface ModuleWithExamTime {
  readonly module: ModuleWithColor;
  readonly dateTime: string;
  readonly date: string;
  readonly time: string;
  readonly timeSegment: TimeSegment;
}

/* views/today */
export type EmptyGroupType =
  | 'winter'
  | 'summer'
  | 'orientation'
  | 'weekend'
  | 'holiday'
  | 'recess'
  | 'reading'
  | 'examination';

/* views/notifications/ModRegNotification */
export interface RegPeriodView extends RegPeriod {
  // Augmented for the frontend. The modreg selector maps RegPeriod to this type.
  dismissed: boolean;
}
