class AnimesController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    before_action :authorize, except: [:index]
    before_action :authenticate_admin!, only: [:create, :destroy]

    def index
        if params[:genre_id].present?
            genre = find_genre
            animes = genre.animes
        elsif params[:release_date_id].present?
            releae_date = find_release_date
            animes = releae_date.animes
        else
            animes = Anime.all
        end
        render json: animes
    end

    def show
        anime = find_anime
        image_variant = anime.image.variant(resize: "300x300")
        render json: anime, serializer: AnimeWithGenreSerializer, image_url: image_variant.url
    end

    def create
        anime = Anime.create!(anime_params)
        attach_image(anime)
        genres = params[:genres].map { |genre_name| Genre.find_or_create_by(name: genre_name) }
        anime.genres = genres
      
        render json: anime, status: :created
    end

    def update
        anime = find_anime
    
        if anime.update(anime_params)
          update_average_rating(anime)
          render json: anime
        else
          render_unprocessable_entity_response(anime)
        end
    end

    def destroy
        anime = find_anime
        anime.destroy
        head :no_content
    end

    private

    def find_release_date
        ReleaseDate.find(params[:release_date_id])
    end
    
    def find_genre
        Genre.find(params[:genre_id])
    end

    def find_anime
        Anime.find(params[:id])
    end

    def anime_params
        params.require(:anime).permit(:title, :description, :release_date_id, genres: [])
    end      

    def attach_image(anime)
        if params.dig(:image, :file_path).present?
            file_path = File.join(Rails.root, params[:image][:file_path])
            file = File.open(file_path)
            anime.image.attach(io: file, filename: params[:image][:file_name])
        end
    end

    def update_average_rating(anime)
        reviews = anime.reviews
        average_rating = reviews.average(:rating)
        anime.update(average_rating: average_rating)
    end

    def render_not_found_response
        render json: { error: "Anime not found" }, status: :not_found
    end

    def render_unprocessable_entity_response(exception)
        render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
    end

    def authenticate_user!
        render json: { error: "Not user authorized" }, status: :forbidden unless @current_user && (@current_user.account_role == 0 || @current_user.account_role == 1)
      end
    
      def authenticate_admin!
        render json: { error: "Not admin authorized" }, status: :forbidden unless @current_user && @current_user.account_role == 1
      end
end