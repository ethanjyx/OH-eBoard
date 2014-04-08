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
    },

    userIndexInWaitingList: function() {
        var speakerStore = Ext.getStore('WaitingUsers');
        for (var i = speakerStore.getData().length - 1; i >= 0; i--) {
          if (speakerStore.getData().getAt(i).getData()['userObjectId'] === testapp.Facebook.userObjectId) {
            return i;
          }
        };
      
        return -1;
    },
});