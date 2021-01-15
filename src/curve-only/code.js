import p5 from 'p5';
import _ from 'lodash/fp';

const canvas = document.getElementById('canvas');
const [width, height] = [800, 600];

const sinc =x=> x===0?1:Math.sin(x)/x;
const res = 4; // px
let curves = _.times(()=>_.times(i=>0, width/res), 2);

const sketch = p => {
  p.setup = () => {
    p.createCanvas(width, height);
    p.stroke(255);
    p.strokeWeight(2);
  };
  const drawAt = y => {
    p.noFill();
    p.beginShape();
    for(let i=0; i<curves[1].length; i++){
      p.curveVertex(i*res, y+curves[1][i]);
    }
    p.endShape();
  };
  p.draw = () => {
    p.background(0);
    p.color(255);
    /*
    p.beginShape();
    p.noFill();
    for(let i=0; i<width; i+=5){
      p.curveVertex(i, p.random(0,10)+height/2+(2*100*p.abs(height/2-p.mouseY)/height)*sinc((i-p.mouseX)/8));
    }
    p.endShape();
    */
    ///////////////
    for(let y=20;y<height-10;y+=40){
      drawAt(y);
    }

    const c = 0.03;
    const k = p.deltaTime*p.deltaTime*c*c/(res*res);
    for(let i=0; i<curves[0].length; i++){
      const alpha = i+1>=curves[1].length?0:curves[1][i+1];
      const beta = i-1<0?0:curves[1][i-1];
      curves[0][i] = 2*(1-k)*curves[1][i] + k*(alpha+beta) - curves[0][i];
    }
    const t = _.clone(curves[0]);
    curves[0] = _.clone(curves[1]);
    curves[1] = t;
  };
  p.mouseClicked = ()=>{
    curves[0] = _.times(i=>0.5*sinc((i*res-p.mouseX)/8), width/res);
  };
};

new p5(sketch, canvas);
