### Required stuff:

```
Http web server with PHP7.0+ (e.g. Apache2.4 + PHP7.0)
Relational database (e.g. MySql)
Redis
node.js
npm
composer
```

### Installiation + back-end:

1 Clone repository
2 Start web-server
3 Start database
4 Start redis
5 cd to project's folder
6 ``` composer install```
7 ```php artisan key:generate```
8 Configurate project in .env file (make it form .env.example)
9 ```php artisan migrate [--seed]``` *(args in [] are optional)*
10 ```npm install```

### Npm commands and description
1 ```npm run build```
Runs webpack to bundle front-end app in development mode
2 ```npm run prod```
Runs webpack to bundle front-end app in production mode
3 ```npm start ```
Link to `npm run build`
4 ```npm run serve```
Starts webpack-dev-server with hot module replacement and react hot loader
Change port in webpack/webpack.dev.config.js
5 ```npm run laravel```
Starts compatible to laravel webpack-dev-server with hot module replacement and react hor loader.
This means you can load page from laravel (with included in it link to webpack-dev-server) and hot reloading will work.
6 ```npm run sockets```
Starts socket.io server to handle incoming connections.