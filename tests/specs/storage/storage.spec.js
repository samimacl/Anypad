'use strict';

describe('storage Test', function () {
    it('should be anypad as prefix', function() {
      var storage = new util.userstorage( "anypad" );
      var prefix = storage.getPrefix();
      expect(prefix).toEqual( "anypad" );
    });

    it('should show one item', function() {
      var storage = new util.userstorage( "anypad:" );
      storage.clear( false );
      storage.addItem("config", "Test123");
      var items = storage.getAllItems();
      expect(items.length).toBe(1);
    });

    it('should get Test123', function() {
      var storage = new util.userstorage( "anypad:" );
      var item = storage.getItem( "anypad:config" );
      expect(item).toEqual( "Test123" );
    });

    it('should be empty', function() {
      var storage = new util.userstorage( "anypad:" );
      storage.removeItem( storage.getPrefix() + "config" );
      var items = storage.getAllItems();
      expect(items.length).toBe(0); 
    });

});
