( function( $ ) {
    // request animation frame handler
    var Raf = function( fLoop ) {
        var that = this,
            raf,
            last_time,
            state = false;
            
        that.loop = fLoop;
        
        var loop = function() {
            raf = requestAnimationFrame( loop );
            that.loop();
        };
    
        that.start = function() {
            if ( state === false ) {
                state = true;
                raf = requestAnimationFrame( loop );
            }
        };
        
        that.stop = function() {
            if ( state === true ) {
                state = false;
                cancelAnimationFrame( raf );
            }
        };
        
        that.state = function () {
            return state;
        };
    };
    
    // transform functions
    var transform = function( element, value ) {
        var style = element.style;
        
        style[ '-webkit-transform' ] = value;
        style[ '-moz-transform' ] = value;
        style[ '-o-transform' ] = value;
        style[ 'transform' ] = value;
    };
    
    var translate = function( element, x, y ) {
        transform( element, 'translate(' + ( x || 0 ) + 'px,' + ( y || 0 ) + 'px)' );
    };
    
    var rotate = function( element, angle ) {
        transform( element, 'rotate(' + ( angle || 0 ) + 'deg)' );
    };
    
    // spring generator
    var spring = function( t, T, N, H, h ) {
        if ( t <= T ) {
            return H * Math.pow( ( h || 1 ) / H, ( N * t / T - 0.5 ) / ( N - 1 ) ) * Math.sin( Math.PI * N * t / T );
        } else {
            return false;
        }
    };
    
    $.fn.spring = function( options ) {
        var $element = this,
            element = this[ 0 ],
            t_0 = Date.now(),    
            animation,
            T = options.duration || 1000,
            N = options.n || 5,
            H = options.amplitude || 30,
            h = 1,
            action = options.action || 'move-x';
            
        var step = function() {
            var x = spring( Date.now() - t_0, T, N, H, h );
            
            if ( x === false ) {
                x = 0;
                animation.stop();
                $element.spring_animation = undefined;
            }
            
            if ( typeof action === 'function' ) {
                action.call( element, x, $element );
            } else {
                switch ( action ) {
                    case 'move-x':
                        translate( element, x, 0 );
                    break;
                    
                    case 'move-y':
                        translate( element, 0, x );
                    break;
                    
                    case 'rotate':
                        rotate( element, x );
                    break;
                }
            }
        };
            
        if ( $element.spring_animation ) {
            $element.spring_animation.stop();
        }
            
        animation = new Raf( step );
        
        $element.spring_animation = animation;
            
        animation.start();
        
        return this;
    };
} )( jQuery );
