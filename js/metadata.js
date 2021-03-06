var currentMap;

function showDetailsForMap( id, pageNav, noAnimation ){
	currentMap = id;
	var $container = $( "<div>" ).attr( "class", "container" );
	var $cardContainer = $( "<div>").attr( "class", "cardContainer" ).appendTo( $container );
	
	$( "body > .card" ).remove();
	var $card = $( "#map" + id ).clone();
	$card.children().hide();
	$card
		.removeClass( "animated bounceIn" )
		.click( function(){
			blockInteractions();
			 $( "#metadata" ).fadeOut( function() {
			  	$( "#map" ).fadeIn( function() {
			  		showMap();
			        selectMap( id );
					breadcrumbCSSUpdates();
					blockInteractions();
		        });
			});
		})
		.css( "opacity", 1 );
	if( noAnimation == false ) {
		$card
			.css({
			  position : "fixed",
			  top : $( "#map" + id ).offset().top - 15,
			  left : $( "#map" + id ).offset().left - 15
			})
			.appendTo( $( "body" ) );
	}

	var $textContainer = $( "<div>" ).attr( "class", "meta-text" ).appendTo( $container );

	var $text = $( "<p>" )
		.attr( "class", "caption-title" )
		.html( maps[ id ].title + "<br><br><span class='author'>" + ( maps[ id ].author ?  ( $.trim(maps[ id ].author) + ", " ) : "" ) + maps[ id ].date + "</span><br><span class='dimensions'>" + maps[ id ].dimension + "</span>" )
		.appendTo( $textContainer );

	$textContainer.append( "<hr>" );

	var $caption = $( "<p>" )
		.attr( "class", "caption" )
		.html( maps[ id ].caption )
		.appendTo( $textContainer );

	if ( !pageNav ){
		$( "#metadata > div" ).remove();
		blockInteractions();
		$("#category").fadeOut( function(){
  		  $( "#metadata" ).fadeIn( function(){
    		  $card
    		    .removeClass( "map-card" )
    		    .addClass( "fixed" );
    		  
    		  setTimeout( function() {
      		  $( "p", $card ).html( "<i class='fa fa-search-plus'></i> View the Map" );
      		  if ( maps[ id ].courtesy ) $( "div", $card ).append( "<p class='courtesy'>Courtesy of " + maps[ id ].courtesy + "</p>" );
      		  $card.children().fadeIn();
      		  $( "#metadata" ).append( $container );
      		  $( "#metadata .cardContainer" ).prepend( $card );
      		  $card.css({
				  position : "fixed",
        		  top : "auto",
        		  left : "auto",
				  position: "relative"
      		  }).attr( "class", $card.attr( "class" ).replace( "pre-animated", "map-animated" ) );
			  resize();
      		}, 1000 );
    		});
  		});
		
	} else {
		var $old = $( "#metadata > div" );
		$card.removeClass( "map-card" )
			.css({
        		  top : "auto",
        		  left : "auto",
				  position: "relative"
      		})
      		.attr( "class", $card.attr( "class" ).replace( "pre-animated", "map-animated" ) );
		$container
			.append( $textContainer )
			.appendTo( "#metadata" );
		$cardContainer
			.append( $card );
		setTimeout( function(){
			$old.remove();
			$( "p", $card ).html( "<i class='fa fa-search-plus'></i> View the Map" );
			if ( maps[ id ].courtesy ) $( "div", $card ).append( "<p class='courtesy'>Courtesy of " + maps[ id ].courtesy + "</p>" );
     		$card.children().fadeIn();
			resize();
		},1000);
		if ( pageNav == "next" ){
			$old.addClass( "animated fadeOutLeft" );
			$container.addClass( "animated fadeInRight" );
		} else {
			$old.addClass( "animated fadeOutRight" );
			$container.addClass( "animated fadeInLeft" );
		}
	}
	addBreadcrumb( maps[ id ].title, "metadata" );
	$( "body" ).attr( "class", "metadata-screen" );		
	
	var titleLength = Math.round( $( window ).width() / 20 ); 
	$( "#metadata h1" ).html( maps[ id ].title ).succinct({ size: titleLength });
	$( "#metadata h1" ).append( ' (' + maps[ id ].date + ')' );
	
	resize();
	pageButtonsForScreen( "metadata" );
}

function nextMap(){
	var cat = categories[ selectedCategory ],
		index = cat.maps.indexOf( currentMap );
	if ( index == cat.maps.length - 1 ) return;
	showDetailsForMap( cat.maps[ index + 1 ], "next", false );
}

function prevMap(){
	var cat = categories[ selectedCategory ],
		index = cat.maps.indexOf( currentMap );
	if ( index == 0 ) return;
	showDetailsForMap( cat.maps[ index - 1 ], "prev", false );
}