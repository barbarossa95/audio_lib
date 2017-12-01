let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

var paths = {
    'dropzone'      : 'node_modules/dropzone/',
}

mix.js('resources/assets/js/app.js', 'public/js')
    .sass('resources/assets/sass/app.scss', 'public/css/sass.css')
    .stylus('resources/assets/stylus/app.styl', 'public/css/stylus.css')
    .styles([
        paths.dropzone + 'dist/min/basic.min.css',
        paths.dropzone + 'dist/min/dropzone.min.css',
        ], 'public/css/vendor.css', './')
    .extract([
        'jquery',
        'dropzone'])
    .sourceMaps()
    .version();

mix.webpackConfig({
    resolve: {
        alias: {
            jquery: "jquery/src/jquery"
        }
    }
});