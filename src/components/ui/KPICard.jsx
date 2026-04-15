
import { BarChart, Bar, Cell, ResponsiveContainer } from 'recharts';

export default function KPICard({ label, value, target, suffix = '', warningThreshold = 0.9, chartData = null, targetNotes = null }) {
  const status = value >= target ? 'success' : value >= (target * warningThreshold) ? 'warning' : 'danger';
  const config = {
    success: { text: 'text-emerald-600', bar: '#10b981', badge: 'bg-emerald-50 text-emerald-700', label: 'On Target' },
    warning: { text: 'text-amber-600', bar: '#f59e0b', badge: 'bg-amber-50 text-amber-700', label: 'At Risk' },
    danger: { text: 'text-rose-600', bar: '#f43f5e', badge: 'bg-rose-50 text-rose-700', label: 'Below' }
  };

  const active = config[status];
  const barWidth = Math.min((value / target) * 100, 100).toFixed(1);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col shadow-sm hover:shadow-md transition-shadow h-full">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">{label}</p>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${active.badge}`}>{active.label}</span>
      </div>

      <div className="mb-2">
        <p className={`text-3xl font-bold tabular-nums ${active.text}`}>{value} {suffix}</p>
      </div>

      {/* Chart Section */}
      {chartData ? (
        <div className="w-full my-4" style={{ height: '80px', minHeight: '80px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <Bar
                dataKey="value"
                radius={[2, 2, 0, 0]}
                isAnimationActive={false}
                fill={active.bar}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={active.bar}
                    fillOpacity={0.3 + (index / chartData.length) * 0.7}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-4" /> // Spacer if no chart
      )}

      <div className="mt-auto pt-2">
        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div className="h-full transition-all duration-700 ease-out" style={{ width: `${barWidth}%`, backgroundColor: active.bar }} />
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="text-[10px] text-slate-400">
            Target: <span className="font-semibold text-slate-500 ml-1">{target} {suffix}</span>
            {targetNotes && (
              <span className="italic text-slate-400 ml-1">
                ({targetNotes})
              </span>
            )}
          </p>
          {status === "warning" && (
            <p className="text-[10px] font-medium text-amber-600 animate-pulse">
              Bonus Eligible at {target}{suffix}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

