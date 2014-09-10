# Task 1: Nested Attribute
# Give the Tweet model the ability to accept nested attributes for Location.
# Update the TweetsController#create and #new actions.
begin
  # Task Code
  # app/models/tweet.rb
  class Tweet < ActiveRecord::Base
    has_one :location, dependent: :destroy
    accepts_nested_attributes_for :location
  end
  # app/controllers/tweets_controller.rb
  class TweetsController < ApplicationController
    def new
      @tweet = current_user.tweets.create(location: Location.new)
    end

    def create
      @tweet = current_user.tweets.build(params[:tweet])

      if @tweet.save
        redirect_to @tweet, notice: 'Successfully created a Tweet'
      else
        render :new
      end
    end
  end

  # Solution Code

end

# ==========================================================================>
# Task 2: Models without Database
# Refactor the SupportRequest class to use ActiveModel so it works with the
# controller & view below. And presence validation for name, email and problem.
begin
  # Task Code
  # app/views/support_requests/new.html.erb

  # <h1>Support Request</h1>
  # <%= form_for @support_request do |f| %>
  #   <div class='field'>
  #     <%= f.label :name %>
  #     <%= f.text_field :name %>
  #   </div>
  #   <div class='field'>
  #     <%= f.label :email %>
  #     <%= f.text_field :email %>
  #   </div>
  #   <div class='field'>
  #     <%= f.label :problem %>
  #     <%= f.text_area :problem %>
  #   </div>
  # <% end %>

  # app/models/support_request.rb
  class SupportRequest
    attr_accessor :name, :email, :problem

    def initialize(attributes={})
      # Do not change this method, no need.
      self.name    = attributes[:name]
      self.email   = attributes[:email]
      self.problem = attributes[:problem]
    end

    def valid?
      if self.name.blank? || self.email.blank? || self.problem.blank?
        return false
      end
      return true
    end
  end

  # Solution Code
  class SupportRequest
    include ActiveModel::Validations
    include ActiveModel::Conversion

    attr_accessor :name, :email, :problem
    validates_presence_of :name, :email, :problem

    def initialize(attributes = {})
      self.name    = attributes[:name]
      self.email   = attributes[:email]
      self.problem = attributes[:problem]
    end

    def persisted?
      false
    end
  end

end

# ==========================================================================>
# Task 3: Presenter (Part 1)
# Finish creating the Tweets::ShowPresenter (defining methods: status,
# favorites_count, and username). Then change TweetsController#show action to
# instantiate it using the @presenter instance variable.
begin
  # NOTES: To setup presenter add following line in /config/application.rb
  # config.autoload_paths += [config.root.join("app/presenters")]
  # Task Code
  # app/presenters/tweets/show_presenter.rb
  module Tweets
    class ShowPresenter
      def initialize(tweet)
        @tweet = tweet
      end
    end
  end
  # app/controllers/tweets_controller.rb
  class TweetsController < ApplicationController
    def show
      @tweet = Tweet.find(params[:id])
      @username = @tweet.user.username
      @favorites_count = @tweet.favorites.size
    end
  end

  # Solution Code
  # app/presenters/tweets/show_presenter.rb
  module Tweets
    class ShowPresenter
      def initialize(tweet)
        @tweet = tweet
      end

      def status
        @tweet.status
      end

      def username
        @tweet.user.username
      end

      def favorites_count
        @tweet.favorites.size
      end
    end
  end
  # app/controllers/tweets_controller.rb
  class TweetsController < ApplicationController
    def show
      @presenter = Tweets::ShowPresenter.new(Tweet.find(params[:id]))
    end
  end
end

# ==========================================================================>
# Task 4: Presenter (Part 2)
# Memoize all the presenter methods using ActiveSupport::Memoizable
# (Note: ActiveSupport::Memoizable is deprecated in Rails 3.1)
begin
  # Task Code
  # app/presenters/tweets/show_presenter.rb
  module Tweets
    class ShowPresenter
      def initialize(tweet)
        @tweet = tweet
      end

      def username
        @tweet.user.username
      end

      def status
        @tweet.status
      end

      def favorites_count
        @tweet.favorites.count
      end
    end
  end
  # app/controllers/tweets_controller.rb
  class TweetsController < ApplicationController
    def show
      @presenter = Tweets::ShowPresenter.new(Tweet.find(params[:id]))
    end
  end

  # Solution Code
  # app/presenters/tweets/show_presenter.rb
  module Tweets
    extend ActiveSupport::Memoizable

    class ShowPresenter
      def initialize(tweet)
        @tweet = tweet
      end

      def username
        @tweet.user.username
      end

      def status
        @tweet.status
      end

      def favorites_count
        @tweet.favorites.count
      end

      memoize :username, :status, :favorites_count
    end
  end
  # app/controllers/tweets_controller.rb
  class TweetsController < ApplicationController
    def show
      @presenter = Tweets::ShowPresenter.new(Tweet.find(params[:id]))
    end
  end
end

# ==========================================================================>
# Task 5: Prevent SQL Injection
# Change the User.where call to protect against SQL Injection.
begin
  # Task Code
  # app/controllers/users_controller.rb
  class UsersController < ApplicationController
    def index
      @users = User.where("name = '#{params[:name]}'")
    end
  end

  # Solution Code
  class UsersController < ApplicationController
    def index
      @users = User.where(name: params[:name])
    end
  end
end

# ==========================================================================>
# Task 6: Responder (Part 1)
# Convert the TweetsController#index action to use the Rails 3 Responder syntax
begin
  # Task Code
  # app/controllers/tweets_controller.rb
  class TweetsController < ApplicationController
    def index
      @tweets = current_user.tweets.all

      respond_to do |format|
        format.json { render :json => @tweets }
      end
    end
  end

  # Solution Code
  class TweetsController < ApplicationController
    respond_to :json
    def index
      @tweets = current_user.tweets.all
      respond_with(@tweets)
    end
  end
end

# ==========================================================================>
# Task 5: Responder (Part 2)
# Convert TweetsController#create action to use the Rails 3 Responder syntax
begin
  # Task Code
  # app/controllers/tweets_controller.rb
  class TweetsController < ApplicationController
    def create
      @tweet = current_user.tweets.build(params[:tweet])

      if @tweet.save
        respond_to do |format|
          format.html { redirect_to tweet_path(@tweet) }
          format.json { render :json => @tweet }
        end
      else
        respond_to do |format|
          format.html { render :action => :new }
          format.json { render :json => @tweet.errors }
        end
      end
    end
  end

  # Solution Code
  class TweetsController < ApplicationController
    respond_to :json, :html

    def create
      @tweet = current_user.tweets.build(params[:tweet])

      respond_with(@tweet) do |format|
        if @tweet.save
          format.html { redirect_to tweet_path(@tweet) }
        else
          format.html { render :new }
        end
      end
    end
  end
end
