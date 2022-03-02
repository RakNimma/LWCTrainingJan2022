import { LightningElement,wire } from 'lwc';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import CONTACT_NAME from '@salesforce/schema/Contact.Name';
import CONTACT_ID from '@salesforce/schema/Contact.Id';
import {MessageContext, publish} from 'lightning/messageService';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import recordSelected from '@salesforce/messageChannel/SampleMessageChannel__c';
export default class QuickContactCreate extends LightningElement {
    @wire(MessageContext)
    messageContext;
 
    contactNameField = CONTACT_NAME;
    contactIdField = CONTACT_ID;
    contactAPIName = CONTACT_OBJECT;
    contactId;

    handleSuccess(event) {
        event.preventDefault();
        const fieldValues = event.detail.fields;
        let fullName;
        if(fieldValues.FirstName.value ==''||fieldValues.FirstName.value == null){
             fullName = fieldValues.LastName.value;
        }else{
             fullName = fieldValues.FirstName.value + ' ' + fieldValues.LastName.value;
        }
        
        const payload = { name: fullName, id: event.detail.id };
        this.contactId = event.detail.id;
        publish(this.messageContext, recordSelected, payload);
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
    handleReset(){
        const fields = this.template.querySelectorAll('lightning-input-field');
        fields.forEach(element => {
            element.reset();
        });
    }
}