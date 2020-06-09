class AlarmEvent < ApplicationRecord
  # == Constants ============================================================
  RECENTLY_SENT_TIME = 15.minutes

  # == Attributes ===========================================================

  # == Extensions ===========================================================

  # == Relationships ========================================================

  # == Validations ==========================================================
  validates :temp, presence: true
  validates :probe_id, presence: true
  validates :alarm_type, presence: true
  validates :alarm_type, inclusion: { in: %w(high low)}

  # == Scopes ===============================================================

  # == Callbacks ============================================================

  # == Class Methods ========================================================

  # == Instance Methods =====================================================
  def similar_event_recently_created?
    similar_events.where(created_at: (RECENTLY_SENT_TIME.ago...Time.now)).any?
  end

  def similar_events
    AlarmEvent.where(probe_id: probe_id, temp: temp, alarm_type: alarm_type).where.not(id: id)
  end

  def event_text
    "#{alarm_type.capitalize} temp alarm (#{temp}°F) triggered.\n#{short_url}\nText STOP to unsubscribe."
  end

  def short_url
    "https://bit.ly/2BNjqER"
  end

  # == Private Instance Methods =============================================


end
