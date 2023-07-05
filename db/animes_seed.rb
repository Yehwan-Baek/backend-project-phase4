

def attach_image(anime, file_path, file_name)
    file = File.open(file_path)
    anime.image.attach(io: file, filename: file_name)
end
  
Anime.create!(
    title: "Jujutsu Kaisen",
    description: "Yuji Itadori is a boy with tremendous physical strength...",
    average_rating: 0,
    release_date_id: 4
) do |anime|
    attach_image(anime, Rails.root.join('app', 'assets', 'images', 'jujutsu_kaisen_1.jpe'), 'jujutsu_kaisen_1.jpe')
    genres = ['Action', 'Fantasy'].map { |genre_name| Genre.find_or_create_by(name: genre_name) }
    anime.genres = genres
end
  
Anime.create!(
    title: "Naruto Shippuden",
    description: "Naruto Uzumaki wants to be the best ninja in the land...",
    average_rating: 0,
    release_date_id: 15
) do |anime|
    attach_image(anime, Rails.root.join('app', 'assets', 'images', 'naruto_shippuden.jpe'), 'naruto_shippuden.jpe')
    genres = ['Action', 'Fantasy', 'Drama'].map { |genre_name| Genre.find_or_create_by(name: genre_name) }
    anime.genres = genres
end
  
puts "Seeding of animes completed."
  