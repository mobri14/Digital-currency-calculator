/**
 * Updates the value display with color change based on the new value compared to the previous value.
 * @param {HTMLElement} valueToUpdate - The DOM element to update.
 * @param {number} prevVal - The previous value.
 * @param {number} newVal - The new value to compare against the previous one.
 */
export function updateValue(valueToUpdate, prevVal, newVal) {
    // Set the color based on the comparison
    const color = newVal > prevVal ? 'green' : newVal < prevVal ? 'red' : 'black';
    valueToUpdate.style.color = color;

    // Reset color back to black after 2 seconds
    setTimeout(() => {
        valueToUpdate.style.color = 'black';
    }, 2000);
}
