# Task 1: No query in your views
# Move the query that doesn't belong in the view into the controller and
# call it @favorites.
begin
  # Task Code
  # app/controllers/tweets_controller.rb
  class TweetsController < ApplicationController
    def show
      @tweet = Tweet.find(params[:id])
    end
  end
  # app/views/tweets/show.html.erb
  # <h1>Tweet by <%= @tweet.user.username %></h1>

  # <p><%= @tweet.status %></p>

  # <% if @tweet.favorites.present? %>
  #   <h3>Latest Favorites:</h3>
  #   <ul>
  #     <% @tweet.favorites.limit(3).order('created_at').each do |favorite| %>
  #       <li><%= favorite.user.username %></li>
  #     <% end %>
  #   </ul>
  # <% end %>

  # Solution Code
  class TweetsController < ApplicationController
    def show
      @tweet = Tweet.find(params[:id])
      @favorites = @tweet.favorites.limit(3).order('created_at')
    end
  end
  # app/views/tweets/show.html.erb
  # <h1>Tweet by <%= @tweet.user.username %></h1>

  # <p><%= @tweet.status %></p>

  # <% if @tweet.favorites.present? %>
  #   <h3>Latest Favorites:</h3>
  #   <ul>
  #     <% @favorites.each do |favorite| %>
  #       <li><%= favorite.user.username %></li>
  #     <% end %>
  #   </ul>
  # <% end %>
end

# ==========================================================================>
# Task 2: Helper Skelter
# Move the favorites code from show.html.erb into the tweet_favorites helper.
begin
  # Task Code
  # app/helpers/tweet_helper.rb
  module TweetsHelper
    def tweet_favorites(favorites)
    end
  end
  # app/views/tweets/show.html.erb
  # <h1>Tweet by <%= @tweet.user.username %></h1>

  # <p><%= @tweet.status %></p>

  # <% if @favorites.present? %>
  #   <p>
  #     This tweet has been favorited
  #     <span><%= pluralize(@favorites.size, 'time')%></span>,
  #     most recently by <%= @favorites.to_sentence %>
  #   </p>
  # <% end %>

  # Solution Code
  module TweetsHelper
    def tweet_favorites(favorites)
      content_tag :p do
        raw(
          "This tweet has been favorited " +
          content_tag(:span, pluralize(favorites.size, 'time')) +
          ", most recently by " + favorites.to_sentence
        )
      end
    end
  end
  # app/views/tweets/show.html.erb
  # <h1>Tweet by <%= @tweet.user.username %></h1>

  # <p><%= @tweet.status %></p>

  # <% if @favorites.present? %>
  #   <%= tweet_favorites(@favorites) %>
  # <% end %>
end

# ==========================================================================>
# Task 3: Partial Sanity
# Render the supplied partial for the 'tweet' object.
begin
  # Task Code
  # app/views/tweets/show.html.erb
  # <h2>Most Recent Tweet</h2>

  # <%= # render tweet partial here %>

  # Solution Code
  # <h2>Most Recent Tweet</h2>

  # <%= render tweet %>
end

# ==========================================================================>
# Task 4: Empty strings things
# Check if the user's username is present using a shorter syntax
# i.e.: ActiveRecord's ? method or Object#presence
begin
  # Task Code
  # app/views/users/show.html.erb
  # <span>
  #   <% if user.username.present? %>
  #     <%= user.username %>
  #   <% else %>
  #     <%= user.name %>
  #   <% end %>
  # </span>

  # Solution Code
  # <span>
  #   <% if user.username.presence %>
  #     <%= user.username %>
  #   <% else %>
  #     <%= user.name %>
  #   <% end %>
  # </span>
end

# ==========================================================================>
# Task 5: Yield to content_for
# Use content_for to insert 'Tweets by <%= user.username %>' into the
# layout's <title> tag, using the yield already there.
begin
  # Task Code
  # app/views/users/show.html.erb
  # <ul>
  #   <% user.tweets.each do |tweet| %>
  #     <li><%= tweet.status %></li>
  #   <% end %>
  # </ul>

  # Solution Code
  # <% content_for(:title) do %>
  #   "Tweets by <%= user.username %>"
  # <% end %>
  # <ul>
  #   <% user.tweets.each do |tweet| %>
  #     <li><%= tweet.status %></li>
  #   <% end %>
  # </ul>
end

# ==========================================================================>
# Task 6: Meta Yield
# Use content_for in ApplicationHelper#author and #description to set their
# respective <meta> tags. Use these helpers in show.html.erb.
begin
  # Task Code
  # app/helpers/applicaion_helper.rb
  module ApplicationHelper
    def author(author)
    end

    def description(description)
    end
  end
  # app/views/tweets/show.html.erb
  # <h1>Tweet by <%= @tweet.user.username %></h1>

  # <p><%= @tweet.status %></p>

  # Solution Code
  module ApplicationHelper
    def author(author)
      content_for(:author, author)
    end

    def description(description)
      content_for(:description, description)
    end
  end
  # app/views/tweets/show.html.erb
  # <%
  #   author      @tweet.user.username
  #   description @tweet.status
  # %>
end
