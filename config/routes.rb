Rails.application.routes.draw do
  resources :anime_genres, only: [:index]
  resources :release_dates, only: [:index, :show] do
    resources :animes
  end
  resources :genres, only: [:index, :show] do
    resources :animes
  end
  resources :watch_lists
  resources :reviews
  resources :animes do
    resources :reviews
    resources :blobs
    resources :watch_lists
  end
  resources :users, only: [:create] do
    get '/me/reviews', to: 'users#me_reviews', on: :collection
    resources :reviews
    resources :watch_lists
    get '/me', to: 'users#show', on: :collection
  end
  get '/me', to: 'users#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
