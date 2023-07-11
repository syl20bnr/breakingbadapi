# Breaking Bad API

This is the API server and database from the now stale and offline project, [breakingbadapi.com][]. After conducting a detailed examination and investigation, I was able to reconstruct the database and update the dependencies to get it up and running. I created this repository to assist others participating in [The Vue 3 Bootcamp][] course on [udemy.com][]. By following the instructions in this README, you should be able to spin up a local API server that will aid in completing section 9 of the course.

# Installation and Usage

## Database

1) Install [PostgreSQL][] appropriate for your system.

2) Create the database using the following command:

```
createdb -U postgres breakingbad
```

3) Seed the database using:

```
psql -U postgres -d breakingbad -f ./db/schema.db
```

For convenience, a Makefile with rules to assist in database creation is provided if you are able to run `make`. You may also want to set the `PGPASSWORD` environment variable to your PostgreSQL user password to avoid repeated password prompts.

## API

1) Install the dependencies with:

```
npm install
```

2) Set the `CONNECTION_STRING` environment variable in your shell session to connect to the database. For instance:

```
CONNECTION_STRING=postgresql://postgres:postgres@localhost:5432/breakingbad
```

Here, the first `postgres` represents the user and the second stands for the password.

3) Run the API server:

```
npm run start
```

# Documentation

To view the API documentation, direct your browser to `http://localhost:8080/documentation`.

# About The Vue Bootcamp course

In lecture 70 of the course, the only necessary modification is the URL for data fetching. Replace:

```
http://breakingbadapi.com/api/characters
```

with:

```
http://localhost:8080/api/characters
```

# Credits

- Original Breaking Bad API by [Tim Biles][]
- [klaus][] for providing the JSON dump of the database

# License

[BSD LICENSE][]

[breakingbadapi.com]: https://github.com/timbiles/Breaking-Bad--API
[The Vue 3 Bootcamp]: https://www.udemy.com/course/the-vue-3-bootcamp-the-complete-developer-guide
[udemy.com]: https://www.udemy.com
[PostgreSQL]: https://www.postgresql.org/download/
[Tim Biles]: https://github.com/timbiles
[klaus]: https://github.com/nickdyar
[BSD LICENSE]: ./LICENSE.rst
