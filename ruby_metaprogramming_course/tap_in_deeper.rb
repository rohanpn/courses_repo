=begin
monk = Class.new
monk.class_eval do 
  def zen
    42
  end
end

p Module.const_get('monk').new
#p Module.const_get('monk').new.zen
=end

# Use of class_eval : 
# Evaluates the string or block in the context of mod.
# This can be used to add methods to a class.

class MyClass
  def initialize(num)
    @num = num
  end
end

a = MyClass.new(1)
b = MyClass.new(2)

# a.num  # NoMethodError: undefined method `num' for #<MyClass:0x007fba5c02c858 @num="1">
# p a.instance_eval { @num }

# Would be a real pain to do that a lot. Let's define new method
a.instance_eval do
  def num
    @num
  end
end

p a.num
# p b.num # NoMethodError: undefined method `num' for #<MyClass:0x007fba5c08e5f8 @num="2">

# We used instance_eval, which only evaluates in the context of one object. 
# We defined a method, but only on the particular object a. 
# Perhaps we should define a method on the class object. That is done using 'class_eval'

MyClass.class_eval do
  def num
    @num
  end
end
puts '-------- In class eval demo ------'
puts "a.num: #{a.num}"
puts "b.num: #{b.num}"
