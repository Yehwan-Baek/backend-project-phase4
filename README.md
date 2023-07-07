# Anime Review Application Backend

This is the backend environment for an anime review application. It provides the necessary functionalities to manage user accounts, anime data, and user reviews.

## Features

The backend application provides the following features:

1. User Management:
   - User registration and authentication.
   - User profile management.
   - Password hashing and encryption for secure storage.

2. Anime Data Management:
   - Retrieval of anime information from external data sources.
   - Storage and management of anime details (e.g., title, description, release date, genre).

3. Review Management:
   - Creation, retrieval, updating, and deletion of user reviews for anime.
   - Association of reviews with the respective anime and user accounts.

## Technology Stack

The backend application is built using the following technologies and frameworks:

- **Programming Language**: Ruby
- **Web Framework**: Ruby on Rails
- **Database**: SQLite3

## Getting start

1. Clone this repository to your local machine

2. Navigate to the project directory

3. Install the required dependencies
```bundle install```

4. Set up the database
Update the database configuration in the ```config/database.yml``` file to use SQLite3.

5. Run database migrations

6. Start the development server