class ReviewsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    def index
        if params[:user_id].present?
            user = find_user
            reviews = user.reviews
        elsif params[:anime_id].present?
            anime = find_anime
            reviews = anime.reviews
        else
            reviews = Review.all
        end
        render json: reviews
    end

    def create
        review = Review.create!(review_params)
        render json: review, status: :created
    end

    def destroy
        review = find_review
        review.destroy
        head :no_content
    end

    private

    def find_review
        Review.find(params[:id])
    end

    def find_user
        User.find(params[:user_id])
    end

    def find_anime
        Anime.find(params[:anime_id])
    end

    def review_params
        params.permit(:comment, :rating)
    end

    def render_not_found_response
        render json: { error: "Review not found" }, status: :not_found
    end

    def render_unprocessable_entity_response(exception)
        render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
    end
end
