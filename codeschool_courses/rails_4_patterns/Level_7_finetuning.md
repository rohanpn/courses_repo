#### Task 1: PLUCK
###### Our recent query is returning way too many `User` records, which is causing unnecessary memory consumption. Since we just need id and name properties, use the `pluck` method to only return those two properties as an array of arrays.

```ruby
# task code
# app/models/item.rb
class Item < ActiveRecord::Base

  def self.recent
    where('published_on > ?', 2.days.ago)
  end
end


# solution code
class Item < ActiveRecord::Base

  def self.recent
    where('published_on > ?', 2.days.ago).pluck(:id, :name)
  end
end
```

#### Task 2: SENSITIVE PARAMETERS
###### For security purposes, our application asks a security question during sign up. Just like passwords, we can't let those answers be written to the log. Make sure we are filtering the value for `security_answer`.

```ruby
# task code
# config/application.rb
class Rails4Patterns::Application
  # hiding other config for brevity...
  config.filter_parameters += [:password]
end


# solution code
class Rails4Patterns::Application
  # hiding other config for brevity...
  config.filter_parameters += [:password, :security_answer]
end
```

#### Task 3: SET APPLICATION SERVER
###### Our application has been using Ruby's default WEBrick server, which is not meant for production. Add `puma` to our `Gemfile`. Since we'll be using it for all environments, there's no need to group it under a specific environment.

```ruby
# solution code
# add gem 'puma' in Gemfile

gem 'puma'
```

#### Task 4: SET RUBY VERSION
###### Let's add the requirement for ruby version 2.0.0 to our Gemfile.

```ruby
# solution code
# ruby '2.0.0' # or any desired version in Gemfile
ruby '2.0.0'   # after source line
```

#### Task 5: BASIC PROCFILE
###### Let's create a `Procfile` so other developers don't have to spend time figuring out how to run the application. So far, our app just needs one process to run - the web app itself. Add the command to start the Rails server. The app server in question will automatically be detected from the Gemfile, but we do need to specify the port via an environment variable `$PORT`.

```ruby
# task code
# Procfile
web: <add command here>


# solution code
web: bundle exec rails s -p $PORT
```
