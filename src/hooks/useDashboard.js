// Custom Hooks functions live here
import { useState, useMemo } from "react";
import { INITIAL_PROVIDERS, TARGETS, INITIAL_SCHEDULE } from "../data/agentData";

// Helper to generate a randomized fortnight schedule with max 2 infractions & perfect fortnight potential
export const generateRandomSchedule = () => {
  const daysOfWeek = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu"];

  // Choose exactly 4 "Off" days randomly out of the 14 days
  const indices = Array.from({ length: 14 }, (_, i) => i);
  const shuffledIndices = [...indices].sort(() => Math.random() - 0.5);
  const offIndices = new Set(shuffledIndices.slice(0, 4));

  // Decide how many infraction days we have in this fortnight (0, 1, or 2)
  // Capped at max 2 infractions as requested!
  const randVal = Math.random();
  let numInfractions = 0;
  if (randVal < 0.35) {
    numInfractions = 0; // Perfect Fortnight!
  } else if (randVal < 0.75) {
    numInfractions = 1;
  } else {
    numInfractions = 2;
  }

  const scheduledIndices = indices.filter(i => !offIndices.has(i));
  const shuffledScheduled = [...scheduledIndices].sort(() => Math.random() - 0.5);
  const infractionScheduledIndices = new Set(shuffledScheduled.slice(0, numInfractions));

  return indices.map((idx) => {
    const dayName = daysOfWeek[idx];
    const isWeekend = dayName === "Sat" || dayName === "Sun";

    // Day numbering base: e.g. 2026-05-01 starting Friday
    const dayNum = idx + 1;
    const dateStr = `2026-05-${dayNum < 10 ? '0' + dayNum : dayNum}`;

    if (offIndices.has(idx)) {
      return {
        id: idx + 1,
        date: dateStr,
        day: dayName,
        status: "Off",
        schedule: "Unscheduled",
        actual: "--",
        minsLate: 0
      };
    }

    if (infractionScheduledIndices.has(idx)) {
      // Choose an unexcused infraction: "Late", "Leave Early", "Absent"
      const infTypes = ["Late", "Leave Early", "Absent"];
      const chosenInfState = infTypes[Math.floor(Math.random() * infTypes.length)];

      let updatedMins = 0;
      let updatedActual = "--";

      if (chosenInfState === "Late") {
        updatedMins = 15;
        updatedActual = "09:15 AM - 05:00 PM";
      } else if (chosenInfState === "Leave Early") {
        updatedMins = 0;
        updatedActual = "09:00 AM - 04:30 PM";
      } else if (chosenInfState === "Absent") {
        updatedMins = 0;
        updatedActual = "--";
      }

      return {
        id: idx + 1,
        date: dateStr,
        day: dayName,
        status: chosenInfState,
        schedule: "09:00 AM - 05:00 PM",
        actual: updatedActual,
        minsLate: updatedMins
      };
    } else {
      // Non-infraction shift: On Time or HR-approved (Sick, PTO, FMLA)
      const nonInfStateVal = Math.random();
      let chosenStatus = "On Time";
      let actualLog = "08:55 AM - 05:00 PM";

      if (nonInfStateVal < 0.82) {
        chosenStatus = "On Time";
        const randMin = Math.floor(Math.random() * 15) + 45; // 08:45 AM - 08:59 AM
        actualLog = `08:${randMin} AM - 05:00 PM`;
      } else if (nonInfStateVal < 0.88) {
        chosenStatus = "Sick";
        actualLog = "Paid Sick Leave";
      } else if (nonInfStateVal < 0.94) {
        chosenStatus = "PTO";
        actualLog = "Paid Time Off";
      } else {
        chosenStatus = "FMLA";
        actualLog = "FMLA Leave";
      }

      return {
        id: idx + 1,
        date: dateStr,
        day: dayName,
        status: chosenStatus,
        schedule: "09:00 AM - 05:00 PM",
        actual: actualLog,
        minsLate: 0
      };
    }
  });
};

// Use Dashboard Function
export const useDashboard = () => {
  // Initialize  providers list by using a function inside useState so the "Randomization" logic only runs once when the app first starts.
  const [providers] = useState(() =>
    INITIAL_PROVIDERS.map((group) => ({
      ...group,
      products: group.products.map((product) => {
        // Primary Campaign Logic: AT&T always shows more units sold (5-10)
        // while others show standard (1-4) for the demo.
        const isPrimary = group.provider === "AT&T";
        const units = isPrimary
          ? Math.floor(Math.random() * 6) + 5  // 5 to 10
          : Math.floor(Math.random() * 4) + 1; // 1 to 4

        return {
          ...product,
          unitsSold: units,
        };
      }),
    })),
  );

  // Initialize interactive schedule tracking state (randomized initially)
  const [schedule, setSchedule] = useState(() => generateRandomSchedule());

  // Compute infractions and deductions with weekend doubling
  const infractionStats = useMemo(() => {
    let weekdayLates = 0;
    let weekendLates = 0;
    let weekdayLeaveEarlies = 0;
    let weekendLeaveEarlies = 0;
    let weekdayAbsents = 0;
    let weekendAbsents = 0;
    let weekdayOnTimes = 0;
    let weekendOnTimes = 0;
    let sicks = 0;
    let ptos = 0;
    let fmlas = 0;
    let offs = 0;

    schedule.forEach((day) => {
      const isWeekend = day.day === "Sat" || day.day === "Sun";

      if (day.status === "Late") {
        if (isWeekend) weekendLates++;
        else weekdayLates++;
      } else if (day.status === "Leave Early") {
        if (isWeekend) weekendLeaveEarlies++;
        else weekdayLeaveEarlies++;
      } else if (day.status === "Absent") {
        if (isWeekend) weekendAbsents++;
        else weekdayAbsents++;
      } else if (day.status === "On Time") {
        if (isWeekend) weekendOnTimes++;
        else weekdayOnTimes++;
      } else if (day.status === "Sick") {
        sicks++;
      } else if (day.status === "PTO") {
        ptos++;
      } else if (day.status === "FMLA" || day.status === "FLMA") {
        fmlas++;
      } else if (day.status === "Off") {
        offs++;
      }
    });

    // Weekdays Late/LE = 1 infraction point each
    // Weekends Late/LE = 2 infraction points each (doubled)
    const totalLateLeInfractions = weekdayLates + weekendLates + weekdayLeaveEarlies + weekendLeaveEarlies;
    const lateLePoints = (weekdayLates + weekdayLeaveEarlies) + 2 * (weekendLates + weekendLeaveEarlies);

    // Calculation:
    // First late/LE infraction point attracts $0.00.
    // Every subsequent infraction point attracts a $20.00 deduction.
    // Maximum deduction is capped at $100.00.
    const lateLeDeduction = lateLePoints > 1
      ? Math.min(100, (lateLePoints - 1) * 20)
      : 0;

    // Absents: weekday = $40.00, weekend = $80.00 (doubled)
    const weekdayAbsentDeduction = weekdayAbsents * 40;
    const weekendAbsentDeduction = weekendAbsents * 80;
    const absentDeduction = weekdayAbsentDeduction + weekendAbsentDeduction;

    // Total deduction applied
    const deduction = lateLeDeduction + absentDeduction;

    return {
      weekdayLates,
      weekendLates,
      weekdayLeaveEarlies,
      weekendLeaveEarlies,
      weekdayAbsents,
      weekendAbsents,
      weekdayOnTimes,
      weekendOnTimes,
      sicks,
      ptos,
      fmlas,
      offs,
      totalLateLeInfractions,
      lateLePoints,
      lateLeDeduction,
      absentDeduction,
      deduction,
    };
  }, [schedule]);

  // Handler to dynamically update any day's attendance status in the schedule
  const updateDayStatus = (id, newStatus) => {
    setSchedule((prev) =>
      prev.map((day) => {
        if (day.id === id) {
          let updatedMins = 0;
          let updatedActual = day.actual;

          if (newStatus === "Late") {
            updatedMins = 15;
            updatedActual = "09:15 AM - 05:00 PM";
          } else if (newStatus === "Leave Early") {
            updatedMins = 0;
            updatedActual = "09:00 AM - 04:30 PM";
          } else if (newStatus === "Absent") {
            updatedMins = 0;
            updatedActual = "--";
          } else if (newStatus === "On Time") {
            updatedMins = 0;
            updatedActual = "08:55 AM - 05:00 PM";
          } else if (newStatus === "Sick") {
            updatedMins = 0;
            updatedActual = "Paid Sick Leave";
          } else if (newStatus === "PTO") {
            updatedMins = 0;
            updatedActual = "Paid Time Off";
          } else if (newStatus === "FMLA" || newStatus === "FLMA") {
            updatedMins = 0;
            updatedActual = "FMLA Leave";
          } else if (newStatus === "Off") {
            updatedMins = 0;
            updatedActual = "--";
          }

          return {
            ...day,
            status: newStatus,
            minsLate: updatedMins,
            actual: updatedActual,
          };
        }
        return day;
      })
    );
  };

  //  Randomize Calls taken - in a real app I would have to access a database
  const [callsTaken] = useState(
    () => TARGETS.callsTaken + (Math.floor(Math.random() * 21) - 10),
  );

  // Calculate dynamic ADH (Schedule Adherence %) based on actual schedule infractions from the 14-day schedule.
  // This links schedule infractions directly to adherence so they match for the demo!
  const adh = useMemo(() => {
    let lates = 0;
    let leaveEarlies = 0;
    let absents = 0;
    let scheduledDays = 0;

    schedule.forEach((day) => {
      if (day.status !== "Off") {
        scheduledDays++;
        if (day.status === "Late") {
          lates++;
        } else if (day.status === "Leave Early") {
          leaveEarlies++;
        } else if (day.status === "Absent") {
          absents++;
        }
      }
    });

    if (scheduledDays === 0) return 100.0;

    const totalScheduledMinutes = scheduledDays * 480;
    const deviationMinutes = (absents * 480) + (leaveEarlies * 30) + (lates * 15);

    // We add a minor baseline deviation (approx. 5.8 mins per day) for natural aux/compliance play
    const baseDeviation = scheduledDays * 5.8;
    const totalDeviation = deviationMinutes + baseDeviation;

    const percentage = ((totalScheduledMinutes - totalDeviation) / totalScheduledMinutes) * 100;
    return parseFloat(Math.max(0, Math.min(100, percentage)).toFixed(1));
  }, [schedule]);

  // useMemo Hook is great for when an app does calculations it allows the app to calcualte once and only
  // execute it again if provider for example changes
  const totalSales = useMemo(() => {
    const salesData = providers
      .flatMap((group) => group.products)
      .reduce((sum, product) => sum + product.unitsSold, 0);

    // This is the dependency Array - the trigger for re-calculation
    const maxSales = Math.floor(callsTaken * 0.43);
    return Math.min(salesData, maxSales);
  }, [providers, callsTaken]);

  //Calcualte Sales Conversion Rate (SCR)
  const scr = parseFloat(((totalSales / callsTaken) * 100).toFixed(1));

  //Filter only providers who have sales to show in the Badges.
  const soldProviders = useMemo(() => {
    return providers.filter((group) =>
      group.products.some((p) => p.unitsSold > 0),
    );
  }, [providers]);

  // Calculate homany sales are needed to hit the target based on current calls.
  const dynamicSalesTarget = Math.ceil(callsTaken * (TARGETS.scr / 100));

  // TREND CALCULATOR (Interactive State)
  const [trendSales, setTrendSales] = useState(totalSales + 2);
  const [trendCalls, setTrendCalls] = useState(callsTaken + 5);

  const trendScr = useMemo(
    () => parseFloat(((trendSales / trendCalls) * 100).toFixed(1)),
    [trendSales, trendCalls],
  );

  // Generate mock historical trend data for the last 5 periods
  const [callsTrend] = useState(() =>
    Array.from({ length: 5 }, (_, i) => ({
      name: `P${i + 1}`,
      value: Math.floor(callsTaken * (0.8 + Math.random() * 0.4))
    }))
  );

  const [salesTrend] = useState(() =>
    Array.from({ length: 5 }, (_, i) => ({
      name: `P${i + 1}`,
      value: Math.floor(totalSales * (0.7 + Math.random() * 0.6))
    }))
  );

  // Return the Objects that simulate an API call of the hooks.
  // Anything return in this file can be used by the Dashboard Page Components
  return {
    providers,
    callsTaken,
    callsTrend,
    totalSales,
    salesTrend,
    scr,
    dynamicSalesTarget,
    trendSales,
    setTrendSales,
    trendCalls,
    setTrendCalls,
    trendScr,
    soldProviders,
    adh, // dynamic ADH calculations
    schedule,
    infractionStats,
    updateDayStatus,
    rollRandomSchedule: () => setSchedule(generateRandomSchedule()),
  };
};
