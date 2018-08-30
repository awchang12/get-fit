class User < ApplicationRecord
    has_secure_password
    
    has_many :logs
    has_many :goals
    has_many :user_foods
    has_many :foods, through: :user_foods
end
