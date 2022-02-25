import lookUp from '@salesforce/apex/accrelatedconController.search';
import { api, LightningElement, track, wire } from 'lwc';
import findContacts from '@salesforce/apex/accrelatedconController.findContacts';
export default class AccountLookup extends LightningElement {
    @api filter = '';
    @api searchPlaceholder='Search';
    @track selectedName;
    SelectedRecordId;
    @track records;
    @track isValueSelected;
    @track blurTimeout;
    searchTerm;
    @track contacts;
    @track items = [];
    //css
    @track boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus';
    @track inputClass = '';
    @wire(lookUp, {searchTerm : '$searchTerm', filter : '$filter'})
    wiredRecords({ error, data }) {
        if (data) {
            this.error = undefined;
            this.records = data;
            console.log('data'+JSON.stringify(data));
            
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
    onChange(event) {
        this.searchTerm = event.target.value;
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
        console.log('selectedrecId'+selectedId);
        console.log('selectedrec'+this.SelectedRecordId);
        findContacts({ accId: selectedId})
            .then((result) => {
                console.log('result-->'+JSON.stringify(result));
                this.contacts = result;
                this.error = undefined;
            })
            .catch((error) => {
                this.error = error;
                this.contacts = undefined;
            });
    }
    handleclear(){
        this.isValueSelected = false;
        this.searchTerm = '';
    }
}