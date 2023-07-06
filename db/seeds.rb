# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require_relative 'animes_seed.rb'

# admin = User.create(
#     email: "admin@example.com",
#     username: "admin",
#     password: "admin123",
#     account_role: 1
# )

# user1 = User.create(
#   email: "user1@example.com",
#   username: "user1",
#   password: "user123"
# )

# user2 = User.create(
#   email: "user2@example.com",
#   username: "user2",
#   password: "user123"
# )

# Genre.create( name: "Action" )
# Genre.create( name: "Adventure" )
# Genre.create( name: "Comedy" )
# Genre.create( name: "Drama" )
# Genre.create( name: "Fantasy" )
# Genre.create( name: "Music" )
# Genre.create( name: "Romance" )
# Genre.create( name: "Sci-Fi" )
# Genre.create( name: "Sports" )
# Genre.create( name: "Thriller" )

# start_year = 2023
# 20.times do |i|
#   ReleaseDate.create(year: start_year - i)
# end

unless Anime.exists?
  load(Rails.root.join('db', 'animes_seed.rb'))
  puts "Seeding of animes completed."
else
  puts "Animes already seeded."
end

puts "created!"
