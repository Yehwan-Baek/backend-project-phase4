class AnimeWithDetailSerializer < ActiveModel::Serializer
  attributes :id, :title, :genres, :release_date
end
