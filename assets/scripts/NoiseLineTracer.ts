
import { _decorator, Component, Node, Graphics, CCFloat, CCInteger, lerp } from 'cc';
import { Noises } from './Noises';
const { ccclass, property, requireComponent, executeInEditMode } = _decorator;
 
@ccclass('NoiseLineTracer')
@requireComponent(Graphics)
@executeInEditMode
export class NoiseLineTracer extends Component {
    
    private graphics: Graphics;

    @property({visible: true, type: CCFloat})
    private width: number = 500;
    @property({visible: true, type: CCFloat})
    private height: number = 500;
    @property({visible: true, type: CCInteger})
    private noiseSteps: number = 100;
    @property({visible: true, type: CCInteger})
    private stepRes: number = 10;
    @property({visible: true, type: CCFloat})
    private randomIntensity: number = 1000;

    @property({visible: true})
    private smooth: boolean = true;

    onLoad() {
        this.graphics = this.getComponent(Graphics);
    }

    start() {
        this.draw();
    }

    onFocusInEditor() {
        this.draw();
    }

    private draw() {
        this.graphics.clear();
        let step = this.width / this.noiseSteps;
        this.graphics.moveTo(0, 0);
        for(let x = 0; x < this.width; x += step) {
            let xStart = x;
            let xEnd = x + step;
            let yStart = Noises.rand(xStart, this.randomIntensity);
            let yEnd = Noises.rand(xEnd, this.randomIntensity);
            for(let t = 0; t < 1; t += 1/this.stepRes) {
                this.addPoint(t, yStart, yEnd, xStart, xEnd);
            }
        }
        this.graphics.stroke();    
    }

    private addPoint(t: number, yStart: number, yEnd: number, xStart: number, xEnd: number) {
        let tY = this.smooth ? Noises.smoothstep(t) : Noises.step(t);
        let v = Noises.mix(yStart, yEnd, tY) * this.height;
        let u = Noises.mix(xStart, xEnd, t);
        this.graphics.lineTo(u, v);
    }

    update(dt: number) {
        this.draw();
    }
}
