// Function to fetch the price of a cryptocurrency in a specific fiat currency
async function fetchPrice(cryptoType, fiatType) {
    // Set headers for the request
    const myHeaders = {
        'Access-Control-Allow-Origin': '*'
    };

    try {
        // Make a GET request to the Coinbase API to fetch the price
        const response = await fetch(`https://api.coinbase.com/v2/prices/${cryptoType}-${fiatType}/buy`, {
            method: 'GET',
            mode: 'cors',
            headers: myHeaders,
        });

        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) throw new Error('Network response was not ok');

        // Parse the response to JSON
        const res = await response.json();
        // Return the amount of the fetched price
        return res.data.amount;
    } catch (error) {
        // Log any errors to the console
        console.error('Error fetching price:', error);
        return null; // Return null in case of error
    }
}

// Function to update prices based on the fetched price
async function updatePrices(cryptoType, fiatType, valueToUpdate, type) {
    // Fetch the current price of the cryptocurrency
    const currentPrice = await fetchPrice(cryptoType, fiatType);
    if (currentPrice) {
        // Store the previous value for comparison
        const prevVal = valueToUpdate.value;
        let newVal;

        // Calculate new value based on the type of conversion
        if (type === 'cryptoToFiat') {
            newVal = (Number(cryptoAmount.value) * Number(currentPrice)).toFixed(2);
        } else if (type === 'fiatToCrypto') {
            newVal = (Number(fiatAmount.value) / Number(currentPrice)).toFixed(2);
        }

        // Update the value to the new calculated value
        valueToUpdate.value = newVal;
        // Call a function to update the display with the new and previous values
        updateValue(valueToUpdate, prevVal, newVal);
    }
}

// Example usage:
// updatePrices('BTC', 'USD', someInputElement, 'cryptoToFiat');
