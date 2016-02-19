var c = 1/15; //scale factor

// Setup three.js WebGL renderer
var renderer = new THREE.WebGLRenderer( { antialias: true } );

// Append the canvas element created by the renderer to document body element.
document.body.appendChild( renderer.domElement );

//Create a three.js scene
var scene = new THREE.Scene();

//Create a three.js camera
var camera = new THREE.PerspectiveCamera( 110, window.innerWidth / window.innerHeight, .01, 10 );
scene.add(camera);

//Apply VR headset positional data to camera.
var controls = new THREE.VRControls( camera );

//Apply VR stereo rendering to renderer
var effect = new THREE.VREffect( renderer );
effect.setSize( window.innerWidth, window.innerHeight );

//bg color
renderer.setClearColor( 0xaaddff );

scene.fog = new THREE.FogExp2( 0xaaddff, .02/c);

camera.position.y = 25*c;

var everything = new THREE.Object3D();

//ground
var planeGeometry = new THREE.PlaneGeometry( 200, 170, 100, 100 );
var planeMaterial = new THREE.MeshLambertMaterial( {color: 0x666666, side: THREE.DoubleSide, wireframe:false} );
var plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.rotation.x = 1.58;
plane.position.y = -25;
plane.position.x = 30;
plane.scale.set(2,2,2);
everything.add( plane );

for (var i = 0; i < plane.geometry.vertices.length; i++){
  plane.geometry.vertices[i].z = 2*Math.sin(plane.geometry.vertices[i].y/3) + 2*Math.sin(plane.geometry.vertices[i].x/4) + 5*Math.cos(plane.geometry.vertices[i].y/7) + 3*Math.cos(plane.geometry.vertices[i].x/5);
};

//clouds
var plane2Geometry = new THREE.PlaneGeometry( 200, 170, 100, 100 );
var plane2Material = new THREE.MeshLambertMaterial( {color: 0xffffff, side: THREE.DoubleSide, wireframe:false} );
var plane2 = new THREE.Mesh( plane2Geometry, plane2Material );
plane2.rotation.x = 1.58;
plane2.position.y = 45;
plane2.position.x = 30;
plane2.scale.set(2,2,2);
everything.add( plane2 );

for (var i = 0; i < plane2.geometry.vertices.length; i++){
  plane2.geometry.vertices[i].z = Math.sin(plane.geometry.vertices[i].y/3) + 1.2*Math.sin(plane.geometry.vertices[i].x/2) + 1.1*Math.cos(plane.geometry.vertices[i].y/3) + 1.5*Math.cos(plane.geometry.vertices[i].x/3);
};


//lights    
var light = new THREE.PointLight( 0xffffff, 1, 400*c);
light.position.set( -10,25,-25);
light.castShadow = true;
everything.add( light );

var light2 = new THREE.PointLight( 0xffffff, 1, 1000*c);
light2.position.set( 50,10,20);
light2.castShadow = true;
everything.add( light2 );

var light3 = new THREE.PointLight( 0xffffff, 1, 1000*c);
light3.position.set( 0,10,80);
light3.castShadow = true;
everything.add( light3 );

var g1 = 0;

var t = 0;
var pos = new THREE.Vector2(0,0);

//plants:
var phi = 1.618033988749894848;
var pi = 3.14159265359;

//flowerpatch
var pet = [];
var flower = [];
var flowerPatch = new THREE.Object3D();
var flowerNumber = 20;
var petNumber = [];
var bloomness = [];
var spiky = [];
var poky = [];
var tally = [];
var colorG = [];
var colorB = [];
var colorR = [];
var fwidth = [];
var fheight = [];

for (var i = 0; i < flowerNumber; i++){

  flower[i]= new THREE.Object3D();

  pet[i] = [];
  petNumber[i] = 15 + 25*Math.random();
  bloomness[i] = 3 * Math.random();
  spiky[i] = Math.random();
  poky[i] = 400*Math.random()+8;
  tally[i] = 20+40*Math.random();
  colorG[i] = Math.random()/2;
  colorB[i] = 1+Math.random();
  colorR[i] = Math.random()/2;
  fwidth[i] = 2 + 2*Math.random()+Math.random();
  fheight[i] = 1 + 2*Math.random()+Math.random();

  for (var j = 0; j < petNumber[i]; j++){
    pet[i][j] = new THREE.Mesh(
        new THREE.OctahedronGeometry(1),
        new THREE.MeshLambertMaterial()
        );

    pet[i][j].geometry.vertices[0].set(1,bloomness[i],0);
    pet[i][j].geometry.vertices[1].set(-1,bloomness[i],0);
    pet[i][j].geometry.vertices[2].set(0,0.05,spiky[i]);
    pet[i][j].geometry.vertices[3].set(0,-0.8,-spiky[i]);
    pet[i][j].geometry.vertices[4].set(0,-0.8,spiky[i]);
    pet[i][j].geometry.vertices[5].set(0,0.05,-spiky[i]);

    var petalScale1 = (petNumber[i] - j + 1)/tally[i];
    pet[i][j].scale.set(petalScale1,petalScale1,petalScale1);
    pet[i][j].material.color.setRGB(colorR[i]*j/petNumber[i], j*colorG[i]/petNumber[i], colorB[i]);
    pet[i][j].position.y = j/poky[i];
    pet[i][j].rotation.y = j*pi*phi;
    flower[i].add(pet[i][j]);
  };

  flower[i].scale.set(fwidth[i],fheight[i],fwidth[i]);
  if (i > 2){
    flower[i].position.set(100*Math.random() - 50, 0, 100*Math.random() - 50);
    flowerPatch.add(flower[i]);
  };
};
flower[0].position.set(5, 0, -4);//flowerpatch island
flower[1].position.set(4,0.1,-12);//on main, near
flower[2].scale.set(6,4,6);
flower[2].position.set(7,0.1,-18);// on main, far

flower[3].position.set(5, 0.1, 5);
flower[4].position.set(0.5, 0.1, -2);
flower[5].position.set(1, 0.1, 4);
flower[6].position.set(7, 0.1, -4);
flower[7].position.set(3, 0.1, -1);

everything.add(flower[0]);
everything.add(flower[1]);
everything.add(flower[2]);
flowerPatch.position.set(5,.1,5);
everything.add(flowerPatch);

//smaller plant
var petal2 = [];
var petal2Number = 10;
var plant2 = new THREE.Object3D();
var bloom2 = .5;

for (var i = 0; i < petal2Number; i++){
  petal2[i] = new THREE.Mesh(
      new THREE.OctahedronGeometry(1),
      new THREE.MeshLambertMaterial()
      );

  petal2[i].geometry.vertices[0].set(0.8,bloom2,0);
  petal2[i].geometry.vertices[1].set(-0.8,bloom2,0);
  petal2[i].geometry.vertices[2].set(0,0.05,0.5);
  petal2[i].geometry.vertices[3].set(0,-0.3,-0.5);
  petal2[i].geometry.vertices[4].set(0,-0.3,0.5);
  petal2[i].geometry.vertices[5].set(0,0.05,-0.5);

  var petal2Scale = (petal2Number - i + 1) / 50;
  petal2[i].scale.set(petal2Scale,petal2Scale,petal2Scale);
  petal2[i].material.color.setRGB(i/15,i/15,1);
  petal2[i].position.y = i/100;
  petal2[i].rotation.y = i*pi*phi;
  plant2.add(petal2[i]);
};
plant2.scale.set(10,10,10);
plant2.position.set(10,0,-10)
everything.add(plant2);

everything.scale.set(c,c,c);
everything.position.y = -0.1;
scene.add(everything);


var win = 0;

/*
Request animation frame loop function
*/
function animate() {

  //Update VR headset position and apply to camera.
  controls.update();

  // Render the scene through the VREffect.
  effect.render( scene, camera );
  requestAnimationFrame( animate );
}

animate();	// Kick off animation loop




/*
Listen for click event to enter full-screen mode.
We listen for single click because that works best for mobile for now
*/
// document.body.addEventListener( 'click', function(){
//   effect.setFullScreen( true );
// })

/*
Listen for keyboard events
*/
function onkey(event) {
  event.preventDefault();

  if (event.keyCode == 90) { // z
    controls.resetSensor(); //zero rotation
  } else if (event.keyCode == 70 || event.keyCode == 13) { //f or enter
    effect.setFullScreen(true) //fullscreen
  } else if (event.keyCode == 32){ //space
    intro.play();
  } else if (event.keyCode == 80){ //p
    intro.pause();
    intro.currentTime = 0;
  }
};
window.addEventListener("keydown", onkey, true);

/*
Handle window resizes
*/
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  effect.setSize( window.innerWidth, window.innerHeight );
}
window.addEventListener( 'resize', onWindowResize, false );
