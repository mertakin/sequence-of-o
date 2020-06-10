let world;


function setup() {
	createCanvas(windowWidth, windowHeight);
	world = new World(300);


}

function draw() {
	background(175);
	world.run();

}
