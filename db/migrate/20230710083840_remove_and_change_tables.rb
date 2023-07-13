class RemoveAndChangeTables < ActiveRecord::Migration[7.0]
  def change
    add_column :animes, :genres, :string
    add_column :animes, :release_date, :string
  end
end
