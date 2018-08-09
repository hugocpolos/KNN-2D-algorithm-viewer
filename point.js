class Point{
	constructor(x,y, mode){
		this.x = x;
		this.y = y;
		if (mode != 42){
			this.valid = mode;
			this.learn = false;
		}
		else{
			this.learn = true;
		}

	}
	display(){
		if (this.valid){
			fill(0,255,0);
		}
		else if(!this.valid){
			fill(255,0,0);
		}
		ellipse(this.x,this.y,6,6);
		fill(0);
	}
}