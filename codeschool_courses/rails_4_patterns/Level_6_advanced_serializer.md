#### Task 1: ASSOCIATIONS
###### Reviews have comments. For each `Review` that is serialized, let's also include its comments.

```ruby
# task code
# app/serializers/review_array_serializer.rb
class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :description, :approve_url

  def approve_url
    approve_review_url(object)
  end
end


# solution code
# app/serializers/review_array_serializer.rb
class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :description, :approve_url

  has_many :comments

  def approve_url
    approve_review_url(object)
  end
end
```

#### Task 2: EMBEDING IDS
###### Turns out serializing the entire comment record is affecting our application's response time. For now, let's change our `ReviewSerializer` to only embed each comment's id.

```ruby
# task code
# app/serializers/review_array_serializer.rb
class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :description, :approve_url

  has_many :comments

  def approve_url
    approve_review_url(object)
  end
end


# solution code
# app/serializers/review_array_serializer.rb
class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :description, :approve_url

  has_many :comments, embed: :ids

  def approve_url
    approve_review_url(object)
  end
end
```

#### Task 3: SIDE LOADING ASSOCIATIONS
###### The client-side JavaScript library we are using automatically connects side-loaded objects with their respective ids embeded in parent associations. On our `ItemSerializer`, let's add an option to the embed method to make sure our reviews are side-loaded.

```ruby
# task code
# app/serializers/item_serializer.rb
class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :reviews
  embed :ids
end


# solution code
# app/serializers/item_serializer.rb
class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :reviews
  embed :ids, include: true
end
```

#### Task 4: CUSTOM METHODS
###### When side-loading reviews for each item, we shouldn't include those who were not yet approved. Let's override the association method reviews, in order to filter approved reviews by calling `object.reviews.approved`.

```ruby
# task code
# app/serializers/item_serializer.rb
class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :reviews
  embed :ids, include: true

  def reviews
    object.reviews.approved
  end
end

# app/models/review.rb
class Review < ActiveRecord::Base
  belongs_to :comment
  scope :approved, -> { where(approved: true) }
end
```

#### Task 5: ATTRIBUTES
###### For users that are logged in, we also want to return the price for each item. On the attributes method, add `object.price` to `data[:price]` if a `current_user` is present.

```ruby
# task code
# app/serializers/item_serializer.rb
class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name

  def attributes
    data = super
    # add conditional here...
  end
end


# solution code
class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name

  def attributes
    data = super

    if current_user
      data[:price] = object.price
    end
    data
  end
end
```

#### Task 6: CUSTOM SCOPE
###### In our Rails application, we are now using `current_session` instead of `current_user` and it broke our code. Using the `serialization_scope` method, set the authorization scope to use `current_session`

```ruby
# task code
# app/serializers/item_serializer.rb
class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name

  def attributes
    data = super
    if current_session
      data[:price] = object.price
    end
    data
  end
end

# app/controllers/application_controller.rb
class ApplicationController < ActionController::Base
end


# solution code
class ApplicationController < ActionController::Base
  serialization_scope :current_session
end
```
