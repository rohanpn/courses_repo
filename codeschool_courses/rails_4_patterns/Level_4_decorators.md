#### Task 1: EXTRACT VIEW LOGIC
###### Move the `is_featured?` method out of the `Item` class and into the `ItemDecorator` class. Don't forget to implement both `method_missing` and `respond_to_missing?`.
###### Change the partial to use `@item_decorator` instead of `@item`.

```
# task code
# app/models/item.rb
class Item < ActiveRecord::Base
  def is_featured?
    self.ratings > 5
  end
end

# _item.html.erb
<h2><%= @item.title %></h2>

<% if @item.is_featured? %>
  <h3><%= featured_image %></h3>
<% end %>

<p><%= @item.description %></p>

# app/decorators/item_decorator.rb
class ItemDecorator
  def initialize(item)

  end
end


# solution code
# app/models/item.rb
class Item < ActiveRecord::Base
end

# _item.html.erb
<h2><%= @item_decorator.title %></h2>

<% if @item_decorator.is_featured? %>
  <h3><%= featured_image %></h3>
<% end %>

<p><%= @item_decorator.description %></p>

# app/decorators/item_decorator.rb
class ItemDecorator
  def initialize(item)
    @item = item
  end

  def is_featured?
    @item.ratings > 5
  end

  def method_missing(method_name, *args, &blk)
    @item.send(method_name, *args, &blk)
  end

  def respond_to_missing?(method_name, include_private = false)
    @item.respond_to?(method_name, include_private) || super
  end
end
```

#### Task 2: DECORATORS FROM CONTROLLERS
###### Return a collection of decorated objects from `ItemsController` by using the `build_collection` method from the `ItemDecorator` class. This method takes `Item.all` and wraps each record in a decorator.

```ruby
# task code
# app/controllers/item_controller.rb
class ItemsController < ApplicationController
  def index
    @items = Item.all
  end
end

# app/decorators/item_decorator.rb
class ItemDecorator
  def self.build_collection(items)
    items.map { |item| new(item) }
  end

  def initialize(item)
    @item = item
  end

  def is_featured?
    @item.ratings > 5
  end

  def method_missing(method_name, *args, &block)
    @item.send(method_name, *args, &block)
  end

  def respond_to_missing?(method_name, include_private = false)
    @item.respond_to?(method_name, include_private) || super
  end
end


# solution code
# app/controllers/item_controller.rb
class ItemsController < ApplicationController
  def index
    @items = Item.all
    ItemDecorator.build_collection(@items)
  end
end

# app/decorators/item_decorator.rb
# Same as task code
```
#### Task 3: EXTRACT FROM VIEW HELPERS
###### Extract the `status` method from the `ItemsHelper` to the `ItemDecorator`.
###### Fix the code in the view partial to use the new `@item_decorator` and its instance method, instead of using a view helper method that takes `@item`.

```
# task code
# app/helpers/items_helper.rb
module ItemsHelper
  def status(item)
    if item.sold?
      "Sold at #{item.sold_on.strftime('%A, %B %e')}"
    else
      "Available"
    end
  end
end

# app/models/item.rb
class Item < ActiveRecord::Base
  def sold?
    sold_on.present?
  end
end

# app/controllers/items_controller.rb
class ItemsController < ApplicationController
  def show
    @item_decorator = ItemDecorator.new(Item.find(params[:id]))
  end
end

# app/decorators/item_decorator.rb
class ItemDecorator
  def initialize(item)
    @item = item
  end

  def method_missing(method_name, *args, &block)
    @item.send(method_name, *args, &block)
  end

  def respond_to_missing?(method_name, include_private = false)
    @item.respond_to?(method_name, include_private) || super
  end
end

# app/views/items/_item.html.erb
<li>
  <%= @item.name %> <i><%= status(@item) %></i>
</li>


# solution code
# app/helpers/items_helper.rb
module ItemsHelper
end

# app/decorators/item_decorator.rb
class ItemDecorator
  def initialize(item)
    @item = item
  end

  def status
    if @item.sold?
      "Sold at #{@item.sold_on.strftime('%A, %B %e')}"
    else
      "Available"
    end
  end

  def method_missing(method_name, *args, &block)
    @item.send(method_name, *args, &block)
  end

  def respond_to_missing?(method_name, include_private = false)
    @item.respond_to?(method_name, include_private) || super
  end
end

# app/views/items/_item.html.erb
<li>
  <%= @item_decorator.name %> <i><%= @item_decorator.status %></i>
</li>
```
