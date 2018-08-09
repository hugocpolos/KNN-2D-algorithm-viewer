var mode = 0;
const div = 10;
var K = 9;
var Flood = 0; 
function setup(){
	mode = 0;
	K = 9;
	Flood = 0; 
	createCanvas(600,600);
	
	data = [];
}

function draw(){
	background(255);
	loadGrid();
	for (let i = 0; i<data.length; i++){
		data[i].display();
	}

	if(Flood){
		runFlood();
	}
	
	
	showMode();
	showFlood();
	showK();

	//debugmouse();
}

function mousePressed(){
	switch(mode){
		case 0: //true mode
			data.push(new Point(mouseX, mouseY, true));
			break;
		case 1: //false mode
			data.push(new Point(mouseX, mouseY, false));
			break;
		case 2: //learn mode
			let valid = KNN(mouseX, mouseY)
			data.push(new Point(mouseX, mouseY, valid));
			break;
		default:
			break;
	}
	
}

function keyPressed(){
	if(key == 'X'){
		mode = (mode + 1)% 3;
	}
	if(key == 'Z'){
		console.log("x\n");
		K = (K + 2) % 10;
	}
	if(key == 'S'){
		Flood = (Flood + 1) % 2;
	}
	if(key == 'R'){
		setup();
	}
}

function loadGrid(){
	stroke("#BEBEBE");
	for(var i = 0; i <= div; i++){
		line(i * (width/div),0 , i * (width/div),height);
		line(0, i * (height/div), width, i * (height/div));
	}
}
function showMode(){
	switch(mode){
		case 0:
			text("mode: True",10,height - 20);
			break;
		case 1:
			text("mode: False",10,height - 20);
			break;
		case 2:
			text("mode: Learn",10,height - 20);
			break;
		default:break;
	}
	
}

function showFlood(){
	switch(Flood){
		case 0:
			text("Flood: Off",10,height - 60);
			break;
		case 1:
			text("Flood: On",10,height - 60);
		default: break;
	}
}

function showK(){
	text("K: "+ K, 10, height - 40);
}

function debugmouse(){
	var x = map(mouseX, 0, width, 0, 1);
	var y = map(mouseY, 0, height, 0, 1);
	text("x:" + x + "\ny:" + y, mouseX,mouseY);
}

function KNN(x,y){
	let dist_arr=[];
	let cont_true = 0;
	let cont_false = 0;
	for(let i = 0; i < data.length; i++){
		let item = [dist(x, y, data[i].x, data[i].y), data[i].valid]
		dist_arr.push(item);
	}
	dist_arr.sort();
	if (dist_arr.length < K){
		sample = dist_arr.length;
		if(sample % 2 == 0){
			sample--;
		}
	}else{
		sample = K;
	}
	for (i = 0; i < sample; i++){
		if (dist_arr[i][1] == true){
			cont_true++;
		}
		else{
			cont_false++;
		}
	}

	return cont_true > cont_false;
}

function runFlood(){
	let x = floor(random(width));
	let y = floor(random(height));
	let valid = KNN(x, y);
	data.push(new Point(x, y, valid));
}