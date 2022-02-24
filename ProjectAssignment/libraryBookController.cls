/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 02-23-2022
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class libraryBookController {
public libraryBookController() {

}
@AuraEnabled(cacheable=true)
public static List<Books__c> getBooks(string booktitle){
    List<Books__c> book = new List<Books__c> ();
    try {
        String KeyString = '%' +  booktitle + '%';
        if(String.isBlank(KeyString)){
            book = [select id,Name,image_url__c,Author__c,Publisher__c,ISBN13__c,Year_Published__c,
        Average_Rating__c from Books__c where AddedToLibrary__c = true LIMIT 30];
        }else{
            book = [select id,Name,image_url__c,Author__c,Publisher__c,ISBN13__c,Year_Published__c,
            Average_Rating__c from Books__c where Name like:KeyString and AddedToLibrary__c = true LIMIT 30];
        }
        
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
    return book;
}
@AuraEnabled(cacheable=true)
    public static List<sObject> search(String searchTerm, String filter) {
        String myQuery = null;
        if(filter != null && filter != ''){
            myQuery = 'Select Id, Name,AddedToLibrary__c from Books__C Where Name Like  \'%' + searchTerm + '%\' AND '+filter+' LIMIT  5';
        }
        else {
            if(searchTerm == null || searchTerm == ''){
                myQuery = 'Select Id, Name,AddedToLibrary__c from Books__C Where LastViewedDate != NULL ORDER BY LastViewedDate DESC LIMIT  5';
            }
            else {
                myQuery = 'Select Id, Name,AddedToLibrary__c from Books__C Where Name Like  \'%' + searchTerm + '%\' LIMIT  5';
            }
        }
        List<sObject> lookUpList = database.query(myQuery);
        return lookUpList;
    }
}
