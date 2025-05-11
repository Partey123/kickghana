
import { useState, useEffect, createContext, useContext, ReactNode } from "react";

// Define currency conversion rates relative to GHS (Ghana Cedi)
const EXCHANGE_RATES = {
  GHS: 1,
  USD: 0.073, // 1 GHS = 0.073 USD (example rate)
  EUR: 0.067, // 1 GHS = 0.067 EUR (example rate)
  NGN: 109.50, // 1 GHS = 109.50 NGN (example rate)
};

export type CurrencyCode = keyof typeof EXCHANGE_RATES;

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  formatPrice: (amount: number | string) => string;
  currencies: CurrencyCode[];
  convertPrice: (amount: number | string, fromCurrency?: CurrencyCode, toCurrency?: CurrencyCode) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<CurrencyCode>(() => {
    // Initialize from localStorage or default to GHS
    const savedCurrency = localStorage.getItem("preferredCurrency");
    return (savedCurrency as CurrencyCode) || "GHS";
  });

  useEffect(() => {
    // Save to localStorage when currency changes
    localStorage.setItem("preferredCurrency", currency);
  }, [currency]);

  const currencies = Object.keys(EXCHANGE_RATES) as CurrencyCode[];

  // Convert a price from one currency to another
  const convertPrice = (
    amount: number | string,
    fromCurrency: CurrencyCode = "GHS",
    toCurrency: CurrencyCode = currency
  ): number => {
    // Parse the amount if it's a string (like "₵200")
    const numericAmount = typeof amount === "string" 
      ? parseFloat(amount.replace(/[^\d.]/g, "")) 
      : amount;

    // Convert to GHS first (base currency)
    const inGHS = fromCurrency === "GHS" ? numericAmount : numericAmount / EXCHANGE_RATES[fromCurrency];
    
    // Then convert from GHS to target currency
    return inGHS * EXCHANGE_RATES[toCurrency];
  };

  // Format a price in the current currency
  const formatPrice = (amount: number | string): string => {
    const convertedAmount = convertPrice(amount);
    
    // Format with appropriate currency symbol and 2 decimal places
    const currencySymbols: Record<CurrencyCode, string> = {
      GHS: "₵",
      USD: "$",
      EUR: "€",
      NGN: "₦",
    };

    return `${currencySymbols[currency]}${convertedAmount.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider value={{ 
      currency, 
      setCurrency, 
      formatPrice, 
      currencies,
      convertPrice 
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
