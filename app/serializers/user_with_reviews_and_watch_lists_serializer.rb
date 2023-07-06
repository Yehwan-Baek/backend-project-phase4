class UserWithReviewsAndWatchListsSerializer < ActiveModel::Serializer
  attributes :id, :username

  has_many :reviews, serializer: ReviewSerializer
  has_many :watch_lists, serializer: WatchListSerializer
end
