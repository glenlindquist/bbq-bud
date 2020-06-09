class AlarmEventsController < ApplicationController
  def create
    # @todo: create alarm_events table/model?

    # alarm_event = AlarmEvent.new(alarm_event_params)
    # if alarm_event.save
    # end

    # @todo: send alarm event to service?
    # aws sns -> txt message?
    # some method to check last alarm event sent?
      
    render alarm_event.to_json
    
  end
  
  private
  
  def alarm_event_params
    params.require(:alarm_event).permit(:temp, :alarm_type :probe_id)
  end
end
