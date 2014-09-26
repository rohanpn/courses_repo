#### Task 1: MODEL CONCERNS I
###### Both the `User` and `Item` models have many reviews, and they also have the exact same `reviews_rating` method. Let's move the association code and the `reviews_rating` method code to the `Reviewable` concern. (use ActiveSupport::Concern)

```ruby
# task code
# app/models/user.rb
class User < ActiveRecord::Base
  has_many :reviews, as: :reviewable, dependent: :destroy

  def reviews_rating
    (reviews.positive.count / reviews.approved.count.to_f).round(2)
  end
end
# app/models/item.rb
class Item < ActiveRecord::Base
  has_many :reviews, as: :reviewable, dependent: :destroy

  def reviews_rating
    (reviews.positive.count / reviews.approved.count.to_f).round(2)
  end
end
# app/models/review.rb
class Review < ActiveRecord::Base
  belongs_to :reviewable, polymorphic: true

  MINIMUM_POSITIVE_RATING = 5
  scope :positive, -> { where('is_approved = ? AND rating > ?', true, MINIMUM_POSITIVE_RATING) }
  scope :approved, -> { where(is_approved: true) }
end
# app/models/reviewable.rb
module Reviewable

end

# solution code
# app/models/user.rb
class User < ActiveRecord::Base
  include Reviewable
end
# app/models/item.rb
class Item < ActiveRecord::Base
  include Reviewable
end
# app/models/review.rb
class Review < ActiveRecord::Base
  belongs_to :reviewable, polymorphic: true

  MINIMUM_POSITIVE_RATING = 5
  scope :positive, -> { where('is_approved = ? AND rating > ?', true, MINIMUM_POSITIVE_RATING) }
  scope :approved, -> { where(is_approved: true) }
end
# app/models/reviewable.rb
module Reviewable
  extend ActiveSupport::Concern

  included do
    has_many :reviews, as: :reviewable, dependent: :destroy
  end

  def reviews_rating
    (reviews.positive.count / reviews.approved.count.to_f).round(2)
  end
end
```

#### Task 2: MODEL CONCERNS II
###### We have a new class method called `with_no_reviews` which is much the same for both models. Extract this method to the `Reviewable` concern, and make sure it's included inside of the inner module ClassMethods so that it's automatically detected by `ActiveSupport::Concern`.

```ruby
# task code
# app/models/reviewable.rb
module Reviewable
  extend ActiveSupport::Concern

  included do
    has_many :reviews, as: :reviewable, dependent: :destroy
  end

  def reviews_rating
    (reviews.positive.count / reviews.approved.count.to_f).round(2)
  end

  module ClassMethods
  end
end
# app/models/item.rb
class Item < ActiveRecord::Base
  include Reviewable

  def self.with_no_reviews
    where('id NOT IN (SELECT DISTINCT(reviewable_id) FROM reviews WHERE reviewable_type = ?)', self.name)
  end
end
# app/models/user.rb
class User < ActiveRecord::Base
  include Reviewable

  def self.with_no_reviews
    where('id NOT IN (SELECT DISTINCT(reviewable_id) FROM reviews WHERE reviewable_type = ?)', self.name)
  end
end

# solution code
# app/models/reviewable.rb
module Reviewable
  extend ActiveSupport::Concern

  included do
    has_many :reviews, as: :reviewable, dependent: :destroy
  end

  def reviews_rating
    (reviews.positive.count / reviews.approved.count.to_f).round(2)
  end

  module ClassMethods
    def with_no_reviews
      where('id NOT IN (SELECT DISTINCT(reviewable_id) FROM reviews WHERE reviewable_type = ?)', self.name)
    end
  end
end
# app/models/item.rb
class Item < ActiveRecord::Base
  include Reviewable
end
# app/models/user.rb
class User < ActiveRecord::Base
  include Reviewable
end
```

#### Task 3: CONTROLLER CONCERNS
###### We have two controllers which allow users to download a file from your server. Move the `send_file` method to a `send_image` method within the `ImageExportable` module, which accepts an `image_path` variable. Don't forget to replace the `(item/user).image` with an `image_path` variable.

```ruby
# task code
# app/controllers/users_controller.rb
class UsersController < ApplicationController

  def file
    user = User.find(params[:id])
    send_file(user.image, type: 'image/jpeg',  disposition: 'inline')
  end
end
# app/controllers/items_controller.rb
class ItemsController < ApplicationController

  def file
    item = Item.find(params[:id])
    send_file(item.image, type: 'image/jpeg',  disposition: 'inline')
  end
end
# app/models/image_exportable.rb
module ImageExportable

end


# solution code
# app/controllers/users_controller.rb
class UsersController < ApplicationController
  include ImageExportable

  def file
    user = User.find(params[:id])
    send_image(user.image)
  end
end
# app/controllers/items_controller.rb
class ItemsController < ApplicationController
  include ImageExportable

  def file
    item = Item.find(params[:id])
    send_image(item.image)
  end
end
# app/models/image_exportable.rb
module ImageExportable
  def send_image(image_path)
    send_file(image_path, type: 'image/jpeg',  disposition: 'inline')
  end
end
```
