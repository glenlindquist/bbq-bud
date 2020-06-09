class CreateAlarmEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :alarm_events do |t|
      t.integer :temp
      t.integer :probe_id
      t.string :alarm_type

      t.timestamps
    end
  end
end
