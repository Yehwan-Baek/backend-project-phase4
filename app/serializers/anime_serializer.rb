class AnimeSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :average_rating, :release_date_id

  has_one :release_date
end
