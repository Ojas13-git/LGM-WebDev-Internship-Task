$('.navTrigger').click(function () {
      $(this).toggleClass('active');
      console.log("Clicked menu");
      $("#mainListDiv").toggleClass("show_list");
      $("#mainListDiv").fadeIn();
  
  });
  
  

var $main = $('.gallery-main').flickity({
  contain: true,
  pageDots: false,
  prevNextButtons: false,
  draggable: true,
  setGallerySize: false
});
var Flickity = $main.data('flickity');

var $nav = $('.gallery-nav').flickity({
  asNavFor: '.gallery-main', 
  contain: true,
  pageDots: false,
  freeScroll: true,
  prevNextButtons: false
});

$main.on('mouseup', '.is-ready', function(e) {
			e.preventDefault();
      $(this).easyZoom().data('easyZoom').hide();
  });
  
  function enableDrag() {
    $elem = $('.is-loading, .is-error, .is-ready');
    Flickity.bindDrag();
		tearDown($elem);
  }
  
  function tearDown(elem) {
    if(elem === undefined){
      elem = $('.is-loading,  .is-error, .is-ready');
    }
    elem.easyZoom().data('easyZoom').teardown();
  }
  
  function disableDrag() {
    console.log('onShow');
    $elem = $('.is-loading, .is-error, .is-ready');
    Flickity.unbindDrag(); 
  }
  
  $main.on( 'staticClick', function( event, pointer, cellElement, cellIndex ) {
    console.log("static");
    if ( !cellElement ) {
    	return;
  	}
    
  	var $cell = $(cellElement);
    if($cell.hasClass('is-loading')	||
       $cell.hasClass('is-error')		||
       $cell.hasClass('is-ready'))	
    {
      return;
    }
    
		var api = $cell.easyZoom({
      onShow: disableDrag,
      onHide: enableDrag,
      onError: tearDown
    }).data("easyZoom");
    
    console.log(api);
    
    api.isMouseOver = true;
    $e = $.Event(pointer);
    $e.type="staticClick";
    $e.pageX = pointer.pageX;
    $e.pageY = pointer.pageY;
    api.show($e);

    return false;
  });


$(document).ready(function() {
	$('.no-js').removeClass('no-js').addClass('js');
  $('.gallery-cell a')
    .attr('disabled','disabled');
  $('.gallery-nav a')
  	.removeAttr('href');
});
