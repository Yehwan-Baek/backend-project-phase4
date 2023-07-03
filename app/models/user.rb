class User < ApplicationRecord
    has_many :reviews
    has_many :watch_lists
    has_many :animes, through: :reviews
    has_many :animes, through: :watch_lists
end
