'use strict';
const $ = require('jquery');
require('bootstrap-sass');
// include this on every page to make sure Promise exists
require('babel-polyfill');
require('../css/main.scss');

$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
});
