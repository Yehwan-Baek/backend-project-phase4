# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# admin = User.create(
#     email: "admin@example.com",
#     username: "admin",
#     password: "admin123",
#     account_role: 1
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
# 30.times do |i|
#   ReleaseDate.create(year: start_year - i)
# end

jujutsu_kaisen_image_path = Rails.root.join('app', 'assets', 'images', 'jujutsu_kaisen_1.jpe')

jujutsu_kaisen_image = File.open(jujutsu_kaisen_image_path)
jujutsu_kaisen_image_blob = ActiveStorage::Blob.create_and_upload!(
  io: jujutsu_kaisen_image,
  filename: 'jujutsu_kaisen_1.jpe',
  content_type: 'image/jpe'
)

jujutsu_kaisen = Anime.create(
  title: "Jujutsu Kaisen",
  description: "Yuji Itadori is a boy with tremendous physical strength, though he lives a completely ordinary high school life. One day, to save a classmate who has been attacked by curses, he eats the finger of Ryomen Sukuna, taking the curse into his own soul. From then on, he shares one body with Ryomen Sukuna. Guided by the most powerful of sorcerers, Satoru Gojo, Itadori is admitted to Tokyo Jujutsu High School, an organization that fights the curses... and thus begins the heroic tale of a boy who became a curse to exorcise a curse, a life from which he could never turn back.",
  average_rating: 0,
  release_date_id: 4,
  img: jujutsu_kaisen_image_blob
)

naruto_shippuden_image_path = Rails.root.join('app', 'assets', 'images', 'naruto_shippuden.jpe')

naruto_shippuden_image = File.open(naruto_shippuden_image_path)
naruto_shippuden_image_blob = ActiveStorage::Blob.create_and_upload!(
  io: naruto_shippuden_image,
  filename: 'naruto_shippuden.jpe',
  content_type: 'image/jpe'
)

naruto_shippuden = Anime.create(
  title: "Naruto Shippudne",
  description: "Naruto Uzumaki wants to be the best ninja in the land. He's done well so far, but with the looming danger posed by the mysterious Akatsuki organization, Naruto knows he must train harder than ever and leaves his village for intense exercises that will push him to his limits.",
  average_rating: 0,
  release_date_id: 15,
  img: naruto_shippuden_image_blob
)


puts "created!"
