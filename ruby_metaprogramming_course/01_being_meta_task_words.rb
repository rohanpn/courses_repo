# Task: 
# Ruby's String has no method that allows you to split a 
# sentence into an Array of words. 
# Add a method called words to String to do just this.

class String
  def words
    split(' ')
  end
end

puts "Hi this is a sentence that need to be converted into array of words".words

