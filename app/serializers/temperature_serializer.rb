class TemperatureSerializer < ActiveModel::Serializer
  attributes :temp, :created_at
end
