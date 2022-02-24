import { LightningElement ,api} from 'lwc';

export default class ParentOne extends LightningElement {
    childOneSel = "Deselected";
    childTwoSel = "Deselected";
    childThreeSel = "Deselected";

    @api parentReset(){
        this.childOneSel = "Deselected";
        this.childTwoSel = "Deselected";
        this.childThreeSel = "Deselected";

        this.template.querySelector('c-childone').childReset();
        this.template.querySelector('c-childtwo').childReset();
        this.template.querySelector('c-childthree').childReset();
    }

    handleChild(event){
        switch(event.target.childName){
            case "ChildOne":
                event.target.label === "Select" ? this.childOneSel = "Selected" : this.childOneSel = "Deselected";
                break;
            case "ChildTwo":
                event.target.label === "Select" ? this.childTwoSel = "Selected" : this.childTwoSel = "Deselected";
                break;
            case "ChildThree":
                event.target.label === "Select" ? this.childThreeSel = "Selected" : this.childThreeSel = "Deselected";
                break;
        }
    }
}