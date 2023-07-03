class ReleaseDate < ApplicationRecord
    validates :year, presence: true
    validates :quater, presence: true

    has_many :animes
end
