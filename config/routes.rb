Rails.application.routes.draw do
  resources :temperatures, only: [:create]
  mount ActionCable.server => '/cable'
end
