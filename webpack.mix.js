const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.copyDirectory('resources/dist/img','public/img');
mix.copyDirectory('resources/assets/layout/images', 'public/assets/images');
mix.copy('resources/css/bootstrap.min.css', 'public/css');

mix.js('resources/js/app.js', 'public/js').vue();
