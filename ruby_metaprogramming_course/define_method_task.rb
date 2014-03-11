class Monk
  ["life", "the_universe", "everything"].each do |action|
    define_method("meditate_on_#{action}") do
      "I know the meaning of #{action.gsub('_', ' ')}"
    end
  end
end

monk = Monk.new
puts monk.meditate_on_life
puts monk.meditate_on_the_universe
puts monk.meditate_on_everything