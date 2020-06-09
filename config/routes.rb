Rails.application.routes.draw do
  resources :temperatures, only: [:create]
  resources :alarm_events, only: [:create]
  mount ActionCable.server => '/cable'
end
