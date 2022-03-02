/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 03-02-2022
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class relatedOppController {
    public relatedOppController() {

    }
    @AuraEnabled(cacheable=true)
    public static List<sObject> search(String searchTerm,String recId) {
        String myQuery = null;
            if(searchTerm == null || searchTerm == ''){
                myQuery = 'Select Id, Name,Account.Name,StageName,CloseDate,Amount from Opportunity Where AccountId =: recId LIMIT  5';
            }
            else {
                myQuery = 'Select Id, Name,Account.Name,StageName,CloseDate,Amount from Opportunity Where Name Like  \'%' + searchTerm + '%\' and AccountId =: recId LIMIT  5';
            }
        List<sObject> lookUpList = database.query(myQuery);
        return lookUpList;
    }
}
