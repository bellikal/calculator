// Select display and button container elements
const display = document.querySelector('.display');
const buttonContainer = document.querySelector('.buttons');

// Set initial display value
display.innerText = '0';

// Variables for storing inputs
let firstOperand = '';
let secondOperand = '';
let currentOperator = '';
let isOperatorClicked = false; 

// Add event listener for button clicks
buttonContainer.addEventListener('click', (event) => {
    const pressedBtn = event.target.innerText;

    if (!isNaN(pressedBtn) || pressedBtn === '.') {
        handleNumber(pressedBtn); // Handle number input
    } else if (['+', '-', '*', '/'].includes(pressedBtn)) {
        handleOperator(pressedBtn); // Handle operator input
    } else if (pressedBtn === '=') {
        calculate(); // Perform calculation
    } else if (pressedBtn === 'AC') {
        resetCalculator(); // Reset calculator
    } else if (pressedBtn === 'DEL') {
        deleteLastInput(); // Delete last input
    } else if (pressedBtn === '%') {
        handlePercentage(); // Calculate percentage
    }
});

// Handle number input
const handleNumber = (number) => {
    if (isOperatorClicked) {
        secondOperand += number;
        display.innerText = secondOperand;
    } else {
        firstOperand += number;
        display.innerText = firstOperand;
    }
}

// Handle operator input
const handleOperator = (operator) => {
    if (firstOperand === '') return; 

    currentOperator = operator;
    isOperatorClicked = true;

    display.innerText = operator;
}

// Perform calculation when '=' is pressed
const calculate = () => {
    if (firstOperand === '' || secondOperand === '') return;

    let result;
    const num1 = parseFloat(firstOperand);
    const num2 = parseFloat(secondOperand);

    switch (currentOperator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num1 / num2;
            break;
        default:
            return;
    }

    display.innerText = result;

    firstOperand = result.toString();
    secondOperand = '';
    currentOperator = '';
    isOperatorClicked = false;
}

// Reset calculator when 'AC' is pressed
const resetCalculator = () => {
    firstOperand = '';
    secondOperand = '';
    currentOperator = '';
    isOperatorClicked = false;
    display.innerText = '0';
}

// Delete last input when 'DEL' is pressed
const deleteLastInput = () => {
    if (isOperatorClicked && secondOperand !== '') {
        secondOperand = secondOperand.slice(0, -1);
        display.innerText = secondOperand || '0';
    } else if (!isOperatorClicked && firstOperand !== '') {
        firstOperand = firstOperand.slice(0, -1);
        display.innerText = firstOperand || '0';
    }
}

// Calculate percentage when '%' is pressed
const handlePercentage = () => {
    if (isOperatorClicked && secondOperand !== '') {
        secondOperand = (parseFloat(secondOperand) / 100).toString();
        display.innerText = secondOperand;
    } else if (!isOperatorClicked && firstOperand !== '') {
        firstOperand = (parseFloat(firstOperand) / 100).toString();
        display.innerText = firstOperand;
    }
}
