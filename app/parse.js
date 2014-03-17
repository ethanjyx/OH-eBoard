// Generated by CoffeeScript 1.7.1
(function() {
  var Parse;

  window.Parse = Parse = (function() {
    function Parse(applicationId, masterKey) {
      this.applicationId = applicationId;
      this.masterKey = masterKey;
      this.endpoint = 'https://api.parse.com/1/classes/';
    }

    Parse.prototype.create = function(args) {
      return Ext.Ajax.request({
        url: this.endpoint + args.className,
        method: 'POST',
        jsonData: args.object,
        success: function(result) {
          return args.success(JSON.parse(result.responseText));
        },
        error: args.error,
        headers: {
          'X-Parse-Application-Id' : this.applicationId,
          'X-Parse-REST-API-Key' : this.masterKey,
          'Content-Type' : 'application/json'
        }
      });
    };

    Parse.prototype.addToRelation = function(args) {
      return Ext.Ajax.request({
        url: this.endpoint + args.className,
        method: 'PUT',
        jsonData: args.object,
        success: function(result) {
          return args.success(JSON.parse(result.responseText));
        },
        error: args.error,
        headers: {
          'X-Parse-Application-Id' : this.applicationId,
          'X-Parse-REST-API-Key' : this.masterKey,
          'Content-Type' : 'application/json'
        }
      });
    };

    Parse.prototype.get = function(args) {
      return Ext.Ajax.request({
        url: this.endpoint + args.className + '/' + args.objectId,
        method: 'GET',
        success: (function(result) {
          return args.success(JSON.parse(result.responseText));
        }),
        error: args.error,
        headers: {
          'X-Parse-Application-Id' : this.applicationId,
          'X-Parse-REST-API-Key' : this.masterKey,
        }
      });
    };

    Parse.prototype.query = function(args) {
      return Ext.Ajax.request({
        url: this.endpoint + args.className,
        method: 'GET',
        success: function(result) {
          return args.success(JSON.parse(result.responseText));
        },
        error: args.error,
        headers: {
          'X-Parse-Application-Id' : this.applicationId,
          'X-Parse-REST-API-Key' : this.masterKey,
        }
      });
    };

    Parse.prototype.update = function(args) {
      return Ext.Ajax.request({
        url: this.endpoint + args.className + '/' + args.objectId,
        method: 'PUT',
        jsonData: args.object,
        success: function(result) {
          return args.success(JSON.parse(result.responseText));
        },
        error: args.error,
        headers: {
          'X-Parse-Application-Id' : this.applicationId,
          'X-Parse-REST-API-Key' : this.masterKey,
          'Content-Type' : 'application/json'
        }
      });
    };

    Parse.prototype.delete = function(args) {
      return Ext.Ajax.request({
        url: this.endpoint + args.className + '/' + args.objectId,
        method: 'DELETE',
        success: (function(result) {
          return args.success(JSON.parse(result.responseText));
        }),
        error: args.error,
        headers: {
          'X-Parse-Application-Id' : this.applicationId,
          'X-Parse-REST-API-Key' : this.masterKey,
          'Content-Type' : 'application/json'
        }
      });
    };

    return Parse;

  })();

}).call(this);
