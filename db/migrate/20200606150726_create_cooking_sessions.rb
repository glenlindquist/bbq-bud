class CreateCookingSessions < ActiveRecord::Migration[6.0]
  def change
    create_table :cooking_sessions do |t|

      t.timestamps
    end
  end
end
