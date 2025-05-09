
type DeliverySpeedType = "standard" | "express" | "scheduled";

export const calculateDeliveryFee = (totalItems: number, deliverySpeed: DeliverySpeedType): number => {
  // Calculate base fee based on item count
  let baseFee = 0;
  if (totalItems >= 20) {
    baseFee = 0; // Free for 20+ items
  } else if (totalItems >= 10) {
    baseFee = 100; // 100 cedis for 10+ items
  } else if (totalItems >= 4) {
    baseFee = 80; // 80 cedis for 4-8 items
  } else if (totalItems >= 1) {
    baseFee = 40; // 40 cedis for 1-3 items
  }
  
  // Add additional fee based on delivery speed
  let speedFee = 0;
  if (deliverySpeed === "express") {
    speedFee = 20; // +20 cedis for express
  } else if (deliverySpeed === "scheduled") {
    speedFee = 10; // +10 cedis for scheduled
  }
  
  return baseFee + speedFee;
};
