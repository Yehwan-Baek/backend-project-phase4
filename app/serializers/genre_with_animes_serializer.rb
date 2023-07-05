class GenreWithAnimesSerializer < ActiveModel::Serializer
    attributes :id, :name

    has_many :animes
end
