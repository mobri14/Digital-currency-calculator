import { cryptoAmount, cryptoType, fiatAmount, fiatType } from './domElements';
import { TOFIAT, TOCRYPTO } from './constants';
import { updateValue } from './updateValue';

// Variable to hold the current price change
export let currentChange;

/**
 * Fetches cryptocurrency prices and updates the corresponding value
 * @param {string} cryptoType - The type of cryptocurrency
 * @param {HTMLElement} valueToUpdate - The element to update the value
 * @param {string} type - The conversion type (cryptoToFiat or fiatToCrypto)
 * @param {string} fiatType - The type of fiat currency
 */
export function getPrices(cryptoType, valueToUpdate, type, fiatType) {
    const myHeaders = {
        'Access-Control-Allow-Origin': '*',
    };

    fetch(`https://api.coinbase.com/v2/prices/${cryptoType}-${fiatType}/buy`, {
        method: 'GET',
        mode: 'cors',
        headers: myHeaders,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(res => {
        currentChange = res.data.amount; // Store the current price

        const prevVal = valueToUpdate.value;
        let newVal;

        // Calculate new value based on the conversion type
        if (type === TOCRYPTO) {
            newVal = (Number(fiatAmount.value) / Number(currentChange)).toFixed(2);
        } else if (type === TOFIAT) {
            newVal = (Number(cryptoAmount.value) * Number(currentChange)).toFixed(2);
        } else {
            throw new Error('Invalid conversion type');
        }

        valueToUpdate.value = newVal; // Update the value in the input
        return updateValue(valueToUpdate, prevVal, newVal); // Call updateValue function
    })
    .catch(error => {
        console.error('Error fetching prices:', error); // Log any errors
    });
}

