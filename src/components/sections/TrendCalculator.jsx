// Trend Calculator File - A UI to do What If analysis
import { TARGETS } from "../../data/agentData";
export default function TrendCalculator({
  trendSales,
  setTrendSales,
  trendCalls,
  setTrendCalls,
  trendScr,
}) {
  return (
    <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
          Trend Calculator
          <span className="text-slate-400 font-normal ml-1">
            What If Analysis
          </span>
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/*Input: Projected Sales */}
        <div className="space-y-2">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Projected Sales
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              value={trendSales}
              onChange={(e) =>
                setTrendSales(Math.max(0, parseInt(e.target.value) || 0))
              }
              className="w-full text-2xl font-bold text-slate-900 border border-slate-200 rounded-xl py-3 px-4 
            focus:outline-none focus:ring-2 focus:ring-blue-500 tabular-nums transition-shadow"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none font-medium text-xs">
              Units
            </div>
          </div>
        </div>
        {/* Input Projected Calls*/}
        <div className="space-y-2">
          <label className="block text text-[10px] font-bold text-slate-400 uppercase">
            Projected Calls
          </label>
          <div className="relative">
            <input
              type="number"
              min="1"
              value={trendCalls}
              onChange={(e) =>
                setTrendCalls(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="w-full text-2xl font-bold text-slate-900 border border-slate-200 rounded-xl py-3 px-4
              focus:outline-none focus:ring-2 focus:ring-blue-500 tabular-nums transition-shadow"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none font-medium text-xs">
              Calls
            </div>
          </div>
        </div>
        {/* Result: Trend SCR % */}
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col items-center justify-center text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
            Trended SCR %
          </p>
          <p
            className={`text-4xl font-black tabular-nums transition-colors duration-500 ${trendScr >= TARGETS.scr ? "text-emerald-600" : "text-rose-500"}`}
          >
            {trendScr}%
          </p>
          <p className="text-[10px] mt-2 text-slate-500 font-medium">
            Target: {TARGETS.scr}%
          </p>
        </div>
      </div>
    </section>
  );
}
