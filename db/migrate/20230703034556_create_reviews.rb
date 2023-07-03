class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.text :comment
      t.integer :rating
      t.belongs_to :user, foreign_key: true
      t.belongs_to :anime, foreign_key: true

      t.timestamps
    end
  end
end
