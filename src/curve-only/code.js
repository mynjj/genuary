import p5 from 'p5';
import _ from 'lodash/fp';

const canvas = document.getElementById('canvas');
const [width, height] = [800, 600];

const sinc = x=>x===0?1:Math.sin(x)/x;
const res = 4; // px
const curve = _.times(Math.floor(width/res));

const sketch = p => {
  p.setup = () => {
    p.createCanvas(width, height);
    p.background(0);
    p.color(255);
    p.stroke(255);
  };
  p.draw = () => {

  };
};

new p5(sketch, canvas);
