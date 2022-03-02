import { api, LightningElement, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import lookUp from '@salesforce/apex/relatedOppController.search';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import STAGE_FIELD from '@salesforce/schema/Opportunity.StageName';
export default class AccRelatedOpp extends LightningElement {
    @api recordId;
    @api filter = '';
    @api searchPlaceholder='Search';
    @track pickvalues;
    @track selectedName;
    SelectedRecordId;
    @track records;
    @track isValueSelected;
    @track blurTimeout;
    searchTerm;
    @track items = [];
    @track selectedRec =[];
    //css
    @track boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus';
    @track inputClass = '';
    @wire(getPicklistValues, { recordTypeId: '012000000000000AAA', fieldApiName: STAGE_FIELD })
    pickval({ error, data }) {
        if (data) {
        this.error = undefined;
            this.pickvalues = data.values;
            console.log('values'+this.pickvalues);
        } else if (error) {
            this.error = error;
            this.pickvalues = undefined;
        }
    }
    
    @wire(lookUp, {searchTerm : '$searchTerm', recId : '$recordId'})
    wiredRecords({ error, data }) {
        if (data) {
            this.error = undefined;
            this.records = data;
            for(var i=0; i<data.length; i++) {
                console.log('id=' + data[i].Id);
                this.items.push({key:data[i].Id ,value:data[i]});                                  
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
        for (var rec in this.items) {
            if(this.items[rec].key == this.SelectedRecordId){
                 this.selectedRec = this.items[rec].value;
            }
        }
    }
    handleRemovePill() {
        this.isValueSelected = false;
    }

    onChange(event) {
        this.searchTerm = event.target.value;
    }
}