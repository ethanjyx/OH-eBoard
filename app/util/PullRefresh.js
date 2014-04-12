Ext.define('testapp.util.PullRefresh', {    override: 'Ext.plugin.PullRefresh',


    onLatestFetched: function(operation) {
        // on the Joined tab
        if(testapp.controller.Speakers.lastTabHit === 2) {
            var userCourseJoinStore = Ext.getStore('UserCourseJoin');
            userCourseJoinStore.load(function() {
                userCourseJoinStore.each(function (item) {
                    testapp.util.Requests.loadWaitingUsers(item.get('courseObjectId'),
                        function() {
                            item.set('queuePosition', testapp.util.Requests.userIndexInWaitingList() + 1);
                        }
                    );
                });
            });
            return;
        } 

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