// Variables to hold the theme switch elements
const themeSwitch = document.getElementById('themeSwitch');
const themeIndicator = document.getElementById('themeIndicator');
const body = document.body;
const calcDisplay = document.getElementById('calcDisplay');
let currentInput = ''; // Store current input

// Function to update the theme indicator position based on the current theme
const updateThemeIndicator = () => {
    const currentTheme = body.classList.contains('theme-1') ? 'theme-1' :
        body.classList.contains('theme-2') ? 'theme-2' :
            body.classList.contains('theme-3') ? 'theme-3' : 'default';

    if (currentTheme === 'theme-1') {
        themeIndicator.style.left = '8px'; // Position for Theme 1
    } else if (currentTheme === 'theme-2') {
        themeIndicator.style.left = '28px'; // Position for Theme 2
    } else if (currentTheme === 'theme-3') {
        themeIndicator.style.left = '48px'; // Position for Theme 3
    } else {
        themeIndicator.style.left = '0px'; // Default styling
    }
};

// Event listener for theme switch toggle (click)
themeSwitch.addEventListener('click', (e) => {
    const clickX = e.clientX - themeSwitch.getBoundingClientRect().left;

    if (clickX < 20) {
        body.classList.remove('theme-2', 'theme-3', 'default');
        body.classList.add('theme-1');
    } else if (clickX < 40) {
        body.classList.remove('theme-1', 'theme-3', 'default');
        body.classList.add('theme-2');
    } else {
        body.classList.remove('theme-1', 'theme-2', 'default');
        body.classList.add('theme-3');
    }

    updateThemeIndicator(); // Update the indicator position
});

// Handle drag functionality for the theme switch indicator
let isDragging = false;
themeIndicator.addEventListener('mousedown', (e) => {
    isDragging = true;
    const startX = e.clientX;
    const switchWidth = themeSwitch.offsetWidth;

    const onMouseMove = (e) => {
        if (isDragging) {
            let moveX = e.clientX - startX + parseInt(themeIndicator.style.left || '0', 10);
            moveX = Math.max(0, Math.min(switchWidth - 20, moveX)); // Limit movement within bounds
            themeIndicator.style.left = `${moveX}px`;
        }
    };

    const onMouseUp = () => {
        isDragging = false;
        const indicatorLeft = parseInt(themeIndicator.style.left, 10);

        // Switch theme based on indicator position
        if (indicatorLeft < 20) {
            body.classList.remove('theme-2', 'theme-3', 'default');
            body.classList.add('theme-1');
        } else if (indicatorLeft < 40) {
            body.classList.remove('theme-1', 'theme-3', 'default');
            body.classList.add('theme-2');
        } else {
            body.classList.remove('theme-1', 'theme-2', 'default');
            body.classList.add('theme-3');
        }

        updateThemeIndicator(); // Align the indicator
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});

// Set initial default styling and theme indicator position
document.addEventListener('DOMContentLoaded', () => {
    // Default styling (not tied to theme-1, theme-2, or theme-3)
    body.classList.add('default'); // Apply default style class
    updateThemeIndicator(); // Set the indicator to its default position
});

// Calculator functionality
const calcKeys = document.querySelectorAll('.calcKey');

calcKeys.forEach(key => {
    key.addEventListener('click', () => {
        const keyValue = key.textContent;

        if (keyValue === 'DEL') {
            currentInput = currentInput.slice(0, -1); // Remove last character
        } else if (keyValue === 'RESET') {
            currentInput = ''; // Reset the input
        } else if (keyValue === '=') {
            try {
                currentInput = evaluateExpression(currentInput); // Evaluate expression
            } catch (error) {
                currentInput = 'Error';
            }
        } else {
            currentInput += keyValue; // Append key value
        }

        calcDisplay.value = currentInput;
    });
});

// Function to evaluate mathematical expression
const evaluateExpression = (expression) => {
    // Replace 'x' with '*' and evaluate the expression
    expression = expression.replace(/x/g, '*').replace(/÷/g, '/');
    return eval(expression).toString(); // Evaluate and return the result
};
