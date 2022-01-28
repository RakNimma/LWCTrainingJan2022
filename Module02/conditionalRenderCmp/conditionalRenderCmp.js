import { LightningElement } from 'lwc';

export default class ConditionalRenderCmp extends LightningElement {
    isSame = false;
    address1;
    address2;
    lmark;
    zipcode;
    handleInputChange(event){
        const field = event.target.name;
        if (field === 'add1') {
            this.address1 = event.target.value;
        } else if (field === 'add2') {
            this.address2 = event.target.value;
        }
        else if (field === 'lmk') {
            this.lmark = event.target.value;
        }
        else if (field === 'zcode') {
            this.zipcode = event.target.value;
        }
    }
    handleChange(event){
        this.isSame = event.target.checked;
      
    }
}