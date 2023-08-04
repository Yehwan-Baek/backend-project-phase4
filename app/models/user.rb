require 'bcrypt'

class User < ApplicationRecord
    attr_accessor :password

    before_save :encrypt_password

    validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :username, presence: true, uniqueness: true, length: { minimum: 3, maximum: 30 }
    validates :password, presence: true, length: { minimum: 6 }

    has_many :reviews, dependent: :destroy
    has_many :watch_lists, dependent: :destroy
    has_many :animes, through: :reviews
    has_many :animes, through: :watch_lists

    def authenticate(password)
        bcrypt_password = BCrypt::Password.new(password_digest)
        bcrypt_password == password
    end

    def has_review_for_anime?(anime)
        reviews.exists?(anime: anime)
    end

    def me_reviews
        user = @current_user
        reviews = user.reviews
        render json: reviews
    end
    
    private
    
    def encrypt_password
        self.password_digest = BCrypt::Password.create(password) if password.present?
    end
end
