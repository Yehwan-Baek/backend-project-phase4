class WatchListSerializer < ActiveModel::Serializer
  attributes :id, :anime_id, :title, :user_id

  def title
    object.anime.title
  end
end
