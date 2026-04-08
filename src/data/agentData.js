export const AGENT = {
  name: "Allen A",
  employeeId: "12345",
  team: "AT&T Alpha",
};
export const TARGETS = {
  callsTaken: 120,
  salesMade: 40,
  scr: 33,
  adh: 90,
};
export const INITIAL_PROVIDERS = [
  {
    provider: "Cox",
    badgeCls: "bg-blue-50 text-blue-800",
    products: [
      { id: 1, name: "Cox Bundles", unitValue: 3.75, unitsSold: 2 },
      { id: 2, name: "Cox Fiber 1Gig+", unitValue: 12.0, unitsSold: 1 },
      { id: 3, name: "Cox Home Phone", unitValue: 1.0, unitsSold: 2 },
      { id: 4, name: "Cox Homelife", unitValue: 3.5, unitsSold: 2 },
      { id: 5, name: "Cox Internet Basic", unitValue: 3.0, unitsSold: 3 },
      { id: 6, name: "Cox Premium Video", unitValue: 12.0, unitsSold: 1 },
      { id: 7, name: "Cox Standard Internet", unitValue: 6.0, unitsSold: 2 },
      { id: 8, name: "Cox Standard Video", unitValue: 3.5, unitsSold: 2 },
    ],
  },
  {
    provider: "Optimum",
    badgeCls: "bg-violet-50 text-violet-800",
    products: [
      { id: 9, name: "Optimum Bundle", unitValue: 3.0, unitsSold: 2 },
      { id: 10, name: "Optimum Internet 1Gig+", unitValue: 10.0, unitsSold: 1 },
      { id: 11, name: "Optimum Mobile", unitValue: 8.0, unitsSold: 1 },
      {
        id: 12,
        name: "Optimum Standard Internet",
        unitValue: 5.0,
        unitsSold: 2,
      },
      { id: 13, name: "Optimum Video", unitValue: 5.0, unitsSold: 1 },
      { id: 14, name: "Optimum Voice", unitValue: 1.0, unitsSold: 2 },
    ],
  },
  {
    provider: "Spectrum",
    badgeCls: "bg-sky-50 text-sky-800",
    products: [
      { id: 15, name: "Spectrum Bundle", unitValue: 3.0, unitsSold: 2 },
      {
        id: 16,
        name: "Spectrum Internet 1Gig+",
        unitValue: 10.0,
        unitsSold: 1,
      },
      { id: 17, name: "Spectrum Internet Basic", unitValue: 2.0, unitsSold: 2 },
      {
        id: 18,
        name: "Spectrum Standard Internet",
        unitValue: 4.0,
        unitsSold: 2,
      },
      { id: 19, name: "Spectrum Video", unitValue: 4.0, unitsSold: 2 },
      { id: 20, name: "Spectrum Voice", unitValue: 1.0, unitsSold: 1 },
    ],
  },
  {
    provider: "AT&T",
    badgeCls: "bg-slate-100 text-slate-700",
    products: [
      { id: 21, name: "ATT Bundles", unitValue: 4.0, unitsSold: 2 },
      { id: 22, name: "ATT Home Phone", unitValue: 1.0, unitsSold: 2 },
      { id: 23, name: "ATT Internet 1Gig+", unitValue: 12.0, unitsSold: 1 },
      { id: 24, name: "ATT Internet Air", unitValue: 5.0, unitsSold: 2 },
      { id: 25, name: "ATT Internet Upgrade", unitValue: 1.0, unitsSold: 1 },
      { id: 26, name: "ATT Standard Internet", unitValue: 4.0, unitsSold: 2 },
    ],
  },
];
