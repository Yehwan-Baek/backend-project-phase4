class AnimeGenresController < ApplicationController
    def index
        anime_genres = AnimeGenre.all
        render json: anime_genres
    end
end
