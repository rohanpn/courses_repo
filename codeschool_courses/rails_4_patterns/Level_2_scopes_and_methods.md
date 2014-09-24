#### Task 1: EXTRACT QUERY
###### Extract the query used in the index action of the ItemsController to a class method named `featured` on the Item model and then replace the query in the index action with a call to the featured class method on the Item model.

```ruby
# task code
# app/controllers/items_controller.rb
class ItemsController < ApplicationController
  def index
    @items = Item.where('rating > ? AND published_on > ?', 5, 2.days.ago)
  end
end

# solution code
# app/controllers/items_controller.rb
class ItemsController < ApplicationController
   def index
     @items = Item.featured
   end
 end
# app/models/item.rb
class Item < ActiveRecord::Base
  def self.featured
    where('rating > ? AND published_on > ?', 5, 2.days.ago)
  end
end
```

#### Task 2: CLASS METHOD TO SCOPE
###### Above code serves a search feature in our application. However, when the user submits a blank keyword, this code raises an error. Let's fix this by changing the two class methods below to scopes, since `scopes always return a relation`.

```ruby
# task code
# app/controllers/items_controller.rb
class ItemsController < ApplicaitonController
  def index
    @items = Item.by_name(params[:name]).recent
  end
end
# app/models/item.rb
class Item < ActiveRecord::Base
  def self.by_name(name)
    where(name: name) if name.present?
  end

  def self.recent
    where('created_on > ?', 2.days.ago)
  end
end

# solution code
# app/controllers/items_controller.rb
class ItemsController < ApplicaitonController
  def index
    @items = Item.by_name(params[:name]).recent
  end
end
# app/models/item.rb
class Item < ActiveRecord::Base
  scope :by_name, ->(name) { where(name: name) if name.present? }
  scope :recent, -> { where('created_on > ?', 2.days.ago) }
end
```

#### Task 3: MERGING SCOPE I
###### In the `Item.recent` scope, use the joins and merge methods to combine the `Review.approved` scope.

```ruby
# task code
# app/models/item.rb
class Item < ActiveRecord::Base
  has_many :reviews
  scope :recent, ->{
    where('published_on > ?', 2.days.ago)
      .joins(:reviews).where('reviews.approved = ?', true)
  }
end

# app/models/review.rb
class Review < ActiveRecord::Base
  belongs_to :item
  scope :approved, -> { where(approved: true) }
end

# solution code
# app/models/item.rb
class Item < ActiveRecord::Base
  has_many :reviews
  scope :recent, ->{
    where('published_on > ?', 2.days.ago)
      .joins(:reviews).merge(Review.approved)
  }
end

# app/models/review.rb
class Review < ActiveRecord::Base
  belongs_to :item
  scope :approved, -> { where(approved: true) }
end
```

#### Task 4: MERGING SCOPE II
###### When upgrading to Rails 4, you run into this bug because Rails no longer automatically removes duplications from SQL conditions. Please fix the code below.

```ruby
# task code
# app/models/item.rb
Review.relevant.pending_approval

# app/models/review.rb
class Review < ActiveRecord::Base
  belongs_to :item

  scope :relevant, -> { where(is_relevant: true, is_approved: true) }
  scope :pending_approval, -> { where(is_approved: false) }
end

# solution code
# app/models/item.rb
Review.relevant.merge(Review.pending_approval)

# app/models/review.rb
class Review < ActiveRecord::Base
  belongs_to :item

  scope :relevant, -> { where(is_relevant: true, is_approved: true) }
  scope :pending_approval, -> { where(is_approved: false) }
end
```
