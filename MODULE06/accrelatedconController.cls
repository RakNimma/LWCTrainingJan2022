/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 02-25-2022
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class accrelatedconController {
    public accrelatedconController() {

    }
    @AuraEnabled(cacheable=true)
    public static List<sObject> search(String searchTerm, String filter) {
        String myQuery = null;
        if(filter != null && filter != ''){
            myQuery = 'Select Id, Name from Account Where Name Like  \'%' + searchTerm + '%\' AND '+filter+' LIMIT  5';
        }
        else {
            if(searchTerm == null || searchTerm == ''){
                myQuery = 'Select Id, Name from Account Where LastViewedDate != NULL ORDER BY LastViewedDate DESC LIMIT  5';
            }
            else {
                myQuery = 'Select Id, Name from Account Where Name Like  \'%' + searchTerm + '%\' LIMIT  5';
            }
        }
        List<sObject> lookUpList = database.query(myQuery);
        return lookUpList;
    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> findContacts(String accId) {
        System.debug('inapex'+accId);
        List<Contact> con =new List<Contact>();
        con = [
            SELECT Id, Name, Title, Phone, Email FROM Contact
            WHERE AccountId =:accId LIMIT 10 ];
            return con;

    }
}
