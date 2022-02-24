import { LightningElement ,wire} from 'lwc';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { updateRecord } from 'lightning/uiRecordApi';
import AddedToLibrary from '@salesforce/schema/Books__C.AddedToLibrary__c';
import ID_Field from '@salesforce/schema/Books__C.Id';
// Import message service features required for subscribing and the message channel
import {
    subscribe,
    publish,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext,
} from 'lightning/messageService';
import recordSelected from '@salesforce/messageChannel/SampleMessageChannel__c';
export default class BookComponent extends LightningElement {
    subscription = null;
    recordId;
    showpopup = false;
    name;

    @wire(MessageContext)
    messageContext;

    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                recordSelected,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );
        }
    }

    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }
    handleMessage(message) {
        this.recordId = message.recordId;
        this.name = message.recordName;
        
    }
    handleClick(event){
        this.showpopup = true;
    }
    handleSuccess(event){
        this.showpopup = false;
        const payload = { refresh:'refresh' };
        publish(this.messageContext, recordSelected, payload);
    }
    handleReset(event){
        this.showpopup = false;
    }
    handledelete(event){

        if (confirm("Book -"+this.recordId +"Will be removed from Library.Proceed ?") == true) {
            const fields = {};
        fields[ID_Field.fieldApiName] = this.recordId;
        fields[AddedToLibrary.fieldApiName] = false;
        const recordInput = { fields };
        updateRecord(recordInput)
                .then(() => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Book is Succesfully Removed From Library..',
                            variant: 'success'
                        })
                    );
                    const payload = { refresh:'refresh' };
                    publish(this.messageContext, recordSelected, payload);
                
                }).catch(error => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error removing record',
                            message: error.body.message,
                            variant: 'error'
                        })
                    );
                });
        }
        
    }
    // Standard lifecycle hooks used to subscribe and unsubsubscribe to the message channel
    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }

}