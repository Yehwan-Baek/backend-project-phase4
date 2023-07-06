class ApplicationController < ActionController::API
  include ActionController::Cookies

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  before_action :authorize, except: :render_unauthorized_response

  private

  def authorize
    @current_user = User.find_by(id: session[:user_id])

    render json: { errors: ["Not authorized"] }, status: :unauthorized unless @current_user
  end

  def render_unauthorized_response
    render json: { errors: ["Not authorized"] }, status: :unauthorized
  end

  def render_unprocessable_entity_response(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end

  def authenticate_user!
    render json: { error: "Not user authorized" }, status: :forbidden unless @current_user && @current_user.account_role == 0
  end

  def authenticate_admin!
    render json: { error: "Not admin authorized" }, status: :forbidden unless @current_user && @current_user.account_role == 1
  end
end
