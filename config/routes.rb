Rails.application.routes.draw do
  resources :anime_genres, only: [:create]
  resources :characters, only: [:index, :show, :create]
  resources :release_dates, only: [:index, :show]
  resources :genres, only: [:index, :show]
  resources :watch_lists, only: [:create]
  resources :reviews, only: [:index, :show]
  resources :animes do
    resoureces :characters
    resources :reviews
  end

  resources :users do
    resources :reviews
    resources :watch_lists
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
