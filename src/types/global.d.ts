import { type NextPage } from "next";

export interface CalendarEvent {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  durationInMinutes: number;
}

type AdminLayoutType =
  | "admin"
  | "bot-recording"
  | "signature"
  | "live-event"
  | "host-live-event";
type FanLayoutType = "fan";
export type PageLayoutType = AdminLayoutType | FanLayoutType | "page";

export type AdminNextPage = NextPage & {
  layoutType: AdminLayoutType;
};
export type CustomNextPage = NextPage & {
  layoutType?: PageLayoutType;
};

export type FanRoleNames =
  | "fan-audio-only-queue"
  | "fan-short-list"
  | "fan-currently-featured"
  | "fan-finished-queue";
