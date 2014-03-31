package week03

object rationals {
  val x = new Rational(1, 3)                      //> x  : week03.Rational = 1/3
  val y = new Rational(5, 7)                      //> y  : week03.Rational = 5/7
  val z = new Rational(3, 2)                      //> z  : week03.Rational = 3/2
  
  x.add(y)                                        //> res0: week03.Rational = 22/21
  x.sub(y)                                        //> res1: week03.Rational = -8/21
  x.neg                                           //> res2: week03.Rational = -1/3
  x.sub(y).sub(z)                                 //> res3: week03.Rational = -79/42
}

class Rational(x: Int, y: Int){
  def numer = x
  def denom = y

  override def toString = numer + "/" + denom
  def neg = new Rational(-numer, denom)
    
  def add(rat1: Rational) =
    new Rational(
      numer * rat1.denom + rat1.numer * denom,
      denom * rat1.denom
    )
    
  def sub(rat1: Rational) = add(rat1.neg)
   
}