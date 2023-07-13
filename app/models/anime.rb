class Anime < ApplicationRecord
    before_save :calculate_average_rating

    validates :title, presence: true
    validates :description, presence: true
    validates :genres, presence: true
    validates :release_date, presence: true

    has_many :reviews, dependent: :destroy
    has_many :watch_lists, dependent: :destroy
    
    has_many :users, through: :reviews
    has_many :users, through: :watch_lists

    has_one_attached :image
    after_destroy_commit :purge_image

    def image_url
      image_variant = image.variant(resize: "300x300")
      image_variant.service_url
    end

    private

    def calculate_average_rating
      self.average_rating = reviews.average(:rating) if reviews.present?
    end

    def purge_image
      image.purge if image.attached?
    end
end
