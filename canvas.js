var canvas = document.querySelector('canvas');
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
// let width = window.innerWidth;
// let height = window.innerHeight;
// canvas.width = width;
// canvas.height = height;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
// c.beginPath();
// c.arc(300, 300, 30, 0 , Math.PI *2, false);
// c.fillStyle = 'green';
// c.fill();

var mouse = {
    x: undefined,
    y: undefined
}

let maxRadius = 40;
// let minRadius = 3;

var colorArray = [
    '#01BEFE',
    '#FFDD00',
    '#FF7D00',
    '#FF006D',
    '#ADFF02',
    '#8F00FF',
];

window.addEventListener('mousemove', function (){
    mouse.x = event.x;
    mouse.y = event.y;
    // console.log(mouse);
})

window.addEventListener('resize', function (){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

function Circle(x, y, dx, dy, r){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    this.minRadius = r;
    this.maxRadius = 30 + Math.random() * 10;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    
    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0 , Math.PI *2, false);
        c.fillStyle = this.color;
        c.fill();

    }
    this.update = function(){
        // circle.draw();
        if(this.x + this.r > innerWidth || this.x - this.r < 0){
            this.dx = -this.dx;
        }
        if(this.y + this.r > innerHeight || this.y - this.r < 0){
            this.dy = -this.dy;
        }
    
        this.x += this.dx;
        this.y += this.dy;

        //interaactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
            if (this.r < this.maxRadius){
                this.r += 1;
            }
        }
        else if (this.r > this.minRadius){
            this.r -=1;
        }

        this.draw();
    }
}
// var circle = new Circle(200, 200, 3, 3, 30);
// let r = Math.random() * 3 + 1;
// let x = (Math.random() * width);
// let dx = (Math.random() - 0.5) * 10;
// let y = (Math.random() * height);
// let dy = (Math.random() - 0.5) * 10;

var circleArray = [];
// for (let i = 0; i < 500; i++) {
//     let r = Math.random() * 5 + 2;
//     let x = (Math.random() * innerWidth);
//     let dx = (Math.random() - 0.5);
//     let y = (Math.random() * innerHeight);
//     let dy = (Math.random() - 0.5);
//     circleArray.push(new Circle(x, y, dx, dy, r));
// }

function init(){
    circleArray = [];
    for (let i = 0; i < 800; i++) {
    let r = Math.random() * 5 + 2;
    let x = (Math.random() * innerWidth);
    let dx = (Math.random() - 0.5);
    let y = (Math.random() * innerHeight);
    let dy = (Math.random() - 0.5);
    circleArray.push(new Circle(x, y, dx, dy, r));
}

}

flag = false;
function trigger(){
    if (flag == false)
        flag = true;
    else
        flag = false;
}

// console.log(circleArr
function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    // used to clear the screen every time this function is called
    // c.beginPath();
    // c.arc(x, y, r, 0 , Math.PI *2, false);
    // c.fillStyle = 'green';
    // c.fill();
    // if(x + r > width || x - r < 0){
    //     dx = -dx;
    // }
    // if(y + r > height || y - r < 0){
    //     dy = -dy;
    // }
    // x += dx;
    // y += dy;
    if(flag == true){
        c.beginPath();
        c.fillStyle = "black";
        c.fillRect(0, 0, innerWidth, innerHeight);
        c.stroke();
        document.querySelector('header').style.backgroundColor = 'rgb(235, 235, 235)'
        document.getElementsByClassName('btn')[0].style.backgroundColor = 'black'
        document.getElementsByClassName('btn')[0].style.color = 'white'
        document.getElementsByClassName('btn')[0].innerHTML = 'Normal'
    }
    else{
        document.querySelector('header').style.backgroundColor = 'rgb(82, 82, 82)'
        document.getElementsByClassName('btn')[0].style.backgroundColor = 'white'
        document.getElementsByClassName('btn')[0].style.color = 'black'
        document.getElementsByClassName('btn')[0].innerHTML = 'Dark'
        
    }
    for (let i = 0; i < circleArray.length; i++) {
       circleArray[i].update();
    }

}
init();
animate();