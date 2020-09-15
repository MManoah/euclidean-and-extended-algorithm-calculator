# Euclidean and Extended Euclidean Algorithm Calculator

### Website Hosted: https://mmanoah.github.io/euclidean-and-extended-algorithm-calculator/index.html

This website finds the GCD using the Euclidean algorithm or finds a linear combination of the GCD using the extended Euclidean algorithm. All steps/work done is also shown.

## How It Works

### Euclidean Algorithm

1. Two numbers are given that are not negative. Initially, R1 will be the greater of the two numbers and R2 will be the lesser of the two. 
2. The max value that makes (R2 * Q) ≤ R1 where Q is some integer, that will be the value of Q.
3. If there is a remainder, the remainder is R. 
4. If the remainder is not 0, it proceeds to the next row. The new R1 takes on the value of the previous R2 and the new R2 takes on the previous value of R.
5. This process is repeated until the remainder is 0.
6. When the remainder is 0, R2 will be the GCD.

### Extended Euclidean Algorithm

1. Two numbers are given that are not negative. Initially, R1 will be the greater of the two numbers and R2 will be the lesser of the two.
2. Other Initial values will be S1=1, S2=0, T1=0, T2=1. 
3. The max value that makes (R2 * Q) ≤ R1 where Q is some integer, that will be the value of Q.
4. If there is a remainder, the remainder is R.
5. S= S1 - S2 * Q and T= T1 - T2 * Q.
6. If the remainder is not 0, it proceeds to the next row. The new R1 takes on the value of the previous R2, the new R2 takes on the previous value of R, the new S1 takes on the    previous value of S2, the new S2 takes on the previous value of S, the new T1 takes on the previous value of T2, and the new T2 takes on the previous value of T.
7. This process is repeated until the remainder is 0.
8. When the remainder is 0, R2 will be the GCD, S2 will be S, T2 will be T.
9. Now, let X,Y be the two initially selected where X > Y. (X * S) + (Y * T) = GCD.

## Built With

* HTML
* CSS
* JavaScript

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
