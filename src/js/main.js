(function ($, window, document, undefined) { 'use strict'; $(function () {





  var Module = (function () {

    var _dom = {
      $doc: $(document)
    };

    var init = function () {
      _bindDocument();
    };

    var _bindDocument = function () {
      _dom.$doc.on('click', function() {
        _someEvent('some text');
      });
    };

    var _someEvent = function ( text ) {
      console.log( text );
    };

    return {
      init: init
    };

  })();

  Module.init();





}); })(jQuery, window, document);