class TemperaturesChannel < ApplicationCable::Channel
  def subscribed
    cooking_session = CookingSession.find(params[:cooking_session])
    stream_fo cooking_session
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
