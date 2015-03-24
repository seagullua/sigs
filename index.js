/**
 * Class for creating signals slots events
 * @constructor
 */
function Signal() {
    var _fns = [];

	function remove(arr, item) {
      for(var i = arr.length; i--;) {
          if(arr[i] === item) {
              arr.splice(i, 1);
          }
      }
	}
	
    /**
     * Connect current signal to the slot
     * @param fn
     */
    this.connect = function(fn) {
        _fns.push(fn);
    };
	
	this.disconnect = function(fn) {
		remove(_fns, fn);
	};

    /**
     * Emit event. Each argument will be passed to the slot
     */
    this.emit = function() {
        var a = this;
        var b = arguments;
        _fns.forEach(function(fn){
            //Reemit the signal
            if(fn instanceof Signal) {
                fn.emit.apply(fn, b);
            } else {
                fn.apply(a, b);
            }
        });
    }
}

module.exports = Signal;