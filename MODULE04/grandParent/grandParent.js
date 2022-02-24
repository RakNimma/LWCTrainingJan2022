import { LightningElement } from 'lwc';

export default class GrandParent extends LightningElement {
    childCount = 0;

    handleChild(event){
        event.detail === "Select" ? this.childCount += 1 : this.childCount -= 1;
    }

    handleReset(event){
        this.childCount = 0;
        this.template.querySelector('c-parent-one').parentReset();
    }
}