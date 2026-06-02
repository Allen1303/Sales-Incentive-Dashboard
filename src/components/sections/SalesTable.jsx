/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

// src/components/sections/SalesTable.tsx
//
// The provider-grouped, live-editable incentive breakdown table.

export default function SalesTable({ providers, attendanceDeduction = 0 }) {
  const grandTotal = providers
    .flatMap(group => group.products)
    .reduce((sum, product) => sum + product.unitValue * product.unitsSold, 0);

  const netTotal = Math.max(0, grandTotal - attendanceDeduction);

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div className="px-5 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-slate-700">
            {providers.length} Sold Providers — Incentive Breakdown
          </h3>
        </div>
        <div className="flex gap-2">
          {attendanceDeduction > 0 && (
            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg tabular-nums border border-rose-100">
              Deductions: -${attendanceDeduction.toFixed(2)}
            </span>
          )}
          <span className="text-xs font-bold text-emerald-400 bg-slate-800 px-3 py-1.5 rounded-lg tabular-nums border border-slate-700 shadow-5xs">
            Net Payout: ${netTotal.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="text-left  text-xs font-bold text-slate-500 uppercase tracking-wide px-5 py-3 whitespace-nowrap">Provider Product</th>
              <th className="text-right text-xs font-bold text-slate-500 uppercase tracking-wide px-4 py-3 whitespace-nowrap">Unit Value</th>
              <th className="text-right text-xs font-bold text-slate-500 uppercase tracking-wide px-4 py-3 whitespace-nowrap">Units Sold</th>
              <th className="text-right text-xs font-bold text-slate-500 uppercase tracking-wide px-5 py-3 whitespace-nowrap">Row Total</th>
            </tr>
          </thead>

          <tbody>
            {providers.map(group => {
              const providerTotal = group.products.reduce(
                (sum, currentProd) => sum + currentProd.unitValue * currentProd.unitsSold, 0
              );
              const providerUnits = group.products.reduce(
                (sum, currentProd) => sum + currentProd.unitsSold, 0
              );

              return (
                <React.Fragment key={group.provider}>
                  <tr>
                    <td colSpan={2} className="bg-slate-800 px-5 py-2">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${group.badgeCls}`}>
                        {group.provider}
                      </span>
                    </td>
                    <td className="bg-slate-800 px-4 py-2 text-right">
                      <div className="w-16 ml-auto text-center text-xs font-bold text-white tabular-nums">
                        {providerUnits}
                      </div>
                    </td>
                    <td className="bg-slate-800 px-5 py-2 text-right">
                      <span className="text-xs text-slate-400 tabular-nums">
                        ${providerTotal.toFixed(2)}
                      </span>
                    </td>
                  </tr>

                  {group.products.map((product, index) => {
                    const rowTotal = product.unitValue * product.unitsSold;

                    return (
                      <tr
                        key={product.id}
                        className={`
                          border-t border-slate-100
                          transition-colors hover:bg-amber-50/40
                          ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}
                        `}
                      >
                        <td className="px-5 py-3 font-semibold text-slate-700">
                          {product.name}
                        </td>

                        <td className="px-4 py-3 text-right font-mono text-xs text-slate-500 tabular-nums">
                          ${product.unitValue.toFixed(2)}
                        </td>

                        <td className="px-4 py-3 text-right">
                          <div className="w-16 text-center text-sm font-bold text-slate-800
                                       bg-slate-50 border border-slate-100 rounded-lg py-1.5
                                       ml-auto block tabular-nums">
                            {product.unitsSold}
                          </div>
                        </td>

                        <td className="px-5 py-3 text-right font-mono text-xs text-slate-600 tabular-nums">
                          ${rowTotal.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              );
            })} {/*Initial map function ends here... */}
          </tbody>

          <tfoot>
            <tr className="bg-slate-800 border-t border-slate-700">
              <td colSpan={3} className="px-5 py-3 text-xs font-semibold text-slate-300">
                Gross Incentive Earnings
              </td>
              <td className="px-5 py-3 text-right text-xs font-semibold text-slate-300 font-mono tabular-nums">
                ${grandTotal.toFixed(2)}
              </td>
            </tr>
            {attendanceDeduction > 0 && (
              <tr className="bg-slate-800 border-t border-slate-700">
                <td colSpan={3} className="px-5 py-3 text-xs font-semibold text-rose-300">
                  Attendance Penalty Deduction (Late, LE & Absent Infractions)
                </td>
                <td className="px-5 py-3 text-right text-xs font-semibold text-rose-300 font-mono tabular-nums">
                  -${attendanceDeduction.toFixed(2)}
                </td>
              </tr>
            )}
            <tr className="bg-slate-900 border-t border-slate-700">
              <td colSpan={3} className="px-5 py-4 text-sm font-bold text-white">
                Net Adjusted Incentive Payout
              </td>
              <td className="px-5 py-4 text-right text-sm font-bold text-emerald-400 font-mono tabular-nums">
                ${Math.max(0, grandTotal - attendanceDeduction).toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
