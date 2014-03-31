package week02

object curry_excercises {
  def product(f: Int => Int)(a: Int, b: Int): Int =
    if(a > b) 1 else f(a) * product(f)(a + 1, b)  //> product: (f: Int => Int)(a: Int, b: Int)Int
  
  product(x => x * x)(2, 4)                       //> res0: Int = 576
  
  def fact(n: Int) = product(x => x)(1, n)        //> fact: (n: Int)Int
  
  fact(5)                                         //> res1: Int = 120
  
  // Re-writing above interms of common function
  
  def mapReduce(f: Int => Int, combine: (Int, Int) => Int, terminating_value: Int)(a: Int, b: Int): Int =
    if(a > b) terminating_value
    else combine(f(a), mapReduce(f, combine, terminating_value)(a + 1, b))
                                                  //> mapReduce: (f: Int => Int, combine: (Int, Int) => Int, terminating_value: In
                                                  //| t)(a: Int, b: Int)Int
    
  def product1(f: Int => Int)(a: Int, b: Int): Int = mapReduce(f, (x, y) => x * y, 1)(a, b)
                                                  //> product1: (f: Int => Int)(a: Int, b: Int)Int

  product1(x => x * x)(2, 4)                      //> res2: Int = 576
  
  def fact1(n: Int) = product1(x => x)(1, n)      //> fact1: (n: Int)Int
  fact1(5)                                        //> res3: Int = 120
}