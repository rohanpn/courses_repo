# Task 1: A Basic Index
# Create an index on the followings table that optimizes calling
# @user.followings.
begin
  # Task Code
  # db/migrate/add_indexes_to_followings.rb
  class AddIndexesToFollowings < ActiveRecord::Migration
    def self.up
      # add index here
    end

    def self.down
      # remove index here
    end
  end
  # Solution Code
  class AddIndexesToFollowings < ActiveRecord::Migration
    def self.up
      add_index :followings, :user_id
    end

    def self.down
      remove_index :followings, :user_id
    end
  end
end

# ==========================================================================>
# Task 2: Compound Index
# Create the compound index that will optimize
# current_user.followings.order('created_at desc').
begin
  # Task Code
  # db/migrate/add_indexes_to_followings.rb
  class AddIndexesToFollowings < ActiveRecord::Migration
    def self.up
      # add index here
    end

    def self.down
      # remove index here
    end
  end

  # Solution Code
  class AddIndexesToFollowings < ActiveRecord::Migration
    def self.up
      add_index :followings, [:user_id, :created_at]
    end

    def self.down
      remove_index :followings, [:user_id, :created_at]
    end
  end
end

# ==========================================================================>
# Task 3: Protecting your attributes
# Refactor the model to allow for mass-assignment of
# only public_email, language, and time_zone.
begin
  # Task Code
  # app/models/account_setting.rb
  class AccountSetting < Base
    belongs_to :user
  end

  # Solution Code
  class AccountSetting < Base
    attr_accessible :public_email, :language, :time_zone

    belongs_to :user
  end
end

# ==========================================================================>
# Task 4: Default Values
# Add a boolean column called hot_topic which defaults to false using the
# add_column method. Consult the Rails migration docs if you need to.
begin
  # Task Code
  # db/migrate/add_hot_topic_to_topics.rb
  class AddHotTopicToTopics < ActiveRecord::Migration
    def self.up
      # add column here
    end

    def self.down
      # remove column here
    end
  end

  # Solution Code
  class AddHotTopicToTopics < ActiveRecord::Migration
    def self.up
      add_column :topics, :hot_topic, :boolean, default: false
    end

    def self.down
      remove_column :topics, :hot_topic
    end
  end
end

# ==========================================================================>
# Task 5: Proper use of callbacks
# Move the hot_topic conditional in the controller to use an ActiveRecord
# before_create callback in the Topic model.
begin
  # Task Code
  # app/controllers/topics_controller.rb
  class TopicsController < ApplicationController
    def create
      @topic = Topic.new(params[:topic])
      # move into before_create callback
      if @topic.mentions > Topic::HOT_TOPIC_MENTIONS
        @topic.hot_topic = true
      end

      if @topic.save
        redirect_to @topic, :notice => 'Successfully created a Tweet'
      else
        render :new
      end
    end
  end
  # app/models/topic.rb
  class Topic < ActiveRecord::Base
    HOT_TOPIC_MENTIONS = 5000
  end

  # Solution Code
  class TopicsController < ApplicationController
    def create
      @topic = Topic.new(params[:topic])

      if @topic.save
        redirect_to @topic, :notice => 'Successfully created a Tweet'
      else
        render :new
      end
    end
  end
  class Topic < ActiveRecord::Base
    HOT_TOPIC_MENTIONS = 5000

    before_create :set_hot_topic

    private

    def set_hot_topic
      self.hot_topic = true if mentions > Topic::HOT_TOPIC_MENTIONS
    end
  end
end

# ==========================================================================>
# Task 6: Proper use of callbacks with conditionals
# Refactor the set_hot_topic method and the before_create callback to use
# the :if conditional on the callback.
begin
  # Task Code
  # app/models/topic.rb
  class Topic < ActiveRecord::Base
    HOT_TOPIC_MENTIONS = 5000

    before_create :set_hot_topic

    protected

    def set_hot_topic
      self.hot_topic = true if self.mentions > HOT_TOPIC_MENTIONS
    end
  end

  # Solution Code
  class Topic < ActiveRecord::Base
    HOT_TOPIC_MENTIONS = 5000

    before_create :set_hot_topic,
                  if: Proc.new { |topic| topic.mentions > HOT_TOPIC_MENTIONS }

    protected

    def set_hot_topic
      self.hot_topic = true
    end
  end
end
