// Toggle RTL mode for demo
// ----------------------------------- 


(function(window, document, $, undefined){

  $(function(){
	 
    var maincss = $('#maincss');
    var bscss = $('#bscss');
    $('#chk-rtl').on('change', function(){
      
      // app rtl check
      maincss.attr('href', this.checked ? 'css/app-rtl.css' : 'css/theme-a.css' );
      // bootstrap rtl check
      bscss.attr('href', this.checked ? 'css/bootstrap-rtl.css' : 'css/bootstrap.css' );

    });

  });

})(window, document, window.jQuery);