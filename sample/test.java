// Sample Java file
// This is a Java comment

public class MathUtils {
    
    // Add two integers
    public static int add(int a, int b) {
        return a + b;
    }
    
    // Multiply two doubles
    public static double multiply(double x, double y) {
        return x * y;
    }
    
    // Calculate factorial using recursion
    public static long factorial(int n) {
        if (n <= 1) {
            return 1;
        }
        return n * factorial(n - 1);
    }
    
    // Check if number is prime
    public static boolean isPrime(int num) {
        if (num <= 1) return false;
        if (num <= 3) return true;
        
        for (int i = 2; i * i <= num; i++) {
            if (num % i == 0) {
                return false;
            }
        }
        return true;
    }
    
    // Main method for testing
    public static void main(String[] args) {
        System.out.println("Math Utility Test");
        
        int result1 = add(10, 5);
        double result2 = multiply(3.5, 2.0);
        long result3 = factorial(5);
        
        System.out.println("Addition: " + result1);
        System.out.println("Multiplication: " + result2);
        System.out.println("Factorial(5): " + result3);
    }
}