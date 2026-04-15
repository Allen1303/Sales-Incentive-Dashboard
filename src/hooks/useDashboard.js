// Custom Hooks functions live here
import { useState, useMemo } from "react";
import { INITIAL_PROVIDERS, TARGETS } from "../data/agentData";

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

  //  Randomize Calls taken - in a real app I would have to access a database
  const [callsTaken] = useState(
    () => TARGETS.callsTaken + (Math.floor(Math.random() * 21) - 10),
  );

  // Randomize ADH output to the KPI Card.
  const [adh] = useState(() =>
    parseFloat((1 + Math.random() * 99).toFixed(1)),
  );

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
  };
};

