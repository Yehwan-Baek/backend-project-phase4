class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :email
      t.string :username
      t.string :password
      t.integer :account_role, default: 0
      t.timestamps
    end
  end
end
