class Anime < ApplicationRecord
    validates :title, presence: true
    validates :description, presence: true
    validates :average_rating, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 5 }
    validates :release_date, presence: true

    has_many :reviews, dependent: :destroy
    has_many :watch_lists, dependent: :destroy
    has_many :anime_genres
    has_many :characters, dependent: :destroy
    has_many :users, through: :reviews
    has_many :users, through: :watch_lists
    has_many :genres, through: :anime_genres
    has_one :main_image_attachment, dependent: :destroy
    has_one :main_image_blob, through: :main_image_attachment

    belongs_to :release_date
end
