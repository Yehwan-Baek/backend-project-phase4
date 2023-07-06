class AnimeWithGenreSerializer < ActiveModel::Serializer
  attributes :title, :description, :average_rating, :release_date_id

  has_one :release_date
  has_many :genres
  has_many :reviews
end
