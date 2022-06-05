
import { _decorator, Component, Node, MeshRenderer, game } from 'cc';
const { ccclass, property, executeInEditMode } = _decorator;
 
@ccclass('MaterialTimeUpdater')
@executeInEditMode
export class MaterialTimeUpdater extends Component {
    
    @property({visible: true})
    private timePropertyName: string = "time";
    private renderer: MeshRenderer;

    onLoad() {
        this.renderer = this.getComponent(MeshRenderer);
    }

    update(dt: number) {
        this.renderer.material.setProperty(this.timePropertyName, game.totalTime);
    }
}
