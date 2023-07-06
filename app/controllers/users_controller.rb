class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    skip_before_action :authorize, only: :create

    def index
        users = User.all
        render json: users
    end

    def show
        user = User.find(session[:user_id])
        render json: user, serializer: UserWithReviewsAndWatchListsSerializer
    end

    def create
        user = User.create!(user_params)
        render json: user, status: :created
    end

    def destroy
        user = find_user
        user.destroy
        head :no_content
    end

    private

    def find_user
        User.find(params[:id])
    end

    def user_params
        params.permit(:email, :username, :password)
    end
    
    def render_not_found_response
        render json: { error: "User not found" }, status: :not_found
    end

    def render_unprocessable_entity_response(exception)
        render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
    end
end
