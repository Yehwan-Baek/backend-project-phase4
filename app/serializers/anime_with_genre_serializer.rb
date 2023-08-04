class AnimeWithGenreSerializer < ActiveModel::Serializer
  attributes :title, :genres, :release_date, :description, :average_rating, :image_url

  has_many :reviews

  def image_url
    if object.image.attached?
      Rails.application.routes.url_helpers.url_for(object.image)
    end
  end
end
