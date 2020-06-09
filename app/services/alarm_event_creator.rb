class AlarmEventCreator < ApplicationService
  attr_reader :alarm_event_params
  def initialize(alarm_event_params:)
    @alarm_event_params = alarm_event_params
  end

  def call
    alarm_event = AlarmEvent.new(alarm_event_params)
    if alarm_event.save
      # hit external service
    end
  end

end