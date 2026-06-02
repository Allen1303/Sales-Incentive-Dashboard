/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// src/data/agentData.ts
//
// ALL static data lives in this one file.
//
// WHY a separate data file?
//   Components should display data, not define it.
//   When a unit value changes, you update ONE file — not hunt through components.
//   In a real app, this file would eventually be replaced by an API call
//   (fetch from a database) without touching a single component.

export const AGENT = {
  name: 'Allen A',
  employeeId: '12345',
  team: 'AT&T Alpha',
};

export const TARGETS = {
  callsTaken: 120,
  salesMade: 40,
  scr: 33,   // Sales Conversion Rate %
  adh: 90,   // Adherence %
};

export const INITIAL_PROVIDERS = [
  {
    provider: "Cox",
    badgeCls: "bg-blue-50 text-blue-800",
    products: [
      { id: 1, name: "Cox Bundles", unitValue: 3.75, unitsSold: 2 },
      { id: 2, name: "Cox Fiber 1Gig+", unitValue: 12.00, unitsSold: 1 },
      { id: 3, name: "Cox Home Phone", unitValue: 1.00, unitsSold: 2 },
      { id: 4, name: "Cox Homelife", unitValue: 3.50, unitsSold: 2 },
      { id: 5, name: "Cox Internet Basic", unitValue: 3.00, unitsSold: 3 },
      { id: 6, name: "Cox Premium Video", unitValue: 12.00, unitsSold: 1 },
      { id: 7, name: "Cox Standard Internet", unitValue: 6.00, unitsSold: 2 },
      { id: 8, name: "Cox Standard Video", unitValue: 3.50, unitsSold: 2 },
    ],
  },
  {
    provider: "Optimum",
    badgeCls: "bg-violet-50 text-violet-800",
    products: [
      { id: 9, name: "Optimum Bundle", unitValue: 3.00, unitsSold: 2 },
      { id: 10, name: "Optimum Internet 1Gig+", unitValue: 10.00, unitsSold: 1 },
      { id: 11, name: "Optimum Mobile", unitValue: 8.00, unitsSold: 1 },
      { id: 12, name: "Optimum Standard Internet", unitValue: 5.00, unitsSold: 2 },
      { id: 13, name: "Optimum Video", unitValue: 5.00, unitsSold: 1 },
      { id: 14, name: "Optimum Voice", unitValue: 1.00, unitsSold: 2 },
    ],
  },
  {
    provider: "Spectrum",
    badgeCls: "bg-sky-50 text-sky-800",
    products: [
      { id: 15, name: "Spectrum Bundle", unitValue: 3.00, unitsSold: 2 },
      { id: 16, name: "Spectrum Internet 1Gig+", unitValue: 10.00, unitsSold: 1 },
      { id: 17, name: "Spectrum Internet Basic", unitValue: 2.00, unitsSold: 2 },
      { id: 18, name: "Spectrum Standard Internet", unitValue: 4.00, unitsSold: 2 },
      { id: 19, name: "Spectrum Video", unitValue: 4.00, unitsSold: 2 },
      { id: 20, name: "Spectrum Voice", unitValue: 1.00, unitsSold: 1 },
    ],
  },
  {
    provider: "AT&T",
    badgeCls: "bg-slate-100 text-slate-700",
    products: [
      { id: 21, name: "ATT Bundles", unitValue: 4.00, unitsSold: 2 },
      { id: 22, name: "ATT Home Phone", unitValue: 1.00, unitsSold: 2 },
      { id: 23, name: "ATT Internet 1Gig+", unitValue: 12.00, unitsSold: 1 },
      { id: 24, name: "ATT Internet Air", unitValue: 5.00, unitsSold: 2 },
      { id: 25, name: "ATT Internet Upgrade", unitValue: 1.00, unitsSold: 1 },
      { id: 26, name: "ATT Standard Internet", unitValue: 4.00, unitsSold: 2 },
    ],
  },
];

export const INITIAL_SCHEDULE = [
  { id: 1, date: "2026-05-01", day: "Fri", status: "On Time", schedule: "09:00 AM - 05:00 PM", actual: "08:52 AM - 05:01 PM", minsLate: 0 },
  { id: 2, date: "2026-05-02", day: "Sat", status: "Late", schedule: "09:00 AM - 05:00 PM", actual: "09:12 AM - 05:00 PM", minsLate: 12 }, // Weekend Late!
  { id: 3, date: "2026-05-03", day: "Sun", status: "Off", schedule: "Unscheduled", actual: "--", minsLate: 0 },
  { id: 4, date: "2026-05-04", day: "Mon", status: "On Time", schedule: "09:00 AM - 05:00 PM", actual: "09:00 AM - 05:02 PM", minsLate: 0 },
  { id: 5, date: "2026-05-05", day: "Tue", status: "On Time", schedule: "09:00 AM - 05:00 PM", actual: "08:50 AM - 05:00 PM", minsLate: 0 },
  { id: 6, date: "2026-05-06", day: "Wed", status: "Sick", schedule: "09:00 AM - 05:00 PM", actual: "Paid Sick Leave", minsLate: 0 },
  { id: 7, date: "2026-05-07", day: "Thu", status: "Late", schedule: "09:00 AM - 05:00 PM", actual: "09:25 AM - 05:00 PM", minsLate: 25 },
  { id: 8, date: "2026-05-08", day: "Fri", status: "On Time", schedule: "09:00 AM - 05:00 PM", actual: "08:58 AM - 05:04 PM", minsLate: 0 },
  { id: 9, date: "2026-05-09", day: "Sat", status: "Off", schedule: "Unscheduled", actual: "--", minsLate: 0 },
  { id: 10, date: "2026-05-10", day: "Sun", status: "Absent", schedule: "09:00 AM - 05:00 PM", actual: "--", minsLate: 0 }, // Weekend Absent!
  { id: 11, date: "2026-05-11", day: "Mon", status: "Leave Early", schedule: "09:00 AM - 05:00 PM", actual: "09:00 AM - 04:35 PM", minsLate: 0 },
  { id: 12, date: "2026-05-12", day: "Tue", status: "PTO", schedule: "09:00 AM - 05:00 PM", actual: "Paid Time Off", minsLate: 0 },
  { id: 13, date: "2026-05-13", day: "Wed", status: "FMLA", schedule: "09:00 AM - 05:00 PM", actual: "FMLA Leave", minsLate: 0 },
  { id: 14, date: "2026-05-14", day: "Thu", status: "On Time", schedule: "09:00 AM - 05:00 PM", actual: "08:51 AM - 05:00 PM", minsLate: 0 },
];
