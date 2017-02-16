### Required stuff:

```
Http web server with PHP7.0+ (e.g. Apache2.4 + PHP7.0) (or at least PHP to use built-in web-server)
all required by Laravel PHP extensions
Relational database (e.g. MySql)
Redis
node.js
npm
composer
```

Installiation apache and\or php on linux may require effort, time and nerves.

### This links may help you:

```
https://rusadmin.biz/web-server/ustanovka-php-7-0-5-na-debian/
https://www.digitalocean.com/community/tutorials/linux-apache-mysql-php-lamp-ubuntu-16-04-ru
http://populyarno.com/linux-stati/lokalnyj-server-na-linux-apache-php-mysql/
https://github.com/emilas44/laravel-5.2-on-Ubuntu/blob/master/Install%20Laravel%205.2%20on%20Ubuntu%2016.04.txt
https://github.com/emilas44/laravel-5.2-on-Ubuntu
https://gist.github.com/santoshachari/87bf77baeb45a65eb83b553aceb135a3
```

To install PHP on Windows download needed by you archived PHP version from official site, unpack it anywhere and write path to php.exe in OS system path. Uncomment needed PHP extensions like 'mbstring' in php.ini;

This must be enouph to get up the project.
Combining apache and PHP needs fore efforts. Anyway there are a lot of tutorials and guides about this manipulations, and, if you decide to do this without experience, reading guides and communication with google are guaranteed for you :)

### Installiation + back-end:

1. Clone repository
2. Start web-server or php artisan serve
3. Start database
4. Start redis
5. cd to project's folder
6. ``` composer install```
7. ```php artisan key:generate```
8. Configurate project in .env file (make it form .env.example)
9. ```php artisan migrate [--seed]``` *(args in [] are optional)*
10. ```npm install```

### Npm commands and description

```npm run build```

>Runs webpack to bundle front-end app in development mode

```npm run prod```

>Runs webpack to bundle front-end app in production mode

```npm start ```

> Link to `npm run build`

```npm run serve```

>Starts webpack-dev-server with hot module replacement and react hot loader

>Change port in webpack/webpack.dev.config.js


```npm run laravel```
>
Starts compatible to laravel webpack-dev-server with hot module replacement and react hor loader.

>This means you can load page from laravel (with included in it link to webpack-dev-server) and hot reloading will work.


```npm run sockets```

> Starts socket.io server to handle incoming connections.
