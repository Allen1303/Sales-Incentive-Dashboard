// Sales Tables - Provide Units Sold By Providers for a Incentive Breakdown
export default function SalesTable({ providers }) {
  const grandTotal = providers
    .flatMap((group) => group.products)
    .reduce((sum, product) => sum + product.unitValue * product.unitsSold, 0);
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div>
        <h3 className="text-sm font-bold text-slate-700">
          {providers.length} Sold Providers - Incentive Breakdown
        </h3>
        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg tabular-nums">
          Grand Total: ${grandTotal.toFixed(2)}
        </span>
      </div>
      {/* Table markup starts here..*/}
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="text-left text-xs font-bold text-slate-500 uppercase tracking-wide px-5 py-3 whitespace-nowrap">
                Provider Product
              </th>
              <th className="text-right text-xs font-bold text-slate-500 uppercase tracking-wide px-4 py-3 whitespace-nowrap">
                Unit Value
              </th>
              <th className="text-right text-xs font-bold text-slate-500 uppercase tracking-wide px-4 py-3 whitespace-nowrap">
                Units Sold
              </th>
              <th className="text-right text-xs font-bold text-slate-500 uppercase tracking-wide px-5 py-3 whitespace-nowrap">
                Row Total
              </th>
            </tr>
          </thead>
          {/*Table Body */}
          <tbody>
            {providers.map((group) => {
              const providerTotal = group.products.reduce(
                (sum, currentProd) =>
                  sum + currentProd.unitValue * currentProd.unitsSold,
                0,
              );
              const providerUnits = group.products.reduce(
                (sum, currentProd) => sum + currentProd.unitsSold,
                0,
              );
              return (
                // group these rows together for React's logic without adding any extra tags
                <React.Fragment key={group.provider}>
                  <tr>
                    <td colSpan={4} className="bg-slate-800 px-5 py-2">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-bold px-2.5 py-1 rounded-md ${group.badgeCls}`}
                        >
                          {group.provider}
                        </span>
                        <div className="flex items-center gap-4">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Units:{" "}
                            <span className="text-white">{providerUnits}</span>
                          </span>
                          <span className="text-xs text-slate-400 tabular-nums">
                            {" "}
                            Provider total: ${providerTotal.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  {/*Row Logic starts here...*/}
                  {group.products.map((product, index) => {
                    const rowTotal = product.unitValue * product.unitsSold;
                    return (
                      <tr
                        key={product.id}
                        className={`border-t border-slate-100 transition-colors hover:bg-amber-50/40 ${index % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
                      >
                        <td className="px-5 py-3 font-semibold text-slate-700">
                          {product.name}
                        </td>
                        <td className="px-4 py-3 text-right font-mono text-xs text-slate-500 tabular-nums">
                          ${product.unitValue.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div
                            className="w-16 text-center text-sm font-bold text-slate-800
                                       bg-slate-50 border border-slate-100 rounded-lg py-1.5
                                       ml-auto block tabular-nums"
                          >
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
            })}
          </tbody>
          <tfoot>
            <tr className="bg-slate-900">
              <td
                colSpan={3}
                className="px-5 py-4 text-sm font-bold text-white"
              >
                Total Incentive Earnings
              </td>
              <td className="px-5 py-4 text-right text-sm font-bold text-emerald-400 font-mono tabular-nums">
                ${grandTotal.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
