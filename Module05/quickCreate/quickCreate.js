import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class QuickCreate extends LightningElement {
    viewAllAccFields = false; accLabel = 'View All Fields';
    viewAllOppFields = false; oppLabel = 'View All Fields';
    viewAllConFields = false; conLabel = 'View All Fields';
    handleSuccess(event) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: ' Record is Succesfully Added ..',
                variant: 'success'
            })
        );
        // handleReset();
        const fields = this.template.querySelectorAll('lightning-input-field');
        fields.forEach(element => {
            element.reset();
        });
    }
    handleAccFields() {
        this.viewAllAccFields = (this.viewAllAccFields == true) ? false : true;
        this.accLabel = (this.accLabel == 'View All Fields') ? 'Hide All Fields' : 'View All Fields';
    }
    handleOppFields() {
        this.viewAllOppFields = (this.viewAllOppFields == true) ? false : true;
        this.oppLabel = (this.oppLabel == 'View All Fields') ? 'Hide All Fields' : 'View All Fields';
    }
    handleConFields() {
        this.viewAllConFields = (this.viewAllConFields == true) ? false : true;
        this.conLabel = (this.conLabel == 'View All Fields') ? 'Hide All Fields' : 'View All Fields';
    }
    handleReset(){
        const fields = this.template.querySelectorAll('lightning-input-field');
        fields.forEach(element => {
            element.reset();
        });
    }
}