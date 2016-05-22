# Bookie

![Bookie](https://raw.githubusercontent.com/Shunfan/bookie/master/public/images/logo.png)

Bookie is a formatted website that gets students the books they need at great prices.

## Install Bookie

```bash
git clone https://github.com/Shunfan/bookie.git
cd bookie
npm install
cd public
bower install
```

Moreover, you need to modify knexfile.js and config.js with your own SQL database information and own sendGridAPIKey. 

## Populate example data

```bash
cd bookie
sudo npm install -g knex
knex migrate:latest
knex seed:run
```

## Run Boookie

```bash
cd bookie
node server.js
```
