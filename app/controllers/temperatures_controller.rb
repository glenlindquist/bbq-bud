class TemperaturesController < ApplicationController
  def create
    temperature = Temperature.new(temperature_params)
    if temperature.save
      serialized_data = ActiveModelSerializers::Adapter::Json.new(
        TemperatureSerializer.new(temperature)
      ).serializable_hash
      ActionCable.server.broadcast 'temperatures_channel', serialized_data
      head :ok
    end
  end
  
  private
  
  def temperature_params
    params.require(:temperature).permit(:temp)
  end
end
