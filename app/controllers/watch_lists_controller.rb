class WatchListsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    before_action :authorize
  
    def index
      if params[:user_id].present?
        user = find_user
        watch_lists = user.watch_lists
      elsif params[:anime_id].present?
        anime = find_anime
        watch_lists = anime.watch_lists
      else
        watch_lists = WatchList.all
      end
      render json: watch_lists
    end
  
    def create
      user = @current_user
      anime_id = params[:anime_id]
      existing_watch_list = user.watch_lists.find_by(anime_id: anime_id)
      
      if existing_watch_list
        render json: { error: "Watch list already exists" }, status: :unprocessable_entity
      else
        watch_list = user.watch_lists.new(anime_id: anime_id)
      
        if watch_list.save
          render json: watch_list, status: :created
        else
          render_unprocessable_entity_response(watch_list)
        end
      end
    end
    
    
  
    def destroy
      watch_list = find_watch_list
      if @current_user == watch_list.user
        watch_list.destroy
        head :no_content
      else
        render json: { error: "Not authorized to delete the review" }, status: :forbidden
      end
    end
  
    private
  
    def find_watch_list
      WatchList.find(params[:id])
    end
  
    def find_user
      User.find(params[:user_id])
    end
  
    def find_anime
      Anime.find(params[:anime_id])
    end
  
    def watch_list_params
      params.require(:watch_list).permit(:user_id, :anime_id)
    end
  
    def render_not_found_response
      render json: { error: "Watch List not found" }, status: :not_found
    end
  
    def render_unprocessable_entity_response(exception)
      render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
    end
  end
  