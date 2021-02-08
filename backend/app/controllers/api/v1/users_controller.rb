class Api::V1::UsersController < ApplicationController
    skip_before_action :authorized, only: [:create]
    
    # get all users
    def index
      users = User.all
      render json: users, except: [:created_at, :updated_at]
    end

    # sign up a new user
    def create
      @user = User.create(user_params)
      if @user.valid?
        @token = encode_token(user_id: @user.id)
        render json: { user: @user, jwt: @token}, status: :created
        # render json: { user: UserSerializer.new(@user), jwt: @token}, status: :created
      else 
        render json: { error: 'That username already exists. Try again.' }, status: :not_acceptable
      end
    end

    def show
      @user = User.find(params[:id])
      render json: @user, except: [:created_at, :updated_at], include: [:orders, :reviews, :favorites]
    end

    # PATCH/PUT /users/1
    def update
      @user = User.find(params[:id])
      if @user.update(user_params)
        render json: @user, except: [:created_at, :updated_at]
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      @user.destroy(params[:id])
    end
                            # def create
                            #   @user = User.create(user_params)
                            #   if @user.valid?
                            #     @token = JWT.encode({user_id: @user.id}, 'my_s3cr3t')
                            #     render json: { user: @user, token: @token }, status: :created
                            #   else
                            #     render json: { error: 'failed to create user' }, status: :not_acceptable
                            #   end
                            # end
  


                            # def profile
                            #   # @user = User.find(params[:id])
                            #   @user = AuthorizeApiRequest.call(user)
                            #   render json: @user, except: [:created_at, :updated_at], include: [:orders, :reviews, :favorites]
                            # end
  
    private

        # Use callbacks to share common setup or constraints between actions.
        def set_user
          @user = User.find(params[:id])
        end
    
        def user_params
          params.require(:user).permit(:email, :password, :firstname, :lastname, :isStoreManager)
        end
end
