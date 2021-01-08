import p5 from 'p5';
import _ from 'lodash/fp';
import './styles.scss';

const canvas = document.getElementById('canvas');

const [width, height] = [800, 600];
const [nW, nH] = [20, 20];
const fitRadius = Math.max(width/nW, height/nH);

let circles = _.times(()=>_.times(()=>new Array(), nW), nH);
const gY = i => (i+0.5)*fitRadius;
const gX = j => (j+0.5)*fitRadius;

const sketch = p => {
  const canvasDiag = p.dist(0, 0, width, height);
  const scaleRadius = d=>p.map(d, 0, canvasDiag, 0, 1.5);
  p.setup = () => {
    p.createCanvas(width, height);
    p.strokeWeight(3);
    p.stroke(15, 65, 10, 160);
    p.fill(15, 65, 10, 105);
  };


  const blastRadius = 200; // px
  const maxBlastSpeed = 200; // px/s
  const minBlastSpeed = 50; // px/s
  const blastDecay = 0.0001;// px/s^2
  const removeThreshold = 10; //px

  p.draw = () => {
    p.background(0);
    for(let i=0; i<nH; i++){
      const y = gY(i);
      for(let j=0; j<nW; j++){
        const x = gX(j);
        const radius = fitRadius*scaleRadius(p.dist(x, y, p.mouseX, p.mouseY));
        p.circle(x, y, radius);

        let toRemove = [];
        for(let k=0; k<circles[i][j].length; k++){
          const [u, up, color] = circles[i][j][k];
          p.fill(color);
          p.circle(x, y, radius+u);
          circles[i][j][k][0] += up*p.deltaTime;
          circles[i][j][k][1] -= blastDecay*p.deltaTime;
          if(up<0 && u < removeThreshold){
            toRemove.push(k);
          }
        }
        if(toRemove.length>0){
          circles[i][j] = circles[i][j].filter((v, i)=>!_.includes(i, toRemove));
        }
        p.fill(15, 65, 10, 105);
      }
    }
  };

  p.mouseClicked = () => {
    for(let i=0; i<nH; i++){
      const y = gY(i);
      for(let j=0; j<nW; j++){
        const x = gX(j);
        const d = p.dist(x, y, p.mouseX, p.mouseY);
        if(d > blastRadius){
          continue;
        }
        const toAdd = Math.floor(p.map(d, 0, 100, 5, 1));
        for(let k=0; k<toAdd; k++){
          const speed = p.map(k, 0, 4, minBlastSpeed/1000, maxBlastSpeed/1000);
          // [perturbation, perturbation speed, color]
          circles[i][j].push([0, speed, p.color(15, p.random(10, 50),10, 160)]);
        }
      }
    }
    console.log(circles);
  };
};

new p5(sketch, canvas);
