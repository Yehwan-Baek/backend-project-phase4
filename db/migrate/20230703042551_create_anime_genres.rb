class CreateAnimeGenres < ActiveRecord::Migration[7.0]
  def change
    create_table :anime_genres do |t|

      t.timestamps
    end
  end
end
