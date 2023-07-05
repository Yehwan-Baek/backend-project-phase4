class Anime < ApplicationRecord
    before_save :calculate_average_rating

    validates :title, presence: true
    validates :description, presence: true
    validates :release_date_id, presence: true

    has_many :reviews, dependent: :destroy
    has_many :watch_lists, dependent: :destroy
    has_many :anime_genres, dependent: :destroy
    has_many :users, through: :reviews
    has_many :users, through: :watch_lists
    has_many :genres, through: :anime_genres
    has_one_attached :image

    belongs_to :release_date

    private

    def calculate_average_rating
      self.average_rating = reviews.average(:rating) if reviews.present?
    end
end
