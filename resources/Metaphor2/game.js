/*
game.js for Perlenspiel 3.3.x
Last revision: 2022-03-15 (BM)

Perlenspiel is a scheme by Professor Moriarty (bmoriarty@wpi.edu).
This version of Perlenspiel (3.3.x) is hosted at <https://ps3.perlenspiel.net>
Perlenspiel is Copyright © 2009-22 Brian Moriarty.
This file is part of the standard Perlenspiel 3.3.x devkit distribution.

Perlenspiel is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Perlenspiel is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You may have received a copy of the GNU Lesser General Public License
along with the Perlenspiel devkit. If not, see <http://www.gnu.org/licenses/>.
*/

/*
This JavaScript file is a template for creating new Perlenspiel 3.3.x games.
Any unused event-handling function templates can be safely deleted.
Refer to the tutorials and documentation at <https://ps3.perlenspiel.net> for details.
*/

/*
The following comment lines are for JSHint <https://jshint.com>, a tool for monitoring code quality.
You may find them useful if your development environment is configured to support JSHint.
If you don't use JSHint (or are using it with a configuration file), you can safely delete these two lines.
*/

/* jshint browser : true, devel : true, esversion : 6, freeze : true */
/* globals PS : true */

"use strict"; // Do NOT remove this directive!

/*
PS.init( system, options )
Called once after engine is initialized but before event-polling begins.
This function doesn't have to do anything, although initializing the grid dimensions with PS.gridSize() is recommended.
If PS.grid() is not called, the default grid dimensions (8 x 8 beads) are applied.
Any value returned is ignored.
[system : Object] = A JavaScript object containing engine and host platform information properties; see API documentation for details.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/




// The global G variable creates a namespace
// for game-specific code and variables

// It is initialized with an immediately-invoked
// function call (described below)


var G = ( function () {
    // By convention, constants are all upper-case

    var WIDTH = 20; // width of grid
    var HEIGHT = 20; // height of grid

    let COLOR_GRAB = 0x15E2; // grabber color
    var COLOR_FLOOR = 	PS.COLOR_INDIGO; // floor color
    var COLOR_WALL = PS.COLOR_BLACK; // wall color
    var COLOR_GOLD = 	0x2915; // gold color

    var GOLD_MAX = 15; // max number of gold pieces
    var GOLD_VALUE = 1; // value of each gold piece

    // The following variables are grab-related,
    // so they start with 'grab'

    var grab_x; // current x-pos of grabber
    var grab_y; // current y-pos of grabber

    var score = 0; // current score
    var gold_count = 0; // number of pieces grabbed

    // 15 x 15 map array
    // 0 = wall, 1 = floor

    var map = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0,
        0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0,
        0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0,
        0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0,
        0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0,
        0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0,
        0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0,
        0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0,
        0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0,
        0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0,
        0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0,
        0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0,
        0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0,
        0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0,
        0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0,
        0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0,
        0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,

    ];

    // This function finds a random floor
    // location on the map (the value 1)
    // and places an item there, returning the
    // x/y position of each placed object.
    // It's used to place the gold pieces
    // and the grabber.

    var find_floor = function ( item, code, set ) {
        var xpos, ypos, loc, data;

        do {
            xpos = PS.random( WIDTH ) - 1;
            ypos = PS.random( HEIGHT ) - 1;
            loc = ( ypos * WIDTH ) + xpos;
            data = map[ loc ]; // get map data
        } while ( data !== 1 ); // try again

        map[ loc ] = item; // place item
        if (set == 2 || set == 3) {
            PS.glyph(xpos, ypos, code);// set glyph
            PS.glyphColor(xpos, ypos, PS.COLOR_GRAY_LIGHT);
        }
        if (set == 0 || set == 1) {
            PS.color(xpos, ypos, code); // set glyph
        }
        return { x : xpos, y : ypos }; // return x/y
    };

    // Draw layout based on map array

    var draw_map = function () {
        var x, y, data, i, pos;

        for ( y = 0; y < HEIGHT; y += 1 ) {
            for ( x = 0; x < WIDTH; x += 1 ) {
                data = map [ ( y * WIDTH ) + x ];
                if ( data === 0 ) {
                    PS.color( x, y, COLOR_WALL);
                }
            }
        }

        // Randomly place gold pieces on map.
        // No need to record their x/y positions.

        for ( i = 0; i < GOLD_MAX; i += 1 ) {
            find_floor( 2, COLOR_GOLD, 2);
        }

        // Randomly place grabber on floor
        // and save its x/y position

        pos = find_floor( 3, COLOR_GRAB, 3);

        grab_x = pos.x;
        grab_y = pos.y;
        PS.glyphColor (grab_y,grab_x, 0xFFC040);
    };

    // The 'exports' object is used to define
    // variables and/or functions that need to be
    // accessible outside this function.

    var exports = {

        // G.init()
        // Initializes the game

        init : function () {
            PS.gridSize( WIDTH, HEIGHT ); // init grid
            PS.color( PS.ALL, PS.ALL, COLOR_FLOOR);
            PS.border( PS.ALL, PS.ALL, 0 ); // no borders

            draw_map();

            // Preload sound effects


            PS.statusText( "Use arrows/WASD to grab fish" );
        },

        // G.move( h, v )
        // Moves the grabber around the map
        // h : integer = horizontal movement
        // v : integer = vertical movement
        // h = 0: No horizontal movement
        // h = 1: Move one bead to the right
        // h = -1: Move one bead to the left
        // v = 0: No vertical movement
        // v = 1: Move one bead down
        // v = -1: Move one bead up

        move : function ( h, v ) {
            var nx, ny;

            // Calculate proposed new location.

            nx = grab_x + h;
            ny = grab_y + v;

            // Is new location off the grid?
            // If so, exit without moving.

            if ( ( nx < 0 ) || ( nx >= WIDTH ) ||
                ( ny < 0 ) || ( ny >= HEIGHT ) ) {
                return;
            }

            // Is there a wall in the proposed location?
            // If the array data there = 0,
            // exit without moving.
            // If data = 2, it's gold, so update score.

            let loc = ( ny * WIDTH ) + nx;
            let data = map[ loc ];
            if ( data === 0 ) {
                return;
            }

            if ( data === 2 ) {
                map[ loc ] = 1; // Change gold to floor
                score += GOLD_VALUE;
                gold_count += 1;
                if ( gold_count >= GOLD_MAX ) {
                    PS.statusText( "You win with " +
                        score + " fish!" );
                    PS.audioPlay( "fx_tada" );
                }
                else {
                    PS.statusText( "Score = " + score );
                    PS.audioPlay( "fx_coin7" );
                }
            }

            // Legal move, so change current grabber
            // location to floor color.

            PS.color( grab_x, grab_y, COLOR_FLOOR);
            PS.glyph ( grab_x, grab_y, 0);

            // Assign grabber's color to the
            // new location.

            PS.glyph ( nx, ny, COLOR_GRAB);
            PS.glyphColor (nx, ny, 0xFFC040);

            // Finally, update grabber's position

            grab_x = nx;
            grab_y = ny;
        }
    };

    return exports;
} () );
// Tell Perlenspiel to use our G.init() function
// to initialize the game

PS.init = G.init;

PS.keyDown = function (key, shift, ctrl, options) {
    switch (key) {
        case PS.KEY_ARROW_UP:
            case 119:
            case 87: {
                G.move(0, -1); // move UP (v = -1)

                break;
            }
            case PS.KEY_ARROW_DOWN:
            case 115:
            case 83: {
                G.move(0, 1); // move DOWN (v = 1)

                break;
            }
            case PS.KEY_ARROW_LEFT:
            case 97:
            case 65: {
                G.move(-1, 0); // move LEFT (h = -1)

                break;
            }
            case PS.KEY_ARROW_RIGHT:
            case 100:
            case 68: {
                G.move(1, 0); // move RIGHT (h = 1)

                break;
            }
        }
    }




