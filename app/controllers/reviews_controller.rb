class ReviewsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    before_action :authorize

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

    def show
        review = find_review
        render json: review
    end

    def create
        user = @current_user
        anime = Anime.find(params[:anime_id])
      
        review = user.reviews.new(review_params)
        review.anime = anime
      
        if review.save
          update_average_rating(anime)
          render json: review, status: :created
        else
          render_unprocessable_entity_response(review)
        end
    end
      

      def destroy
        review = find_review
        anime = review.anime
      
        if @current_user == review.user || @current_user.account_role == 1
          review.destroy
          update_average_rating(anime)
          head :no_content
        else
          render json: { error: "Not authorized to delete the review" }, status: :forbidden
        end
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

    def update_average_rating(anime)
        reviews = anime.reviews
        average_rating = reviews.average(:rating)
        anime.update(average_rating: average_rating)
    end

    def render_not_found_response
        render json: { error: "Review not found" }, status: :not_found
    end

    def render_unprocessable_entity_response(exception)
        render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
    end

    def authorize_user!
        render json: { error: "Not authorized" }, status: :forbidden unless @current_user && (@current_user == find_review.user)
    end
      
    def authorize_admin!
        render json: { error: "Not authorized" }, status: :forbidden unless @current_user && @current_user.account_role == 1
    end
      
end
