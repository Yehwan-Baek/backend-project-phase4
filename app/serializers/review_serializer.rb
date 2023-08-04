class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :anime_id, :title, :user_id, :username, :comment, :rating, :likes

  def title
    object.anime.title
  end

  def username
    object.user.username
  end
end
