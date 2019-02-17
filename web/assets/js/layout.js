'use strict';
const $ = require('jquery');
require('bootstrap');
// include this on every page to make sure Promise exists
require('babel-polyfill');
require('bootstrap/dist/css/bootstrap.css');
require('../css/main.css');

$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
});
