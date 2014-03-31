package week02

object currying {
  def sum(f: Int => Int): (Int, Int) => Int = {
    def sumF(a: Int, b: Int): Int =
      if(a > b) 0
      else f(a) + sumF(a + 1, b)
    
    sumF
  }                                               //> sum: (f: Int => Int)(Int, Int) => Int
  
  //def sumInts = sum(x => x)
  //def sumCubes = sum(x => x * x * x)

  //sumInts(3, 4)
  //sumCubes(2, 4)
  
  // Removing middle man sumInts, sumCubes
  sum(x => x)(3, 5)                               //> res0: Int = 12
  sum(x => x * x * x)(2, 4)                       //> res1: Int = 99
  
  // multiple parameters list
  def sum2(f: Int => Int)(a: Int, b: Int): Int =
    if(a > b) 0 else f(a) + sum2(f)(a + 1, b)     //> sum2: (f: Int => Int)(a: Int, b: Int)Int
    
  sum2(x => x)(3, 5)                              //> res2: Int = 12
  sum2(x => x * x * x)(2, 4)                      //> res3: Int = 99
  
}