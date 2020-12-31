(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.Zue = factory());
}(this, function () { 'use strict';
    var uid = 0;
    function Zue(options) {
        this._init(options);
    }
    Zue.prototype._init = function (options = {}) {
        this.$el = null;
        this.$children = [];

        this._uid = uid++;
        this._data = {};

        this.$options = {...options};

        this._initState();

        if (options.el) {
            this.$mount(options.el);
        }
    }
    Zue.prototype._initState = function () {
        this._initProps();
    }
    Zue.prototype._initProps = function () {
        var options = this.$options;
        var el = options.el;
    }
    Zue.version = '0.0.1';
    return Zue;
}))