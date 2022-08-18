// javascript program to calculate
// Fibonacci no. modulo m using
// Pisano Period
// Calculate and return Pisano Period
// The length of a Pisano Period for
// a given m ranges from 3 to m * m
function pisano(m)
{
    let prev = 0;
    let curr = 1;
    let res = 0;
 
    for(let i = 0; i < m * m; i++)
    {
        let temp = 0;
        temp = curr;
        curr = (prev + curr) % m;
        prev = temp;
 
        if (prev == 0 && curr == 1)
            res = i + 1;
    }
    return res;
}
 
// Calculate Fn mod m
function fibonacciModulo(n,m)
{
     
    // Getting the period
    let pisanoPeriod = pisano(m);
 
    n = n % pisanoPeriod;
 
    let prev = 0;
    let curr = 1;
 
    if (n == 0)
        return 0;
    else if (n == 1)
        return 1;
 
    for(let i = 0; i < n - 1; i++)
    {
        let temp = 0;
        temp = curr;
        curr = (prev + curr) % m;
        prev = temp;
    }
    return curr % m;
}


// This code is contributed by vaibhavrabadiya117.
