class AnimeSerializer < ActiveModel::Serializer
  attributes :id, :title, :image_url, :genres, :release_date

  # def image_url
  #   if object.image.attached?
  #     Rails.application.routes.url_helpers.url_for(object.image.variant(resize: "300x300"), host: scope.request.host_with_port)
  #   end
  # end
  def image_url
    if object.image.attached?
      Rails.application.routes.url_helpers.url_for(object.image)
    end
  end
end
