'use strict';
import $ from 'jquery';
import'bootstrap-sass';

// include this on every page to make sure Promise exists
import'../css/main.scss';

import 'core-js/library/es6/promise'


$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
});
