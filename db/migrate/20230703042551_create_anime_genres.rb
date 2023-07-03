class CreateAnimeGenres < ActiveRecord::Migration[7.0]
  def change
    create_table :anime_genres do |t|
      t.belongs_to :genre, null: false, foreign_key: true
      t.belongs_to :anime, null: false, foreign_key: true

      t.timestamps
    end
  end
end
