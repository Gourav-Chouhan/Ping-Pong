const cvs = document.getElementById(
    "cvs");
const ctx = cvs.getContext("2d");
let onOffStatus = "On";
let aiStatus = !false;

let aiBar = new Bar(0);
let pBar = new Bar(cvs.height - 15);
let ball = new Ball();
let score = 0;
let barr = new Bar(cvs.height / 2);
let sidePannelLength = cvs.width * 0.20;
let spl = sidePannelLength;
let slider = document.getElementById(
    "slider");
slider.min = spl;
slider.max = cvs.width - pBar.w;
slider.oninput = function() {
    pBar.x = slider.value;
}

let ch = cvs.height;

function draw() {
    canvas();
    text();
    decoration();
    aiBar.moveAiBar();
    aiBar.show();
    pBar.move();
    pBar.show();
    ball.move();
    ball.show();
    if (ball.y > cvs.height) {
        if (confirm("Game over")) {
            ball.y = cvs.height / 2
        }
    }
}

function canvas() {
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(0, 0, cvs.width, cvs
        .height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, spl, cvs
        .height);
}

function text() {
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("P", spl / 3, ch * 0.1);
    ctx.fillText("I", spl / 3, ch * 0.17);
    ctx.fillText("N", spl / 3, ch * 0.24);
    ctx.fillText("G", spl / 3, ch * 0.31);
    ctx.fillText("P", spl / 3, ch * 0.42);
    ctx.fillText("O", spl / 3, ch * 0.49);
    ctx.fillText("N", spl / 3, ch * 0.56);
    ctx.fillText("G", spl / 3, ch * 0.63);
    ctx.font = "20px Arial";
    ctx.fillText("Score: ", spl * 0.1, ch *
        0.80);
    ctx.font = "37px Arial";
    ctx.fillText(score, spl / 3, ch *
        0.90);
}

function Bar(y) {
    this.x = cvs.width / 2;
    this.y = y;
    this.w = 100;
    this.h = 15;
    this.show = function() {
        if (aiStatus) {
            onOffStatus = "On";
        } else {
            onOffStatus = "Off";
        }
        document.getElementById("scr")
            .innerHTML = "Auto Mode: " +
            onOffStatus;
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, this.w,
            this.h);
    }
    this.mousemove = function(event) {
        if (event.clientX < spl) {
            this.x = spl;
        } else {
            this.x = event.clientX - this.w / 2;
        }
    }

    this.rot = function() {

        ctx.translate(this.x, this.y);
        ctx.rotate(10 * Math.PI / 180);

    }
    this.moveAiBar = function() {
        if (ball.x > spl + this.w / 2 &&
            ball
            .x <= cvs.width - this.w / 2 + ball
            .r) {
            if (this.x >= 0 && this.x + this
                .w <=
                cvs.width) {
                this.x = ball.x - this.w / 2;
            } else {
                this.x = ball.x - this.w / 2;
            }
        }
    }
    this.move = function() {

        if (aiStatus) {
            if (ball.x > spl + this.w / 2 &&
                ball
                .x <= cvs.width - this.w / 2 + ball
                .r) {
                if (this.x >= 0 && this.x + this
                    .w <=
                    cvs.width) {
                    this.x = ball.x - this.w / 2;
                } else {
                    this.x = ball.x - this.w / 2;
                }
            }
        }
    }
}

function Ball() {
    this.x = cvs.width / 2;
    this.y = cvs.height / 2;
    this.r = 20;
    this.vx = 4;
    this.vy = -5;
    this.show = function() {
        ctx.beginPath();
        ctx.fillStyle = "orangered";
        ctx.strokeStyle = "grey";
        ctx.arc(this.x, this.y, this.r, 0,
            Math.PI * 2, false);
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
    this.rot = function() {
        ctx.save();
        ctx.translate(0, this.y);
        ctx.rotate(10 * Math.PI / 180);

        ctx.translate(0, 0);
    }
    this.move = function() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x + this.r >= cvs.width ||
            this.x - this.r <= spl) {
            this.vx *= -1;
        }
        if ((this.y + this.r >= pBar.y &&
                this.x >= pBar.x && this.x <= pBar
                .x + pBar.w) || (this.y - this.r <=
                aiBar.y + aiBar.h && this.x >=
                aiBar.x && this.x <= aiBar.x +
                aiBar.w)) {
            this.vy *= -1;
            if (this.y + this.r >= pBar.y &&
                this.x >= pBar.x && this.x <= pBar
                .x + pBar.w) {
                score++;
            }
            document.getElementById("scr")
                .innerHTML = "Auto Mode: " +
                onOffStatus;
        }
    }
}

function movePlayer(event) {
    pBar.mousemove();
    //aiBar.x = event.clientX - pBar.w/2;
}

function decoration() {
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.moveTo(spl, cvs.height / 2);
    ctx.lineTo(cvs.width, cvs.height / 2);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(cvs.width / 2 + spl / 2, cvs
        .height / 2,
        120, 0, Math.PI * 2, false);
    ctx.stroke();
    ctx.closePath();
    ctx.lineWidth = 5;
    ctx.moveTo(spl, 0);
    ctx.lineTo(spl, cvs.height);
    ctx.stroke();
}

function ai() {
    aiStatus = !aiStatus;
}
if (ball.y + ball.r >= cvs.height) {
    game.clearInterval(draw);
}

let game = setInterval(draw, 1000 /
    60);