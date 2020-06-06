class TemperatureSerializer < ActiveModel::Serializer
  attributes :id, :cooking_session_id, :temp, :created_at
end
