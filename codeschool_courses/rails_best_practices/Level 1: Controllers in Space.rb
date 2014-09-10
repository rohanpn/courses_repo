# Task1: Create a scope called `recent` on the Following model
# for the order by and limit conditions. Then use the scope in
# the UserController action.

begin
  # Task Code
  # app/controllers/user_controller.rb
  class UserController < ApplicationController
    def index
      @followings = Following.where(:user_id => current_user.id)
                             .order('created_at DESC').limit(10)
    end
  end

  # app/models/following.rb
  class Following < ActiveRecord::Base
    belongs_to :user
  end

  # Solution Code
  # app/controllers/user_controller.rb
  class UserController < ApplicationController
    def index
      @followings = current_user.followings.recent
    end
  end

  # app/models/following.rb
  class Following < ActiveRecord::Base
    belongs_to :user
    scope :recent, order('created_at DESC').limit(10)
  end
end

#==========================================================================>
# Task 2: Create a named scope (using a lambda) in the Following model
# called :recent that returns records where created_at > 2.days.ago.
begin
  # Task Code
  # app/models/following.rb
  class Following < ActiveRecord::Base
  end
  # app/controllers/user_controller.rb
  class UserController < ApplicationController
    def index
      @followings = Following.where(:user_id => current_user.id)
                             .where(['created_at > ?', 2.days.ago])
    end
  end

  # Solution Code
  # app/models/following.rb
  class Following < ActiveRecord::Base
    scope :recent, lambda { where(['created_at > ?', 2.days.ago]) }
  end
  # app/controllers/user_controller.rb
  class UserController < ApplicationController
    def index
      @followings = current_user.followings.recent
    end
  end
end

#==========================================================================>
# Task 3: Create a default scope on Following that will order
# records by created_at DESC.
begin
  # Task Code
  # app/models/following.rb
  class Following < ActiveRecord::Base
  end
  # app/controllers/user_controller.rb
  class UserController < ApplicationController
    def index
      @followings = Following.where(:user_id => current_user.id).order('created_at DESC')
    end
  end

  # Solution Code
  # app/models/following.rb
  class Following < ActiveRecord::Base
    default_scope order('created_at DESC')
  end
  # app/controllers/user_controller.rb
  class UserController < ApplicationController
    def index
      @followings = current_user.followings
    end
  end
end

#==========================================================================>
# Task 4: Refactor the action to create the Following record through the
# current_user's followings relationship.
begin
  # Task Code
  # app/controllers/followings_controller.rb
  class FollowingsController < ApplicationController
    def create
      @following = Following.new(params[:following])
      @following.user = current_user
      @following.save!

      redirect_to root_url, :notice => 'Successfully followed!'
    end
  end

  # Solution Code
  # app/controllers/followings_controller.rb
  class FollowingsController < ApplicationController
    def create
      current_user.followings.create(params[:following])

      redirect_to root_url, :notice => 'Successfully followed!'
    end
  end
end

#==========================================================================>
# Task 5: Skip the require_login method before_filter on the
# ProfilesController#show action.
begin
  # Task Code
  # app/controllers/profiles_controller.rb
  class ProfilesController < ApplicationController
    def show
      @user = User.find(params[:id])
    end
  end

  # Solution Code
  # app/controllers/profiles_controller.rb
  class ProfilesController < ApplicationController
    skip_before_filter :require_login, only: [:show]
    def show
      @user = User.find(params[:id])
    end
  end
end

#==========================================================================>
# Task 6: Refactor the UsersController#follow action and move code into
# the User model. Create the follow method in the User model.
begin
  # Task Code
  # app/models/user.rb
  class User < ActiveRecord::Base
    has_many :followings
    # This method should create a following record that associates two users:
    # - one that is the current object (refered to as self)
    # - second the user passed into this method

    # Note: Make sure to check if the following record already exists
    #       before creating it
    # def follow(user)
    # end
  end
  # app/controllers/users_controller.rb
  class UsersController < ApplicationController
    def follow
      @user = User.find(params[:id])

      if current_user.followings.where(:followed_user_id => @user.id).present?
        redirect_to @user
      else
        current_user.followings.create(:followed_user => @user)
        redirect_to root_url
      end
    end
  end

  # Solution Code
  # app/models/user.rb
  class User < ActiveRecord::Base
    has_many :followings

    def follow(user)
      unless followings.where(followed_user_id: user.id).present?
        followings.create(followed_user: user)
        return false
      end
      true
    end
  end
  # app/controllers/users_controller.rb
  class UsersController < ApplicationController
    def follow
      @user = User.find(params[:id])
      if current_user.follow(@user)
        redirect_to @user
      else
        redirect_to root_url
      end
    end
  end
end
