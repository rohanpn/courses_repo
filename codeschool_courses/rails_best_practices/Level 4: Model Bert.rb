# Task 1: N+1 is not for fun
# Fix the N+1 problem in the Tweet#favorited_users method.
begin
  # Task Code
  # app/models/tweet.rb
  class Tweet < ActiveRecord::Base
    has_many :favorites

    def favorited_users
      self.favorites.collect { |fav| fav.user }
    end
  end

  # Solution Code
  class Tweet < ActiveRecord::Base
    has_many :favorites

    def favorited_users
      # fire select users where user_id in (1, 2, 3, 4)
      self.favorites.includes(:user).collect { |fav| fav.user }
    end
  end
end

# ==========================================================================>
# Task 2: Counter Cache Money
# Create a counter cache in the Favorite model on the tweet relationship.
# This will optimize @tweet.favorites.size.
begin
  # Task Code
  # app/models/favorite.rb
  class Favorite < ActiveRecord::Base
    belongs_to :tweet
  end
  # db/migrate/add_counter_cache_column_to_tweets.rb
  class AddCounterCacheColumnToTweets < ActiveRecord::Migration
    def self.up
      # add column here
    end

    def self.down
      # remove column here
    end
  end

  # Solution Code
  class Favorite < ActiveRecord::Base
    belongs_to :tweet, counter_cache: :favorites_count
  end
  class AddCounterCacheColumnToTweets < ActiveRecord::Migration
    def self.up
      add_column :tweets, :favorites_count, :integer, default: 0
    end

    def self.down
      remove_column :tweets, :retweets_count
    end
  end
end

# ==========================================================================>
# Task 3: Batches of Find Each
# Use find_each and call "puts tweet.status" to output every tweet's status
# in batches of 5.
begin
  # Solution Code
  Tweet.find_each(batch_size: 5) do |tweet|
    puts tweet.status
  end
end

# ==========================================================================>
# Task 4: Law of Demeter (part 1)
# The Tweet model should delegate latitude/longitude to #location.
# Refactor User#latest_location to use the delegate.
begin
  # Task Code
  # app/models/user.rb
  class User < ActiveRecord::Base
    has_many :tweets

    def latest_location
      [latest_tweet.location.latitude, latest_tweet.location.longitude]
    end

    def latest_tweet
      self.tweets.last
    end
  end
  # app/models/tweet.rb
  class Tweet < ActiveRecord::Base
    has_one :location
    belongs_to :user
  end

  # Solution Code
  class User < ActiveRecord::Base
    has_many :tweets

    def latest_location
      [latest_tweet.latitude, latest_tweet.longitude]
    end

    def latest_tweet
      self.tweets.last
    end
  end
  class Tweet < ActiveRecord::Base
    has_one :location
    belongs_to :user

    delegate :latitude, :longitude, to: :location
  end
end

# ==========================================================================>
# Task 5: Law of Demeter (part 2)
# Delegate latitude and longitude to the location model, but prevent errors
# when location is nil.
begin
  # Task Code
  # app/models/tweet.rb
  class Tweet < ActiveRecord::Base
    has_one :location
  end

  # Solution Code
  class Tweet < ActiveRecord::Base
    has_one :location

    delegate :longitude, :latitude, to: :location, allow_nil: true
  end
end

# ==========================================================================>
# Task 6: Head to to_s
# Define #to_s on the Tweet model to include the users username and the
# tweets status. Ex. "jimbob: I am hungry"
begin
  # Task Code
  # app/models/tweet.rb
  class Tweet < ActiveRecord::Base
    belongs_to :user
  end

  # Solution Code
  class Tweet < ActiveRecord::Base
    belongs_to :user

    def to_s
      "#{user.username}: #{status}"
    end
  end
end

# ==========================================================================>
# Task 7: to param
# Define #to_param on the Tweet model to be tweet_id-username. Ex. "14-jimbob"
begin
  # Task Code
  # app/models/tweet.rb
  class Tweet < ActiveRecord::Base
    belongs_to :user
  end

  # Solution Code
  class Tweet < ActiveRecord::Base
    belongs_to :user

    def to_param
      "#{id}-#{user.username}"
    end
  end
end
