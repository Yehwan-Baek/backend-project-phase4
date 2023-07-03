class Anime < ApplicationRecord
    has_many :reviews
    has_many :watch_lists
    has_many :anime_genres
    has_many :characters
    has_many :users, through: :reviews
    has_many :users, through: :watch_lists
    has_many :genres, through: :anime_genres

    belongs_to :release_date
end
