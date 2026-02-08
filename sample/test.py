# Sample Python file
# This is a Python comment

def add_numbers(a, b):
    \"\"\"Add two numbers and return the result.\"\"\"
    return a + b

def multiply(x, y):
    \"\"\"Multiply two numbers.\"\"\"
    return x * y

class MathOperations:
    \"\"\"A class for mathematical operations.\"\"\"
    
    def __init__(self):
        self.results = []
    
    def calculate(self, operation, a, b):
        \"\"\"Perform calculation and store result.\"\"\"
        if operation == 'add':
            result = a + b
        elif operation == 'multiply':
            result = a * b
        else:
            result = None
        
        if result is not None:
            self.results.append(result)
        
        return result

def main():
    # Create calculator instance
    calc = MathOperations()
    
    # Perform calculations
    result1 = calc.calculate('add', 5, 3)
    result2 = calc.calculate('multiply', 4, 7)
    
    print(f"Results: {calc.results}")