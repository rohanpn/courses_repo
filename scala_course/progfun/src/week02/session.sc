package week02

object session {
  // finding gcd
  def gcd(a: Int, b: Int): Int =
    if(b == 0) a else gcd(b, a % b)               //> gcd: (a: Int, b: Int)Int
  
  gcd(10, 4)                                      //> res0: Int = 2
  
  // factorial without tail recursion
  def fact(n: Int): Int =
    if(n == 0) 1 else n * fact(n - 1)             //> fact: (n: Int)Int
  
  fact(4)                                         //> res1: Int = 24
  
  // factorial using tail recursion
  def tail_fact(n: Int): Int = {
    def loop(acc: Int, a: Int): Int =
      if(a == 0) acc
      else
      loop(acc * a, a - 1)
    
    loop(1, n)
  }                                               //> tail_fact: (n: Int)Int
  
  tail_fact(4)                                    //> res2: Int = 24
  
  // sum of integers
  def sumInts(a: Int, b: Int): Int =
    if (a > b) 0 else a + sumInts(a + 1, b)       //> sumInts: (a: Int, b: Int)Int
  
  sumInts(3, 4)                                   //> res3: Int = 7
  
  // sum of all cubes between integers
  def cube(x: Int) = x * x * x                    //> cube: (x: Int)Int
  
  cube(3)                                         //> res4: Int = 27
  cube(4)                                         //> res5: Int = 64
  cube(5)                                         //> res6: Int = 125
  
  def cubeInts(a: Int, b: Int): Int =
    if (a > b) 0 else cube(a) + cubeInts(a + 1, b)//> cubeInts: (a: Int, b: Int)Int
  
  cubeInts(3, 5)                                  //> res7: Int = 216
 
  // Using higher-order function
  // sum of integers
  def sum(f: Int => Int, a: Int, b: Int): Int =
    if(a > b) 0 else f(a) + sum(f, a + 1, b)      //> sum: (f: Int => Int, a: Int, b: Int)Int
     
  def id(x: Int) = x                              //> id: (x: Int)Int
  def cubeHO(x: Int) = x * x * x                  //> cubeHO: (x: Int)Int
  def factHO(n: Int): Int =
    if(n == 0) 1 else n * factHO(n - 1)           //> factHO: (n: Int)Int
  
  sum(id, 3, 4)                                   //> res8: Int = 7
  sum(cubeHO, 3, 5)                               //> res9: Int = 216
  sum(factHO, 2, 4)                               //> res10: Int = 32
  
  // Higher order with anonymous function
  sum(x => x, 3, 4)                               //> res11: Int = 7
  sum(x => x * x * x, 3, 4)                       //> res12: Int = 91
  
  def sum_tail(f: Int => Int, a: Int, b: Int): Int = {
    def loop(a: Int, acc: Int): Int = {
      if (a > b) acc
      else loop(a+1, f(a) + acc)
    }
    loop(a, 0)
  }                                               //> sum_tail: (f: Int => Int, a: Int, b: Int)Int
  sum_tail(x => x, 3, 5)                          //> res13: Int = 12
}