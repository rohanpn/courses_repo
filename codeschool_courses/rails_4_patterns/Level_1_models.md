#### Task 1: Skinny Controllers
###### Combine the two conditionals that involve validating and creating a review into a single conditional that calls `@review.add_to_item` and returns a boolean. Implement add_to_item method and call save only if bad_words? returns false.

```ruby
# task Code
# app/models/review.rb
class Review < ActiveRecord::Base
  belongs_to :item

  def add_to_item
    # We'll fill this in next!
  end

  private
  def bad_words?
    description =~ /BAD_WORD/
  end
end

# app/controllers/reviews_controller.rb
class ReviewsController < ApplicationController
  def create
    @item = Item.find(params[:review][:item_id])
    @review = @item.reviews.build(review_params)
    # start refactoring here...
    if @review.add_to_item @review.bad_words?
      flash[:error] = 'Did not save review.'
      render :new
    elsif @review.save
      redirect_to @review, notice: 'Successfully created'
    else
      flash[:error] = 'Did not save review.'
      render :new
    end
  end

  def new
    @review = Review.new
  end

  def show
    @review = Review.find(review_params)
  end

  private

  def review_params
    params.require(:review).permit(:description)
  end
end


# solution code
class Review < ActiveRecord::Base
  belongs_to :item

  def add_to_item
    save unless bad_words?
  end

  private
  def bad_words?
    description =~ /BAD_WORD/
  end
end

class ReviewsController < ApplicationController
  def create
    @item = Item.find(params[:review][:item_id])
    @review = @item.reviews.build(review_params)

    if @review.add_to_item
      redirect_to @review, notice: 'Successfully created'
    else
      flash[:error] = 'Did not save review.'
      render :new
    end
  end

  def new
    @review = Review.new
  end

  def show
    @review = Review.find(review_params)
  end

  private

  def review_params
    params.require(:review).permit(:description)
  end
end
```

#### Task 2: Active Record Callbacks
###### Place callback inside our model with name `set_pretty_url` method inside of the Item model and use a `before_save` callback to call it whenever the model is saved.

```ruby
# task Code
# app/controllers/items_controller.rb
class ItemsController < ApplicationController
  def create
    @item = Item.new(item_params)
    @item.pretty_url = @item.name.parameterize

    if @item.save
      redirect_to @item
    else
      render :new
    end
  end

  # GET to /features/:pretty_url
  def featured
    @item = Item.find_by(pretty_url: params[:pretty_url])
  end
end
# app/models/item.rb
class Item < ActiveRecord::Base
end

# solution code

# remove line @item.pretty_url = @item.name.parameterize from controller

class Item < ActiveRecord::Base
  before_save :set_pretty_url

  protected

  def set_pretty_url
    self.pretty_url = self.name.parameterize
  end
end
```

#### Task 3: Non-AR model Part
###### Extract some registration logic out of controllers into a UserRegistration class. This class should take user_params as arguments to its constructor, which are used to initialize a new User (not create). This newly initialized user should be available as an attr_reader. Also want to move the valid_background_check? method into this new class as a private method.
###### Also implement the `#create` method. Set `user.is_approved` to `true` if `valid_background_check?` returns true. Then we can call `user.save` to finish creating the user.

```ruby
# Task Code
# app/models/user_registration.rb
class UserRegistration

  private
  # private methods go here
end

# app/controllers/users_controller.rb
class UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if valid_background_check?
      @user.is_approved = true
    end

    if @user.save
      redirect_to @user
    else
      render :new
    end
  end

  private

  def valid_background_check?
    !!(@user.valid_ssn? || @user.valid_address?)
  end

  def user_params
    params.require(:user).permit(:name, :email, :ssn, :address)
  end
end

# Solution Code
class UserRegistration
  attr_reader :user

  def initialize(params)
    @user = User.new(params)
  end

  def create
    if valid_background_check?
      user.is_approved = true
    end
    user.save
  end

  private

  def valid_background_check?
    !!(@user.valid_ssn? || @user.valid_address?)
  end
end

class UsersController < ApplicationController
  def create
    registration = UserRegistration.new(user_params)
    @user = registration.user

    if registration.create
      redirect_to @user
    else
      render :new
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :ssn, :address)
  end
end
```

#### Task 4: Skinny Models Part I
###### Split `welcome` method of the User model into separate private methods. Create the following private methods: `send_welcome_email`, `enable_welcome_tour`, `enable_welcome_promotion`. Then move the code from the welcome method into each one.

```ruby
# task code
# app/models/user.rb
class User < ActiveRecord::Base
  def welcome
    # send_welcome_email
    WelcomeMailer.welcome(self).deliver

    # enable_welcome_tour
    self.welcome_tour = true
    self.save

    # enable_welcome_promotion
    promo = Promotion.new(name: "Thanks for joining!")
    promo.set_redeemer(self)
  end
end

# solution code
class User < ActiveRecord::Base
  def welcome
    send_welcome_email
    enable_welcome_tour
    enable_welcome_promotion
  end

  private

  def send_welcome_email
    WelcomeMailer.welcome(self).deliver
  end

  def enable_welcome_tour
    self.welcome_tour = true
    self.save
  end

  def enable_welcome_promotion
    promo = Promotion.new(name: "Thanks for joining!")
    promo.set_redeemer(self)
  end
end
```

#### Task 5: Skinny Models Part II
###### Extract out the welcome user functionality into a separate class. This new class should accept an instance of User as an argument for the constructor. It should also have an attr_accessor for the user and a welcome method which functions the same as the original welcome method.

```ruby
# task code
# app/models/user_welcom.rb
class UserWelcome

end

# solution code
class UserWelcome
  attr_accessor :user

  def initialize(user)
    @user = user
  end

  def welcome
    send_welcome_email
    enable_welcome_tour
    enable_welcome_promotion
  end

  private

  def send_welcome_email
    WelcomeMailer.welcome(@user).deliver
  end

  def enable_welcome_tour
    @user.welcome_tour = true
    @user.save
  end

  def enable_welcome_promotion
    promo = Promotion.new(name: "Thanks for joining!")
    promo.set_redeemer(@user)
  end
end
```