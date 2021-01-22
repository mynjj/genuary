import p5 from 'p5';
import _ from 'lodash/fp';

const canvas = document.getElementById('canvas');
//const [width, height] = [600, 600];


const mountainsW = 0.5;
const mainW = 0.8;

const sketch = p => {
  const dx = 2; // px
  const size = p.windowWidth/dx;

  let steps = _.times(()=>_.times(_.constant(0), size), 3);
  const sinc =x=> x===0?1:Math.sin(x)/x;
  const c = 0.02;
  const b = 0;//0.01; // damping
  const k = dt=>c*dt/dx;
  const alpha = dt=>b*dt;
  /*
    Stencil

    Variables:
        [p]
    [x] [y] [z]
  */
  const u = ({p, x, y, z, dt})=>{
    const ks = (x=>x*x)(k(dt));
    const {cY, cP} = (a=>({
      cY: 2-2*ks-a,
      cP: a-1
    }))(alpha(dt));
    return ks*(x+z) + cY*y + cP*p;
  };



  p.setup = () => {
    //p.createCanvas(width, height);
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.stroke(105);
    p.strokeWeight(2);
  };
  const drawAt = y => {
    p.noFill();
    p.beginShape();
    p.curveVertex(0, y);
    p.curveVertex(0, y);
    for(let i=0; i<steps[2].length; i++){
      p.curveVertex(
        (i*dx)*mountainsW + p.windowWidth*(1-mountainsW)/2, y+steps[2][i]);
    }
    p.curveVertex(p.windowWidth, y);
    p.curveVertex(p.windowWidth, y);
    p.endShape();
  };

  const updateWave = dt=>{
    steps[0] = _.clone(steps[1]);
    steps[1] = _.clone(steps[2]);
    for(let i=0; i<size; i++){
      const x = i===0?0:steps[1][i-1];
      const z = i===size-1?0:steps[1][i+1];
      steps[2][i] = u({
        p: steps[0][i],
        x,
        y: steps[1][i],
        z,
        dt
      });
    }
  };
  p.draw = () => {
    p.background(0);
    //drawAt(height/2);
    for(let y=30; y<p.windowHeight-30; y+=20){
      drawAt(y);
    }

    updateWave(p.deltaTime);
  };
  p.mouseClicked = ()=>{
    steps[0] = _.times(i=>steps[1][i]-2*sinc((i*dx-p.mouseX)/8), size);
    steps[1] = _.times(i=>steps[1][i]-2*sinc((i*dx-p.mouseX)/8), size);
  };
  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};

new p5(sketch, canvas);
