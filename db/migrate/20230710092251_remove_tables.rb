class RemoveTables < ActiveRecord::Migration[7.0]
  def change
    remove_foreign_key :anime_genres, :genres
    remove_foreign_key :anime_genres, :animes
    remove_foreign_key :animes, :release_dates

    drop_table :anime_genres, if_exists: true
    drop_table :genres, if_exists: true
    drop_table :release_dates, if_exists: true

    remove_column :animes, :release_date_id
  end
end
