class TemperaturesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "temperatures_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
