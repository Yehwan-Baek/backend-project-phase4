class User < ApplicationRecord
    validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :username, presence: true, uniqueness: true, length: { minimum: 3, maximum: 30 }
    validates :password, presence: true, length: { minimum: 6 }

    has_many :reviews
    has_many :watch_lists
    has_many :animes, through: :reviews
    has_many :animes, through: :watch_lists
end
