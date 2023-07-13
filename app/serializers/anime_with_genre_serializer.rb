class AnimeWithGenreSerializer < ActiveModel::Serializer
  attributes :title, :genres, :release_date, :description, :average_rating

  has_many :reviews
end
