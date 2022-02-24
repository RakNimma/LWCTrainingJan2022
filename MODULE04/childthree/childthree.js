import { LightningElement ,api} from 'lwc';

export default class Childthree extends LightningElement {
    @api label = "Select";
    varient = "success";
    @api childName = "ChildThree";

    @api childReset(){
        this.label = "Select";
        this.varient = "success";
    }

    handleClick(event){
        const event1 = new CustomEvent('childclick',
        {
            bubbles: true,
            composed: true,
            detail: this.label
        });
        this.dispatchEvent(event1);

        if (this.label === "Select"){
            this.label = "Deselect";
            this.varient = "destructive";
        }
        else{
            this.label = "Select";
            this.varient = "success";
        }
    }
}