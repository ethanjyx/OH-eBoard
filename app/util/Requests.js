Ext.define('testapp.util.Requests', {
    singleton : true,

    loadWaitingUsers: function(courseObjectId, callback) {
      var speakerStore = Ext.getStore('WaitingUsers');
      var queryJoinTable = {
        courseOH: {
          __type:"Pointer",
          className:"courseOH",
          objectId:courseObjectId
        },
        history: false
      };

      speakerStore.getProxy().setExtraParams({
        where: JSON.stringify(queryJoinTable),
        include: 'user',
        order: 'createdAt',
      });
      speakerStore.load(callback);
    }
});