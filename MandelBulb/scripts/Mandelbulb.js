let easycam;

let N = 64;
let K = 200;

let mandelbulb = new Array();

let time1;
let time2;

class Spher{
    constructor(r, theta, phi){
        this.r = r;
        this.theta = theta;
        this.phi = phi;
    }
}

function sferical(x, y, z){
    let r = sqrt(x * x + y * y + z * z);
    let theta = atan2((x * x + y * y), z);
    let phi = atan2(y, x);

    return new Spher(r,theta,phi);
}

function setup(){
    createCanvas(600, 600, WEBGL);

  //  easycam = createEasyCam();

    for (let i = 0; i < N; i++){
        for (let j = 0; j < N; j++){
            let edge = false;
            for (let k = 0; k < N; k++){
                let x = map(i, 0, N, -1, 1);
                let y = map(j, 0, N, -1, 1);
                let z = map(k, 0, N, -1, 1);

                let zeta = createVector(0, 0, 0);
                
                let it = 0;
                let maxit = 20;
                while(true){
                    let spherz = sferical(zeta.x, zeta.y, zeta.z);

                    let n = 8;
                    let nx = pow(spherz.r, n) * sin(spherz.theta * n) * cos(spherz.phi * n);
                    let ny = pow(spherz.r, n) * sin(spherz.theta * n) * sin(spherz.phi * n);
                    let nz = pow(spherz.r, n) * cos(spherz.theta * n);

                    zeta.x = nx + x;
                    zeta.y = ny + y;
                    zeta.z = nz + z;

                    it++;

                    if (spherz.r > 2)
                    {
                        if (edge){
                            edge = false;
                        }
                        break;
                    }

                    if (it > maxit){
                        if (!edge){
                            edge = true;
                            mandelbulb.push(createVector(x, y, z));
                        }
                        break;
                    }
                    
                }
                
                
            }
        }
    }
}

function draw(){
    time1 = performance.now();
    console.log("1", time1);

    background(0);
    
    
    mandelbulb.forEach(function(v)
    {
        stroke(255);
        point(v.x * K, v.y * K, v.z * K);
        time2 = performance.now();
        console.log("2", time2 - time1);
    })
    
}