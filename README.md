# Bookstore-graphql

The is an GraphQL API server that retrives information about a list of authors and books stored in a mongo database.

## Installation

1. Clone this repo.

2. Setup Mongo database locally. [Install MongoDB](https://docs.mongodb.com/manual/installation/)

3. Go to terminal, cd to this repo and do `npm install`.

4. Run `npm start`

5. Go to localhost:4000/graphql and run your query.

## Mongo DB setup

1. Enter mongo shell by running `mongo`.

2. Create a database called 'bookstore'. `use bookstore`

3. Create a collection for authors. `db.createCollection("authors")`

4. Add author(s) into the collection. `db.authors.insertOne({id: <id>, name: <author-name>})`