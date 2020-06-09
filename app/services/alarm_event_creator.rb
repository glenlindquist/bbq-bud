class AlarmEventCreator < ApplicationService
  attr_reader :alarm_event_params
  def initialize(alarm_event_params:)
    @alarm_event_params = alarm_event_params
  end

  def call
    alarm_event = AlarmEvent.new(alarm_event_params)
    return {} if alarm_event.similar_event_recently_created?
    if alarm_event.save
      topic.publish(message: alarm_event.event_text)
      alarm_event
    else
      {}
    end
  end

  private

  def sns
    Aws::SNS::Resource.new(region: ENV["us-east-1"])
  end

  def topic
    sns.topic(ENV["alarm_event_sns_topic"])
  end

end