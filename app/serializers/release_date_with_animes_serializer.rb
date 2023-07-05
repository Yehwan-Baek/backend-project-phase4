class ReleaseDateWithAnimesSerializer < ActiveModel::Serializer
  attributes :id, :year

  has_many :animes
end
