class Klass
  def initialize
    @secret = 99
  end
end

k = Klass.new
puts k.instance_eval '@secret'
puts k.instance_eval { @secret }

=begin
  Both above 'puts' statement works as 'instance_eval' evaluates
  string or given block on context of receiver
=end
