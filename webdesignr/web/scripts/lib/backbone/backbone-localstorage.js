Backbone.LocalStorage = function(name) {
  this.name = name;
  var store = localStorage.getItem(this.name);
  this.data = (store && JSON.parse(store)) || {};
};

_.extend(Backbone.LocalStorage.prototype, {

    S4: function() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    },

    getUuid: function() {
        return (this.S4()+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+this.S4()+this.S4());
    },

    save: function() {
        localStorage.setItem(this.name, JSON.stringify(this.data));
    },

    create: function(model) {
        if (!model.id) model.set(model.idAttribute, this.getUuid());
        this.data[model.id] = model;
        this.save();
        return model;
    },

    update: function(model) {
        this.data[model.id] = model;
        this.save();
        return model;
    },

    find: function(model) {
        return this.data[model.id];
    },

    findAll: function() {
        return _.values(this.data);
    },

    destroy: function(model) {
        delete this.data[model.id];
        this.save();
        return model;
    }

});