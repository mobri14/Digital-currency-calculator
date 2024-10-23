import { 
    cryptoAmount, 
    cryptoType, 
    fiatAmount, 
    fiatType, 
    refMonth, 
    refYear, 
    actualPrice, 
    actualPrice1, 
    variationMonthToday, 
    variationYearToday, 
    lastMonthPrice, 
    lastYearPrice 
} from './domElements';
import { prices } from './prices';
import { currentChange } from './getPrices';

/**
 * Updates the price table with current values and historical data.
 * @param {number} currentValue - The current fiat value for conversion.
 * @param {string} currentCryptoType - The selected cryptocurrency type.
 * @param {string} currentFiatType - The selected fiat currency type.
 */
export function updateTable(currentValue, currentCryptoType, currentFiatType) {
    let ref = getReferencePrice(currentCryptoType, currentFiatType);

    // Log the current change value
    console.log('currentChange', currentChange);

    // Update the reference date and prices in the DOM
    refMonth.innerHTML = prices.date.lastMonth;
    refYear.innerHTML = prices.date.lastYear;
    lastMonthPrice.innerHTML = ref.lastMonth;
    lastYearPrice.innerHTML = ref.lastYear;
    actualPrice.innerHTML = currentChange;
    actualPrice1.innerHTML = currentChange;

    // Calculate variations and update the UI
    updateVariations(currentChange, ref);
}

/**
 * Retrieves the reference prices for the given cryptocurrency and fiat type.
 * @param {string} cryptoType - The cryptocurrency type (e.g., 'BTC', 'ETH', 'LTC').
 * @param {string} fiatType - The fiat currency type (e.g., 'USD', 'EUR').
 * @returns {object} Reference price object for the specified cryptocurrency and fiat type.
 */
function getReferencePrice(cryptoType, fiatType) {
    const refPrices = {
        'BTC': prices.btcToEur,
        'ETH': prices.ethToEur,
        'LTC': prices.ltcToEur
    };

    if (fiatType === 'USD') {
        refPrices.BTC = prices.btcToUsd;
        refPrices.ETH = prices.ethToUsd;
        refPrices.LTC = prices.ltcToUsd;
    }

    return refPrices[cryptoType] || {};
}

/**
 * Updates the variation UI elements based on current change and reference prices.
 * @param {number} currentChange - The current price change.
 * @param {object} ref - Reference prices for comparison.
 */
function updateVariations(currentChange, ref) {
    const lastMonthVariation = (((currentChange - ref.lastMonth) * 100) / ref.lastMonth).toFixed(3);
    const lastYearVariation = (((currentChange - ref.lastYear) * 100) / ref.lastYear).toFixed(3);

    updateVariationElement(variationMonthToday, lastMonthVariation, currentChange > ref.lastMonth);
    updateVariationElement(variationYearToday, lastYearVariation, currentChange > ref.lastYear);
}

/**
 * Updates a variation UI element with the given value and color based on comparison.
 * @param {HTMLElement} element - The DOM element to update.
 * @param {number} variation - The variation percentage.
 * @param {boolean} isPositive - Indicates if the variation is positive.
 */
function updateVariationElement(element, variation, isPositive) {
    element.innerHTML = `${variation} %`;
    element.style.color = isPositive ? 'green' : 'red';
    element.style.fontWeight = 'bold';
}
