// Select DOM elements for cryptocurrency conversion
export const elements = {
    cryptoAmount: document.querySelector('#cryptoAmount'), // Input for amount of cryptocurrency
    cryptoType: document.querySelector('#cryptoType'),     // Dropdown for type of cryptocurrency
    fiatAmount: document.querySelector('#fiatAmount'),     // Input for amount of fiat currency
    fiatType: document.querySelector('#fiatType'),         // Dropdown for type of fiat currency

    refMonth: document.querySelector('#refMonth'),         // Input for reference month
    refYear: document.querySelector('#refYear'),           // Input for reference year

    lastMonthPrice: document.querySelector('#lastMonthPrice'), // Display last month's price
    lastYearPrice: document.querySelector('#lastYearPrice'),   // Display last year's price

    actualPrice: document.querySelector('#actualPrice'),       // Display current price of cryptocurrency
    actualPrice1: document.querySelector('#actualPrice1'),     // Another current price display, if needed

    variationMonthToday: document.querySelector('#variationMonthToday'), // Monthly variation
    variationYearToday: document.querySelector('#variationYearToday'),   // Yearly variation

    rangeSlider: document.querySelector('#rangeSlider'),       // Range slider for selecting values
    outputRange: document.querySelector('#outputRange')        // Output display for the range slider
};
