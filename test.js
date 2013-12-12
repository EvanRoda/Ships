var test = function(){
    var world = Physics();

    var renderer = Physics.renderer('canvas', {
        el: 'view_port',
        width: 500,
        height: 500
    });

    var ship = Physics.body('convex-polygon', {
        x: 250,
        y: 250,
        acc: {x: 0.0003, y: 0},
        vertices: [
            {x: 0, y: 0},
            {x: 20, y: 20},
            {x: 10, y: 60},
            {x: -10, y: 60},
            {x: -20, y: 20}
        ]
    });

    var gravity = Physics.behavior('constant-acceleration', {
       acc: {x: 0, y: 0.00004}
    });

    //Границы
    var bounds = Physics.aabb(0, 0, 500, 500);

    Physics.util.ticker.subscribe(function(time, dt){
        world.step(time);
    });

    Physics.util.ticker.start();

    world.add(renderer);
    world.add(ship);
    world.add(gravity);

    world.add( Physics.behavior('edge-collision-detection', {
        aabb: bounds,
        restitution: 0.3
    }) );
    world.add( Physics.behavior('body-impulse-response') );

    world.subscribe('step', function(){
        world.render();
    });
};

$( document ).ready(function() {
    test();
});