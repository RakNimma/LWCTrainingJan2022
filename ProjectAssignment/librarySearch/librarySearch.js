import { LightningElement, track, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getBooks from '@salesforce/apex/libraryBookController.getBooks';
const DELAY = 100;
import {
    subscribe,
    publish,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext,
} from 'lightning/messageService';
import recordSelected from '@salesforce/messageChannel/SampleMessageChannel__c';
export default class LibrarySearch extends LightningElement {
    booktitle = '';
    _wiredData;
    subscription = null;
    @track bookList= [];
    @wire (getBooks,{booktitle:'$booktitle'})
    retrieveAccounts(wireResult){
        const { data, error } = wireResult;
         this._wiredData = wireResult;
        if(data){
            this.bookList=data;         
        }
        else if(error){
  
        }
        
    }
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
            var res = message.respo;
            var val = message.refresh;
            console.log('inMsg'+res);
            console.log('inMsg2'+val);
            if(res =='bookadded'|| val =='refresh'){
                return refreshApex(this._wiredData);
            }
    }

    handleBooksearch(event){
        const searchString = event.target.value;
        window.clearTimeout(this.delayTimeout);
        this.delayTimeout = setTimeout(() => {
            this.booktitle = searchString; 
        }, DELAY);
    }
    handleClick(event){
        const payload = { recordId: event.target.title,
                          recordName: event.target.label };
        publish(this.messageContext, recordSelected, payload);
    }
    // Standard lifecycle hooks used to subscribe and unsubsubscribe to the message channel
    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }
}