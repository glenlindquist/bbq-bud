Rails.application.routes.draw do
  resources :cooking_sessions, only: [:index, :show, :create]
  resources :temperatures, only: [:create]
  mount ActionCable.server => '/cable'
end
