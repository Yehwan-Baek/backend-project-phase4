class AnimesController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    before_action :authorize, except: [:index, :show_animes_by_genre, :show_animes_by_release_date, :order_by_average_rating]
    before_action :authenticate_admin!, only: [:create, :destroy]

    def index
        animes = Anime.all
        render json: animes, methods: [:image_url]
    end

    def index_with_details
        animes = Anime.all
        render json: animes, each_serializer: AnimeWithDetailSerializer
    end
      
    def show
        anime = find_anime
        image_variant = anime.image.variant(resize: "300x300")
        render json: anime, serializer: AnimeWithGenreSerializer, methods: [:image_url]
    end

    def show_animes_by_genre
        genre_id = params[:genre_id]
        genre = GENRES_MAP[genre_id]
      
        if genre
          animes = Anime.where("genres LIKE ?", "%#{genre}%")
          render json: animes, methods: [:image_url]
        else
          render json: { error: "Invalid genre id" }, status: :unprocessable_entity
        end
    end
      
    def show_animes_by_release_date
        release_date_id = params[:release_date_id]
        release_date = RELEASE_DATE[release_date_id]
      
        if release_date
          animes = Anime.where(release_date: release_date)
          render json: animes, methods: [:image_url]
        else
          render json: { error: "Invalid release date id" }, status: :unprocessable_entity
        end
    end

    def order_by_average_rating
        animes = Anime.all.order(average_rating: :desc)
        render json: animes, methods: [:image_url]
    end

    def create
        anime = Anime.create!(anime_params)
        attach_image(anime)
        
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

    def find_anime
        Anime.find(params[:id])
    end

    def anime_params
        params.require(:anime).permit(:title, :description, :release_date, :genres)
    end 
    
    def image_url
        if image.attached?
          Rails.application.routes.url_helpers.url_for(image)
        end
    end

    # def attach_image(anime)
    #     if params.dig(:image, :file_path).present?
    #         file_path = File.join(Rails.root, params[:image][:file_path])
    #         file = File.open(file_path)
    #         anime.image.attach(io: file, filename: params[:image][:file_name])
    #     end
    # end

    def attach_image(anime)
        if params.dig(:image, :file_path).present?
          file = params[:image][:file_path]
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

    GENRES_MAP = {
        "1" => "Action",
        "2" => "Adventure",
        "3" => "Comedy",
        "4" => "Drama",
        "5" => "Fantasy",
        "6" => "Music",
        "7" => "Romance",
        "8" => "Sci-Fi",
        "9" => "Seinen",
        "10" => "Shojo",
        "11" => "Shonen",
        "12" => "Slice of Life",
        "13" => "Sports",
        "14" => "Supernatural",
        "15" => "Thriller"
    }

    RELEASE_DATE = {
        "1" => "2023",
        "2" => "2022",
        "3" => "2021",
        "4" => "2020",
        "5" => "2019",
        "6" => "2018",
        "7" => "2017",
        "8" => "2016",
        "9" => "2015",
        "10" => "2014",
        "11" => "2013",
        "12" => "2012",
        "13" => "2011",
        "14" => "2010",
        "15" => "2009",
        "16" => "2008",
        "17" => "2007",
        "18" => "2006",
        "19" => "2005",
        "20" => "2004",
        "21" => "2003",
        "22" => "2002",
        "23" => "2001",
        "24" => "2000"
    }
end