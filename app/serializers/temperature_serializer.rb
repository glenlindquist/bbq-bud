class TemperatureSerializer < ActiveModel::Serializer
  attributes :temp, :created_at, :probe_id
end
