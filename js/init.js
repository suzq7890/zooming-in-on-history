var params = {};

getURLParameters();
loadData();

function initialize(){
	createCategories();
	createEvents();
	createMap();
	addBreadcrumb( 'Home', "home" );
}

function createEvents(){
	// $( "#home-button" ).click( showHome );
	$( ".screen" ).on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		$(this).removeClass( "fadeIn" );
	});
}

function getURLParameters(){
	var search = location.search.substring(1);
	if ( search ) params = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
	// TO DO: make sure parameters are actually valid
	if ( !params.categories ) params.categories = "PR,BE";
	params.categories = params.categories.split(",");
}

function changeScreens( $from, $to ){
	$from.addClass( "animated fadeOut" );
	$to.show().removeClass( "fadeOut" ).addClass( "animated fadeIn" );
	setTimeout( function(){
		$from.hide();
	},1000);
}

function showHome(){
	var current = $( "body" ).attr( "class" ).replace( "-screen", "" );
	changeScreens( $( "#" + current ), $( "#home" ) );
	$( "body" ).attr( "class", "home-screen" );
	$( "#page-buttons" ).hide();
}

function addBreadcrumb( title, level ){
	var bc = $( '#breadcrumbs' ),
		titleId = title.replace(/\s+/g, '-').toLowerCase() + '-button';
	bc.append( '<div id="' + titleId + '">' + title + '</div>' );
	
	$( '#' + titleId ).on( 'click', function() {
		console.log( titleId +	' was clicked' );
		
		this.nextAll().remove();
		
		var current = $( "body" ).attr( "class" ).replace( "-screen", "" );
		changeScreens( $( "#" + current ), $( "#" + level ) );
		$( "body" ).attr( "class", level + "-screen" );
		
		$( "#page-buttons" ).hide();
	});
}