/**
 * Created by Master on 24.12.2019.
 */

public with sharing class OperateWithLWC {
    class WrapperForInstance {
        private String name;
        private String secondName;
        private Integer index;
    }
    @AuraEnabled
    public static Boolean callToDb(String arrayOfItem, String typeOfObj) {
        List<WrapperForInstance> listOfInstance = (List<WrapperForInstance>) JSON.deserialize(arrayOfItem, List<WrapperForInstance>.class);
        Boolean isSuccess = false;
        if (typeOfObj.containsIgnoreCase('Contact')) {
            isSuccess = contactToDB(listOfInstance);
        }
        if (typeOfObj.containsIgnoreCase('Campaign')) {
            isSuccess = campaignToDB(listOfInstance);
        }
        return isSuccess;
    }

    private static Boolean contactToDB(List<WrapperForInstance>listWrap) {
        List<Contact>contacts = new List<Contact>();
        for (WrapperForInstance wrap : listWrap) {
            if (String.isNotBlank(wrap.name) && String.isNotBlank(wrap.secondName)) {
                contacts.add(new Contact(Email = wrap.secondName, LastName = wrap.name));
            }
        }
        if (contacts.size() > 0) {
            sendToDb(contacts);
            return true;
        }
        return false;
    }
    private static Boolean campaignToDB(List<WrapperForInstance>listWrap) {
        List<Campaign>campaigns = new List<Campaign>();
        for (WrapperForInstance wrap : listWrap) {
            if (String.isNotBlank(wrap.secondName)) {
                campaigns.add(new Campaign(Description = wrap.secondName, Name = wrap.name));
            }
        }
        if (campaigns.size() > 0) {
            if (sendToDb(campaigns)) {
                return true;
            }
        }
        return false;
    }


    private static Boolean sendToDb(List<SObject> listObj) {
        try {
            insert listObj;
            return true;
        } catch (DmlException e) {
            return false;
        }


    }


}