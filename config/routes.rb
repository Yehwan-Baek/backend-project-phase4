Rails.application.routes.draw do
  resources :anime_genres, only: [:create]
  resources :characters
  resources :release_dates
  resources :genres
  resources :watch_lists
  resources :reviews
  resources :animes do
    resoureces :characters
  end
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
