//hello world!  ※\(^o^)/※ (✿◠‿◠) （｡◑ヮ◑｡）(((o(*ﾟ▽ﾟ*)o))) (ﾉ◕ヮ◕)ﾉ*:・ﾟ✧ 
X = 1010;
Y = 1010;

a = []; // timestamps
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function setup(){
	
	myCanvas = createCanvas(X,Y );
	myCanvas.parent('timer');
	
	BLACK = color(  0,   0,   0);
	WHITE = color(255, 255, 255);
	BLUE =  color(  100,   0, 255);
	GREEN = color(53, 227, 155);//(  0, 255,  80); //original green
	BACKGROUND = color(20,20,20)// color(180,150,200) 255, 230, 255 ;
	
	button1 = createButton('START/STOP');
	button1.parent('timer');
	button1.position(21, 21+35);
	button1.style("background-color",BACKGROUND);
	button1.style("font-size", 30+ "px");
	button1.style("color", WHITE);
	button1.mousePressed(delo);
	
	button5 = createButton("About & Tutorial");
	button5.parent('timer');
	button5.position(X-220,2);
	button5.style("background-color",BACKGROUND);
	button5.style("color", WHITE);
	button5.style("font-size", 21+"px");
	button5.mousePressed(aboutpage);

	button2 = createButton("☀");
	button2.parent('timer');
	button2.position(X-40,2);
	button2.style("background-color",BACKGROUND);
	button2.style("color", WHITE);
	button2.style("font-size", 20+"px");
	button2.mousePressed(darkmode);

	button3 = createButton('▲ ');
	button3.parent('timer');
	button3.position(200,Y-98);
	button3.style("background-color",BACKGROUND);
	button3.style("font-size", 9+ "px");
	button3.style("color", WHITE);
	button3.mousePressed(goalplus);
	
	button4 = createButton('▼');
	button4.parent('timer');
	button4.position(200,Y-84 );
	button4.style("background-color",BACKGROUND);
	button4.style("font-size", 9+ "px");
	button4.style("color", WHITE);
	button4.mousePressed(goalminus);
	



	button2.mouseOver(b4);
	delo();
	wk = 0;
	wrn = false;
	wst = false;
	startTimer = 0;
	darkmode = false;
	goal = 0;
	windowResized();

}

function aboutpage(){
window.open("https://onlinetimer.github.io/about");
}

function b4(){
	var tid = setInterval(function(){
		textSize(16);
		fill(BACKGROUND);
		rect(X-124,27,100,30);
		fill(WHITE);
		text("(dark/light)",X-120,50)},10);
	setTimeout(function(){
     		clearInterval(tid)},300);
}


function windowResized() {
	X = windowWidth;
	Y = windowHeight;
	console.log(X,Y);
	if(X>Y){
		if (Y<600){
			X = X-10;
		}
		else{
		X = Y-10;}}
	Y = Y-10;
  	resizeCanvas(X,Y);
	button2.position(X-40,2);
	button3.position(200,Y-98);
	button4.position(200,Y-84);
	button5.position(X-220,2);
	R = Math.min(X,Y);
}
function goalplus(){
	goal ++;}
function goalminus(){
	goal --;}
function darkmode(){
	if (darkmode){
		BACKGROUND = color(20,20,20);// color(180,150,200);
		darkmode = false;
		button2.style("color", WHITE);
	}
	else{
		darkmode = true;
		//BACKGROUND = color(180,150,200);//darkerpink // few different pastel colors
		//BACKGROUND = color(151, 151, 200);//blue
		//BACKGROUND = color(180,150,200); //lightpurple
		BACKGROUND = color(184, 215, 239);//lightblue	
		//BACKGROUND = color(239, 184, 207);//lightpink
	button2.style("color", BLACK);
	}
	button1.style("background-color",BACKGROUND);
	button2.style("background-color",BACKGROUND);
	button3.style("background-color",BACKGROUND);
	button4.style("background-color",BACKGROUND);
	button5.style("background-color",BACKGROUND);


}
function delo(){
	d = new Date();
	minute = d.getMinutes();
	hour = d.getHours();
	sec = d.getSeconds();
	ctime = hour*60+minute;
	a.push(ctime);
	console.log("timestamp: ",a);
}

function draw() {
	frameRate(10);
	textSize(32);
	work = 0;
	background(BACKGROUND);
	for (x = 0; x < 5; x++){
		fill(100+10*x,x*50,255-x*5);
		text("TIMER! ヽ(•ᴗ•ヽ) ",20+x,42-x);}
	d = new Date();
	minute = d.getMinutes();
	hour = d.getHours();
	sec = d.getSeconds();
	fill(WHITE);
	text(addZero(hour)+":"+addZero(minute)+":"+addZero(sec), X/2.35, 40);
	noStroke()
	ctime = hour*60 +minute;
	for (i = 0; i <= a.length; i++){
		if (a[i]> ctime){ // midnight!! weird bugs appear when clock jumps to 0, so the page just reloads
			window.location.reload(false); }
		if (i == 0){ // draw arc from the start of the day to the first time stamp 
			stroke(WHITE);
			fill(WHITE)
			arc(X/2, Y/2, R/1.2,R/1.2, (-PI/2), (-PI/2)+ ((a[i])/(24*60)) *(2*PI) , PIE);

		}
		else if(i%2 == 0 && a[i-1]!=a[i]){
			stroke(GREEN);
			fill(GREEN);
			arc(X/2, Y/2, R/1.2,R/1.2,  (-PI/2)+ ((a[i-1])/(24*60)) *(2*PI),  (-PI/2)+ ((a[i])/(24*60)) *(2*PI) , PIE);
			if (i != a.length){
				work += (a[i] - a[i-1]);}
		}
		else if(i%2 == 1 && a[i-1]!=a[i]){
			stroke(WHITE);
			fill(WHITE);
			arc(X/2, Y/2, R/1.2,R/1.2,  (-PI/2)+ ((a[i-1])/(24*60)) *(2*PI),  (-PI/2)+ ((a[i])/(24*60)) *(2*PI) , PIE);

		}

		if (i == a.length-1 ){
			if(i%2 == 0){
				wrn = false;
				stroke(WHITE);
				fill(WHITE);
			}
			else{
				wrn = true;
				fill(GREEN);
				text("WORK TIME!",17,90+45);
				fill(WHITE);
				text("WORK TIME!",17+2,90-2+45);
				fill(GREEN);
				stroke(GREEN);
				if( a[i] != ctime){
					work += (ctime - a[i]);}
				}
			if ( a[i] != ctime){
				arc(X/2, Y/2, R/1.2,R/1.2,  (-PI/2)+ (a[i]/(24*60))*(2*PI),  (-PI/2)+(ctime/(24*60))*(2*PI) , PIE);
				fill(BACKGROUND);

			}
		}
	}
	noStroke();
	fill(WHITE);
	text("𝙶𝚘𝚊𝚕: "+goal+" 𝚑",20,Y-70);
	wh = Math.floor(work/60);
	wm = work-wh*60;
	fill(WHITE);
	text("𝚝𝚘𝚝𝚊𝚕 𝚠𝚘𝚛𝚔 𝚝𝚒𝚖𝚎: "+ addZero(wh) +":"+ addZero(wm),20, Y-20);
	if (goal > 0){
		gg = goal*60-work;
		if (gg>0){
			gh = Math.floor(gg/60);
			gm = gg - gh*60;
			text(addZero(gh)+":"+addZero(gm)+" 𝚕𝚎𝚏𝚝", X-200,Y-20);}
		else{
			fill(BLUE);
			text("(ﾉ◕ヮ◕)ﾉ*:・ﾟ✧", X-260,Y-20);
			fill(WHITE);
			text("𝙲𝚘𝚖𝚙𝚕𝚎𝚝𝚎!", X-200,Y-70);
			text("(ﾉ◕ヮ◕)ﾉ*:・ﾟ✧ ", X-260+2,Y-20-2);
		}

		
	}
	tt =  (hour*(60*60)+ minute*60+ sec)- startTimer;
	thour = Math.floor(tt/(60*60));
	tmin = Math.floor((tt- thour*(60*60))/60);
	tsec = tt - (thour*(60*60) + tmin*60);
	if (wrn == true && wst == false){
		startTimer = hour*60*60+ minute*60+ sec;
		wst = true;
	}
	else if (wrn == true && wst == true){
		fill(GREEN);
		text(addZero(thour)+":"+ addZero(tmin)+ ":" + addZero(tsec),20,180);
		fill(WHITE);
		text(addZero(thour)+":"+ addZero(tmin)+ ":" + addZero(tsec),20+2,180-2);
	}
	else if (wrn == false && wst == true){
		startTimer = hour*60*60+ minute*60+ sec;
		wst = false;
	}
	else if(wrn == false && wst == false){
		fill (WHITE);
		text(addZero(thour)+":"+ addZero(tmin)+ ":" + addZero(tsec),20,140);

	}

}
