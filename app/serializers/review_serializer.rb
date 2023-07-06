class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :anime_id, :title, :user_id, :comment, :rating

  def title
    object.anime.title
  end
end
