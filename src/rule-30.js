import p5 from 'p5';
import _ from 'lodash/fp';
import "./rule-30.scss";

const canvas = document.getElementById('canvas');
const size = 700;

//const nSide = 81;
const nSide = 41;
const sqGrowth = 50; // %

const sqSide = size/nSide;

const grid = _.times(()=>_.times(()=>0, nSide), nSide);
grid[0][nSide-1] = 1;
//grid[0][Math.floor(nSide/2)] = 1;
//grid[0]=_.times(()=>Math.round(Math.random()), nSide);
const rules = {
  '111': 0,
  '110': 0,
  '101': 0,
  '100': 1,
  '011': 1,
  '010': 1,
  '001': 1,
  '000': 0
};
for(let i=1; i<nSide; i++){
  for(let j=0; j<nSide; j++){
    let r = '';
    if(j===0){
      r += '0';
    }
    else{
      r += `${grid[i-1][j-1]}`;
    }
    r += `${grid[i-1][j]}`;
    if(j===nSide-1){
      r += '0';
    }
    else{
      r += `${grid[i-1][j+1]}`;
    }
    grid[i][j] = rules[r];
  }
}

const pad = sqSide*(100-sqGrowth)/200;

const sketch = p => {
  const drawRule30 = () => {
    for(let i=0; i<nSide; i++){
      for(let j=0; j<nSide; j++){
        //p.fill(0, 0, 0, 125);
        p.fill(255, 255, 255, 225);
        if(grid[i][j] === 1){
          //p.fill(p(p.random(105, 255), p.random(105, 255), p.random(105, 255), 125).random(105, 255), p.random(105, 255), p.random(105, 255), 125);
          p.fill(p.random(0, 105), p.random(0, 105), p.random(0, 105), 125);
        }
        p.square(j*sqSide+pad, i*sqSide+pad, sqSide*sqGrowth/100);
      }
    }
  };

  const r30Square = () => {
    p.scale(0.5, -0.5);
    p.translate(0, -2*size);
    drawRule30();
    p.resetMatrix();
    p.scale(0.5);
    drawRule30();

    p.resetMatrix();

    p.translate(size, 0);
    p.scale(-0.5, 0.5);

    drawRule30();
    p.resetMatrix();

    p.translate(size, size);
    p.scale(-0.5,-0.5);

    drawRule30();
  };

  p.setup = ()=>{
    p.createCanvas(size, size);
    p.background(254, 217, 255);
    p.noStroke();

  };
  p.draw = () => {
    p.background(254, 217, 255);
    r30Square();
  };
};

new p5(sketch, canvas);
