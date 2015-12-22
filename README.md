# Spring
Spring-based animation. See demo [here](http://artemlegotin.ru/spring/)

###Using

```javascript
$( '.button' ).spring( {
    duration: 1000,
    n: 10,
    amplitude: 60,
    action: 'move-x'
} );
```

###Options

##### `duration`

Duration in milliseconds

##### `n`

The number of oscillations (integer)

##### `amplitude`

Amplitude (maximal value) of oscillations. Minimal value is 1

##### `action`

Defines element motion. Build-in motions: `'move-x'`, `'move-y'` and `'rotate'`.
Also `action`  can be a function.

![alt tag](https://raw.githubusercontent.com/arlegotin/spring/master/graph.jpg)

###Examples
```javascript

// using build-in action
$( '.button' ).on( 'click', function() {
    $( this ).spring( {
        duration: 2000,
        n: 12,
        amplitude: 30,
        action: 'rotate'
    } );
} );

// using custom action
$( '.button' ).on( 'click', function() {
    $( this ).spring( {
        duration: 800,
        n: 6,
        amplitude: 50,
        action: function( x, $el ) {
          $el.css( 'margin-top', x );
        }
    } );
} );

```
