import { prices } from "./prices";

// Default speed values in milliseconds
export let priceUpdateInterval = 10000; // 10 seconds
export let tableUpdateInterval = 5000;   // 5 seconds

/**
 * Set the speed for price and table updates.
 * @param {number} value - The base value for updating speeds.
 */
export function setSpeed(value) {
    if (typeof value === 'number' && value > 0) {
        priceUpdateInterval = value;
        tableUpdateInterval = value / 2; // Table updates twice as fast
    } else {
        console.error('Invalid value. Please provide a positive number.');
    }
}
