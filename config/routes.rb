Rails.application.routes.draw do
  resources :anime_genres, only: [:index]
  resources :release_dates, only: [:index, :show] do
    resources :animes
  end
  resources :genres, only: [:index, :show] do
    resources :animes
  end
  resources :watch_lists, only: [:create, :destory]
  resources :reviews, only: [:index, :show]
  resources :animes do
    resources :reviews
    resources :blobs
  end
  resources :users do
    resources :reviews
    resources :watch_lists
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
