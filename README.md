# Bookie
Bookie is a formatted website that gets students the books they need at great prices.

## How to run Bookie?

```
cd bookie
npm install
cd public
bower install
cd -
node server.js
```

## Example data population

```
cd bookie
npm install knex -g
knex migrate:latest
knex migrate:rollback
knex seed:run
```
