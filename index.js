function remove(arr, item) {
    for(var i = arr.length; i--;) {
        if(arr[i] === item) {
            arr.splice(i, 1);
        }
    }
}

/**
 * Class for creating signals slots events
 * @constructor
 */
function Signal() {
    this._fns = [];
}

/**
 * Connect current signal to the slot
 * @param fn
 */
Signal.prototype.connect = function(fn) {
    this._fns.push(fn);
};

Signal.prototype.disconnect = function(fn) {
    remove(this._fns, fn);
};

Signal.prototype._emitArguments = function(args) {
    var _fns = this._fns;
    var len = _fns.length;
    for(var i=0; i<len; ++i) {
        var fn = _fns[i];
        if(fn instanceof Signal) {
            fn._emitArguments(args);
        } else {
            var arg_len = args.length;
            if(arg_len == 0) {
                fn.call(this);
            } else if(arg_len == 1) {
                fn.call(this, args[0]);
            } else if(arg_len == 2) {
                fn.call(this, args[0], args[1]);
            } else {
                fn.apply(this, args);
            }
        }
    }
}

/**
 * Emit event. Each argument will be passed to the slot
 */
Signal.prototype.emit = function() {
    var b = arguments;
    this._emitArguments(b);
}

module.exports = Signal;
