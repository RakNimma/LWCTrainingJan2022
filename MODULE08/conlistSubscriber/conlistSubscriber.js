import { LightningElement,wire,track} from 'lwc';
import {createMessageContext, MessageContext, releaseMessageContext, subscribe, unsubscribe} from 'lightning/messageService';
import recordSelected from '@salesforce/messageChannel/SampleMessageChannel__c';
export default class ConlistSubscriber extends LightningElement {
    @wire(MessageContext) messageContext;
    subscription = null;
    subscribe = 'subscribe';
    unsubscribe = 'unsubscribe';
    messages = [];
    currentContact;
    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                recordSelected,
                (message) => this.handleMessage(message)
            );
        }
        this.subscribe ='subscribed';
        this.unsubscribe = 'unsubscribe';
    }
    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
        this.subscribe ='subscribe';
        this.unsubscribe = 'unsubscribed';
    }
    connectedCallback() {
        this.subscribeToMessageChannel();
    }
    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }
    handleMessage(message) {
        console.log('message'+message.contact);
        this.messages = [...this.messages, message];
        this.currentContact = message.name;
    }
    handleClear(){
        this.messages = null;
        this.currentContact = '';
    }
}