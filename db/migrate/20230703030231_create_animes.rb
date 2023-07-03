class CreateAnimes < ActiveRecord::Migration[7.0]
  def change
    create_table :animes do |t|
      t.string :title
      t.text :description
      t.float :average_rating
      t.belongs_to :release_date, foreign_key: true

      t.timestamps
    end
  end
end
