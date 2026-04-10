// Dashboad Page Component holds all smaller components
import { AGENT, TARGETS } from "../data/agentData";
import { useDashboard } from "../hooks/useDashboard";
import Header from "../components/layout/Header";
import KPICard from "../components/ui/KPICard";
import SalesTable from "../components/sections/SalesTable";
import TrendCalculator from "../components/sections/TrendCalculator";

export default function DashboardPage({ userName, onLogout }) {
  // Destructure all necessary values and props and useState functions/methods
  console.log("DashboardPage: Rendering Start. userName:", userName);
  const {
    soldProviders,
    callsTaken,
    totalSales,
    scr,
    adh,
    dynamicSalesTarget,
    trendSales,
    setTrendSales,
    trendCalls,
    setTrendCalls,
    trendScr,
  } = useDashboard();
  return (
    <div className="min-h-screen bg-slate-50">
      {/*container div starts here..*/}
      <Header
        agent={{
          name: userName,
          employeeId: AGENT.employeeId,
          team: AGENT.team,
        }}
        onLogout={onLogout}
      />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8">
        {/* Period Bar + provider badges */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-500">
            Performance Period:{" "}
            <span className="font-semibold text-slate-800">April 2026</span>
          </p>
          <div className="flex flex-col items-end gap-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Sold Providers
            </p>
            <div className="flex items-center gap-2 flex-wrap justify-end">
              {soldProviders.map((group) => (
                <span
                  key={group.provider}
                  className={`text-xs font-bold px-2 py-1 rounded-md ${group.badgeCls}`}
                >
                  {group.provider}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* Trend Calculator Section */}
        <TrendCalculator
          trendSales={trendSales}
          setTrendSales={setTrendSales}
          trendCalls={trendCalls}
          setTrendCalls={setTrendCalls}
          trendScr={trendScr}
        />
        {/* KPI Cards Section */}
        <section>
          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-4">
            Key Performance Indicators
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              label="Calls Taken"
              value={callsTaken}
              target={TARGETS.callsTaken}
            />
            <KPICard
              label="Sales Made"
              value={totalSales}
              target={dynamicSalesTarget}
            />
            <KPICard
              label="SCR %"
              value={scr}
              target={TARGETS.scr}
              suffix="%"
            />
            <KPICard
              label="ADH %"
              value={adh}
              target={TARGETS.adh}
              suffix="%"
            />
          </div>
        </section>
        {/*Sales Table Breakdown */}
        <section>
          <SalesTable providers={soldProviders} />
        </section>
      </main>
      {/*container div ends here..*/}
    </div>
  );
}
