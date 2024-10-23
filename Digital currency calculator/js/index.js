import { 
    rangeSlider, 
    outputRange, 
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
import { getPrices } from './getPrices';
import { TOFIAT, TOCRYPTO } from './constants';
import { updateTable } from './updateTable';
import { setSpeed, priceSpeedUpdate, tableSpeedUpdate } from './setSpeed';

// Function to handle price fetching based on changes
const handlePriceFetch = (type) => {
    const currentCryptoType = cryptoType.value;
    const currentFiatType = fiatType.value;
    const targetAmount = type === TOFIAT ? fiatAmount : cryptoAmount;
    getPrices(currentCryptoType, targetAmount, type, currentFiatType);
};

// Event listeners for changes in amounts and types
cryptoAmount.addEventListener('change', () => handlePriceFetch(TOFIAT));
cryptoType.addEventListener('change', () => handlePriceFetch(TOFIAT));
fiatAmount.addEventListener('change', () => handlePriceFetch(TOCRYPTO));

// Interval for price updates
setInterval(() => {
    const currentCryptoType = cryptoType.value; 
    const currentFiatType = fiatType.value;   
    getPrices(currentCryptoType, fiatAmount, TOFIAT, currentFiatType);
}, priceSpeedUpdate);

// Interval for table updates
setInterval(() => {
    const currentCryptoType = cryptoType.value;  
    const currentFiatType = fiatType.value;
    const currentValue = Number(fiatAmount.value);
    
    if (currentValue) {
        updateTable(currentValue, currentCryptoType, currentFiatType);
    }
}, tableSpeedUpdate);

// Slider input for speed adjustment
rangeSlider.addEventListener('input', function() {
    const currentSpeed = this.value / 1000; // Convert to seconds
    outputRange.innerHTML = `Current Speed: ${currentSpeed}`;
    setSpeed(this.value);
});
