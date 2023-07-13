

def attach_image(anime, file_path, file_name)
    file = File.open(file_path)
    anime.image.attach(io: file, filename: file_name)
end
  
Anime.create!(
    title: "Jujutsu Kaisen",
    genres: "Action, Fantasy",
    description: "Yuji Itadori is a boy with tremendous physical strength, though he lives a completely ordinary high school life. One day, to save a classmate who has been attacked by curses, he eats the finger of Ryomen Sukuna, taking the curse into his own soul. From then on, he shares one body with Ryomen Sukuna. Guided by the most powerful of sorcerers, Satoru Gojo, Itadori is admitted to Tokyo Jujutsu High School, an organization that fights the curses... and thus begins the heroic tale of a boy who became a curse to exorcise a curse, a life from which he could never turn back.",
    average_rating: 0.0,
    release_date: "2021"
) do |anime|
    attach_image(anime, Rails.root.join('app', 'assets', 'images', 'jujutsu_kaisen_1.jpe'), 'jujutsu_kaisen_1.jpe')
    # genres = ['Action', 'Fantasy'].map { |genre_name| Genre.find_or_create_by(name: genre_name) }
    # anime.genres = genres
end
  
Anime.create!(
    title: "Naruto Shippuden",
    genres: "Action, Fantasy, Drama",
    description: "Naruto Uzumaki wants to be the best ninja in the land. He's done well so far, but with the looming danger posed by the mysterious Akatsuki organization, Naruto knows he must train harder than ever and leaves his village for intense exercises that will push him to his limits.",
    average_rating: 0.0,
    release_date: "2009"
) do |anime|
    attach_image(anime, Rails.root.join('app', 'assets', 'images', 'naruto_shippuden.jpe'), 'naruto_shippuden.jpe')
    # genres = ['Action', 'Fantasy', 'Drama'].map { |genre_name| Genre.find_or_create_by(name: genre_name) }
    # anime.genres = genres
end
  
puts "Seeding of animes completed."
  