class WatchListsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  
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
      watch_list = WatchList.create!(watch_list_params)
      render json: watch_list, status: :created
    end
  
    def destroy
      watch_list = find_watch_list
      watch_list.destroy
      head :no_content
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
  