// Sample JavaScript/TypeScript file
// This is a comment

function calculateSum(a, b) {
    return a + b;
}

const multiply = function(x, y) {
    return x * y;
};

const divide = (numerator, denominator) => {
    if (denominator === 0) {
        return null;
    }
    return numerator / denominator;
};

// Arrow function
const square = (num) => num * num;

class Calculator {
    constructor() {
        this.history = [];
    }
    
    add(num1, num2) {
        const result = num1 + num2;
        this.history.push(result);
        return result;
    }
}