class GenresController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    def index
        genres = Genre.all
        render json: genres
    end

    def show
        genre = find_genre
        render json: genre, serializer: GenreWithAnimesSerializer
    end
      
    private

    def find_genre
        Genre.find(params[:id])
    end

    def render_not_found_response
        render json: { error: "Genre not found" }, status: :not_found
    end
end
