#### Task 1: BASIC SERIALIZER
###### Create a serializer class for the`1Review` model which serializes the id and description properties.

```ruby
# task code
# app/models/review.rb
class Review < ActiveRecord::Base
  belongs_to :item
end

# app/serializers/review_serializer.rb
# write code here


# solution code
# app/models/review.rb
class Review < ActiveRecord::Base
  belongs_to :item
end

# app/serializers/review_serializer.rb
class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :description
end
```

#### Task 2: REMOVE ROOT NODE
###### In order to prevent breaking existing API clients, we need to remove the root node that is automatically added by AMS. Add a statement to our `ReviewArraySerializer` class used by the `index` action, that excludes the root node from serialization.

```ruby
# task code
# app/controllers/reviews_controller.rb
class ReviewsController < ApplicationController
  respond_to :json, :html

  def index
    @reviews = Review.all
    respond_with @reviews, serializer: ReviewArraySerializer
  end
end

# app/review_array_serializer.rb
class ReviewArraySerializer < ActiveModel::ArraySerializer
end


# solution code
# app/controllers/reviews_controller.rb
# same as task code

# app/review_array_serializer.rb
class ReviewArraySerializer < ActiveModel::ArraySerializer
  self.root = false
end
```

#### Task 3: CUSTOM PROPERTY
###### Some reviews might be waiting for approval. Add a custom property named  `approve_url` to our serializer and define its respective method. This method will invoke the URL helper method `approve_review_url`, which expects the current object being serialized as its single argument.

```ruby
# task code
# app/serializers/review_serializer.rb
class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :description
end


# solution code
# app/serializers/review_serializer.rb
class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :description, :approve_url

  def approve_url
    approve_review_url(object)
  end
end
```
