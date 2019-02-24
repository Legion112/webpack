'use strict';
import $ from 'jquery';
import'bootstrap-sass';
// include this on every page to make sure Promise exists
import 'babel-polyfill';
import'../css/main.scss';

$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
});
