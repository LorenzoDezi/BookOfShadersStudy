
import { _decorator, Component, Node, lerp, math } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Noises')
export class Noises {

    static fract(x: number): number {
        x = Math.abs(x);
        return x - Math.floor(x);
    }

    static rand(x: number, randIntensity: number = 100000): number {
        return Noises.fract(Math.sin(x) * randIntensity);
    }

    static step(x: number): number {
        let i = Math.floor(x);
        let f = Noises.fract(i);
        return Noises.rand(i);
    }

    static mix(start, end, t) {
        return start * (1 - t) + end * t;
    }

    static linearNoise(x: number, randIntensity: number = 100000) : number {
        let i = Math.floor(x);
        let f = Noises.fract(i);
        return Noises.mix(Noises.rand(i, randIntensity), Noises.rand(i+1, randIntensity), f);
    }

    static smoothstep(t): number {
        return t*t*(3.0-2.0*t);
    }

    static smoothNoise(x: number, randIntensity: number = 100000) : number {
        let i = Math.floor(x);
        let f = Noises.fract(i);
        return Noises.mix(Noises.rand(i, randIntensity), Noises.rand(i+1, randIntensity), Noises.smoothstep(f));
    }


}
