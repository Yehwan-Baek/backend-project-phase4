class Character < ApplicationRecord
    validates :name, presence: true

    has_one :main_image_attachment, dependent: :destroy
    has_one :main_image_blob, through: :main_image_attachment
    belongs_to :anime
end
