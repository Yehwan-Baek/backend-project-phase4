Rails.application.routes.draw do
  # resources :anime_genres, only: [:index]
  # resources :release_dates, only: [:index, :show] do
  #   resources :animes
  # end
  # resources :genres, only: [:index, :show] do
  #   resources :animes
  # end
  get '/genres/:genre_id/animes', to: 'animes#show_animes_by_genre'
  get '/release_dates/:release_date_id/animes', to: 'animes#show_animes_by_release_date'
  resources :watch_lists
  resources :reviews do
    member do
      post '/likes', to: 'reviews#likes'
    end
  end
  resources :animes do
    resources :reviews
    resources :blobs
    resources :watch_lists
  end
  resources :users, only: [:create] do
    resources :reviews, only: [:index, :show]
    resources :watch_lists, only: [:index, :show]
  end
  get '/me', to: 'users#show'
  get '/me/reviews', to: 'users#me_reviews'
  get '/me/watch_lists', to: 'users#me_watch_lists'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
