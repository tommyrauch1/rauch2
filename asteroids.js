"use strict";

var gl;
var points;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }


    //(red, green, blue) values for all of the vertices
    var colors = [
        vec3(0.637059, 0.164706, 0.164706), //brown-ish for asteroids
        vec3(0.637059, 0.164706, 0.164706),
        vec3(0.637059, 0.164706, 0.164706),
        vec3(0.0, 0.0, 1.0), //blue ship
        vec3(0.0, 0.0, 1.0),
        vec3(0.0, 0.0, 1.0),
        vec3(0.637059, 0.164706, 0.164706), //brown-ish for asteroids
        vec3(0.637059, 0.164706, 0.164706),
        vec3(0.637059, 0.164706, 0.164706),
        vec3(0.637059, 0.164706, 0.164706), //brown-ish for asteroids
        vec3(0.637059, 0.164706, 0.164706),
        vec3(0.637059, 0.164706, 0.164706),
        vec3(1.0, 0.0, 0.0), //red for shot
        vec3(1.0, 0.0, 0.0),
        vec3(1.0, 0.0, 0.0)

    ];

    //array of points
    points = [
        vec2( .2, -1 ), //bottom left asteroid
        vec2(  -.5, -1 ), 
        vec2(  -.3,  -.5 ),
        vec2(-.1, .2 ), //ship
        vec2( .1, .1 ), 
        vec2(  0,  .3 ),
        vec2(.4,-.3), //asteroid being hit
        vec2(.9, -1),
        vec2(1, -.17),
        vec2(.4, -.2), //asteroid split off when hit
        vec2(.6, .5),
        vec2(1, -.1),
        vec2(.25,-.02), //shot
        vec2(.18, -.03 ),
        vec2(.25,.03)
        ];

    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Create a buffer object, initialize it, and associate it with the
    //  associated attribute variable in our vertex shader

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    //note that the 2 below is because each of our 
    //data points has only 2 values (2D application)
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, points.length );
}
