# Makefile

DB_NAME = breakingbad
DB_USER = postgres

create_db:
	createdb -U $(DB_USER) $(DB_NAME)

seed_db:
	psql -U $(DB_USER) -d $(DB_NAME) -f ./db/schema.db

reset_db: drop_db create_db seed_db

drop_db:
	dropdb -U $(DB_USER) $(DB_NAME)

start:
	npm run start

.PHONY: create_db seed_db reset_db drop_db start
