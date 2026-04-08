// Custom Hooks functions live here
import { useState, useMemo } from "react";
import { INITIAL_PROVIDERS, TARGETS } from "../data/agentData";
// Use Dashboard Function
export const useDashboard = () => {
  // Initialize  providers list by using a function inside useState so the "Randomization" logic only runs once when the app first starts.
  const [providers] = useState(() =>
    INITIAL_PROVIDERS.map((group) => ({
      ...group,
      products: group.products.map((product) => ({
        ...product,
        unitsSold: Math.floor(Math.random() * 4) + 1,
      })),
    })),
  );

  // Track Calls taken - in a real app w=I would have to access a database
  const [callsTaken] = useState(
    () => TARGETS.callsTaken + (Math.floor(Math.random() * 21) - 10),
  );

  // useMemo Hook is great for when an app does calculations it allows the app to
  // calcualte once and only execute it again if provider for example changes
  const totalSales = useMemo(
    () =>
      providers
        .flatMap((group) => group.products)
        .reduce((sum, product) => sum + product.unitsSold, 0),
    [providers], // This is the dependency Array - the trigger for re-calculation
  );
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
  // Return the Objects that simulate an API call of the hooks.
  // Anything return in this file can be used by the Dashboard Page Components
  return {
    providers,
    callsTaken,
    totalSales,
    scr,
    dynamicSalesTarget,
    trendSales,
    setTrendSales,
    trendCalls,
    setTrendCalls,
    trendScr,
    soldProviders,
    // Mock ADH
    adh: 91.2,
  };
};
