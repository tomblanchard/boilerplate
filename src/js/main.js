(function ($, window, document, undefined) { 'use strict'; $(function () {





  var Module = (function () {

    var _elements = {
      $doc: $('html')
    };

    var init = function () {
      _bindDocument();
    };

    var _bindDocument = function () {
     _elements.$doc.on( 'click', _someEvent );
    };

    var _someEvent = function () {
      var text = 'some text';

      console.log( text );
    };

    return {
      init: init
    };

  })();

  Module.init();





}); })(jQuery, window, document);