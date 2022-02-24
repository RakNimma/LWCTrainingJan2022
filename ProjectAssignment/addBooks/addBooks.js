import lookUp from '@salesforce/apex/libraryBookController.search';
import { api, LightningElement, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { updateRecord } from 'lightning/uiRecordApi';
import AddedToLibrary from '@salesforce/schema/Books__C.AddedToLibrary__c';
import ID_Field from '@salesforce/schema/Books__C.Id';
import {
    publish,
    MessageContext,
} from 'lightning/messageService';
import recordSelected from '@salesforce/messageChannel/SampleMessageChannel__c';
export default class AddBooks extends LightningElement {
    @api filter = '';
    @api searchPlaceholder='Search';
    @track selectedName;
    SelectedRecordId;
    @track records;
    @track isValueSelected;
    @track blurTimeout;
    searchTerm;
    @track items = [];
    //css
    @track boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus';
    @track inputClass = '';

    @wire(MessageContext)
    messageContext;

    @wire(lookUp, {searchTerm : '$searchTerm', filter : '$filter'})
    wiredRecords({ error, data }) {
        if (data) {
            this.error = undefined;
            this.records = data;
            console.log('data'+JSON.stringify(data));
            let myMap = new Map();
            for(var i=0; i<data.length; i++) {
                console.log('id=' + data[i].Id);
                this.items.push({key:data[i].Id ,value:data[i].AddedToLibrary__c});
               // this.items = [...this.items ,{value: data[i].Id , label: data[i].AddedToLibrary__c}];                                   
            }  
            
        } else if (error) {
            this.error = error;
            this.records = undefined;
        }
    }
    handleClick() {
        this.searchTerm = '';
        this.inputClass = 'slds-has-focus';
        this.boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus slds-is-open';
    }
    onBlur() {
        this.blurTimeout = setTimeout(() =>  {this.boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus'}, 300);
    }
    onSelect(event) {
        let selectedId = event.currentTarget.dataset.id;
        this.SelectedRecordId = selectedId;
        let selectedName = event.currentTarget.dataset.value;
       /* const valueSelectedEvent = new CustomEvent('lookupselected', {detail:  selectedId });
        this.dispatchEvent(valueSelectedEvent);*/
        this.isValueSelected = true;
        this.selectedName = selectedName;
        if(this.blurTimeout) {
            clearTimeout(this.blurTimeout);
        }
        this.boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus';
    }
    handleAdd(){
        console.log('Record To be Added'+JSON.stringify(this.items));
        let sel;
        for (var rec in this.items) {
            if(this.items[rec].key == this.SelectedRecordId){
                 sel = this.items[rec].value;
            }
        }
        console.log('keys'+sel);
       // var val = this.items.get(this.SelectedRecordId);
        //var val2 = this.items.value(this.SelectedRecordId);
       // console.log('map'+val);
       // console.log('map2'+val2);
       if(sel == false){
        console.log('insidefalse');
        const fields = {};
        fields[ID_Field.fieldApiName] = this.SelectedRecordId;
        fields[AddedToLibrary.fieldApiName] = true;
        const recordInput = { fields };
        updateRecord(recordInput)
                .then(() => {
                    this.isValueSelected = false;
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Book is Succesfully Added To Library..',
                            variant: 'success'
                        })
                    );
                    const payload = {respo:'bookadded'};
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
       }else if(sel == true){
        this.isValueSelected = false;
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'warning',
                message: 'Book is already available in Library..',
                variant: 'warning'
            })
        );
       }
       
    }
    handleRemovePill() {
        this.isValueSelected = false;
    }

    onChange(event) {
        this.searchTerm = event.target.value;
    }
}