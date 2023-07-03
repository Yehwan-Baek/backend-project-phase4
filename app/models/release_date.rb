class ReleaseDate < ApplicationRecord
    validates :year, presence: true

    has_many :animes
end
