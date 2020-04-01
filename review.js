//hello world!  ※\(^o^)/※ (✿◠‿◠) （｡◑ヮ◑｡）(((o(*ﾟ▽ﾟ*)o))) (ﾉ◕ヮ◕)ﾉ*:・ﾟ✧ 
X = 880-40;
Y = 1710;
work = 0;


function setup(){
	myCanvas = createCanvas(X,Y );
	myCanvas.parent('review');

	textSize(22);
	textFont("monospace");


	BLACK = color(  20,   20,   20);
	WHITE = color(255, 255, 255);
	BLUE  = color(100,   0, 255);
	LIGHTBLUE = color(184, 215, 239)
	GREEN = color( 53, 227, 155);//(  0, 255,  80); //original green
	BACKGROUND = color(20,20,20); //(51, 51, 51)// color(180,150,200) 255, 230, 255 ;
	CIRCLE = color( 53, 227, 155);


	button2 = createButton("☀");
	button2.parent('review');
	button2.position(X-40,10);
	button2.style("background-color",BACKGROUND);
	button2.style("color", WHITE);
	button2.style("font-size", 18+"px");
	button2.mousePressed(darkmode);

	button5 = createButton("About & Tutorial");
	button5.parent('review');
	button5.position(X-236,10);
	button5.style("background-color",BACKGROUND);
	button5.style("color", WHITE);
	button5.style("font-family","monospace");
	button5.style("font-size", 18+"px");
	button5.mousePressed(aboutpage);

	button6 = createButton("Delete all Data (!)");
	button6.parent('review');
	button6.position(X/2-120,Y+100);
	button6.style("background-color",BACKGROUND);
	button6.style("color", WHITE);
	button6.style("font-family","monospace");
	button6.style("font-size", 14+"px");
	button6.mousePressed(deletealldata);

	windowResized()
	darkmode = false;
	goal = 0;
	update()
}
function update(){
	background(BACKGROUND);
	weekdata = [];
	reviewdata = [];
	cookie = getCookie("weekreview");
	//console.log("cookie",cookie);
	if(cookie.substr(0,4) == "time"){ 
		weekdata = (cookie.substr(4,cookie.length-1)).split('|');}
	
	//console.log(weekdata);
	if (weekdata.length != 0){
		reviewdata.push((weekdata[0].substr(11,weekdata[0].length)).split(':').map(Number)); //frist element can be added, but for the second one, we need to check if there were any days of inacticity 
		for(i = 1; i < weekdata.length ; i ++){ //calculate how many days was user inactive
			firstday = Date.parse(weekdata[i-1].substr(0,10));
			secondday =  Date.parse(weekdata[i].substr(0,10));
			console.log("firstday",firstday);
			numofempty = Math.floor((secondday-firstday)/86400000);
			console.log("numofempty", numofempty);
			for(n = 1; n< numofempty;n++){
				reviewdata.push("empty_day");
			}
		reviewdata.push((weekdata[i].substr(11,weekdata[i].length)).split(':').map(Number));
	}}
	//console.log("reviewdata",reviewdata);
	background(BACKGROUND);




	d = new Date();
	day = d.getDay();
	if (day == 0){
		day = 7;  // because I want sunday to be the last day of the week not the first 
	}
	for(g = 0; g < 7-day; g++){
		reviewdata.push("empty_day");
	}



	weektext = ["This week:", "Last week", "Week 3", "Week 4" ,"Week 5"];
	for(u = 1; u < 5; u++){
		draw_outline((X/2)-(X/6)*pow(-1,u),400 + 200*((u-1)+(u-2)));

 	}



}
function draw_outline(locx,locy){
	translate(locx,locy);

	noStroke();
	fill(WHITE);
	textSize(22);
	text(weektext[u-1] , -250*(u%2-1) - 350*(u%2),-80);

	R = X/10;
	//     middle, left,   up left                up right              right             down right             down left
	mov = [[-R/2-2.5, +R*0.866+5],[+R/2+2.5, +R*0.866+5],[+R+5,0],[+R/2+2.5, -R*0.866-5],[-R/2-2.5, -R*0.866-5],[-R-5,0],[0,0]];
	dname =["Sun.","Sat.","Fri.","Thu.","Wed.","Tue.","Mon."];
	for(z = 0; z < 7 ; z++ ){ // looks like we have some historical data to draw
		if (reviewdata[reviewdata.length-1] == "empty_day"){
			reviewdata.pop(); // cool, now we can remove it 
			stroke(CIRCLE);
			noFill();
			circle(mov[z][0],mov[z][1],R);
			noStroke();
			fill(CIRCLE);
			textSize(12);
			text(dname[z],mov[z][0]-10,mov[z][1]+5);

		}
		else if (reviewdata.length > 0 ){
				draw1day(reviewdata[reviewdata.length-1] ,mov[z]); //draw the last input first
				reviewdata.pop(); // cool, now we can remove it 

			}

		else{
			stroke(CIRCLE);
			noFill();
			circle(mov[z][0],mov[z][1],R);
			noStroke();
			fill(CIRCLE);
			textSize(12);
			text(dname[z],mov[z][0]-10,mov[z][1]+5);
		}
	}

	noStroke();
	fill(WHITE);
	if (work == 0){
			textSize(13);
			text("(no data yet)", -250*(u%2-1) - 350*(u%2),0 );
	}
	else{
	wh = Math.floor(work/60);
	wm = work-wh*60;
	fill(WHITE);
	textSize(19);
	text("-> "+ wh +"h, "+ wm +"m", -250*(u%2-1) - 350*(u%2),-50);
	work = 0;}

	translate(-locx,-locy);
}


function draw1day(a,loc){
	translate(loc[0],loc[1]);
	R = X/10;
	for (i = 0; i < a.length; i++){

		if (i == 0 && a[i] != 0){ // draw arc from the start of the day to the first time stamp  it must not be zero since that's midnight, and 0 to 0 draws a full circle
			stroke(WHITE);
			fill(WHITE)
			arc(0,0, R,R, (-PI/2), (-PI/2)+ ((a[i])/(24*60)) *(2*PI) , PIE);

		}
		else if(i%2 == 0 && a[i-1]!=a[i] && a[i] != 0){
			stroke(GREEN);
			fill(GREEN);
			arc(0,0, R,R,  (-PI/2)+ ((a[i-1])/(24*60)) *(2*PI),  (-PI/2)+ ((a[i])/(24*60)) *(2*PI) , PIE);
			if (i != a.length){
				work += (a[i] - a[i-1]);}
		}
		else if(i%2 == 1 && a[i-1]!=a[i] && a[i] != 0){
			stroke(WHITE);
			fill(WHITE);
			arc(0,0, R,R,  (-PI/2)+ ((a[i-1])/(24*60)) *(2*PI),  (-PI/2)+ ((a[i])/(24*60)) *(2*PI) , PIE);

		}

	}
	translate(-loc[0],-loc[1]);
}



function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function darkmode(){
	if (darkmode){
		BACKGROUND = BLACK;// color(180,150,200);
		CIRCLE = GREEN;
		darkmode = false;
		button2.style("color", WHITE);
		document.body.style.background = "#141414";
	}
	else{
		darkmode = true;
		//BACKGROUND = color(180,150,200);//darkerpink // few different pastel colors
		//BACKGROUND = color(151, 151, 200);//blue
		//BACKGROUND = color(180,150,200); //lightpurple
		BACKGROUND = LIGHTBLUE;//lightblue	
		CIRCLE = WHITE;
		//BACKGROUND = color(239, 184, 207);//lightpink
	document.body.style.background = "#b8d7ef";

	button2.style("color", BLACK);
	}
	update();
	button2.style("background-color",BACKGROUND);
	button5.style("background-color",BACKGROUND);
}

function aboutpage(){
window.open("https://onlinetimer.github.io/about.html");
}

function deletealldata() {
	var result = confirm("Are you sure you want to delete all data? \nThere is no way back.");
	if (result) {
		setCookie("weekreview","");
	}
	update();
}
function setCookie(cname, cvalue) {
  var d = new Date();
  d.setTime(d.getTime() + (29*24*60*60*1000)); //will be saved for 29 days of inactivity, but after that its not even visible anymore, so we can delete it
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/" +";";
}

function windowResized() {
	X = windowWidth;
	if (X > 880){
		X = 880 -40;
	}
	else{
		X = X-40;
	}
  	resizeCanvas(X,Y);
  	button2.position(X-40,10);
	button5.position(X-236,10);


  	update();
  }


function draw(){
	frameRate(0.1);
	update();

}