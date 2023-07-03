class CreateCharacters < ActiveRecord::Migration[7.0]
  def change
    create_table :characters do |t|
      t.string :name
      t.string :img_url
      t.text :description

      t.timestamps
    end
  end
end
