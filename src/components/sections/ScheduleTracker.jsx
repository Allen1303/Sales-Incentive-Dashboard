
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Calendar, Clock, AlertTriangle, AlertCircle, CheckCircle2, UserX, Info, ShieldAlert, Palmtree, Syringe, Coffee, Shuffle } from 'lucide-react';

export default function ScheduleTracker({ schedule, infractionStats, updateDayStatus, rollRandomSchedule }) {
  const {
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
  } = infractionStats;

  const scheduledCount = React.useMemo(() => {
    return schedule.filter(day => day.status !== "Off").length;
  }, [schedule]);

  const workedCount = React.useMemo(() => {
    return schedule.filter(day => ["On Time", "Late", "Leave Early"].includes(day.status)).length;
  }, [schedule]);

  // The step deductions as specified in the first instruction/image
  const lateLeSteps = [
    { points: 1, amount: 0, text: "$0.00", desc: "1st Point - Waived" },
    { points: 2, amount: 20, text: "-$20.00", desc: "2nd Point" },
    { points: 3, amount: 40, text: "-$40.00", desc: "3rd Point" },
    { points: 4, amount: 60, text: "-$60.00", desc: "4th Point" },
    { points: 5, amount: 80, text: "-$80.00", desc: "5th Point" },
    { points: 6, amount: 100, text: "-$100.00", desc: "Point Cap reached" },
  ];

  // Absent penalty rules from the second image
  const absentRules = [
    { count: "1 Day", amount: 40, text: "-$40.00", type: "Weekday Absent" },
    { count: "2 Days", amount: 80, text: "-$80.00", type: "Weekday Absents" },
    { count: "3 Days", amount: 120, text: "-$120.00", type: "Weekday Absents" },
    { count: "+Weekend", amount: 80, text: "-$80.00 / day", type: "Double Penalty Sat/Sun" },
  ];

  // Helper to check what styling matches each status
  const getStatusStyles = (status) => {
    switch (status) {
      case 'On Time':
        return {
          badge: 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100/50',
          indicator: 'bg-emerald-500',
          icon: CheckCircle2,
        };
      case 'Late':
        return {
          badge: 'bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-100/50',
          indicator: 'bg-amber-500',
          icon: Clock,
        };
      case 'Leave Early':
        return {
          badge: 'bg-orange-50 text-orange-700 border-orange-100 hover:bg-orange-100/50',
          indicator: 'bg-orange-500',
          icon: Clock,
        };
      case 'Absent':
        return {
          badge: 'bg-rose-50 text-rose-700 border-rose-100 hover:bg-rose-100/50',
          indicator: 'bg-rose-500',
          icon: UserX,
        };
      case 'Sick':
        return {
          badge: 'bg-purple-50 text-purple-700 border-purple-100 hover:bg-purple-100/50',
          indicator: 'bg-purple-500',
          icon: Syringe,
        };
      case 'PTO':
        return {
          badge: 'bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100/50',
          indicator: 'bg-blue-500',
          icon: Palmtree,
        };
      case 'FMLA':
      case 'FLMA':
        return {
          badge: 'bg-teal-50 text-teal-700 border-teal-100 hover:bg-teal-100/50',
          indicator: 'bg-teal-500',
          icon: ShieldAlert,
        };
      case 'Off':
      default:
        return {
          badge: 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100/50',
          indicator: 'bg-slate-400',
          icon: Coffee,
        };
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-slate-100">

      {/* LEFT COLUMN: Behaviour Infraction Rules, Scales, and Live Dynamic Aggregation */}
      <div className="p-6 lg:w-[45%] flex flex-col justify-between bg-slate-50/50">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-800">
              Attendance Behaviour & Multipliers
            </h3>
          </div>

          <p className="text-xs text-slate-500 mb-6 leading-relaxed">
            Attendance directly impacts available incentive payouts.
            <strong> Late & Leave Early</strong> infractions accumulate.
            <strong> Unexcused Absents</strong> attract a flat penalty (Weekday = <span className="text-slate-700 font-semibold">$40.00</span>, Weekend is doubled = <span className="text-rose-600 font-semibold">$80.00</span>).
          </p>

          {/* Aggregated Real-time Attendance Infraction Counter Summary */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            <div className="bg-white p-2.5 rounded-lg border border-slate-100 flex flex-col shadow-2xs">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                Late/LE Points
              </span>
              <span className="text-lg font-bold text-slate-800 mt-1 flex items-baseline gap-1">
                {lateLePoints} <span className="text-[10px] font-normal text-slate-400">pts</span>
              </span>
              <span className="text-[9px] text-slate-400 mt-0.5 font-mono">
                Deduct: -${lateLeDeduction.toFixed(0)}
              </span>
            </div>

            <div className="bg-white p-2.5 rounded-lg border border-slate-100 flex flex-col shadow-2xs">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                Absents Count
              </span>
              <span className="text-lg font-bold text-slate-800 mt-1 flex items-baseline gap-1">
                {weekdayAbsents + weekendAbsents} <span className="text-[10px] font-normal text-slate-400">days</span>
              </span>
              <span className="text-[9px] text-slate-400 mt-0.5 font-mono">
                Deduct: -${absentDeduction.toFixed(0)}
              </span>
            </div>

            <div className="bg-white p-2.5 rounded-lg border border-slate-100 flex flex-col shadow-2xs bg-rose-50/30">
              <span className="text-[9px] font-bold text-rose-500 uppercase tracking-wider">
                Total Penalty
              </span>
              <span className={`text-lg font-bold mt-1 ${deduction > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                -${deduction.toFixed(2)}
              </span>
              <span className="text-[9px] text-rose-500 font-mono">
                Net adjusted reduction
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Slide penalty meter for Late/LE (Matching Uploaded Table 1) */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center bg-slate-100/80 px-2 py-1 rounded">
                <span className="text-[10px] font-extrabold text-slate-600 uppercase tracking-wider">
                  Late/LE Scale
                </span>
                <span className="text-[9px] text-slate-400 italic">Waive 1st infraction</span>
              </div>
              <div className="flex flex-col gap-1">
                {lateLeSteps.map((st) => {
                  const isCurrent = lateLePoints === st.points ||
                    (st.points === 6 && lateLePoints >= 6) ||
                    (lateLePoints === 0 && st.points === 1);

                  return (
                    <div
                      key={st.points}
                      className={`flex items-center justify-between px-2 py-1.5 rounded border text-[11px] transition-all duration-200 ${isCurrent
                          ? 'bg-amber-100/50 border-amber-300 text-amber-900 font-bold shadow-3xs'
                          : 'bg-white border-slate-100 text-slate-500'
                        }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${isCurrent ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-500'
                          }`}>
                          {st.points}
                        </span>
                      </span>
                      <span className="font-mono">{st.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Slide penalty meter for Absents (Matching Uploaded Table 2) */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center bg-slate-100/80 px-2 py-1 rounded">
                <span className="text-[10px] font-extrabold text-slate-600 uppercase tracking-wider">
                  Absent Scale
                </span>
                <span className="text-[9px] text-rose-500 italic">No first waive</span>
              </div>
              <div className="flex flex-col gap-1">
                {absentRules.map((st, idx) => {
                  const totalAbsents = weekdayAbsents + weekendAbsents;
                  const isCurrentRule =
                    (st.count === "1 Day" && totalAbsents === 1) ||
                    (st.count === "2 Days" && totalAbsents === 2) ||
                    (st.count === "3 Days" && totalAbsents === 3) ||
                    (st.count === "+Weekend" && weekendAbsents > 0);

                  return (
                    <div
                      key={idx}
                      className={`flex items-center justify-between px-2 py-1.5 rounded border text-[11px] transition-all duration-200 ${isCurrentRule
                          ? 'bg-rose-100/50 border-rose-300 text-rose-900 font-bold shadow-3xs'
                          : 'bg-white border-slate-100 text-slate-500'
                        }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${isCurrentRule ? 'bg-rose-500' : 'bg-slate-300'}`} />
                        <span>{st.count}</span>
                      </span>
                      <span className="text-[10px] italic font-normal text-slate-400 hidden xl:inline">{st.type}</span>
                      <span className="font-mono">{st.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* Warning Indicator */}
        {(lateLePoints >= 6 || weekdayAbsents + weekendAbsents >= 3) && (
          <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 flex gap-2 items-start mt-4">
            <AlertCircle className="w-4 h-4 text-rose-500 decrease-shrink-0 mt-0.5" />
            <p className="text-[11px] text-rose-700 leading-normal">
              <strong>Infraction Alert:</strong> The agent has accumulated high penalty counts. Absents cost $40 (weekday) or $80 (weekend), and lates/LE are fully capped at an adjusting -$100.00.
            </p>
          </div>
        )}
      </div>

      {/* RIGHT COLUMN: Interactive 14-Day Fortnight Grid list with Weekend Indicators */}
      <div className="p-6 lg:w-[55%] flex flex-col">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-bold text-slate-800 capitalize">
              fortnight schedule
            </span>
          </div>
          <div className="text-[11.5px] font-medium text-slate-500 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg flex items-center gap-2 shadow-4xs">
            <span>Scheduled: <strong className="text-slate-850 font-extrabold">{scheduledCount}</strong></span>
            <span className="text-slate-300">|</span>
            <span>Worked: <strong className="text-indigo-600 font-extrabold">{workedCount}</strong></span>
          </div>
        </div>

        {/* Grid-based scheduler */}
        <div className="overflow-y-auto max-h-[460px] pr-1 space-y-2 scrollbar-thin">
          {schedule.map((day) => {
            const styles = getStatusStyles(day.status);
            const StatusIcon = styles.icon;
            const isWeekend = day.day === "Sat" || day.day === "Sun";

            return (
              <div
                key={day.id}
                className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg bg-white shadow-3xs transition-shadow gap-3 ${isWeekend ? 'border-indigo-150 bg-indigo-50/5' : 'border-slate-100 hover:border-slate-250'
                  }`}
              >
                {/* Date & Day Column */}
                <div className="flex items-center gap-2.5">
                  <div className={`text-center w-11 py-1 rounded-md border text-xs font-bold ${isWeekend ? 'bg-indigo-50 border-indigo-100 text-indigo-700' : 'bg-slate-50 border-slate-100 text-slate-600'
                    }`}>
                    <p className="text-[9px] uppercase font-bold opacity-75 leading-none">
                      {day.day}
                    </p>
                    <p className="text-sm font-extrabold mt-0.5 leading-none">
                      {day.date.split('-')[2]}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-bold text-slate-700">
                        {day.status === "Off" ? "Unscheduled Day" : "Shift"}
                      </p>
                    </div>
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                      {day.status === "Off" ? "Scheduled Off" : day.schedule}
                    </p>
                  </div>
                </div>

                {/* Clock-in log & penalty summary info */}
                <div className="flex items-center gap-3 sm:ml-auto justify-between sm:justify-end">
                  <div className="text-right">
                    <span className="text-[11px] font-semibold text-slate-650 font-mono bg-slate-50/50 px-1.5 py-0.5 rounded border border-slate-100">
                      {day.actual}
                    </span>
                    {day.status === "Late" && (
                      <p className="text-[9px] font-bold text-amber-500 mt-0.5 font-sans">
                        +15 mins late
                      </p>
                    )}
                    {day.status === "Absent" && (
                      <p className="text-[9px] font-bold text-rose-500 mt-0.5 font-sans">
                        Unexcused absent {isWeekend ? "(-$80)" : "(-$40)"}
                      </p>
                    )}
                  </div>

                  {/* Styled Dynamic Selection Dropdown */}
                  <div className="relative">
                    <select
                      value={day.status === "FLMA" ? "FMLA" : day.status}
                      onChange={(e) => updateDayStatus(day.id, e.target.value)}
                      className={`text-xs font-bold px-3 py-1.5 pr-8 rounded-lg border appearance-none outline-none cursor-pointer overflow-hidden transition-all duration-200 ${styles.badge}`}
                    >
                      <option value="On Time">On Time</option>
                      <option value="Late">Late</option>
                      <option value="Leave Early">Leave Early</option>
                      <option value="Absent">Absent</option>
                      <option value="Sick">Sick (Paid)</option>
                      <option value="PTO">PTO</option>
                      <option value="FMLA">FMLA / FLMA</option>
                      <option value="Off">Scheduled Off</option>
                    </select>
                    {/* Tiny custom arrow down for appearance override */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                      <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
