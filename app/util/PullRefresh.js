Ext.define('testapp.util.PullRefresh', {    override: 'Ext.plugin.PullRefresh',


    onLatestFetched: function(operation) {
        var store           = this.getList().getStore(),
            oldRecords      = store.getData(),
            old_length      = oldRecords.length,
            newRecords      = operation.getRecords(),
            length          = newRecords.length,
            toInsert        = [],
            newRecordIds    = [],
            oldRecordsArr   = [],
            toRemove        = [],
            newRecord, newRecordIndex, oldRecord, i;

        for (i = 0; i < length; i++) {
            newRecord = newRecords[i];
            oldRecord = oldRecords.getByKey(newRecord.getId());


            newRecordIds.push(newRecord.getId());


            if (oldRecord) {
                oldRecord.set(newRecord.getData());
            } else {
                toInsert.push(newRecord);
            }


            oldRecord = undefined;
        }

        store.insert(0, toInsert);
        oldRecordsArr = store.getRange();
        for (i = 0; i < old_length; i++) {
            oldRecord = oldRecordsArr[i];
            newRecordIndex = newRecordIds.indexOf(oldRecord.getId());


            if (newRecordIndex == undefined || newRecordIndex == -1) {
                toRemove.push(oldRecord);
            }


            oldRecord = undefined;
        }
        store.remove(toRemove);
        this.callParent(arguments); 
    }
});