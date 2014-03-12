class A
  def fred
    puts "In Fred"
  end
  
  def create_method(name, &block)
    self.class.send(:define_method, name, &block)
  end

  define_method(:wilma) { puts "Charge it!" }
end

class B < A
  define_method(:barney, instance_method(:fred))
end

a = B.new
a.barney
a.wilma
a.create_method(:betty) { p 'hello' }
a.betty

=begin
// Points to note
# instance_method : Return instance method representation
# define_method structure is:
1) define_method(symbol, method)   →  new_method
2) define_method(symbol) { block } →  proc

# Defines an instance method in the receiver. 
# If a block is specified, it is used as the method body. 
# This block is evaluated using 'instance_eval'.
# 'instance_eval' evaluates a string containing Ruby source code, 
  or the given block, within the context of the receiver (obj)
=end
