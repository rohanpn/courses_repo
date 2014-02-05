class Array
  def foldl(method)
    inject {|result, i| result ? result.send(method, i) : i }
  end
end

puts [1000.0, 200.0, 50.0].foldl("/") 

# Output: 0.1

=begin
# Interpretation & Conclusion:
- 'inject' takes an optional argument and a block which will be
executed per array element
- If block specified, then for each element in 'enum', the block is 
passed an accumulator value (memo) and the element. 
- At the end of the iteration, the final value of accumulator is the 
return value for the method.
- In 'foldl' method, 'send' method will invoke method 'method' with
argument 'i'.
- In block, if there is 'result', then performs division operation
invoked from result.send('/', i) else return i.
- Hence, execution flow iteration wise:

Iteration | result value | i value |
--------------------------------------------
   1      |   1000.0     |   200.0 |
   2      |      5.0     |    50.0 | 

Hence, finally value of result is 0.1(i.e 5.0/50.0)
=end
