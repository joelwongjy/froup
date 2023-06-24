import type { DayText, EndTime, ModuleCode, RawLesson,StartTime } from './modules';

export type Venue = string;
export type VenueList = Venue[];
// Components within a venue availability class:
export type VenueOccupiedState = 'vacant' | 'occupied';
export const VACANT: VenueOccupiedState = 'vacant';
export const OCCUPIED: VenueOccupiedState = 'occupied';

export interface Availability { [lessonTime: string]: VenueOccupiedState | undefined } // E.g. { "1000": "vacant", "1030": "occupied", ... }

// Raw lessons obtained from venue info API includes ModuleCode and without venue
export type VenueLesson = Omit<RawLesson, 'venue'> & {
  moduleCode: ModuleCode;
};

// A venue's availability info for one day
// E.g. { "Day": "Monday", "Classes": [...], "Availability": {...} }
export interface DayAvailability {
  readonly day: DayText;
  readonly classes: VenueLesson[];
  readonly availability: Availability;
}

// Describes venueInformation.json
// E.g. { "LT16": [DayAvailability1, DayAvailability2, ...], "LT17": [...], ... }
export interface VenueInfo { [venue: string]: DayAvailability[] }

// Used to specify availability search options
// All properties are number to make (de)serialization into query string simpler to handle
export interface VenueSearchOptions {
  readonly day: number; // Day of week (ie. 0 = Monday, 1 = Tuesday etc.)
  readonly time: number; // in hours (ie. 9 = 9am, 13 = 1pm etc.)
  readonly duration: number; // in hours
}

export type VenueDetailList = [Venue, DayAvailability[]][];

export interface VenueLocation {
  readonly roomName: string;
  readonly floor?: number | string | null;
  readonly location?: { x: number; y: number };
}

export type LatLngTuple = [number, number];

export interface BusStop {
  location: LatLngTuple;
  // Human readable name for the stop
  readonly name: string;
  // Used for accessing the next bus API. This is called 'name' in the API.
  readonly code: string;
  // Bus routes that stops at the bus stop
  readonly routes: string[];
  // Whether to show the routes on the left instead of right
  // to avoid overlapping some other bus stop
  readonly displayRoutesLeft?: boolean;
}

export type NextBusTime = number | '-' | 'Arr';

export interface NextBus {
  readonly arrivalTime: NextBusTime;
  readonly nextArrivalTime: NextBusTime;
}

export interface NextBusTimings { [route: string]: NextBus }

// data/venues.json is of this type
export interface VenueLocationMap { readonly [key: string]: VenueLocation }

export interface BusTiming {
  // Loading uses a boolean instead of making timings null so that
  // the old timing can be seen while it is refreshed
  isLoading: boolean;
  timings?: NextBusTimings | null;
  error?: Error | null;
}

/**
 * Represents a time period in the timetable.
 */
export interface TimePeriod {
  day: number; // Day of week (ie. 0 = Monday, 1 = Tuesday etc.)
  startTime: StartTime;
  endTime: EndTime;
}
