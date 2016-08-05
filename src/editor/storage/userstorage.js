var util = util ||  {};
util.userstorage = util.userstorage || function( prefix ) {
  var self = this;
  var prefix = prefix;
  var json = new util.storage();

  this.getAllItems = function() {
    var items = [];
    for ( var item in localStorage) {
      if ( startsWith ( item, prefix ) ) {
        var key = self.getItem( item );
        var value = [key, ';', self.getItem( key )];
        items.push( value.join( '' ) );
      }
    }

    return items;
  };

  var startsWith = function( key, value ) {
    return (key.indexOf(value) == 0);
  };

  this.getPrefix = function() {
    return prefix;
  };

  this.addItem = function( category, key ) {
      localStorage[prefix + category] = key;
  };

  this.getItem = function( key ) {
    return localStorage.getItem( key );
  };

  this.removeItem = function( key ) {
    localStorage.removeItem( key );
  };

  this.clear = function( exportToJSON ) {
    if ( exportToJSON ) {
      var items = self.getAllItems();
      json.exportStorage( items );
    }
    localStorage.clear();
  };

  this.export = function() {
    var result = true;

    try {
      var items = self.getAllItems();
      json.exportStorage( items );
    }
    catch(err) {
      console.log("userstorage export: " + err.message);
      result = false;
    }

    return result;
  };

  this.import = function() {
    var result = true;

    try {
      self.clear( false );
      var importItems = json.importStorage();
      importItems.forEach( function( item ) {
        var keys = item.split(';');
        if ( keys.length >= 2) {
          this.addItem( keys[0], keys.shift().join( ';' ) );
        }
      });
    }
    catch(err) {
      console.log("userstorage export: " + err.message);
      result = false;
    }

    return result;
  };
};
