class ReleaseDatesController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    
    def index
        release_dates = ReleaseDate.all
        render json: release_dates
    end

    def show
        releaes_date = find_release_date
        render json: releaes_date, serializer: ReleaseDateWithAnimesSerializer
    end

    private

    def find_release_date
        ReleaseDate.find(params[:id])
    end

    def render_not_found_response
        render json: { error: "Release Date not found" }, status: :not_found
    end
end