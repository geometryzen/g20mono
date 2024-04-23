new EventSource('/esbuild').addEventListener('change', () => location.reload());
"use strict";
(() => {
  // ../../node_modules/tslib/tslib.es6.mjs
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }
  function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  }
  function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() {
      if (t[0] & 1)
        throw t[1];
      return t[1];
    }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f)
        throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _)
        try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
            return t;
          if (y = 0, t)
            op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2])
                _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  }
  function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m)
      return m.call(o);
    if (o && typeof o.length === "number")
      return {
        next: function() {
          if (o && i >= o.length)
            o = void 0;
          return { value: o && o[i++], done: !o };
        }
      };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  }
  function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
      return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"]))
          m.call(i);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return ar;
  }
  function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar)
            ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  }
  function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
  }
  function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator)
      throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
      return this;
    }, i;
    function verb(n) {
      if (g[n])
        i[n] = function(v) {
          return new Promise(function(a, b) {
            q.push([n, v, a, b]) > 1 || resume(n, v);
          });
        };
    }
    function resume(n, v) {
      try {
        step(g[n](v));
      } catch (e) {
        settle(q[0][3], e);
      }
    }
    function step(r) {
      r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
      resume("next", value);
    }
    function reject(value) {
      resume("throw", value);
    }
    function settle(f, v) {
      if (f(v), q.shift(), q.length)
        resume(q[0][0], q[0][1]);
    }
  }
  function __asyncValues(o) {
    if (!Symbol.asyncIterator)
      throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
      return this;
    }, i);
    function verb(n) {
      i[n] = o[n] && function(v) {
        return new Promise(function(resolve, reject) {
          v = o[n](v), settle(resolve, reject, v.done, v.value);
        });
      };
    }
    function settle(resolve, reject, d, v) {
      Promise.resolve(v).then(function(v2) {
        resolve({ value: v2, done: d });
      }, reject);
    }
  }

  // ../../node_modules/rxjs/dist/esm5/internal/util/isFunction.js
  function isFunction(value) {
    return typeof value === "function";
  }

  // ../../node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js
  function createErrorClass(createImpl) {
    var _super = function(instance) {
      Error.call(instance);
      instance.stack = new Error().stack;
    };
    var ctorFunc = createImpl(_super);
    ctorFunc.prototype = Object.create(Error.prototype);
    ctorFunc.prototype.constructor = ctorFunc;
    return ctorFunc;
  }

  // ../../node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js
  var UnsubscriptionError = createErrorClass(function(_super) {
    return function UnsubscriptionErrorImpl(errors) {
      _super(this);
      this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function(err, i) {
        return i + 1 + ") " + err.toString();
      }).join("\n  ") : "";
      this.name = "UnsubscriptionError";
      this.errors = errors;
    };
  });

  // ../../node_modules/rxjs/dist/esm5/internal/util/arrRemove.js
  function arrRemove(arr, item) {
    if (arr) {
      var index = arr.indexOf(item);
      0 <= index && arr.splice(index, 1);
    }
  }

  // ../../node_modules/rxjs/dist/esm5/internal/Subscription.js
  var Subscription = function() {
    function Subscription3(initialTeardown) {
      this.initialTeardown = initialTeardown;
      this.closed = false;
      this._parentage = null;
      this._finalizers = null;
    }
    Subscription3.prototype.unsubscribe = function() {
      var e_1, _a, e_2, _b;
      var errors;
      if (!this.closed) {
        this.closed = true;
        var _parentage = this._parentage;
        if (_parentage) {
          this._parentage = null;
          if (Array.isArray(_parentage)) {
            try {
              for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                var parent_1 = _parentage_1_1.value;
                parent_1.remove(this);
              }
            } catch (e_1_1) {
              e_1 = { error: e_1_1 };
            } finally {
              try {
                if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return))
                  _a.call(_parentage_1);
              } finally {
                if (e_1)
                  throw e_1.error;
              }
            }
          } else {
            _parentage.remove(this);
          }
        }
        var initialFinalizer = this.initialTeardown;
        if (isFunction(initialFinalizer)) {
          try {
            initialFinalizer();
          } catch (e) {
            errors = e instanceof UnsubscriptionError ? e.errors : [e];
          }
        }
        var _finalizers = this._finalizers;
        if (_finalizers) {
          this._finalizers = null;
          try {
            for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
              var finalizer = _finalizers_1_1.value;
              try {
                execFinalizer(finalizer);
              } catch (err) {
                errors = errors !== null && errors !== void 0 ? errors : [];
                if (err instanceof UnsubscriptionError) {
                  errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
                } else {
                  errors.push(err);
                }
              }
            }
          } catch (e_2_1) {
            e_2 = { error: e_2_1 };
          } finally {
            try {
              if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return))
                _b.call(_finalizers_1);
            } finally {
              if (e_2)
                throw e_2.error;
            }
          }
        }
        if (errors) {
          throw new UnsubscriptionError(errors);
        }
      }
    };
    Subscription3.prototype.add = function(teardown) {
      var _a;
      if (teardown && teardown !== this) {
        if (this.closed) {
          execFinalizer(teardown);
        } else {
          if (teardown instanceof Subscription3) {
            if (teardown.closed || teardown._hasParent(this)) {
              return;
            }
            teardown._addParent(this);
          }
          (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
        }
      }
    };
    Subscription3.prototype._hasParent = function(parent) {
      var _parentage = this._parentage;
      return _parentage === parent || Array.isArray(_parentage) && _parentage.includes(parent);
    };
    Subscription3.prototype._addParent = function(parent) {
      var _parentage = this._parentage;
      this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
    };
    Subscription3.prototype._removeParent = function(parent) {
      var _parentage = this._parentage;
      if (_parentage === parent) {
        this._parentage = null;
      } else if (Array.isArray(_parentage)) {
        arrRemove(_parentage, parent);
      }
    };
    Subscription3.prototype.remove = function(teardown) {
      var _finalizers = this._finalizers;
      _finalizers && arrRemove(_finalizers, teardown);
      if (teardown instanceof Subscription3) {
        teardown._removeParent(this);
      }
    };
    Subscription3.EMPTY = function() {
      var empty = new Subscription3();
      empty.closed = true;
      return empty;
    }();
    return Subscription3;
  }();
  var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
  function isSubscription(value) {
    return value instanceof Subscription || value && "closed" in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe);
  }
  function execFinalizer(finalizer) {
    if (isFunction(finalizer)) {
      finalizer();
    } else {
      finalizer.unsubscribe();
    }
  }

  // ../../node_modules/rxjs/dist/esm5/internal/config.js
  var config = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: void 0,
    useDeprecatedSynchronousErrorHandling: false,
    useDeprecatedNextContext: false
  };

  // ../../node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js
  var timeoutProvider = {
    setTimeout: function(handler, timeout) {
      var args = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
      }
      var delegate = timeoutProvider.delegate;
      if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) {
        return delegate.setTimeout.apply(delegate, __spreadArray([handler, timeout], __read(args)));
      }
      return setTimeout.apply(void 0, __spreadArray([handler, timeout], __read(args)));
    },
    clearTimeout: function(handle) {
      var delegate = timeoutProvider.delegate;
      return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
    },
    delegate: void 0
  };

  // ../../node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js
  function reportUnhandledError(err) {
    timeoutProvider.setTimeout(function() {
      var onUnhandledError = config.onUnhandledError;
      if (onUnhandledError) {
        onUnhandledError(err);
      } else {
        throw err;
      }
    });
  }

  // ../../node_modules/rxjs/dist/esm5/internal/util/noop.js
  function noop() {
  }

  // ../../node_modules/rxjs/dist/esm5/internal/NotificationFactories.js
  var COMPLETE_NOTIFICATION = function() {
    return createNotification("C", void 0, void 0);
  }();
  function errorNotification(error) {
    return createNotification("E", void 0, error);
  }
  function nextNotification(value) {
    return createNotification("N", value, void 0);
  }
  function createNotification(kind, value, error) {
    return {
      kind,
      value,
      error
    };
  }

  // ../../node_modules/rxjs/dist/esm5/internal/util/errorContext.js
  var context = null;
  function errorContext(cb) {
    if (config.useDeprecatedSynchronousErrorHandling) {
      var isRoot = !context;
      if (isRoot) {
        context = { errorThrown: false, error: null };
      }
      cb();
      if (isRoot) {
        var _a = context, errorThrown = _a.errorThrown, error = _a.error;
        context = null;
        if (errorThrown) {
          throw error;
        }
      }
    } else {
      cb();
    }
  }
  function captureError(err) {
    if (config.useDeprecatedSynchronousErrorHandling && context) {
      context.errorThrown = true;
      context.error = err;
    }
  }

  // ../../node_modules/rxjs/dist/esm5/internal/Subscriber.js
  var Subscriber = function(_super) {
    __extends(Subscriber2, _super);
    function Subscriber2(destination) {
      var _this = _super.call(this) || this;
      _this.isStopped = false;
      if (destination) {
        _this.destination = destination;
        if (isSubscription(destination)) {
          destination.add(_this);
        }
      } else {
        _this.destination = EMPTY_OBSERVER;
      }
      return _this;
    }
    Subscriber2.create = function(next, error, complete) {
      return new SafeSubscriber(next, error, complete);
    };
    Subscriber2.prototype.next = function(value) {
      if (this.isStopped) {
        handleStoppedNotification(nextNotification(value), this);
      } else {
        this._next(value);
      }
    };
    Subscriber2.prototype.error = function(err) {
      if (this.isStopped) {
        handleStoppedNotification(errorNotification(err), this);
      } else {
        this.isStopped = true;
        this._error(err);
      }
    };
    Subscriber2.prototype.complete = function() {
      if (this.isStopped) {
        handleStoppedNotification(COMPLETE_NOTIFICATION, this);
      } else {
        this.isStopped = true;
        this._complete();
      }
    };
    Subscriber2.prototype.unsubscribe = function() {
      if (!this.closed) {
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
        this.destination = null;
      }
    };
    Subscriber2.prototype._next = function(value) {
      this.destination.next(value);
    };
    Subscriber2.prototype._error = function(err) {
      try {
        this.destination.error(err);
      } finally {
        this.unsubscribe();
      }
    };
    Subscriber2.prototype._complete = function() {
      try {
        this.destination.complete();
      } finally {
        this.unsubscribe();
      }
    };
    return Subscriber2;
  }(Subscription);
  var _bind = Function.prototype.bind;
  function bind(fn, thisArg) {
    return _bind.call(fn, thisArg);
  }
  var ConsumerObserver = function() {
    function ConsumerObserver2(partialObserver) {
      this.partialObserver = partialObserver;
    }
    ConsumerObserver2.prototype.next = function(value) {
      var partialObserver = this.partialObserver;
      if (partialObserver.next) {
        try {
          partialObserver.next(value);
        } catch (error) {
          handleUnhandledError(error);
        }
      }
    };
    ConsumerObserver2.prototype.error = function(err) {
      var partialObserver = this.partialObserver;
      if (partialObserver.error) {
        try {
          partialObserver.error(err);
        } catch (error) {
          handleUnhandledError(error);
        }
      } else {
        handleUnhandledError(err);
      }
    };
    ConsumerObserver2.prototype.complete = function() {
      var partialObserver = this.partialObserver;
      if (partialObserver.complete) {
        try {
          partialObserver.complete();
        } catch (error) {
          handleUnhandledError(error);
        }
      }
    };
    return ConsumerObserver2;
  }();
  var SafeSubscriber = function(_super) {
    __extends(SafeSubscriber2, _super);
    function SafeSubscriber2(observerOrNext, error, complete) {
      var _this = _super.call(this) || this;
      var partialObserver;
      if (isFunction(observerOrNext) || !observerOrNext) {
        partialObserver = {
          next: observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : void 0,
          error: error !== null && error !== void 0 ? error : void 0,
          complete: complete !== null && complete !== void 0 ? complete : void 0
        };
      } else {
        var context_1;
        if (_this && config.useDeprecatedNextContext) {
          context_1 = Object.create(observerOrNext);
          context_1.unsubscribe = function() {
            return _this.unsubscribe();
          };
          partialObserver = {
            next: observerOrNext.next && bind(observerOrNext.next, context_1),
            error: observerOrNext.error && bind(observerOrNext.error, context_1),
            complete: observerOrNext.complete && bind(observerOrNext.complete, context_1)
          };
        } else {
          partialObserver = observerOrNext;
        }
      }
      _this.destination = new ConsumerObserver(partialObserver);
      return _this;
    }
    return SafeSubscriber2;
  }(Subscriber);
  function handleUnhandledError(error) {
    if (config.useDeprecatedSynchronousErrorHandling) {
      captureError(error);
    } else {
      reportUnhandledError(error);
    }
  }
  function defaultErrorHandler(err) {
    throw err;
  }
  function handleStoppedNotification(notification, subscriber) {
    var onStoppedNotification = config.onStoppedNotification;
    onStoppedNotification && timeoutProvider.setTimeout(function() {
      return onStoppedNotification(notification, subscriber);
    });
  }
  var EMPTY_OBSERVER = {
    closed: true,
    next: noop,
    error: defaultErrorHandler,
    complete: noop
  };

  // ../../node_modules/rxjs/dist/esm5/internal/symbol/observable.js
  var observable = function() {
    return typeof Symbol === "function" && Symbol.observable || "@@observable";
  }();

  // ../../node_modules/rxjs/dist/esm5/internal/util/identity.js
  function identity(x) {
    return x;
  }

  // ../../node_modules/rxjs/dist/esm5/internal/util/pipe.js
  function pipeFromArray(fns) {
    if (fns.length === 0) {
      return identity;
    }
    if (fns.length === 1) {
      return fns[0];
    }
    return function piped(input) {
      return fns.reduce(function(prev, fn) {
        return fn(prev);
      }, input);
    };
  }

  // ../../node_modules/rxjs/dist/esm5/internal/Observable.js
  var Observable = function() {
    function Observable5(subscribe) {
      if (subscribe) {
        this._subscribe = subscribe;
      }
    }
    Observable5.prototype.lift = function(operator) {
      var observable2 = new Observable5();
      observable2.source = this;
      observable2.operator = operator;
      return observable2;
    };
    Observable5.prototype.subscribe = function(observerOrNext, error, complete) {
      var _this = this;
      var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
      errorContext(function() {
        var _a = _this, operator = _a.operator, source = _a.source;
        subscriber.add(operator ? operator.call(subscriber, source) : source ? _this._subscribe(subscriber) : _this._trySubscribe(subscriber));
      });
      return subscriber;
    };
    Observable5.prototype._trySubscribe = function(sink) {
      try {
        return this._subscribe(sink);
      } catch (err) {
        sink.error(err);
      }
    };
    Observable5.prototype.forEach = function(next, promiseCtor) {
      var _this = this;
      promiseCtor = getPromiseCtor(promiseCtor);
      return new promiseCtor(function(resolve, reject) {
        var subscriber = new SafeSubscriber({
          next: function(value) {
            try {
              next(value);
            } catch (err) {
              reject(err);
              subscriber.unsubscribe();
            }
          },
          error: reject,
          complete: resolve
        });
        _this.subscribe(subscriber);
      });
    };
    Observable5.prototype._subscribe = function(subscriber) {
      var _a;
      return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
    };
    Observable5.prototype[observable] = function() {
      return this;
    };
    Observable5.prototype.pipe = function() {
      var operations = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        operations[_i] = arguments[_i];
      }
      return pipeFromArray(operations)(this);
    };
    Observable5.prototype.toPromise = function(promiseCtor) {
      var _this = this;
      promiseCtor = getPromiseCtor(promiseCtor);
      return new promiseCtor(function(resolve, reject) {
        var value;
        _this.subscribe(function(x) {
          return value = x;
        }, function(err) {
          return reject(err);
        }, function() {
          return resolve(value);
        });
      });
    };
    Observable5.create = function(subscribe) {
      return new Observable5(subscribe);
    };
    return Observable5;
  }();
  function getPromiseCtor(promiseCtor) {
    var _a;
    return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
  }
  function isObserver(value) {
    return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
  }
  function isSubscriber(value) {
    return value && value instanceof Subscriber || isObserver(value) && isSubscription(value);
  }

  // ../../node_modules/rxjs/dist/esm5/internal/util/lift.js
  function hasLift(source) {
    return isFunction(source === null || source === void 0 ? void 0 : source.lift);
  }
  function operate(init) {
    return function(source) {
      if (hasLift(source)) {
        return source.lift(function(liftedSource) {
          try {
            return init(liftedSource, this);
          } catch (err) {
            this.error(err);
          }
        });
      }
      throw new TypeError("Unable to lift unknown Observable type");
    };
  }

  // ../../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js
  function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
    return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
  }
  var OperatorSubscriber = function(_super) {
    __extends(OperatorSubscriber2, _super);
    function OperatorSubscriber2(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
      var _this = _super.call(this, destination) || this;
      _this.onFinalize = onFinalize;
      _this.shouldUnsubscribe = shouldUnsubscribe;
      _this._next = onNext ? function(value) {
        try {
          onNext(value);
        } catch (err) {
          destination.error(err);
        }
      } : _super.prototype._next;
      _this._error = onError ? function(err) {
        try {
          onError(err);
        } catch (err2) {
          destination.error(err2);
        } finally {
          this.unsubscribe();
        }
      } : _super.prototype._error;
      _this._complete = onComplete ? function() {
        try {
          onComplete();
        } catch (err) {
          destination.error(err);
        } finally {
          this.unsubscribe();
        }
      } : _super.prototype._complete;
      return _this;
    }
    OperatorSubscriber2.prototype.unsubscribe = function() {
      var _a;
      if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
        var closed_1 = this.closed;
        _super.prototype.unsubscribe.call(this);
        !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
      }
    };
    return OperatorSubscriber2;
  }(Subscriber);

  // ../../node_modules/rxjs/dist/esm5/internal/util/ObjectUnsubscribedError.js
  var ObjectUnsubscribedError = createErrorClass(function(_super) {
    return function ObjectUnsubscribedErrorImpl() {
      _super(this);
      this.name = "ObjectUnsubscribedError";
      this.message = "object unsubscribed";
    };
  });

  // ../../node_modules/rxjs/dist/esm5/internal/Subject.js
  var Subject = function(_super) {
    __extends(Subject2, _super);
    function Subject2() {
      var _this = _super.call(this) || this;
      _this.closed = false;
      _this.currentObservers = null;
      _this.observers = [];
      _this.isStopped = false;
      _this.hasError = false;
      _this.thrownError = null;
      return _this;
    }
    Subject2.prototype.lift = function(operator) {
      var subject = new AnonymousSubject(this, this);
      subject.operator = operator;
      return subject;
    };
    Subject2.prototype._throwIfClosed = function() {
      if (this.closed) {
        throw new ObjectUnsubscribedError();
      }
    };
    Subject2.prototype.next = function(value) {
      var _this = this;
      errorContext(function() {
        var e_1, _a;
        _this._throwIfClosed();
        if (!_this.isStopped) {
          if (!_this.currentObservers) {
            _this.currentObservers = Array.from(_this.observers);
          }
          try {
            for (var _b = __values(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) {
              var observer = _c.value;
              observer.next(value);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (_c && !_c.done && (_a = _b.return))
                _a.call(_b);
            } finally {
              if (e_1)
                throw e_1.error;
            }
          }
        }
      });
    };
    Subject2.prototype.error = function(err) {
      var _this = this;
      errorContext(function() {
        _this._throwIfClosed();
        if (!_this.isStopped) {
          _this.hasError = _this.isStopped = true;
          _this.thrownError = err;
          var observers = _this.observers;
          while (observers.length) {
            observers.shift().error(err);
          }
        }
      });
    };
    Subject2.prototype.complete = function() {
      var _this = this;
      errorContext(function() {
        _this._throwIfClosed();
        if (!_this.isStopped) {
          _this.isStopped = true;
          var observers = _this.observers;
          while (observers.length) {
            observers.shift().complete();
          }
        }
      });
    };
    Subject2.prototype.unsubscribe = function() {
      this.isStopped = this.closed = true;
      this.observers = this.currentObservers = null;
    };
    Object.defineProperty(Subject2.prototype, "observed", {
      get: function() {
        var _a;
        return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
      },
      enumerable: false,
      configurable: true
    });
    Subject2.prototype._trySubscribe = function(subscriber) {
      this._throwIfClosed();
      return _super.prototype._trySubscribe.call(this, subscriber);
    };
    Subject2.prototype._subscribe = function(subscriber) {
      this._throwIfClosed();
      this._checkFinalizedStatuses(subscriber);
      return this._innerSubscribe(subscriber);
    };
    Subject2.prototype._innerSubscribe = function(subscriber) {
      var _this = this;
      var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
      if (hasError || isStopped) {
        return EMPTY_SUBSCRIPTION;
      }
      this.currentObservers = null;
      observers.push(subscriber);
      return new Subscription(function() {
        _this.currentObservers = null;
        arrRemove(observers, subscriber);
      });
    };
    Subject2.prototype._checkFinalizedStatuses = function(subscriber) {
      var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
      if (hasError) {
        subscriber.error(thrownError);
      } else if (isStopped) {
        subscriber.complete();
      }
    };
    Subject2.prototype.asObservable = function() {
      var observable2 = new Observable();
      observable2.source = this;
      return observable2;
    };
    Subject2.create = function(destination, source) {
      return new AnonymousSubject(destination, source);
    };
    return Subject2;
  }(Observable);
  var AnonymousSubject = function(_super) {
    __extends(AnonymousSubject2, _super);
    function AnonymousSubject2(destination, source) {
      var _this = _super.call(this) || this;
      _this.destination = destination;
      _this.source = source;
      return _this;
    }
    AnonymousSubject2.prototype.next = function(value) {
      var _a, _b;
      (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
    };
    AnonymousSubject2.prototype.error = function(err) {
      var _a, _b;
      (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
    };
    AnonymousSubject2.prototype.complete = function() {
      var _a, _b;
      (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    AnonymousSubject2.prototype._subscribe = function(subscriber) {
      var _a, _b;
      return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : EMPTY_SUBSCRIPTION;
    };
    return AnonymousSubject2;
  }(Subject);

  // ../../node_modules/rxjs/dist/esm5/internal/BehaviorSubject.js
  var BehaviorSubject = function(_super) {
    __extends(BehaviorSubject2, _super);
    function BehaviorSubject2(_value) {
      var _this = _super.call(this) || this;
      _this._value = _value;
      return _this;
    }
    Object.defineProperty(BehaviorSubject2.prototype, "value", {
      get: function() {
        return this.getValue();
      },
      enumerable: false,
      configurable: true
    });
    BehaviorSubject2.prototype._subscribe = function(subscriber) {
      var subscription = _super.prototype._subscribe.call(this, subscriber);
      !subscription.closed && subscriber.next(this._value);
      return subscription;
    };
    BehaviorSubject2.prototype.getValue = function() {
      var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, _value = _a._value;
      if (hasError) {
        throw thrownError;
      }
      this._throwIfClosed();
      return _value;
    };
    BehaviorSubject2.prototype.next = function(value) {
      _super.prototype.next.call(this, this._value = value);
    };
    return BehaviorSubject2;
  }(Subject);

  // ../../node_modules/rxjs/dist/esm5/internal/scheduler/dateTimestampProvider.js
  var dateTimestampProvider = {
    now: function() {
      return (dateTimestampProvider.delegate || Date).now();
    },
    delegate: void 0
  };

  // ../../node_modules/rxjs/dist/esm5/internal/scheduler/Action.js
  var Action = function(_super) {
    __extends(Action2, _super);
    function Action2(scheduler, work) {
      return _super.call(this) || this;
    }
    Action2.prototype.schedule = function(state, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      return this;
    };
    return Action2;
  }(Subscription);

  // ../../node_modules/rxjs/dist/esm5/internal/scheduler/intervalProvider.js
  var intervalProvider = {
    setInterval: function(handler, timeout) {
      var args = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
      }
      var delegate = intervalProvider.delegate;
      if (delegate === null || delegate === void 0 ? void 0 : delegate.setInterval) {
        return delegate.setInterval.apply(delegate, __spreadArray([handler, timeout], __read(args)));
      }
      return setInterval.apply(void 0, __spreadArray([handler, timeout], __read(args)));
    },
    clearInterval: function(handle) {
      var delegate = intervalProvider.delegate;
      return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearInterval) || clearInterval)(handle);
    },
    delegate: void 0
  };

  // ../../node_modules/rxjs/dist/esm5/internal/scheduler/AsyncAction.js
  var AsyncAction = function(_super) {
    __extends(AsyncAction2, _super);
    function AsyncAction2(scheduler, work) {
      var _this = _super.call(this, scheduler, work) || this;
      _this.scheduler = scheduler;
      _this.work = work;
      _this.pending = false;
      return _this;
    }
    AsyncAction2.prototype.schedule = function(state, delay) {
      var _a;
      if (delay === void 0) {
        delay = 0;
      }
      if (this.closed) {
        return this;
      }
      this.state = state;
      var id = this.id;
      var scheduler = this.scheduler;
      if (id != null) {
        this.id = this.recycleAsyncId(scheduler, id, delay);
      }
      this.pending = true;
      this.delay = delay;
      this.id = (_a = this.id) !== null && _a !== void 0 ? _a : this.requestAsyncId(scheduler, this.id, delay);
      return this;
    };
    AsyncAction2.prototype.requestAsyncId = function(scheduler, _id, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      return intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay);
    };
    AsyncAction2.prototype.recycleAsyncId = function(_scheduler, id, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      if (delay != null && this.delay === delay && this.pending === false) {
        return id;
      }
      if (id != null) {
        intervalProvider.clearInterval(id);
      }
      return void 0;
    };
    AsyncAction2.prototype.execute = function(state, delay) {
      if (this.closed) {
        return new Error("executing a cancelled action");
      }
      this.pending = false;
      var error = this._execute(state, delay);
      if (error) {
        return error;
      } else if (this.pending === false && this.id != null) {
        this.id = this.recycleAsyncId(this.scheduler, this.id, null);
      }
    };
    AsyncAction2.prototype._execute = function(state, _delay) {
      var errored = false;
      var errorValue;
      try {
        this.work(state);
      } catch (e) {
        errored = true;
        errorValue = e ? e : new Error("Scheduled action threw falsy error");
      }
      if (errored) {
        this.unsubscribe();
        return errorValue;
      }
    };
    AsyncAction2.prototype.unsubscribe = function() {
      if (!this.closed) {
        var _a = this, id = _a.id, scheduler = _a.scheduler;
        var actions = scheduler.actions;
        this.work = this.state = this.scheduler = null;
        this.pending = false;
        arrRemove(actions, this);
        if (id != null) {
          this.id = this.recycleAsyncId(scheduler, id, null);
        }
        this.delay = null;
        _super.prototype.unsubscribe.call(this);
      }
    };
    return AsyncAction2;
  }(Action);

  // ../../node_modules/rxjs/dist/esm5/internal/Scheduler.js
  var Scheduler = function() {
    function Scheduler2(schedulerActionCtor, now) {
      if (now === void 0) {
        now = Scheduler2.now;
      }
      this.schedulerActionCtor = schedulerActionCtor;
      this.now = now;
    }
    Scheduler2.prototype.schedule = function(work, delay, state) {
      if (delay === void 0) {
        delay = 0;
      }
      return new this.schedulerActionCtor(this, work).schedule(state, delay);
    };
    Scheduler2.now = dateTimestampProvider.now;
    return Scheduler2;
  }();

  // ../../node_modules/rxjs/dist/esm5/internal/scheduler/AsyncScheduler.js
  var AsyncScheduler = function(_super) {
    __extends(AsyncScheduler2, _super);
    function AsyncScheduler2(SchedulerAction, now) {
      if (now === void 0) {
        now = Scheduler.now;
      }
      var _this = _super.call(this, SchedulerAction, now) || this;
      _this.actions = [];
      _this._active = false;
      return _this;
    }
    AsyncScheduler2.prototype.flush = function(action) {
      var actions = this.actions;
      if (this._active) {
        actions.push(action);
        return;
      }
      var error;
      this._active = true;
      do {
        if (error = action.execute(action.state, action.delay)) {
          break;
        }
      } while (action = actions.shift());
      this._active = false;
      if (error) {
        while (action = actions.shift()) {
          action.unsubscribe();
        }
        throw error;
      }
    };
    return AsyncScheduler2;
  }(Scheduler);

  // ../../node_modules/rxjs/dist/esm5/internal/scheduler/async.js
  var asyncScheduler = new AsyncScheduler(AsyncAction);

  // ../../node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js
  var isArrayLike = function(x) {
    return x && typeof x.length === "number" && typeof x !== "function";
  };

  // ../../node_modules/rxjs/dist/esm5/internal/util/isPromise.js
  function isPromise(value) {
    return isFunction(value === null || value === void 0 ? void 0 : value.then);
  }

  // ../../node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js
  function isInteropObservable(input) {
    return isFunction(input[observable]);
  }

  // ../../node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js
  function isAsyncIterable(obj) {
    return Symbol.asyncIterator && isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
  }

  // ../../node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js
  function createInvalidObservableTypeError(input) {
    return new TypeError("You provided " + (input !== null && typeof input === "object" ? "an invalid object" : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
  }

  // ../../node_modules/rxjs/dist/esm5/internal/symbol/iterator.js
  function getSymbolIterator() {
    if (typeof Symbol !== "function" || !Symbol.iterator) {
      return "@@iterator";
    }
    return Symbol.iterator;
  }
  var iterator = getSymbolIterator();

  // ../../node_modules/rxjs/dist/esm5/internal/util/isIterable.js
  function isIterable(input) {
    return isFunction(input === null || input === void 0 ? void 0 : input[iterator]);
  }

  // ../../node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js
  function readableStreamLikeToAsyncGenerator(readableStream) {
    return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
      var reader, _a, value, done;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            reader = readableStream.getReader();
            _b.label = 1;
          case 1:
            _b.trys.push([1, , 9, 10]);
            _b.label = 2;
          case 2:
            if (false)
              return [3, 8];
            return [4, __await(reader.read())];
          case 3:
            _a = _b.sent(), value = _a.value, done = _a.done;
            if (!done)
              return [3, 5];
            return [4, __await(void 0)];
          case 4:
            return [2, _b.sent()];
          case 5:
            return [4, __await(value)];
          case 6:
            return [4, _b.sent()];
          case 7:
            _b.sent();
            return [3, 2];
          case 8:
            return [3, 10];
          case 9:
            reader.releaseLock();
            return [7];
          case 10:
            return [2];
        }
      });
    });
  }
  function isReadableStreamLike(obj) {
    return isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
  }

  // ../../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js
  function innerFrom(input) {
    if (input instanceof Observable) {
      return input;
    }
    if (input != null) {
      if (isInteropObservable(input)) {
        return fromInteropObservable(input);
      }
      if (isArrayLike(input)) {
        return fromArrayLike(input);
      }
      if (isPromise(input)) {
        return fromPromise(input);
      }
      if (isAsyncIterable(input)) {
        return fromAsyncIterable(input);
      }
      if (isIterable(input)) {
        return fromIterable(input);
      }
      if (isReadableStreamLike(input)) {
        return fromReadableStreamLike(input);
      }
    }
    throw createInvalidObservableTypeError(input);
  }
  function fromInteropObservable(obj) {
    return new Observable(function(subscriber) {
      var obs = obj[observable]();
      if (isFunction(obs.subscribe)) {
        return obs.subscribe(subscriber);
      }
      throw new TypeError("Provided object does not correctly implement Symbol.observable");
    });
  }
  function fromArrayLike(array) {
    return new Observable(function(subscriber) {
      for (var i = 0; i < array.length && !subscriber.closed; i++) {
        subscriber.next(array[i]);
      }
      subscriber.complete();
    });
  }
  function fromPromise(promise) {
    return new Observable(function(subscriber) {
      promise.then(function(value) {
        if (!subscriber.closed) {
          subscriber.next(value);
          subscriber.complete();
        }
      }, function(err) {
        return subscriber.error(err);
      }).then(null, reportUnhandledError);
    });
  }
  function fromIterable(iterable) {
    return new Observable(function(subscriber) {
      var e_1, _a;
      try {
        for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
          var value = iterable_1_1.value;
          subscriber.next(value);
          if (subscriber.closed) {
            return;
          }
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return))
            _a.call(iterable_1);
        } finally {
          if (e_1)
            throw e_1.error;
        }
      }
      subscriber.complete();
    });
  }
  function fromAsyncIterable(asyncIterable) {
    return new Observable(function(subscriber) {
      process(asyncIterable, subscriber).catch(function(err) {
        return subscriber.error(err);
      });
    });
  }
  function fromReadableStreamLike(readableStream) {
    return fromAsyncIterable(readableStreamLikeToAsyncGenerator(readableStream));
  }
  function process(asyncIterable, subscriber) {
    var asyncIterable_1, asyncIterable_1_1;
    var e_2, _a;
    return __awaiter(this, void 0, void 0, function() {
      var value, e_2_1;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            _b.trys.push([0, 5, 6, 11]);
            asyncIterable_1 = __asyncValues(asyncIterable);
            _b.label = 1;
          case 1:
            return [4, asyncIterable_1.next()];
          case 2:
            if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done))
              return [3, 4];
            value = asyncIterable_1_1.value;
            subscriber.next(value);
            if (subscriber.closed) {
              return [2];
            }
            _b.label = 3;
          case 3:
            return [3, 1];
          case 4:
            return [3, 11];
          case 5:
            e_2_1 = _b.sent();
            e_2 = { error: e_2_1 };
            return [3, 11];
          case 6:
            _b.trys.push([6, , 9, 10]);
            if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return)))
              return [3, 8];
            return [4, _a.call(asyncIterable_1)];
          case 7:
            _b.sent();
            _b.label = 8;
          case 8:
            return [3, 10];
          case 9:
            if (e_2)
              throw e_2.error;
            return [7];
          case 10:
            return [7];
          case 11:
            subscriber.complete();
            return [2];
        }
      });
    });
  }

  // ../../node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js
  function executeSchedule(parentSubscription, scheduler, work, delay, repeat) {
    if (delay === void 0) {
      delay = 0;
    }
    if (repeat === void 0) {
      repeat = false;
    }
    var scheduleSubscription = scheduler.schedule(function() {
      work();
      if (repeat) {
        parentSubscription.add(this.schedule(null, delay));
      } else {
        this.unsubscribe();
      }
    }, delay);
    parentSubscription.add(scheduleSubscription);
    if (!repeat) {
      return scheduleSubscription;
    }
  }

  // ../../node_modules/rxjs/dist/esm5/internal/operators/map.js
  function map(project, thisArg) {
    return operate(function(source, subscriber) {
      var index = 0;
      source.subscribe(createOperatorSubscriber(subscriber, function(value) {
        subscriber.next(project.call(thisArg, value, index++));
      }));
    });
  }

  // ../../node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js
  var isArray = Array.isArray;
  function callOrApply(fn, args) {
    return isArray(args) ? fn.apply(void 0, __spreadArray([], __read(args))) : fn(args);
  }
  function mapOneOrManyArgs(fn) {
    return map(function(args) {
      return callOrApply(fn, args);
    });
  }

  // ../../node_modules/rxjs/dist/esm5/internal/operators/mergeInternals.js
  function mergeInternals(source, subscriber, project, concurrent, onBeforeNext, expand, innerSubScheduler, additionalFinalizer) {
    var buffer = [];
    var active = 0;
    var index = 0;
    var isComplete = false;
    var checkComplete = function() {
      if (isComplete && !buffer.length && !active) {
        subscriber.complete();
      }
    };
    var outerNext = function(value) {
      return active < concurrent ? doInnerSub(value) : buffer.push(value);
    };
    var doInnerSub = function(value) {
      expand && subscriber.next(value);
      active++;
      var innerComplete = false;
      innerFrom(project(value, index++)).subscribe(createOperatorSubscriber(subscriber, function(innerValue) {
        onBeforeNext === null || onBeforeNext === void 0 ? void 0 : onBeforeNext(innerValue);
        if (expand) {
          outerNext(innerValue);
        } else {
          subscriber.next(innerValue);
        }
      }, function() {
        innerComplete = true;
      }, void 0, function() {
        if (innerComplete) {
          try {
            active--;
            var _loop_1 = function() {
              var bufferedValue = buffer.shift();
              if (innerSubScheduler) {
                executeSchedule(subscriber, innerSubScheduler, function() {
                  return doInnerSub(bufferedValue);
                });
              } else {
                doInnerSub(bufferedValue);
              }
            };
            while (buffer.length && active < concurrent) {
              _loop_1();
            }
            checkComplete();
          } catch (err) {
            subscriber.error(err);
          }
        }
      }));
    };
    source.subscribe(createOperatorSubscriber(subscriber, outerNext, function() {
      isComplete = true;
      checkComplete();
    }));
    return function() {
      additionalFinalizer === null || additionalFinalizer === void 0 ? void 0 : additionalFinalizer();
    };
  }

  // ../../node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js
  function mergeMap(project, resultSelector, concurrent) {
    if (concurrent === void 0) {
      concurrent = Infinity;
    }
    if (isFunction(resultSelector)) {
      return mergeMap(function(a, i) {
        return map(function(b, ii) {
          return resultSelector(a, b, i, ii);
        })(innerFrom(project(a, i)));
      }, concurrent);
    } else if (typeof resultSelector === "number") {
      concurrent = resultSelector;
    }
    return operate(function(source, subscriber) {
      return mergeInternals(source, subscriber, project, concurrent);
    });
  }

  // ../../node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js
  var nodeEventEmitterMethods = ["addListener", "removeListener"];
  var eventTargetMethods = ["addEventListener", "removeEventListener"];
  var jqueryMethods = ["on", "off"];
  function fromEvent(target, eventName, options, resultSelector) {
    if (isFunction(options)) {
      resultSelector = options;
      options = void 0;
    }
    if (resultSelector) {
      return fromEvent(target, eventName, options).pipe(mapOneOrManyArgs(resultSelector));
    }
    var _a = __read(isEventTarget(target) ? eventTargetMethods.map(function(methodName) {
      return function(handler) {
        return target[methodName](eventName, handler, options);
      };
    }) : isNodeStyleEventEmitter(target) ? nodeEventEmitterMethods.map(toCommonHandlerRegistry(target, eventName)) : isJQueryStyleEventEmitter(target) ? jqueryMethods.map(toCommonHandlerRegistry(target, eventName)) : [], 2), add = _a[0], remove = _a[1];
    if (!add) {
      if (isArrayLike(target)) {
        return mergeMap(function(subTarget) {
          return fromEvent(subTarget, eventName, options);
        })(innerFrom(target));
      }
    }
    if (!add) {
      throw new TypeError("Invalid event target");
    }
    return new Observable(function(subscriber) {
      var handler = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return subscriber.next(1 < args.length ? args : args[0]);
      };
      add(handler);
      return function() {
        return remove(handler);
      };
    });
  }
  function toCommonHandlerRegistry(target, eventName) {
    return function(methodName) {
      return function(handler) {
        return target[methodName](eventName, handler);
      };
    };
  }
  function isNodeStyleEventEmitter(target) {
    return isFunction(target.addListener) && isFunction(target.removeListener);
  }
  function isJQueryStyleEventEmitter(target) {
    return isFunction(target.on) && isFunction(target.off);
  }
  function isEventTarget(target) {
    return isFunction(target.addEventListener) && isFunction(target.removeEventListener);
  }

  // ../../node_modules/rxjs/dist/esm5/internal/operators/debounceTime.js
  function debounceTime(dueTime, scheduler) {
    if (scheduler === void 0) {
      scheduler = asyncScheduler;
    }
    return operate(function(source, subscriber) {
      var activeTask = null;
      var lastValue = null;
      var lastTime = null;
      var emit = function() {
        if (activeTask) {
          activeTask.unsubscribe();
          activeTask = null;
          var value = lastValue;
          lastValue = null;
          subscriber.next(value);
        }
      };
      function emitWhenIdle() {
        var targetTime = lastTime + dueTime;
        var now = scheduler.now();
        if (now < targetTime) {
          activeTask = this.schedule(void 0, targetTime - now);
          subscriber.add(activeTask);
          return;
        }
        emit();
      }
      source.subscribe(createOperatorSubscriber(subscriber, function(value) {
        lastValue = value;
        lastTime = scheduler.now();
        if (!activeTask) {
          activeTask = scheduler.schedule(emitWhenIdle, dueTime);
          subscriber.add(activeTask);
        }
      }, function() {
        emit();
        subscriber.complete();
      }, void 0, function() {
        lastValue = activeTask = null;
      }));
    });
  }

  // src/lib/reactive/Observable.ts
  var DisposableObservable = class {
    #rxjs;
    constructor(rxjs) {
      this.#rxjs = rxjs;
    }
    subscribe(callback) {
      const subscription = this.#rxjs.subscribe(callback);
      const disposable = {
        dispose() {
          subscription.unsubscribe();
        }
      };
      return disposable;
    }
  };

  // src/lib/reactive/variable.ts
  var Variable = class {
    #bs;
    // readonly #attributes: VariableAttributes<T>;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor(bs, attributes = {}) {
      this.#bs = bs;
    }
    get() {
      return this.#bs.getValue();
    }
    set(newValue) {
      this.#bs.next(newValue);
    }
    asObservable() {
      return new DisposableObservable(this.#bs.asObservable());
    }
  };
  function variable(initialValue, attributes = {}) {
    const bs = new BehaviorSubject(initialValue);
    return new Variable(bs, attributes);
  }

  // src/lib/math/gauss.ts
  var abs = Math.abs;
  function makeColumnVector(n, v) {
    const a = [];
    for (let i = 0; i < n; i++) {
      a.push(v);
    }
    return a;
  }
  function rowWithMaximumInColumn(A, column, N) {
    let biggest = abs(A[column][column]);
    let maxRow = column;
    for (let row = column + 1; row < N; row++) {
      if (abs(A[row][column]) > biggest) {
        biggest = abs(A[row][column]);
        maxRow = row;
      }
    }
    return maxRow;
  }
  function swapRows(A, i, j, N) {
    const colLength = N + 1;
    for (let column = i; column < colLength; column++) {
      const temp = A[j][column];
      A[j][column] = A[i][column];
      A[i][column] = temp;
    }
  }
  function makeZeroBelow(A, i, N) {
    for (let row = i + 1; row < N; row++) {
      const c = -A[row][i] / A[i][i];
      for (let column = i; column < N + 1; column++) {
        if (i === column) {
          A[row][column] = 0;
        } else {
          A[row][column] += c * A[i][column];
        }
      }
    }
  }
  function solve(A, N) {
    const x = makeColumnVector(N, 0);
    for (let i = N - 1; i > -1; i--) {
      x[i] = A[i][N] / A[i][i];
      for (let k = i - 1; k > -1; k--) {
        A[k][N] -= A[k][i] * x[i];
      }
    }
    return x;
  }
  function gauss(A, b) {
    const N = A.length;
    for (let i = 0; i < N; i++) {
      const Ai = A[i];
      const bi = b[i];
      Ai.push(bi);
    }
    for (let j = 0; j < N; j++) {
      swapRows(A, j, rowWithMaximumInColumn(A, j, N), N);
      makeZeroBelow(A, j, N);
    }
    return solve(A, N);
  }

  // src/lib/math/rotorFromDirections.ts
  var sqrt = Math.sqrt;
  function rotorFromDirections(a, b, m) {
    const ax = a.x;
    const ay = a.y;
    const bx = b.x;
    const by = b.y;
    const aa = ax * ax + ay * ay;
    const absA = sqrt(aa);
    const bb = bx * bx + by * by;
    const absB = sqrt(bb);
    const BA = absB * absA;
    const dotBA = ax * bx + ay * by;
    const denom = sqrt(2 * (bb * aa + BA * dotBA));
    if (denom !== 0) {
      const B = ay * bx - ax * by;
      m.set(0, 0, (BA + dotBA) / denom, B / denom);
    } else {
    }
  }

  // src/lib/math/G20.ts
  function is_zero_vector(v) {
    return v.x === 0 && v.y === 0;
  }
  function is_zero_bivector(m) {
    return m.b === 0;
  }
  function is_zero_multivector(m) {
    return is_zero_vector(m) && is_zero_bivector(m) && m.a === 0 && m.b === 0;
  }
  var UNLOCKED = -1 * Math.random();
  function lock(m) {
    m.lock();
    return m;
  }
  function isScalar(m) {
    return m.x === 0 && m.y === 0 && m.b === 0;
  }
  var COORD_A = 0;
  var COORD_X = 1;
  var COORD_Y = 2;
  var COORD_B = 3;
  var G20 = class _G20 {
    #coords;
    #lock = UNLOCKED;
    #change = variable(this);
    change$ = this.#change.asObservable();
    constructor(x = 0, y = 0, a = 0, b = 0) {
      this.#coords = [a, x, y, b];
    }
    static scalar(a) {
      return new _G20(0, 0, a, 0);
    }
    static bivector(b) {
      return new _G20(0, 0, 0, b);
    }
    static spinor(a, b) {
      return new _G20(0, 0, a, b);
    }
    static vector(x, y) {
      return new _G20(x, y, 0, 0);
    }
    /**
     * Determines whether this multivector is locked.
     * If the multivector is in the unlocked state then it is mutable.
     * If the multivector is in the locked state then it is immutable.
     */
    isLocked() {
      return this.#lock !== UNLOCKED;
    }
    isMutable() {
      return this.#lock === UNLOCKED;
    }
    /**
     * Locks this multivector (preventing any further mutation),
     * and returns a token that may be used to unlock it.
     */
    lock() {
      if (this.#lock !== UNLOCKED) {
        throw new Error("already locked");
      } else {
        this.#lock = Math.random();
        return this.#lock;
      }
    }
    /**
     * Unlocks this multivector (allowing mutation),
     * using a token that was obtained from a preceding lock method call.
     */
    unlock(token) {
      if (this.#lock === UNLOCKED) {
        throw new Error("not locked");
      } else if (this.#lock === token) {
        this.#lock = UNLOCKED;
        return this;
      } else {
        throw new Error("unlock denied");
      }
    }
    get a() {
      return this.#coords[COORD_A];
    }
    set a(a) {
      if (typeof a === "number") {
        if (this.a !== a) {
          this.#coords[COORD_A] = a;
          this.#change.set(this);
        }
      }
    }
    get x() {
      return this.#coords[COORD_X];
    }
    set x(x) {
      if (typeof x === "number") {
        if (this.x !== x) {
          this.#coords[COORD_X] = x;
          this.#change.set(this);
        }
      }
    }
    get y() {
      return this.#coords[COORD_Y];
    }
    set y(y) {
      if (typeof y === "number") {
        if (this.y !== y) {
          this.#coords[COORD_Y] = y;
          this.#change.set(this);
        }
      }
    }
    get b() {
      return this.#coords[COORD_B];
    }
    set b(b) {
      if (typeof b === "number") {
        if (this.b !== b) {
          this.#coords[COORD_B] = b;
          this.#change.set(this);
        }
      }
    }
    static one = lock(new _G20(0, 0, 1, 0));
    static zero = lock(new _G20(0, 0, 0, 0));
    static ex = lock(new _G20(1, 0, 0, 0));
    static ey = lock(new _G20(0, 1, 0, 0));
    static I = lock(new _G20(0, 0, 0, 1));
    static add(v1, v2) {
      const x = v1.x + v2.x;
      const y = v1.y + v2.y;
      const a = v1.a + v2.a;
      const b = v1.b + v2.b;
      return new _G20(x, y, a, b);
    }
    static copy(mv) {
      return new _G20(mv.x, mv.y, mv.a, mv.b);
    }
    static fromBivector(B) {
      return _G20.bivector(B.b);
    }
    static fromScalar(alpha) {
      return _G20.scalar(alpha.a);
    }
    static fromSpinor(R) {
      return _G20.spinor(R.a, R.b);
    }
    static fromVector(v) {
      return _G20.vector(v.x, v.y);
    }
    static rotorFromDirections(a, b) {
      return new _G20(0, 0, 0, 0).rotorFromDirections(a, b);
    }
    static rotorFromVectorToVector(a, b) {
      return new _G20(0, 0, 0, 0).rotorFromVectorToVector(a, b);
    }
    static sub(v1, v2) {
      const x = v1.x - v2.x;
      const y = v1.y - v2.y;
      const a = v1.a - v2.a;
      const b = v1.b - v2.b;
      return new _G20(x, y, a, b);
    }
    static subtract(v1, v2) {
      return _G20.sub(v1, v2);
    }
    static ratioBetween(v1, v2) {
      return (v1.x * v2.x + v1.y * v2.y) / (v1.magnitude() * v2.magnitude());
    }
    static angleBetween(v1, v2) {
      const dx = v1.x - v2.x;
      const dy = v1.y - v2.y;
      return Math.atan2(dy, dx);
    }
    static distanceBetween(v1, v2) {
      return Math.sqrt(_G20.distanceBetweenSquared(v1, v2));
    }
    static distanceBetweenSquared(v1, v2) {
      const dx = v1.x - v2.x;
      const dy = v1.y - v2.y;
      return dx * dx + dy * dy;
    }
    /**
     * 
     */
    add2(a, b) {
      if (is_zero_multivector(a)) {
        return this.set(b.x, b.y, b.a, b.b);
      } else if (is_zero_multivector(b)) {
        return this.set(a.x, a.y, a.a, a.b);
      } else {
        return this.set(a.x + b.x, a.y + b.y, a.a + b.a, a.b + b.b);
      }
    }
    addPseudo(\u03B2) {
      if (this.isLocked()) {
        return lock(this.clone().addPseudo(\u03B2));
      } else {
        if (\u03B2 === 0) {
          return this;
        } else {
          return this.set(this.x, this.y, this.a, this.b + \u03B2);
        }
      }
    }
    /**
     * Adds a multiple of a scalar to this multivector.
     * @param a The scalar value to be added to this multivector.
     * @param α The fraction of (a * uom) to be added. Default is 1.
     * @returns this + (a * uom) * α
     */
    addScalar(a, \u03B1 = 1) {
      if (this.isLocked()) {
        return lock(this.clone().addScalar(a, \u03B1));
      } else {
        if (this.isZero()) {
          this.a = a * \u03B1;
          return this;
        } else if (a === 0 || \u03B1 === 0) {
          return this;
        } else {
          this.a += a * \u03B1;
          return this;
        }
      }
    }
    conj() {
      if (this.isLocked()) {
        return lock(this.clone().conj());
      } else {
        return this.set(-this.x, -this.y, this.a, -this.b);
      }
    }
    /**
     * A convenience function for set(mv.x, mv.y, mv.a, mv.b).
     * Requires `this` multivector to be mutable.
     */
    copy(mv) {
      return this.set(mv.x, mv.y, mv.a, mv.b);
    }
    /**
     * A convenience function for set(0, 0, spinor.a, spinor.b).
     * Requires `this` multivector to be mutable.
     */
    copySpinor(spinor) {
      return this.set(0, 0, spinor.a, spinor.b);
    }
    /**
     * A convenience function for set(vector.x, vector.y, 0, 0).
     * Requires `this` multivector to be mutable.
     */
    copyVector(vector2) {
      return this.set(vector2.x, vector2.y, 0, 0);
    }
    /**
     * A convenience function for set(0, 0, 0, 0).
     * Requires `this` multivector to be mutable.
     */
    clear() {
      return this.set(0, 0, 0, 0);
    }
    clone() {
      return new _G20(this.x, this.y, this.a, this.b);
    }
    /**
     * @param rhs The multivector dividend.
     * @returns this / m;
     */
    div(rhs) {
      if (this.isLocked()) {
        return lock(this.clone().div(rhs));
      } else {
        if (isScalar(rhs)) {
          return this.scale(1 / rhs.a);
        } else {
          return this.mul(_G20.copy(rhs).inv());
        }
      }
    }
    /**
     * @param m
     * @returns this ^ m
     */
    ext(m) {
      if (this.isLocked()) {
        return lock(this.clone().ext(m));
      } else {
        const La = this.a;
        const Lx = this.x;
        const Ly = this.y;
        const Lb = this.b;
        const Ra = m.a;
        const Rx = m.x;
        const Ry = m.y;
        const Rb = m.b;
        const a = La * Ra;
        const x = La * Rx + Lx * Ra;
        const y = La * Ry + Ly * Ra;
        const b = La * Rb + Lx * Ry - Ly * Rx + Lb * Ra;
        return this.set(x, y, a, b);
      }
    }
    /**
     * Computes the right inverse of this multivector.
     * inv(X) satisfies X * inv(X) = 1.
     * @returns inverse(this)
     */
    inv() {
      if (this.isLocked()) {
        return lock(this.clone().inv());
      } else {
        const x0 = this.a;
        const x1 = this.x;
        const x2 = this.y;
        const x3 = this.b;
        const A = [
          [+x0, +x1, +x2, -x3],
          [+x1, +x0, -x3, +x2],
          [+x2, +x3, +x0, -x1],
          [+x3, +x2, -x1, +x0]
        ];
        const s = [1, 0, 0, 0];
        const X = gauss(A, s);
        const a = X[0];
        const x = X[1];
        const y = X[2];
        const b = X[3];
        return this.set(x, y, a, b);
      }
    }
    lco(rhs) {
      if (this.isLocked()) {
        return lock(this.clone().lco(rhs));
      } else {
        return this.#lco2(this, rhs);
      }
    }
    #lco2(lhs, rhs) {
      const La = lhs.a;
      const Lx = lhs.x;
      const Ly = lhs.y;
      const Lb = lhs.b;
      const Ra = rhs.a;
      const Rx = rhs.x;
      const Ry = rhs.y;
      const Rb = rhs.b;
      const a = La * Ra + Lx * Rx + Ly * Ry - Lb * Rb;
      const x = La * Rx - Ly * Rb;
      const y = La * Ry + Lx * Rb;
      const b = La * Rb;
      return this.set(x, y, a, b);
    }
    add(rhs) {
      if (this.isLocked()) {
        return lock(this.clone().add(rhs));
      } else {
        const x = this.x + rhs.x;
        const y = this.y + rhs.y;
        const a = this.a + rhs.a;
        const b = this.b + rhs.b;
        return this.set(x, y, a, b);
      }
    }
    sub(rhs) {
      if (this.isLocked()) {
        return lock(this.clone().sub(rhs));
      } else {
        const x = this.x - rhs.x;
        const y = this.y - rhs.y;
        const a = this.a - rhs.a;
        const b = this.b - rhs.b;
        return this.set(x, y, a, b);
      }
    }
    /**
     * @param rhs
     * @returns this * m
     */
    mul(rhs) {
      if (this.isLocked()) {
        return lock(this.clone().mul(rhs));
      } else {
        return this.#mul2(this, rhs);
      }
    }
    /**
     * 
     */
    #mul2(lhs, rhs) {
      const La = lhs.a;
      const Lx = lhs.x;
      const Ly = lhs.y;
      const Lb = lhs.b;
      const Ra = rhs.a;
      const Rx = rhs.x;
      const Ry = rhs.y;
      const Rb = rhs.b;
      const a = La * Ra + Lx * Rx + Ly * Ry - Lb * Rb;
      const x = La * Rx + Lx * Ra - Ly * Rb + Lb * Ry;
      const y = La * Ry + Lx * Rb + Ly * Ra - Lb * Rx;
      const b = La * Rb + Lx * Ry - Ly * Rx + Lb * Ra;
      return this.set(x, y, a, b);
    }
    neg() {
      return this.scale(-1);
    }
    dot(v) {
      return this.x * v.x + this.y * v.y;
    }
    exp() {
      if (this.isLocked()) {
        return lock(this.clone().exp());
      } else {
        const w = this.a;
        const z = this.b;
        const expW = Math.exp(w);
        const \u03C6 = Math.sqrt(z * z);
        const s = expW * (\u03C6 !== 0 ? Math.sin(\u03C6) / \u03C6 : 1);
        const a = expW * Math.cos(\u03C6);
        const b = z * s;
        return this.set(0, 0, a, b);
      }
    }
    magnitude() {
      return Math.sqrt(this.quaditude());
    }
    quaditude() {
      const a = this.a;
      const x = this.x;
      const y = this.y;
      const b = this.b;
      return a * a + x * x + y * y - b * b;
    }
    normalize() {
      if (this.isLocked()) {
        return lock(this.clone().normalize());
      } else {
        return this.scale(1 / this.magnitude());
      }
    }
    distanceTo(v) {
      return Math.sqrt(this.distanceToSquared(v));
    }
    distanceToSquared(v) {
      const dx = this.x - v.x;
      const dy = this.y - v.y;
      return dx * dx + dy * dy;
    }
    rco(m) {
      if (this.isLocked()) {
        return lock(this.clone().rco(m));
      } else {
        return this.#rco2(this, m);
      }
    }
    #rco2(lhs, rhs) {
      const La = lhs.a;
      const Lx = lhs.x;
      const Ly = lhs.y;
      const Lb = lhs.b;
      const Ra = rhs.a;
      const Rx = rhs.x;
      const Ry = rhs.y;
      const Rb = rhs.b;
      const a = La * Ra + Lx * Rx + Ly * Ry - Lb * Rb;
      const x = Lx * Ra + Lb * Ry;
      const y = Ly * Ra - Lb * Rx;
      const b = Lb * Ra;
      return this.set(x, y, a, b);
    }
    /**
     * If `this` is mutable, then sets `this` multivector to its reflection in the plane orthogonal to vector n. The result is mutable.
     * If `this` is immutable (locked), a copy of `this` is made, which is then reflected. The result is immutable (locked).
     * 
     * i.e. The result is mutable (unlocked) iff `this` is mutable (unlocked). 
     *
     * Mathematically,
     *
     * this ⟼ - n * this * n
     *
     * Geometrically,
     *
     * Reflects this multivector in the plane orthogonal to the unit vector, n.
     * This implementation does assume that n is a vector, but does not assume that it is normalized to unity.
     *
     * If n is not a unit vector then the result is scaled by n squared.
     * The scalar component gets an extra minus sign. The pseudoscalar component does not change sign.
     * The units of measure are carried through but in most cases n SHOULD be dimensionless.
     *
     * @param n The unit vector that defines the reflection plane.
     */
    reflect(n) {
      if (this.isLocked()) {
        return lock(this.clone().reflect(n));
      } else {
        const nx = n.x;
        const ny = n.y;
        const a = this.a;
        const x = this.x;
        const y = this.y;
        const b = this.b;
        const nx2 = nx * nx;
        const ny2 = ny * ny;
        const \u03BC = nx2 - ny2;
        const \u03BB = -2 * nx * ny;
        const \u03B2 = nx2 + ny2;
        const A = -\u03B2 * a;
        const X = \u03BB * y - \u03BC * x;
        const Y = \u03BB * x + \u03BC * y;
        const B = \u03B2 * b;
        return this.set(X, Y, A, B);
      }
    }
    /**
     * <p>
     * Computes a rotor, R, from two unit vectors, where
     * R = (|b||a| + b * a) / sqrt(2 * |b||a|(|b||a| + b << a))
     * </p>
     * 
     * The result is independent of the magnitudes of a and b.
     *
     * @param a The starting vector
     * @param b The ending vector
     * @returns The rotor representing a rotation from a to b.
     */
    rotorFromDirections(a, b) {
      if (this.isLocked()) {
        return lock(this.clone().rotorFromDirections(a, b));
      } else {
        rotorFromDirections(a, b, this);
        return this;
      }
    }
    /*
    rotorFromFrameToFrame(es: Vector[], fs: Vector[]): G20 {
        throw new Error(notImplemented('rotorFromFrameToFrame').message);
    }
    */
    /**
     * Sets this multivector to a rotor that rotates through angle θ in the oriented plane defined by I.
     *
     * @param θ The rotation angle in radians when the rotor is applied on both sides as R * M * ~R
     */
    rotorFromAngle(\u03B8) {
      if (this.isLocked()) {
        return lock(this.clone().rotorFromAngle(\u03B8));
      } else {
        const \u03C6 = \u03B8 / 2;
        return this.set(0, 0, Math.cos(\u03C6), -Math.sin(\u03C6));
      }
    }
    /**
     * R = sqrt(|b|/|a|) * (|b||a| + b * a) / sqrt(2 * |b||a|(|b||a| + b << a))
     *
     * The result is depends  on the magnitudes of a and b. 
     */
    rotorFromVectorToVector(a, b) {
      if (this.isLocked()) {
        return lock(this.clone().rotorFromVectorToVector(a, b));
      } else {
        const ax = a.x;
        const ay = a.y;
        const bx = b.x;
        const by = b.y;
        const absB = Math.sqrt(bx * bx + by * by);
        const absA = Math.sqrt(ax * ax + ay * ay);
        const BA = absB * absA;
        const dotBA = bx * ax + by * ay;
        const q = bx * ay - by * ax;
        const denom = Math.sqrt(2 * BA * (BA + dotBA));
        const f = Math.sqrt(absB) / (Math.sqrt(absA) * denom);
        const A = f * (BA + dotBA);
        const B = f * q;
        return this.set(0, 0, A, B);
      }
    }
    scale(\u03B1) {
      if (this.isLocked()) {
        return lock(this.clone().scale(\u03B1));
      } else {
        const x = this.x * \u03B1;
        const y = this.y * \u03B1;
        const a = this.a * \u03B1;
        const b = this.b * \u03B1;
        return this.set(x, y, a, b);
      }
    }
    /**
     * @param m
     * @returns this | m
     */
    scp(m) {
      if (this.isLocked()) {
        return lock(this.clone().scp(m));
      } else {
        return this.#scp2(this, m);
      }
    }
    /**
     * 
     */
    #scp2(lhs, rhs) {
      const La = lhs.a;
      const Lx = lhs.x;
      const Ly = lhs.y;
      const Lb = lhs.b;
      const Ra = rhs.a;
      const Rx = rhs.x;
      const Ry = rhs.y;
      const Rb = rhs.b;
      const a = La * Ra + Lx * Rx + Ly * Ry - Lb * Rb;
      const x = 0;
      const y = 0;
      const b = 0;
      return this.set(x, y, a, b);
    }
    /**
     * Sets the coordinates of `this` multivector.
     * Requires `this` multivector to be mutable.
     * @param x The coordinate along the x-axis.
     * @param y The coordinate along the y-axis.
     * @param a The scalar coordinate.
     * @param b The bivector coordinate.
     */
    set(x, y, a = 0, b = 0) {
      if (this.isMutable()) {
        const changed = this.x !== x || this.y !== y || this.a !== a || this.b != b;
        if (changed) {
          const coords = this.#coords;
          coords[COORD_A] = a;
          coords[COORD_X] = x;
          coords[COORD_Y] = y;
          coords[COORD_B] = b;
          this.#change.set(this);
        }
        return this;
      } else {
        throw new Error();
      }
    }
    equals(v, eps) {
      eps = typeof eps === "undefined" ? 1e-4 : eps;
      return this.distanceTo(v) < eps;
    }
    lerp(v, t) {
      if (this.isLocked()) {
        return lock(this.clone().lerp(v, t));
      } else {
        const x = (v.x - this.x) * t + this.x;
        const y = (v.y - this.y) * t + this.y;
        const a = (v.a - this.a) * t + this.a;
        const b = (v.b - this.b) * t + this.b;
        return this.set(x, y, a, b);
      }
    }
    /**
     * Determines whether this multivector is exactly 0 (zero).
     */
    isZero(eps) {
      if (typeof eps === "number") {
        return Math.abs(this.a) < eps && Math.abs(this.x) < eps && Math.abs(this.y) < eps && Math.abs(this.b) < eps;
      } else {
        return this.a === 0 && this.x === 0 && this.y === 0 && this.b === 0;
      }
    }
    toString() {
      return JSON.stringify({ x: this.x, y: this.y, a: this.a, b: this.b });
    }
    /**
     * reverse has a ++-- structure on the grades.
     * The scalar component, a, will not change.
     * The vector components, x and y, will not change.
     * The bivector component, b, will change sign.
     */
    rev() {
      if (this.isMutable()) {
        const a = +this.a;
        const x = +this.x;
        const y = +this.y;
        const b = -this.b;
        return this.set(x, y, a, b);
      } else {
        return lock(this.clone().rev());
      }
    }
    rotate(radians) {
      if (this.isMutable()) {
        const x0 = this.x;
        const y0 = this.y;
        const cos3 = Math.cos(radians);
        const sin3 = Math.sin(radians);
        const x = x0 * cos3 - y0 * sin3;
        const y = x0 * sin3 + y0 * cos3;
        return this.set(x, y, this.a, this.b);
      } else {
        return lock(this.clone().rotate(radians));
      }
    }
    /**
     * Subtracts a multiple of a scalar from this multivector.
     * @param a The scalar value to be subtracted from this multivector.
     * @param α The fraction of (a * uom) to be subtracted. Default is 1.
     * @returns this - (a * uom) * α
     */
    subScalar(a, \u03B1 = 1) {
      if (this.isLocked()) {
        return lock(this.clone().subScalar(a, \u03B1));
      } else {
        if (this.isZero()) {
          this.a = -a * \u03B1;
          return this;
        } else if (a === 0 || \u03B1 === 0) {
          return this;
        } else {
          this.a -= a * \u03B1;
          return this;
        }
      }
    }
    /**
     * <p>
     * <code>this ⟼ a * b</code>
     * </p>
     * Sets this Geometric2 to the geometric product a * b of the vector arguments.
     */
    versor(a, b) {
      if (this.isMutable()) {
        const A = a.x * b.x + a.y * b.y;
        const X = 0;
        const Y = 0;
        const B = a.x * b.y - a.y * b.x;
        return this.set(X, Y, A, B);
      } else {
        throw new Error();
      }
    }
    /**
     * 
     */
    __div__(rhs) {
      if (rhs instanceof _G20) {
        return lock(this.clone().div(rhs));
      } else if (typeof rhs === "number") {
        return lock(this.clone().scale(1 / rhs));
      } else {
        return void 0;
      }
    }
    /**
     * 
     */
    __rdiv__(lhs) {
      if (lhs instanceof _G20) {
        return lock(_G20.copy(lhs).div(this));
      } else if (typeof lhs === "number") {
        return lock(_G20.scalar(lhs).div(this));
      } else {
        return void 0;
      }
    }
    /**
     * 
     */
    __vbar__(rhs) {
      if (rhs instanceof _G20) {
        return lock(_G20.copy(this).scp(rhs));
      } else if (typeof rhs === "number") {
        return lock(_G20.copy(this).scp(_G20.scalar(rhs)));
      } else {
        return void 0;
      }
    }
    /**
     * 
     */
    __rvbar__(lhs) {
      if (lhs instanceof _G20) {
        return lock(_G20.copy(lhs).scp(this));
      } else if (typeof lhs === "number") {
        return lock(_G20.scalar(lhs).scp(this));
      } else {
        return void 0;
      }
    }
    /**
     * 
     */
    __wedge__(rhs) {
      if (rhs instanceof _G20) {
        return lock(_G20.copy(this).ext(rhs));
      } else if (typeof rhs === "number") {
        return lock(_G20.copy(this).scale(rhs));
      } else {
        return void 0;
      }
    }
    /**
     * 
     */
    __rwedge__(lhs) {
      if (lhs instanceof _G20) {
        return lock(_G20.copy(lhs).ext(this));
      } else if (typeof lhs === "number") {
        return lock(_G20.copy(this).scale(lhs));
      } else {
        return void 0;
      }
    }
    /**
     * 
     */
    __lshift__(rhs) {
      if (rhs instanceof _G20) {
        return lock(_G20.copy(this).lco(rhs));
      } else if (typeof rhs === "number") {
        return lock(_G20.copy(this).lco(_G20.scalar(rhs)));
      } else {
        return void 0;
      }
    }
    /**
     * 
     */
    __rlshift__(lhs) {
      if (lhs instanceof _G20) {
        return lock(_G20.copy(lhs).lco(this));
      } else if (typeof lhs === "number") {
        return lock(_G20.scalar(lhs).lco(this));
      } else {
        return void 0;
      }
    }
    /**
     * 
     */
    __rshift__(rhs) {
      if (rhs instanceof _G20) {
        return lock(_G20.copy(this).rco(rhs));
      } else if (typeof rhs === "number") {
        return lock(_G20.copy(this).rco(_G20.scalar(rhs)));
      } else {
        return void 0;
      }
    }
    /**
     * 
     */
    __rrshift__(lhs) {
      if (lhs instanceof _G20) {
        return lock(_G20.copy(lhs).rco(this));
      } else if (typeof lhs === "number") {
        return lock(_G20.scalar(lhs).rco(this));
      } else {
        return void 0;
      }
    }
    /**
     * 
     */
    __bang__() {
      return lock(_G20.copy(this).inv());
    }
    /**
     * 
     */
    __eq__(rhs) {
      if (rhs instanceof _G20) {
        return this.equals(rhs);
      } else if (typeof rhs === "number") {
        return this.equals(_G20.scalar(rhs));
      } else {
        return false;
      }
    }
    /**
     * 
     */
    __ne__(rhs) {
      if (rhs instanceof _G20) {
        return !this.equals(rhs);
      } else if (typeof rhs === "number") {
        return !this.equals(_G20.scalar(rhs));
      } else {
        return true;
      }
    }
    /**
     * 
     */
    __tilde__() {
      return lock(_G20.copy(this).rev());
    }
    /**
     * 
     */
    __add__(rhs) {
      if (rhs instanceof _G20) {
        return lock(this.clone().add(rhs));
      } else if (typeof rhs === "number") {
        return lock(this.clone().addScalar(rhs, 1));
      } else {
        return void 0;
      }
    }
    /**
     * 
     */
    __radd__(lhs) {
      if (lhs instanceof _G20) {
        return lock(_G20.copy(lhs).add(this));
      } else if (typeof lhs === "number") {
        return lock(_G20.scalar(lhs).add(this));
      } else {
        return void 0;
      }
    }
    /**
     * 
     */
    __sub__(rhs) {
      if (rhs instanceof _G20) {
        return lock(this.clone().sub(rhs));
      } else if (typeof rhs === "number") {
        return lock(this.clone().subScalar(rhs, 1));
      } else {
        return void 0;
      }
    }
    /**
     * 
     */
    __rsub__(lhs) {
      if (lhs instanceof _G20) {
        return lock(_G20.copy(lhs).sub(this));
      } else if (typeof lhs === "number") {
        return lock(_G20.scalar(lhs).sub(this));
      } else {
        return void 0;
      }
    }
    /**
     * 
     */
    __pos__() {
      return lock(_G20.copy(this));
    }
    /**
     * 
     */
    __neg__() {
      return lock(_G20.copy(this).neg());
    }
    /**
     * 
     */
    __mul__(rhs) {
      if (rhs instanceof _G20) {
        return lock(this.clone().mul(rhs));
      } else if (typeof rhs === "number") {
        return lock(this.clone().scale(rhs));
      } else {
        return void 0;
      }
    }
    /**
     * 
     */
    __rmul__(lhs) {
      if (lhs instanceof _G20) {
        return lock(_G20.copy(lhs).mul(this));
      } else if (typeof lhs === "number") {
        return lock(_G20.copy(this).scale(lhs));
      } else {
        return void 0;
      }
    }
  };

  // src/lib/utils/path-commands.ts
  var Commands = {
    move: "M",
    line: "L",
    curve: "C",
    arc: "A",
    close: "Z"
  };

  // src/lib/anchor.ts
  var Anchor = class {
    /**
     * default is zero.
     */
    origin;
    #origin_change;
    controls = {
      a: new G20(),
      b: new G20()
    };
    #a_change;
    #b_change;
    #command;
    #relative;
    #rx;
    #ry;
    #xAxisRotation;
    #largeArcFlag;
    #sweepFlag;
    #change = variable(this);
    change$ = this.#change.asObservable();
    #t;
    /**
     * @param origin
     * @param ax The x position of the left handle point.
     * @param ay The y position of the left handle point.
     * @param bx The x position of the right handle point.
     * @param by The y position of the right handle point.
     * @param command The command to describe how to render. Applicable commands are {@link Commands}
     */
    constructor(origin, command = Commands.move, ax = 0, ay = 0, bx = 0, by = 0) {
      this.origin = origin;
      this.controls.a.set(ax, ay);
      this.controls.b.set(bx, by);
      this.#command = command;
      this.#relative = true;
      this.#rx = 0;
      this.#ry = 0;
      this.#xAxisRotation = 0;
      this.#largeArcFlag = 0;
      this.#sweepFlag = 1;
      this.#t = 0;
      this.#origin_change = this.origin.change$.subscribe(() => {
        this.#change.set(this);
      });
      this.#a_change = this.controls.a.change$.subscribe(() => {
        this.#change.set(this);
      });
      this.#b_change = this.controls.b.change$.subscribe(() => {
        this.#change.set(this);
      });
    }
    dispose() {
      if (this.#origin_change) {
        this.#origin_change.dispose();
      }
      if (this.#a_change) {
        this.#a_change.dispose();
      }
      if (this.#b_change) {
        this.#b_change.dispose();
      }
    }
    get x() {
      return this.origin.x;
    }
    set x(x) {
      this.origin.x = x;
    }
    get y() {
      return this.origin.y;
    }
    set y(y) {
      this.origin.y = y;
    }
    get t() {
      return this.#t;
    }
    set t(t) {
      if (this.t !== t) {
        this.#t = t;
      }
    }
    copy(v) {
      this.origin.copyVector(v.origin);
      this.command = v.command;
      this.controls.a.copyVector(v.controls.a);
      this.controls.b.copyVector(v.controls.b);
      this.relative = v.relative;
      this.rx = v.rx;
      this.ry = v.ry;
      this.xAxisRotation = v.xAxisRotation;
      this.largeArcFlag = v.largeArcFlag;
      this.sweepFlag = v.sweepFlag;
      return this;
    }
    /**
     * Invoked when the path is automatic (not manual).
     */
    ignore() {
      throw new Error("TODO: Anchor.ignore()");
    }
    /**
     * Invoked when the path is manual (not automatic).
     */
    listen() {
    }
    /**
     * default is 'M'.
     */
    get command() {
      return this.#command;
    }
    set command(command) {
      if (this.command !== command) {
        this.#command = command;
      }
    }
    /**
     * default is true.
     */
    get relative() {
      return this.#relative;
    }
    set relative(relative) {
      if (this.relative !== !!relative) {
        this.#relative = relative;
      }
    }
    /**
     * default is zero.
     */
    get rx() {
      return this.#rx;
    }
    set rx(rx) {
      if (this.rx !== rx) {
        this.#rx = rx;
      }
    }
    /**
     * default is zero.
     */
    get ry() {
      return this.#ry;
    }
    set ry(ry) {
      if (this.ry !== ry) {
        this.#ry = ry;
      }
    }
    /**
     * default is zero.
     */
    get xAxisRotation() {
      return this.#xAxisRotation;
    }
    set xAxisRotation(xAxisRotation) {
      if (this.xAxisRotation !== xAxisRotation) {
        this.#xAxisRotation = xAxisRotation;
      }
    }
    /**
     * default is zero.
     */
    get largeArcFlag() {
      return this.#largeArcFlag;
    }
    set largeArcFlag(largeArcFlag) {
      if (this.largeArcFlag !== largeArcFlag) {
        this.#largeArcFlag = largeArcFlag;
      }
    }
    /**
     * default is one.
     */
    get sweepFlag() {
      return this.#sweepFlag;
    }
    set sweepFlag(sweepFlag) {
      if (this.sweepFlag !== sweepFlag) {
        this.#sweepFlag = sweepFlag;
      }
    }
  };

  // src/lib/constants.ts
  var next_unique_id = 0;
  var Constants = {
    Identifier: "g2o-",
    /**
     * Default amount of vertices to be used for interpreting Arcs and ArcSegments.
     */
    Resolution: 12,
    uniqueId: function() {
      return next_unique_id++;
    }
  };

  // src/lib/collection.ts
  var Collection = class {
    #insert;
    insert$;
    #remove;
    remove$;
    #order;
    order$;
    #items;
    constructor(items) {
      this.#items = items;
      this.#insert = new Subject();
      this.insert$ = new DisposableObservable(this.#insert.asObservable());
      this.#remove = new Subject();
      this.remove$ = new DisposableObservable(this.#remove.asObservable());
      this.#order = new Subject();
      this.order$ = new DisposableObservable(this.#order.asObservable());
    }
    forEach(callbackfn, thisArg) {
      this.#items.forEach(callbackfn, thisArg);
    }
    get length() {
      return this.#items.length;
    }
    getAt(index) {
      return this.#items[index];
    }
    get() {
      return this.#items;
    }
    ping() {
      this.#insert.next(this.#items);
    }
    pop() {
      const x = this.#items.pop();
      this.#remove.next([x]);
      return x;
    }
    shift() {
      const x = this.#items.shift();
      this.#remove.next([x]);
      return x;
    }
    push(...items) {
      const new_length = this.#items.push(...items);
      this.#insert.next(items);
      return new_length;
    }
    unshift(...items) {
      const new_length = this.#items.unshift();
      this.#insert.next(items);
      return new_length;
    }
    splice(start, deleteCount, ...more) {
      if (typeof deleteCount === "number") {
        const xs = this.#items.splice(start, deleteCount, ...more);
        this.#remove.next(xs);
        return xs;
      } else {
        const xs = this.#items.splice(start);
        this.#remove.next(xs);
        return xs;
      }
    }
    sort(compareFn) {
      this.#items.sort(compareFn);
      this.#order.next();
      return this;
    }
    reverse() {
      this.#items.reverse();
      this.#order.next();
      return this;
    }
    indexOf(searchElement, fromIndex) {
      return this.#items.indexOf(searchElement, fromIndex);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    map(callbackfn, thisArg) {
      return this.#items.map(callbackfn, thisArg);
    }
  };

  // src/lib/children.ts
  var Children = class extends Collection {
    ids = {};
    #insert_subscription;
    #remove_subscription;
    constructor(children) {
      super(children);
      this.#attach(children);
      this.#insert_subscription = this.insert$.subscribe((cs) => {
        this.#attach(cs);
      });
      this.#remove_subscription = this.remove$.subscribe((cs) => {
        this.#detach(cs);
      });
    }
    dispose() {
      this.#insert_subscription.dispose();
      this.#remove_subscription.dispose();
    }
    #attach(children) {
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child && child.id) {
          this.ids[child.id] = child;
        }
      }
      return this;
    }
    #detach(children) {
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        delete this.ids[child.id];
      }
      return this;
    }
  };

  // src/lib/reactive/Disposable.ts
  function dispose(disposables) {
    const length = disposables.length;
    for (let i = length - 1; i >= 0; i--) {
      disposables[i].dispose();
    }
    disposables.length = 0;
  }

  // src/lib/utils/root.ts
  var root;
  if (typeof window !== "undefined") {
    root = window;
  } else if (typeof global !== "undefined") {
    root = global;
  } else if (typeof self !== "undefined") {
    root = self;
  }

  // src/lib/utils/math.ts
  var TWO_PI = Math.PI * 2;
  var HALF_PI = Math.PI * 0.5;
  function lerp(a, b, t) {
    return t * (b - a) + a;
  }
  function mod(v, l) {
    while (v < 0) {
      v += l;
    }
    return v % l;
  }
  var NumArray = root.Float32Array || Array;
  var floor = Math.floor;
  function toFixed(v) {
    return floor(v * 1e6) / 1e6;
  }

  // src/lib/renderers/SVGView.ts
  function get_svg_element_defs(svg2) {
    const children = svg2.children;
    const N = children.length;
    for (let i = 0; i < N; i++) {
      const child = children.item(i);
      if (child instanceof SVGDefsElement) {
        return child;
      }
    }
    throw new Error();
  }
  function set_defs_dirty_flag(defs, dirtyFlag) {
    defs._flagUpdate = dirtyFlag;
  }
  function get_defs_dirty_flag(defs) {
    return defs._flagUpdate;
  }
  var svg = {
    ns: "http://www.w3.org/2000/svg",
    xlink: "http://www.w3.org/1999/xlink",
    // Create an svg namespaced element.
    createElement: function(qualifiedName, attrs = {}) {
      const elem = document.createElementNS(svg.ns, qualifiedName);
      if (attrs && Object.keys(attrs).length > 0) {
        svg.setAttributes(elem, attrs);
      }
      return elem;
    },
    // Add attributes from an svg element.
    setAttributes: function(elem, attrs) {
      const styles = attrs;
      const keys = Object.keys(attrs);
      for (let i = 0; i < keys.length; i++) {
        const qualifiedName = keys[i];
        const value = styles[qualifiedName];
        if (/href/.test(keys[i])) {
          elem.setAttributeNS(svg.xlink, qualifiedName, value);
        } else {
          elem.setAttribute(qualifiedName, value);
        }
      }
      return this;
    },
    // Remove attributes from an svg element.
    removeAttributes: function(elem, attrs) {
      for (const key in attrs) {
        elem.removeAttribute(key);
      }
      return this;
    },
    path_from_anchors: function(board, position, attitude, anchors, closed) {
      const [screenX, screenY] = screen_functions(board);
      const l = anchors.length;
      const last = l - 1;
      let d;
      let string = "";
      for (let i = 0; i < l; i++) {
        const b = anchors[i];
        const prev = closed ? mod(i - 1, l) : Math.max(i - 1, 0);
        const a = anchors[prev];
        let command;
        let c;
        Anchor;
        let vx, vy, ux, uy, ar, bl, br, cl;
        let rx, ry, xAxisRotation, largeArcFlag, sweepFlag;
        let x = toFixed(screenX(b.x, b.y));
        let y = toFixed(screenY(b.x, b.y));
        switch (b.command) {
          case Commands.close:
            command = Commands.close;
            break;
          case Commands.arc:
            rx = b.rx;
            ry = b.ry;
            xAxisRotation = b.xAxisRotation;
            largeArcFlag = b.largeArcFlag;
            sweepFlag = b.sweepFlag;
            command = Commands.arc + " " + rx + " " + ry + " " + xAxisRotation + " " + largeArcFlag + " " + sweepFlag + " " + x + " " + y;
            break;
          case Commands.curve:
            ar = a.controls && a.controls.b || G20.zero;
            bl = b.controls && b.controls.a || G20.zero;
            if (a.relative) {
              vx = toFixed(screenX(ar.x + a.x, ar.y + a.y));
              vy = toFixed(screenY(ar.x + a.x, ar.y + a.y));
            } else {
              vx = toFixed(screenX(ar.x, ar.y));
              vy = toFixed(screenY(ar.x, ar.y));
            }
            if (b.relative) {
              ux = toFixed(screenX(bl.x + b.x, bl.y + b.y));
              uy = toFixed(screenY(bl.x + b.x, bl.y + b.y));
            } else {
              ux = toFixed(screenX(bl.x, bl.y));
              uy = toFixed(screenY(bl.x, bl.y));
            }
            command = (i === 0 ? Commands.move : Commands.curve) + " " + vx + " " + vy + " " + ux + " " + uy + " " + x + " " + y;
            break;
          case Commands.move: {
            d = b;
            command = Commands.move + " " + x + " " + y;
            break;
          }
          default: {
            command = b.command + " " + x + " " + y;
          }
        }
        if (i >= last && closed) {
          if (b.command === Commands.curve) {
            c = d;
            br = b.controls && b.controls.b || b;
            cl = c.controls && c.controls.a || c;
            if (b.relative) {
              vx = toFixed(screenX(br.x + b.x, br.y + b.y));
              vy = toFixed(screenY(br.x + b.x, br.y + b.y));
            } else {
              vx = toFixed(screenX(br.x, br.y));
              vy = toFixed(screenY(br.x, br.y));
            }
            if (c.relative) {
              ux = toFixed(screenX(cl.x + c.x, cl.y + c.y));
              uy = toFixed(screenY(cl.x + c.x, cl.y + c.y));
            } else {
              ux = toFixed(screenX(cl.x, cl.y));
              uy = toFixed(screenY(cl.x, cl.y));
            }
            x = toFixed(screenX(c.x, c.y));
            y = toFixed(screenY(c.x, c.y));
            command += " C " + vx + " " + vy + " " + ux + " " + uy + " " + x + " " + y;
          }
          if (b.command !== Commands.close) {
            command += " Z";
          }
        }
        string += command + " ";
      }
      return string;
    },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/SVG/Element/clipPath
     * @param shape 
     * @param svgElement 
     * @returns 
     */
    getClip: function(shape, svgElement) {
      let clipPath = shape.zzz.clipPath;
      if (!clipPath) {
        clipPath = shape.zzz.clipPath = svg.createElement("clipPath", { "clip-rule": "nonzero" });
      }
      if (clipPath.parentNode === null) {
        get_svg_element_defs(svgElement).appendChild(clipPath);
      }
      return clipPath;
    },
    defs: {
      update: function(svgElement, defs) {
        if (get_defs_dirty_flag(defs)) {
          const children = Array.prototype.slice.call(defs.children, 0);
          for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const id = child.id;
            const selector = `[fill="url(#${id})"],[stroke="url(#${id})"],[clip-path="url(#${id})"]`;
            const exists = svgElement.querySelector(selector);
            if (!exists) {
              defs.removeChild(child);
            }
          }
          set_defs_dirty_flag(defs, false);
        }
      }
    }
  };
  var SVGView = class {
    /**
     * The topmost svg element.
     */
    domElement;
    viewBox;
    defs;
    width;
    height;
    #size = variable({ width: 0, height: 0 });
    size$ = this.#size.asObservable();
    constructor(viewBox, containerId, params = {}) {
      if (viewBox instanceof Group) {
        this.viewBox = viewBox;
        this.viewBox.parent = null;
      } else {
        throw new Error("viewBox must be a Group");
      }
      if (params.domElement) {
        this.domElement = params.domElement;
      } else {
        this.domElement = svg.createElement("svg", { id: `${containerId}-svg` });
      }
      this.defs = svg.createElement("defs");
      set_defs_dirty_flag(this.defs, false);
      this.domElement.appendChild(this.defs);
      this.domElement.style.overflow = "hidden";
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setSize(size, ratio) {
      this.width = size.width;
      this.height = size.height;
      svg.setAttributes(this.domElement, { width: `${size.width}px`, height: `${size.height}px` });
      this.#size.set(size);
      return this;
    }
    render() {
      const svgElement = this.domElement;
      this.viewBox.render(this.domElement, svgElement);
      svg.defs.update(svgElement, this.defs);
      return this;
    }
  };
  function transform_value_of_matrix(m) {
    const a = m.a;
    const b = m.b;
    const c = m.c;
    const d = m.d;
    const e = m.e;
    const f = m.f;
    return `matrix(${[a, b, c, d, e, f].map(toFixed).join(" ")})`;
  }
  function screen_functions(board) {
    if (board.goofy) {
      return [(x, y) => x, (x, y) => y];
    } else {
      return [(x, y) => y, (x, y) => x];
    }
  }

  // src/lib/renderers/ZZZ.ts
  var ZZZ = class {
    /**
     * 
     */
    disposables = [];
    /*
     *
     */
    flags = {};
    appended;
    anchor$;
    baseline$;
    /**
     * The clip property indicates that this path is being used as the clipPath for some other shape.
     */
    #clip = variable(false);
    clip$ = this.#clip.asObservable();
    clipPath;
    context;
    decoration$;
    direction$;
    dx$;
    dy$;
    /**
     * Used by the CanvasRenderer.
     */
    effect;
    /**
     * The element corresponding to some Shape and used by the SVG renderer. It will share the same identifier.
     */
    elem;
    fill$;
    fillOpacity$;
    fontStyle$;
    fontWeight$;
    /**
     * DGH: Something strange in use.
     */
    hasFillEffect;
    /**
     * DGH: Something strange in use.
     */
    hasStrokeEffect;
    height$;
    image;
    offset;
    opacity$;
    radius$;
    scale;
    spreadMethod$;
    stroke$;
    strokeOpacity$;
    strokeWidth$;
    textContent$;
    units$;
    vertices;
    vertices_subject;
    vertices$;
    visibility$;
    width$;
    dispose() {
      dispose(this.disposables);
    }
    get clip() {
      return this.#clip.get();
    }
    set clip(clip) {
      this.#clip.set(clip);
      this.flags[5 /* ClipFlag */] = true;
    }
  };

  // src/lib/element.ts
  var ElementBase = class {
    /**
     * 
     */
    parent;
    /**
     * 
     */
    zzz = new ZZZ();
    #id;
    #className = "";
    classList = [];
    constructor(id) {
      this.#id = id;
      this.flagReset(false);
    }
    dispose() {
      this.zzz.dispose();
    }
    flagReset(dirtyFlag = false) {
      this.zzz.flags[4 /* ClassName */] = dirtyFlag;
      return this;
    }
    get id() {
      return this.#id;
    }
    get className() {
      return this.#className;
    }
    set className(className) {
      if (this.className !== className) {
        this.zzz.flags[4 /* ClassName */] = true;
        this.classList = className.split(/\s+?/);
        this.#className = className;
      }
    }
  };

  // src/lib/math/compose_2d_3x3_transform.ts
  function compose_2d_3x3_transform(x, y, sx, sy, cos_\u03C6, sin_\u03C6, skewX, skewY, matrix) {
    const cos_\u03B8 = cos_\u03C6 * cos_\u03C6 - sin_\u03C6 * sin_\u03C6;
    const sin_\u03B8 = 2 * cos_\u03C6 * sin_\u03C6;
    const a = sx;
    const b = sy;
    const p = Math.tan(skewX);
    const q = Math.tan(skewY);
    const c = cos_\u03B8;
    const s = sin_\u03B8;
    const ac = a * c;
    const as = a * s;
    const asq = as * q;
    const bc = b * c;
    const bcp = bc * p;
    const bcq = bc * q;
    const bs = b * s;
    const pq = p * q;
    const py = p * y;
    const a11 = ac - asq + bcp * pq * bs;
    const a12 = -as + bcp;
    const a13 = x + py;
    const a21 = bcq + bs;
    const a22 = bc;
    const a23 = y;
    matrix.set(a11, a12, a13, a21, a22, a23, 0, 0, 1);
  }

  // src/lib/matrix.ts
  var cos = Math.cos;
  var sin = Math.sin;
  var tan = Math.tan;
  var Matrix = class _Matrix {
    #change = variable(this);
    change$ = this.#change.asObservable();
    /**
     * 1st row is [0,1,2], 2nd row is [3,4,5], 3rd row is [6,7,8]
     */
    #elements = new NumArray(9);
    /**
     * Determines whether we automatically calculate the values for the matrix or if the developer intends to manage the matrix.
     */
    manual = false;
    #verbose = true;
    constructor(a11 = 1, a12 = 0, a13 = 0, a21 = 0, a22 = 1, a23 = 0, a31 = 0, a32 = 0, a33 = 1) {
      this.#elements[0] = a11;
      this.#elements[1] = a12;
      this.#elements[2] = a13;
      this.#elements[3] = a21;
      this.#elements[4] = a22;
      this.#elements[5] = a23;
      this.#elements[6] = a31;
      this.#elements[7] = a32;
      this.#elements[8] = a33;
    }
    get a() {
      return this.#elements[0];
    }
    get b() {
      return this.#elements[3];
    }
    get c() {
      return this.#elements[1];
    }
    get d() {
      return this.#elements[4];
    }
    get e() {
      return this.#elements[2];
    }
    get f() {
      return this.#elements[5];
    }
    get a11() {
      return this.#elements[0];
    }
    get a12() {
      return this.#elements[1];
    }
    get a13() {
      return this.#elements[2];
    }
    get a21() {
      return this.#elements[3];
    }
    get a22() {
      return this.#elements[4];
    }
    get a23() {
      return this.#elements[5];
    }
    get a31() {
      return this.#elements[6];
    }
    get a32() {
      return this.#elements[7];
    }
    get a33() {
      return this.#elements[8];
    }
    set(a11, a12, a13, a21, a22, a23, a31, a32, a33) {
      this.#elements[0] = a11;
      this.#elements[1] = a12;
      this.#elements[2] = a13;
      this.#elements[3] = a21;
      this.#elements[4] = a22;
      this.#elements[5] = a23;
      this.#elements[6] = a31;
      this.#elements[7] = a32;
      this.#elements[8] = a33;
      return this.#broadcast();
    }
    set_from_matrix(m) {
      this.#elements[0] = m.a11;
      this.#elements[1] = m.a12;
      this.#elements[2] = m.a13;
      this.#elements[3] = m.a21;
      this.#elements[4] = m.a22;
      this.#elements[5] = m.a23;
      this.#elements[6] = m.a31;
      this.#elements[7] = m.a32;
      this.#elements[8] = m.a33;
      return this.#broadcast();
    }
    /**
     * Copy the matrix of one to the current instance.
     */
    copy(m) {
      this.#elements[0] = m.#elements[0];
      this.#elements[1] = m.#elements[1];
      this.#elements[2] = m.#elements[2];
      this.#elements[3] = m.#elements[3];
      this.#elements[4] = m.#elements[4];
      this.#elements[5] = m.#elements[5];
      this.#elements[6] = m.#elements[6];
      this.#elements[7] = m.#elements[7];
      this.#elements[8] = m.#elements[8];
      this.manual = m.manual;
      return this.#broadcast();
    }
    /**
     * Sets matrix to the identity, like resetting.
     */
    identity() {
      this.#elements[0] = 1;
      this.#elements[1] = 0;
      this.#elements[2] = 0;
      this.#elements[3] = 0;
      this.#elements[4] = 1;
      this.#elements[5] = 0;
      this.#elements[6] = 0;
      this.#elements[7] = 0;
      this.#elements[8] = 1;
      return this.#broadcast();
    }
    multiply(b11, b12, b13, b21, b22, b23, b31, b32, b33) {
      const A = this.#elements;
      const a11 = A[0];
      const a12 = A[1];
      const a13 = A[2];
      const a21 = A[3];
      const a22 = A[4];
      const a23 = A[5];
      const a31 = A[6];
      const a32 = A[7];
      const a33 = A[8];
      this.#elements[0] = a11 * b11 + a12 * b21 + a13 * b31;
      this.#elements[1] = a11 * b12 + a12 * b22 + a13 * b32;
      this.#elements[2] = a11 * b13 + a12 * b23 + a13 * b33;
      this.#elements[3] = a21 * b11 + a22 * b21 + a23 * b31;
      this.#elements[4] = a21 * b12 + a22 * b22 + a23 * b32;
      this.#elements[5] = a21 * b13 + a22 * b23 + a23 * b33;
      this.#elements[6] = a31 * b11 + a32 * b21 + a33 * b31;
      this.#elements[7] = a31 * b12 + a32 * b22 + a33 * b32;
      this.#elements[8] = a31 * b13 + a32 * b23 + a33 * b33;
      return this.#broadcast();
    }
    multiply_vector(x = 0, y = 0, z = 1) {
      const x1 = this.a11 * x + this.a12 * y + this.a13 * z;
      const x2 = this.a21 * x + this.a22 * y + this.a23 * z;
      const x3 = this.a31 * x + this.a32 * y + this.a33 * z;
      return [x1, x2, x3];
    }
    multiply_by_scalar(s) {
      this.#elements[0] *= s;
      this.#elements[1] *= s;
      this.#elements[2] *= s;
      this.#elements[3] *= s;
      this.#elements[4] *= s;
      this.#elements[5] *= s;
      this.#elements[6] *= s;
      this.#elements[7] *= s;
      this.#elements[8] *= s;
      return this.#broadcast();
    }
    /**
     * @param out The optional matrix to apply the inversion to.
     * Return an inverted version of the matrix. If no optional one is passed a new matrix is created and returned.
     */
    inverse(out) {
      const a = this.#elements;
      out = out || new _Matrix();
      const a00 = a[0], a01 = a[1], a02 = a[2];
      const a10 = a[3], a11 = a[4], a12 = a[5];
      const a20 = a[6], a21 = a[7], a22 = a[8];
      const b01 = a22 * a11 - a12 * a21;
      const b11 = -a22 * a10 + a12 * a20;
      const b21 = a21 * a10 - a11 * a20;
      let det = a00 * b01 + a01 * b11 + a02 * b21;
      if (!det) {
        return null;
      }
      det = 1 / det;
      out.#elements[0] = b01 * det;
      out.#elements[1] = (-a22 * a01 + a02 * a21) * det;
      out.#elements[2] = (a12 * a01 - a02 * a11) * det;
      out.#elements[3] = b11 * det;
      out.#elements[4] = (a22 * a00 - a02 * a20) * det;
      out.#elements[5] = (-a12 * a00 + a02 * a10) * det;
      out.#elements[6] = b21 * det;
      out.#elements[7] = (-a21 * a00 + a01 * a20) * det;
      out.#elements[8] = (a11 * a00 - a01 * a10) * det;
      return out;
    }
    scale(sx, sy) {
      if (sx === 1 && sy === 1) {
        return this;
      } else {
        return this.multiply(sx, 0, 0, 0, sy, 0, 0, 0, 1);
      }
    }
    /**
     * @param angle The rotation angle in radians.
     * @returns 
     */
    rotate(angle) {
      const c = cos(angle);
      const s = sin(angle);
      if (c === 1 && s === 0) {
        return this;
      } else {
        return this.multiply(c, -s, 0, s, c, 0, 0, 0, 1);
      }
    }
    translate(translation) {
      if (translation.x === 0 && translation.y === 0) {
        return this;
      } else {
        return this.multiply(1, 0, translation.x, 0, 1, translation.y, 0, 0, 1);
      }
    }
    /**
     * Skew the matrix by an angle in the x axis direction.
     * 
     * @param skewX The skew angle in radians.
     */
    skewX(skewX) {
      if (skewX === 0) {
        return this;
      } else {
        const a = tan(skewX);
        return this.multiply(1, a, 0, 0, 1, 0, 0, 0, 1);
      }
    }
    /**
     * Skew the matrix by an angle in the y axis direction.
     * 
     * @param skewY The skew angle in radians.
     */
    skewY(skewY) {
      if (skewY === 0) {
        return this;
      } else {
        const a = tan(skewY);
        return this.multiply(1, 0, 0, a, 1, 0, 0, 0, 1);
      }
    }
    silence() {
      this.#verbose = false;
      return this;
    }
    #broadcast() {
      if (this.#verbose) {
        this.#change.set(this);
      }
      return this;
    }
    touch() {
      this.#verbose = true;
      return this.#broadcast();
    }
  };

  // src/lib/utils/compute_world_matrix.ts
  function computed_world_matrix(shape, matrix) {
    matrix = matrix && matrix.identity() || new Matrix();
    let parent = shape;
    const matrices = [];
    while (parent && parent.matrix) {
      matrices.push(parent.matrix);
      parent = parent.parent;
    }
    matrices.reverse();
    for (let i = 0; i < matrices.length; i++) {
      const m = matrices[i];
      matrix.multiply(m.a11, m.a12, m.a13, m.a21, m.a22, m.a23, m.a31, m.a32, m.a33);
    }
  }

  // src/lib/Shape.ts
  function ensure_mutable(mv) {
    if (mv.isMutable()) {
      return mv;
    } else {
      return mv.clone();
    }
  }
  function position_from_like(like) {
    if (like instanceof Shape) {
      return ensure_mutable(like.position);
    }
    if (like instanceof G20) {
      return ensure_mutable(like);
    } else if (like instanceof Anchor) {
      return ensure_mutable(like.origin);
    } else if (Array.isArray(like)) {
      return G20.vector(like[0], like[1]);
    } else {
      return null;
    }
  }
  function ensure_identifier(attributes) {
    if (typeof attributes.id === "string") {
      return attributes.id;
    } else {
      return `${Constants.Identifier}${Constants.uniqueId()}`;
    }
  }
  var Shape = class _Shape extends ElementBase {
    constructor(board, attributes = {}) {
      super(ensure_identifier(attributes));
      this.board = board;
      this.zzz.opacity$ = this.#opacity.asObservable();
      this.zzz.visibility$ = this.#visibility.asObservable();
      this.flagReset(true);
      this.matrix = new Matrix();
      this.worldMatrix = new Matrix();
      if (attributes.position) {
        this.#position = position_from_like(attributes.position);
      } else {
        this.#position = new G20(0, 0);
      }
      if (attributes.attitude) {
        this.#attitude = attributes.attitude;
      } else {
        this.#attitude = new G20(0, 0, 1, 0);
      }
      if (attributes.compensate) {
        this.#compensate = attributes.compensate;
      } else {
        this.#compensate = false;
      }
      if (typeof attributes.opacity === "number") {
        this.#opacity.set(attributes.opacity);
      }
      if (attributes.visibility) {
        this.#visibility.set(attributes.visibility);
      }
      this.scale = 1;
      this.skewX = 0;
      this.skewY = 0;
      this.#position_change = this.#position_change_bind();
      this.#attitude_change = this.#attitude_change_bind();
    }
    /**
     * The matrix value of the shape's position, rotation, and scale.
     */
    #matrix = null;
    /**
     * The matrix value of the shape's position, rotation, and scale in the scene.
     */
    #worldMatrix = null;
    #position;
    #position_change;
    #attitude;
    #attitude_change;
    /**
     * The scale supports non-uniform scaling.
     * The API provides more convenient access for uniform scaling.
     * Make the easy things easy...
     */
    #scale = new G20(1, 1);
    #scale_change = this.#scale.change$.subscribe(() => {
      this.zzz.flags[17 /* Matrix */] = true;
    });
    #skewX = variable(0);
    #skewY = variable(0);
    #opacity = variable(1);
    #visibility = variable("visible");
    #compensate;
    #clipPath = null;
    dispose() {
      this.#scale_change.dispose();
      this.#position_change_unbind();
      this.#attitude_change_unbind();
      super.dispose();
    }
    #update_matrix(compensate) {
      const position = this.position;
      const x = position.x;
      const y = position.y;
      const attitude = this.attitude;
      const scale = this.scaleXY;
      const sx = scale.x;
      const sy = scale.y;
      if (this.board.goofy) {
        const cos_\u03C6 = attitude.a;
        const sin_\u03C6 = attitude.b;
        compose_2d_3x3_transform(x, y, sx, sy, cos_\u03C6, sin_\u03C6, this.skewX, this.skewY, this.matrix);
      } else {
        if (compensate) {
          const a = attitude.a;
          const b = attitude.b;
          const cos_\u03C6 = (a - b) / Math.SQRT2;
          const sin_\u03C6 = (a + b) / Math.SQRT2;
          compose_2d_3x3_transform(y, x, sy, sx, cos_\u03C6, sin_\u03C6, this.skewY, this.skewX, this.matrix);
        } else {
          const cos_\u03C6 = attitude.a;
          const sin_\u03C6 = attitude.b;
          compose_2d_3x3_transform(y, x, sy, sx, cos_\u03C6, sin_\u03C6, this.skewY, this.skewX, this.matrix);
        }
      }
    }
    update() {
      if (!this.matrix.manual && this.zzz.flags[17 /* Matrix */]) {
        this.#update_matrix(this.#compensate);
      }
      return this;
    }
    flagReset(dirtyFlag = false) {
      this.zzz.flags[31 /* Vertices */] = dirtyFlag;
      this.zzz.flags[17 /* Matrix */] = dirtyFlag;
      this.zzz.flags[22 /* Scale */] = dirtyFlag;
      super.flagReset(dirtyFlag);
      return this;
    }
    useAttitude(attitude) {
      this.#attitude_change_unbind();
      this.#attitude = attitude;
      this.#attitude_change = this.#attitude_change_bind();
    }
    #attitude_change_bind() {
      return this.#attitude.change$.subscribe(() => {
        this.#update_matrix(this.#compensate);
        this.zzz.flags[17 /* Matrix */] = true;
      });
    }
    #attitude_change_unbind() {
      if (this.#attitude_change) {
        this.#attitude_change.dispose();
        this.#attitude_change = null;
      }
    }
    usePosition(position) {
      this.#position_change_unbind();
      this.#position = position;
      this.#position_change = this.#position_change_bind();
    }
    #position_change_bind() {
      return this.#position.change$.subscribe(() => {
        this.#update_matrix(this.#compensate);
        this.zzz.flags[17 /* Matrix */] = true;
      });
    }
    #position_change_unbind() {
      if (this.#position_change) {
        this.#position_change.dispose();
        this.#position_change = null;
      }
    }
    get X() {
      return this.#position;
    }
    set X(pos) {
      if (pos instanceof G20) {
        this.#position.copyVector(pos);
      }
    }
    get position() {
      return this.#position;
    }
    set position(position) {
      if (position instanceof G20) {
        this.#position.copyVector(position);
      }
    }
    get R() {
      return this.#attitude;
    }
    set R(attitude) {
      if (attitude instanceof G20) {
        this.#attitude.copySpinor(attitude);
      }
    }
    get attitude() {
      return this.#attitude;
    }
    set attitude(attitude) {
      if (attitude instanceof G20) {
        this.#attitude.copySpinor(attitude);
      }
    }
    get scale() {
      if (this.#scale.x === this.#scale.y) {
        return this.#scale.x;
      } else {
        throw new Error();
      }
    }
    set scale(scale) {
      this.#scale.x = scale;
      this.#scale.y = scale;
      this.#update_matrix(this.#compensate);
      this.zzz.flags[17 /* Matrix */] = true;
      this.zzz.flags[22 /* Scale */] = true;
    }
    get scaleXY() {
      return this.#scale;
    }
    set scaleXY(scale) {
      this.#scale.set(scale.x, scale.y, 0, 0);
      this.zzz.flags[17 /* Matrix */] = true;
      this.zzz.flags[22 /* Scale */] = true;
    }
    get skewX() {
      return this.#skewX.get();
    }
    set skewX(skewX) {
      this.#skewX.set(skewX);
      this.zzz.flags[17 /* Matrix */] = true;
    }
    get skewY() {
      return this.#skewY.get();
    }
    set skewY(skewY) {
      this.#skewY.set(skewY);
      this.zzz.flags[17 /* Matrix */] = true;
    }
    get clipPath() {
      return this.#clipPath;
    }
    set clipPath(clipPath) {
      this.#clipPath = clipPath;
      this.zzz.flags[6 /* ClipPath */] = true;
      if (clipPath instanceof _Shape && !clipPath.zzz.clip) {
        clipPath.zzz.clip = true;
      }
    }
    get matrix() {
      return this.#matrix;
    }
    set matrix(matrix) {
      this.#matrix = matrix;
      this.zzz.flags[17 /* Matrix */] = true;
    }
    get opacity() {
      return this.#opacity.get();
    }
    set opacity(opacity) {
      if (typeof opacity === "number") {
        if (opacity >= 0 && opacity <= 1) {
          if (this.opacity !== opacity) {
            this.#opacity.set(opacity);
          }
        }
      }
    }
    get visibility() {
      return this.#visibility.get();
    }
    set visibility(visible) {
      if (typeof visible === "string") {
        if (this.visibility !== visible) {
          this.#visibility.set(visible);
        }
      }
    }
    show() {
      this.visibility = "visible";
      return this;
    }
    hide() {
      this.visibility = "hidden";
      return this;
    }
    collapse() {
      this.visibility = "collapse";
      return this;
    }
    get worldMatrix() {
      computed_world_matrix(this, this.#worldMatrix);
      return this.#worldMatrix;
    }
    set worldMatrix(worldMatrix) {
      this.#worldMatrix = worldMatrix;
    }
  };

  // src/lib/group.ts
  var Group = class _Group extends Shape {
    #strokeWidth = 1;
    #cap = "round";
    #join = "round";
    #miter = 4;
    #closed = true;
    #curved = false;
    /**
     * Determines whether Path plots coordinates base don "closed" and "curved" flags.
     * The presence in Group seems unnecessary.
     */
    #automatic = true;
    /**
     * Number between zero and one to state the beginning of where the path is rendered.
     * a percentage value that represents at what percentage into all child shapes should the renderer start drawing.
     */
    #beginning = 0;
    /**
     * Number between zero and one to state the ending of where the path is rendered.
     * a percentage value that represents at what percentage into all child shapes should the renderer start drawing.
     */
    #ending = 1;
    #length = 0;
    #shapes;
    #shapes_insert = null;
    #shapes_remove = null;
    #shapes_order = null;
    /**
     * An automatically updated list of shapes that need to be appended to the renderer's scenegraph.
     */
    additions = [];
    /**
     * An automatically updated list of children that need to be removed from the renderer's scenegraph.
     */
    subtractions = [];
    constructor(board, shapes = [], attributes = {}) {
      super(board, shape_attributes(attributes));
      this.flagReset(true);
      this.zzz.flags[1 /* Additions */] = false;
      this.zzz.flags[29 /* Subtractions */] = false;
      this.zzz.flags[2 /* Beginning */] = false;
      this.zzz.flags[9 /* Ending */] = false;
      this.zzz.flags[15 /* Length */] = false;
      this.zzz.flags[19 /* Order */] = false;
      this.zzz.flags[6 /* ClipPath */] = false;
      this.#shapes = new Children(shapes);
      this.#subscribe_to_shapes();
    }
    dispose() {
      this.#unsubscribe_from_shapes();
      this.#shapes.dispose();
      super.dispose();
    }
    hasBoundingBox() {
      return false;
    }
    render(domElement, svgElement) {
      this.update();
      if (this.zzz.elem) {
      } else {
        this.zzz.elem = svg.createElement("g", { id: this.id });
        domElement.appendChild(this.zzz.elem);
        this.zzz.disposables.push(this.matrix.change$.subscribe(() => {
          this.zzz.elem.setAttribute("transform", transform_value_of_matrix(this.matrix));
        }));
        this.zzz.disposables.push(this.zzz.opacity$.subscribe((opacity) => {
          const change = { opacity: `${opacity}` };
          if (opacity === 1) {
            svg.removeAttributes(this.zzz.elem, change);
          } else {
            svg.setAttributes(this.zzz.elem, change);
          }
          return function() {
          };
        }));
        this.zzz.disposables.push(this.zzz.visibility$.subscribe((visibility) => {
          switch (visibility) {
            case "visible": {
              const change = { visibility };
              svg.removeAttributes(this.zzz.elem, change);
              break;
            }
            default: {
              const change = { visibility };
              svg.setAttributes(this.zzz.elem, change);
              break;
            }
          }
          return function() {
          };
        }));
      }
      const flagMatrix = this.matrix.manual || this.zzz.flags[17 /* Matrix */];
      const dom_context = {
        domElement,
        elem: this.zzz.elem
      };
      if (flagMatrix) {
        this.zzz.elem.setAttribute("transform", transform_value_of_matrix(this.matrix));
      }
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children.getAt(i);
        const elem = this.zzz.elem;
        child.render(elem, svgElement);
      }
      if (this.zzz.flags[4 /* ClassName */]) {
        this.zzz.elem.setAttribute("class", this.classList.join(" "));
      }
      if (this.zzz.flags[1 /* Additions */]) {
        this.additions.forEach((shape) => {
          const childNode = shape.zzz.elem;
          if (!childNode) {
            return;
          }
          const tag = childNode.nodeName;
          if (!tag || /(radial|linear)gradient/i.test(tag) || shape.zzz.clip) {
            return;
          }
          dom_context.elem.appendChild(childNode);
        });
      }
      if (this.zzz.flags[29 /* Subtractions */]) {
        this.subtractions.forEach((shape) => {
          const childNode = shape.zzz.elem;
          if (!childNode || childNode.parentNode != dom_context.elem) {
            return;
          }
          const tag = childNode.nodeName;
          if (!tag) {
            return;
          }
          if (shape.zzz.clip) {
            return;
          }
          dispose(shape.zzz.disposables);
          dom_context.elem.removeChild(childNode);
        });
      }
      if (this.zzz.flags[19 /* Order */]) {
        this.children.forEach((child) => {
          dom_context.elem.appendChild(child.zzz.elem);
        });
      } else {
        if (this.zzz.flags[6 /* ClipPath */]) {
          if (this.clipPath) {
            this.clipPath.render(domElement, svgElement);
            this.zzz.elem.setAttribute("clip-path", "url(#" + this.clipPath.id + ")");
          } else {
            this.zzz.elem.removeAttribute("clip-path");
          }
        }
        this.flagReset();
      }
    }
    #subscribe_to_shapes() {
      this.#shapes_insert = this.#shapes.insert$.subscribe((inserts) => {
        for (const shape of inserts) {
          update_shape_group(shape, this);
        }
      });
      this.#shapes_remove = this.#shapes.remove$.subscribe((removes) => {
        for (const shape of removes) {
          update_shape_group(shape, null);
        }
      });
      this.#shapes_order = this.#shapes.order$.subscribe(() => {
        this.zzz.flags[19 /* Order */] = true;
      });
    }
    #unsubscribe_from_shapes() {
      if (this.#shapes_insert) {
        this.#shapes_insert.dispose();
        this.#shapes_insert = null;
      }
      if (this.#shapes_remove) {
        this.#shapes_remove.dispose();
        this.#shapes_remove = null;
      }
      if (this.#shapes_order) {
        this.#shapes_order.dispose();
        this.#shapes_order = null;
      }
    }
    /**
     * Orient the children of the group to the upper left-hand corner of that group.
     */
    corner() {
      const bbox = this.getBoundingBox(true);
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children.getAt(i);
        child.position.x -= bbox.left;
        child.position.y -= bbox.top;
      }
      if (this.clipPath) {
        this.clipPath.position.x -= bbox.left;
        this.clipPath.position.y -= bbox.top;
      }
      return this;
    }
    /**
     * Orient the children of the group to the center of that group.
     */
    center() {
      const bbox = this.getBoundingBox(true);
      const cx = (bbox.left + bbox.right) / 2 - this.position.x;
      const cy = (bbox.top + bbox.bottom) / 2 - this.position.y;
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children.getAt(i);
        child.position.x -= cx;
        child.position.y -= cy;
      }
      if (this.clipPath) {
        this.clipPath.position.x -= cx;
        this.clipPath.position.y -= cy;
      }
      return this;
    }
    getById(id) {
      let found = null;
      function search(node) {
        if (node.id === id) {
          return node;
        } else if (node instanceof _Group && node.children) {
          for (let i = 0; i < node.children.length; i++) {
            found = search(node.children.getAt(i));
            if (found) {
              return found;
            }
          }
        }
        return null;
      }
      return search(this);
    }
    getByClassName(className) {
      const found = [];
      function search(node) {
        if (Array.prototype.indexOf.call(node.classList, className) >= 0) {
          found.push(node);
        }
        if (node instanceof _Group && node.children) {
          for (let i = 0; i < node.children.length; i++) {
            const child = node.children.getAt(i);
            search(child);
          }
        }
        return found;
      }
      return search(this);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getByType(type) {
      const found = [];
      function search(node) {
        if (node instanceof type) {
          found.push(node);
        }
        if (node instanceof _Group && node.children) {
          for (let i = 0; i < node.children.length; i++) {
            const child = node.children.getAt(i);
            search(child);
          }
        }
        return found;
      }
      return search(this);
    }
    add(...shapes) {
      for (let i = 0; i < shapes.length; i++) {
        const child = shapes[i];
        if (!(child && child.id)) {
          continue;
        }
        const index = this.children.indexOf(child);
        if (index >= 0) {
          this.children.splice(index, 1);
        }
        this.children.push(child);
      }
      return this;
    }
    remove(...shapes) {
      for (let i = 0; i < shapes.length; i++) {
        const shape = shapes[i];
        shape.dispose();
        const index = this.children.indexOf(shape);
        if (index >= 0) {
          this.children.splice(index, 1);
        }
      }
      return this;
    }
    getBoundingBox(shallow = false) {
      this.update();
      let left = Infinity, right = -Infinity, top = Infinity, bottom = -Infinity;
      const matrix = shallow ? this.matrix : this.worldMatrix;
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children.getAt(i);
        if (!(child.visibility === "visible") || child.hasBoundingBox()) {
          continue;
        }
        const rect = child.getBoundingBox(shallow);
        const tc = typeof rect.top !== "number" || isNaN(rect.top) || !isFinite(rect.top);
        const lc = typeof rect.left !== "number" || isNaN(rect.left) || !isFinite(rect.left);
        const rc = typeof rect.right !== "number" || isNaN(rect.right) || !isFinite(rect.right);
        const bc = typeof rect.bottom !== "number" || isNaN(rect.bottom) || !isFinite(rect.bottom);
        if (tc || lc || rc || bc) {
          continue;
        }
        if (shallow) {
          const [ax, ay] = matrix.multiply_vector(rect.left, rect.top);
          const [bx, by] = matrix.multiply_vector(rect.right, rect.top);
          const [cx, cy] = matrix.multiply_vector(rect.left, rect.bottom);
          const [dx, dy] = matrix.multiply_vector(rect.right, rect.bottom);
          top = Math.min(ay, by, cy, dy);
          left = Math.min(ax, bx, cx, dx);
          right = Math.max(ax, bx, cx, dx);
          bottom = Math.max(ay, by, cy, dy);
        } else {
          top = Math.min(rect.top, top);
          left = Math.min(rect.left, left);
          right = Math.max(rect.right, right);
          bottom = Math.max(rect.bottom, bottom);
        }
      }
      return { top, left, right, bottom };
    }
    /**
     * Apply `noFill` method to all child shapes.
     */
    noFill() {
      this.children.forEach(function(child) {
        child.noFill();
      });
      return this;
    }
    /**
     * Apply `noStroke` method to all child shapes.
     */
    noStroke() {
      this.children.forEach(function(child) {
        child.noStroke();
      });
      return this;
    }
    /**
     * Apply `subdivide` method to all child shapes.
     */
    subdivide(limit) {
      this.children.forEach(function(child) {
        child.subdivide(limit);
      });
      return this;
    }
    update() {
      if (this.zzz.flags[2 /* Beginning */] || this.zzz.flags[9 /* Ending */]) {
        const beginning = Math.min(this.beginning, this.ending);
        const ending = Math.max(this.beginning, this.ending);
        const length = this.length;
        let sum = 0;
        const bd = beginning * length;
        const ed = ending * length;
        for (let i = 0; i < this.children.length; i++) {
          const child = this.children.getAt(i);
          const l = child.length;
          if (bd > sum + l) {
            child.beginning = 1;
            child.ending = 1;
          } else if (ed < sum) {
            child.beginning = 0;
            child.ending = 0;
          } else if (bd > sum && bd < sum + l) {
            child.beginning = (bd - sum) / l;
            child.ending = 1;
          } else if (ed > sum && ed < sum + l) {
            child.beginning = 0;
            child.ending = (ed - sum) / l;
          } else {
            child.beginning = 0;
            child.ending = 1;
          }
          sum += l;
        }
      }
      return super.update();
    }
    flagReset(dirtyFlag = false) {
      if (this.zzz.flags[1 /* Additions */]) {
        this.additions.length = 0;
        this.zzz.flags[1 /* Additions */] = dirtyFlag;
      }
      if (this.zzz.flags[29 /* Subtractions */]) {
        this.subtractions.length = 0;
        this.zzz.flags[29 /* Subtractions */] = false;
      }
      this.zzz.flags[19 /* Order */] = dirtyFlag;
      this.zzz.flags[6 /* ClipPath */] = dirtyFlag;
      this.zzz.flags[2 /* Beginning */] = dirtyFlag;
      this.zzz.flags[9 /* Ending */] = dirtyFlag;
      super.flagReset(dirtyFlag);
      return this;
    }
    get automatic() {
      return this.#automatic;
    }
    set automatic(automatic) {
      this.#automatic = automatic;
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children.getAt(i);
        child.automatic = automatic;
      }
    }
    get beginning() {
      return this.#beginning;
    }
    set beginning(beginning) {
      if (typeof beginning === "number") {
        if (this.beginning !== beginning) {
          this.#beginning = beginning;
          this.zzz.flags[2 /* Beginning */] = true;
        }
      }
    }
    get cap() {
      return this.#cap;
    }
    set cap(cap) {
      this.#cap = cap;
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children.getAt(i);
        child.cap = cap;
      }
    }
    /**
     * A list of all the children in the scenegraph.
     */
    get children() {
      return this.#shapes;
    }
    set children(children) {
      this.#unsubscribe_from_shapes();
      this.#shapes.dispose();
      this.#shapes = children;
      this.#subscribe_to_shapes();
      for (let i = 0; i < children.length; i++) {
        const shape = children.getAt(i);
        update_shape_group(shape, this);
      }
    }
    get closed() {
      return this.#closed;
    }
    set closed(v) {
      this.#closed = v;
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children.getAt(i);
        child.closed = v;
      }
    }
    get curved() {
      return this.#curved;
    }
    set curved(v) {
      this.#curved = v;
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children.getAt(i);
        child.curved = v;
      }
    }
    get ending() {
      return this.#ending;
    }
    set ending(ending) {
      if (typeof ending === "number") {
        if (this.ending !== ending) {
          this.#ending = ending;
          this.zzz.flags[9 /* Ending */] = true;
        }
      }
    }
    get fill() {
      throw new Error();
    }
    set fill(fill) {
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children.getAt(i);
        child.fill = fill;
      }
    }
    get join() {
      return this.#join;
    }
    set join(v) {
      this.#join = v;
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children.getAt(i);
        child.join = v;
      }
    }
    get length() {
      if (this.zzz.flags[15 /* Length */] || this.#length <= 0) {
        this.#length = 0;
        if (!this.children) {
          return this.#length;
        }
        for (let i = 0; i < this.children.length; i++) {
          const child = this.children.getAt(i);
          this.#length += child.length;
        }
      }
      return this.#length;
    }
    get strokeWidth() {
      return this.#strokeWidth;
    }
    set strokeWidth(strokeWidth) {
      this.#strokeWidth = strokeWidth;
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children.getAt(i);
        child.strokeWidth = strokeWidth;
      }
    }
    get miter() {
      return this.#miter;
    }
    set miter(v) {
      this.#miter = v;
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children.getAt(i);
        child.miter = v;
      }
    }
    get stroke() {
      throw new Error();
    }
    set stroke(stroke) {
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children.getAt(i);
        child.stroke = stroke;
      }
    }
  };
  function update_shape_group(child, parent) {
    const previous_parent = child.parent;
    if (previous_parent === parent) {
      add();
      return;
    }
    if (previous_parent && previous_parent instanceof Group && previous_parent.children.ids[child.id]) {
      const index = Array.prototype.indexOf.call(previous_parent.children, child);
      previous_parent.children.splice(index, 1);
      splice();
    }
    if (parent) {
      add();
      return;
    }
    splice();
    if (previous_parent && previous_parent instanceof Group) {
      if (previous_parent.zzz.flags[1 /* Additions */] && previous_parent.additions.length === 0) {
        previous_parent.zzz.flags[1 /* Additions */] = false;
      }
      if (previous_parent.zzz.flags[29 /* Subtractions */] && previous_parent.subtractions.length === 0) {
        previous_parent.zzz.flags[29 /* Subtractions */] = false;
      }
    }
    delete child.parent;
    function add() {
      if (parent.subtractions.length > 0) {
        const index = Array.prototype.indexOf.call(parent.subtractions, child);
        if (index >= 0) {
          parent.subtractions.splice(index, 1);
        }
      }
      if (parent.additions.length > 0) {
        const index = Array.prototype.indexOf.call(parent.additions, child);
        if (index >= 0) {
          parent.additions.splice(index, 1);
        }
      }
      child.parent = parent;
      parent.additions.push(child);
      parent.zzz.flags[1 /* Additions */] = true;
    }
    function splice() {
      if (previous_parent && previous_parent instanceof Group) {
        const indexAdd = previous_parent.additions.indexOf(child);
        if (indexAdd >= 0) {
          previous_parent.additions.splice(indexAdd, 1);
        }
        const indexSub = previous_parent.subtractions.indexOf(child);
        if (indexSub < 0) {
          previous_parent.subtractions.push(child);
          previous_parent.zzz.flags[29 /* Subtractions */] = true;
        }
      }
    }
  }
  function shape_attributes(attributes) {
    const retval = {
      id: attributes.id
    };
    return retval;
  }

  // src/lib/effects/ColorProvider.ts
  function is_color_provider(x) {
    if (typeof x === "string") {
      return false;
    } else if (typeof x === "object") {
      return true;
    } else {
      throw new Error();
    }
  }
  function serialize_color(x) {
    if (is_color_provider(x)) {
      return `url(#${x.id})`;
    } else {
      return x;
    }
  }

  // src/lib/math/decompose_2d_3x3_matrix.ts
  function decompose_2d_3x3_matrix(m) {
    const a = m.a11;
    const c = m.a12;
    const x = m.a13;
    const b = m.a21;
    const d = m.a22;
    const y = m.a23;
    return {
      position: { x, y },
      translateX: x,
      translateY: y,
      scaleX: Math.sqrt(a * a + c * c),
      // should be multiplied by sign(a)
      scaleY: Math.sqrt(b * b + d * d),
      // should be multiplied by sign(d)
      // TODO: rotation is being reported in degrees.
      // tan(φ) = -b/a = c/d
      rotation: Math.atan2(b, a)
    };
  }

  // src/lib/utils/curves.ts
  var Curve = {
    CollinearityEpsilon: Math.pow(10, -30),
    RecursionLimit: 16,
    CuspLimit: 0,
    Tolerance: {
      distance: 0.25,
      angle: 0,
      epsilon: Number.EPSILON
    },
    // Lookup tables for abscissas and weights with values for n = 2 .. 16.
    // As values are symmetric, only store half of them and adapt algorithm
    // to factor in symmetry.
    abscissas: [
      [0.5773502691896257],
      [0, 0.7745966692414834],
      [0.33998104358485626, 0.8611363115940526],
      [0, 0.5384693101056831, 0.906179845938664],
      [0.2386191860831969, 0.6612093864662645, 0.932469514203152],
      [0, 0.4058451513773972, 0.7415311855993945, 0.9491079123427585],
      [0.1834346424956498, 0.525532409916329, 0.7966664774136267, 0.9602898564975363],
      [0, 0.3242534234038089, 0.6133714327005904, 0.8360311073266358, 0.9681602395076261],
      [0.14887433898163122, 0.4333953941292472, 0.6794095682990244, 0.8650633666889845, 0.9739065285171717],
      [0, 0.26954315595234496, 0.5190961292068118, 0.7301520055740494, 0.8870625997680953, 0.978228658146057],
      [0.1252334085114689, 0.3678314989981802, 0.5873179542866175, 0.7699026741943047, 0.9041172563704749, 0.9815606342467192],
      [0, 0.2304583159551348, 0.44849275103644687, 0.6423493394403402, 0.8015780907333099, 0.9175983992229779, 0.9841830547185881],
      [0.10805494870734367, 0.31911236892788974, 0.5152486363581541, 0.6872929048116855, 0.827201315069765, 0.9284348836635735, 0.9862838086968123],
      [0, 0.20119409399743451, 0.3941513470775634, 0.5709721726085388, 0.7244177313601701, 0.8482065834104272, 0.937273392400706, 0.9879925180204854],
      [0.09501250983763744, 0.2816035507792589, 0.45801677765722737, 0.6178762444026438, 0.755404408355003, 0.8656312023878318, 0.9445750230732326, 0.9894009349916499]
    ],
    weights: [
      [1],
      [0.8888888888888888, 0.5555555555555556],
      [0.6521451548625461, 0.34785484513745385],
      [0.5688888888888889, 0.47862867049936647, 0.23692688505618908],
      [0.46791393457269104, 0.3607615730481386, 0.17132449237917036],
      [0.4179591836734694, 0.3818300505051189, 0.27970539148927664, 0.1294849661688697],
      [0.362683783378362, 0.31370664587788727, 0.22238103445337448, 0.10122853629037626],
      [0.3302393550012598, 0.31234707704000286, 0.26061069640293544, 0.1806481606948574, 0.08127438836157441],
      [0.29552422471475287, 0.26926671930999635, 0.21908636251598204, 0.1494513491505806, 0.06667134430868814],
      [0.2729250867779006, 0.26280454451024665, 0.23319376459199048, 0.18629021092773426, 0.1255803694649046, 0.05566856711617366],
      [0.24914704581340277, 0.2334925365383548, 0.20316742672306592, 0.16007832854334622, 0.10693932599531843, 0.04717533638651183],
      [0.2325515532308739, 0.22628318026289723, 0.2078160475368885, 0.17814598076194574, 0.13887351021978725, 0.09212149983772845, 0.04048400476531588],
      [0.2152638534631578, 0.2051984637212956, 0.18553839747793782, 0.15720316715819355, 0.12151857068790319, 0.08015808715976021, 0.03511946033175186],
      [0.2025782419255613, 0.19843148532711158, 0.1861610000155622, 0.16626920581699392, 0.13957067792615432, 0.10715922046717194, 0.07036604748810812, 0.03075324199611727],
      [0.1894506104550685, 0.18260341504492358, 0.16915651939500254, 0.14959598881657674, 0.12462897125553388, 0.09515851168249279, 0.062253523938647894, 0.027152459411754096]
    ]
  };
  function getComponentOnCubicBezier(t, a, b, c, d) {
    const k = 1 - t;
    return k * k * k * a + 3 * k * k * t * b + 3 * k * t * t * c + t * t * t * d;
  }
  function subdivide(builder, x1, y1, x2, y2, x3, y3, x4, y4, limit = Curve.RecursionLimit) {
    const amount = limit + 1;
    if (Math.abs(x1 - x4) < 1e-3 && Math.abs(y1 - y4) < 1e-3) {
      return [builder(x4, y4)];
    }
    const result = [];
    for (let i = 0; i < amount; i++) {
      const t = i / amount;
      const x = getComponentOnCubicBezier(t, x1, x2, x3, x4);
      const y = getComponentOnCubicBezier(t, y1, y2, y3, y4);
      result.push(builder(x, y));
    }
    return result;
  }
  function getCurveLength(x1, y1, x2, y2, x3, y3, x4, y4, limit) {
    if (x1 === x2 && y1 === y2 && x3 === x4 && y3 === y4) {
      const dx = x4 - x1;
      const dy = y4 - y1;
      return Math.sqrt(dx * dx + dy * dy);
    }
    const ax = 9 * (x2 - x3) + 3 * (x4 - x1), bx = 6 * (x1 + x3) - 12 * x2, cx = 3 * (x2 - x1), ay = 9 * (y2 - y3) + 3 * (y4 - y1), by = 6 * (y1 + y3) - 12 * y2, cy = 3 * (y2 - y1);
    function integrand(t) {
      const dx = (ax * t + bx) * t + cx, dy = (ay * t + by) * t + cy;
      return Math.sqrt(dx * dx + dy * dy);
    }
    return integrate(
      integrand,
      0,
      1,
      limit || Curve.RecursionLimit
    );
  }
  function getCurveBoundingBox(x1, y1, x2, y2, x3, y3, x4, y4) {
    const tvalues = [];
    const bounds = [[], []];
    let a, b, c, t, t1, t2, b2ac, sqrtb2ac;
    for (let i = 0; i < 2; ++i) {
      if (i == 0) {
        b = 6 * x1 - 12 * x2 + 6 * x3;
        a = -3 * x1 + 9 * x2 - 9 * x3 + 3 * x4;
        c = 3 * x2 - 3 * x1;
      } else {
        b = 6 * y1 - 12 * y2 + 6 * y3;
        a = -3 * y1 + 9 * y2 - 9 * y3 + 3 * y4;
        c = 3 * y2 - 3 * y1;
      }
      if (Math.abs(a) < 1e-12) {
        if (Math.abs(b) < 1e-12) {
          continue;
        }
        t = -c / b;
        if (0 < t && t < 1) {
          tvalues.push(t);
        }
        continue;
      }
      b2ac = b * b - 4 * c * a;
      sqrtb2ac = Math.sqrt(b2ac);
      if (b2ac < 0) {
        continue;
      }
      t1 = (-b + sqrtb2ac) / (2 * a);
      if (0 < t1 && t1 < 1) {
        tvalues.push(t1);
      }
      t2 = (-b - sqrtb2ac) / (2 * a);
      if (0 < t2 && t2 < 1) {
        tvalues.push(t2);
      }
    }
    const jlen = tvalues.length;
    let j = jlen;
    let mt;
    while (j--) {
      t = tvalues[j];
      mt = 1 - t;
      bounds[0][j] = mt * mt * mt * x1 + 3 * mt * mt * t * x2 + 3 * mt * t * t * x3 + t * t * t * x4;
      bounds[1][j] = mt * mt * mt * y1 + 3 * mt * mt * t * y2 + 3 * mt * t * t * y3 + t * t * t * y4;
    }
    bounds[0][jlen] = x1;
    bounds[1][jlen] = y1;
    bounds[0][jlen + 1] = x4;
    bounds[1][jlen + 1] = y4;
    bounds[0].length = bounds[1].length = jlen + 2;
    return {
      min: { x: Math.min.apply(0, bounds[0]), y: Math.min.apply(0, bounds[1]) },
      max: { x: Math.max.apply(0, bounds[0]), y: Math.max.apply(0, bounds[1]) }
    };
  }
  function integrate(f, a, b, n) {
    const x = Curve.abscissas[n - 2];
    const w = Curve.weights[n - 2];
    const A = 0.5 * (b - a);
    const B = A + a;
    let i = 0;
    const m = n + 1 >> 1;
    let sum = n & 1 ? w[i++] * f(B) : 0;
    while (i < m) {
      const Ax = A * x[i];
      sum += w[i++] * (f(B + Ax) + f(B - Ax));
    }
    return A * sum;
  }
  function getCurveFromPoints(points, closed) {
    const l = points.length, last = l - 1;
    for (let i = 0; i < l; i++) {
      const point = points.getAt(i);
      const prev = closed ? mod(i - 1, l) : Math.max(i - 1, 0);
      const next = closed ? mod(i + 1, l) : Math.min(i + 1, last);
      const a = points.getAt(prev);
      const b = point;
      const c = points.getAt(next);
      getControlPoints(a, b, c);
      b.command = i === 0 ? Commands.move : Commands.curve;
    }
  }
  function getControlPoints(a, b, c) {
    const a1 = G20.angleBetween(a.origin, b.origin);
    const a2 = G20.angleBetween(c.origin, b.origin);
    let d1 = G20.distanceBetween(a.origin, b.origin);
    let d2 = G20.distanceBetween(c.origin, b.origin);
    let mid = (a1 + a2) / 2;
    if (d1 < 1e-4 || d2 < 1e-4) {
      if (typeof b.relative === "boolean" && !b.relative) {
        b.controls.a.copyVector(b.origin);
        b.controls.b.copyVector(b.origin);
      }
      return b;
    }
    d1 *= 0.33;
    d2 *= 0.33;
    if (a2 < a1) {
      mid += HALF_PI;
    } else {
      mid -= HALF_PI;
    }
    b.controls.a.x = Math.cos(mid) * d1;
    b.controls.a.y = Math.sin(mid) * d1;
    mid -= Math.PI;
    b.controls.b.x = Math.cos(mid) * d2;
    b.controls.b.y = Math.sin(mid) * d2;
    if (typeof b.relative === "boolean" && !b.relative) {
      b.controls.a.x += b.x;
      b.controls.a.y += b.y;
      b.controls.b.x += b.x;
      b.controls.b.y += b.y;
    }
    return b;
  }

  // src/lib/utils/shape.ts
  function contains(path, t) {
    if (t === 0 || t === 1) {
      return true;
    }
    const length = path.length;
    const target = length * t;
    let elapsed = 0;
    const lengths = path.lengths;
    for (let i = 0; i < lengths.length; i++) {
      const dist = lengths[i];
      if (elapsed >= target) {
        return target - elapsed >= 0;
      }
      elapsed += dist;
    }
    return false;
  }
  function getIdByLength(path, target) {
    const total = path.length;
    if (target <= 0) {
      return 0;
    } else if (target >= total) {
      return path.lengths.length - 1;
    }
    for (let i = 0, sum = 0; i < path.lengths.length; i++) {
      if (sum + path.lengths[i] >= target) {
        target -= sum;
        return Math.max(i - 1, 0) + target / path.lengths[i];
      }
      sum += path.lengths[i];
    }
    return -1;
  }
  function getCurveLength2(a, b, limit) {
    let x2, x3, y2, y3;
    const right = b.controls && b.controls.b;
    const left = a.controls && a.controls.a;
    const x1 = b.x;
    const y1 = b.y;
    x2 = (right || b).x;
    y2 = (right || b).y;
    x3 = (left || a).x;
    y3 = (left || a).y;
    const x4 = a.x;
    const y4 = a.y;
    if (right && b.relative) {
      x2 += b.x;
      y2 += b.y;
    }
    if (left && a.relative) {
      x3 += a.x;
      y3 += a.y;
    }
    return getCurveLength(x1, y1, x2, y2, x3, y3, x4, y4, limit);
  }
  function getSubdivisions(a, b, limit) {
    const br = b.controls.b;
    const al = a.controls.a;
    const bx = b.x;
    const by = b.y;
    let brx = br.x;
    let bry = br.y;
    let alx = al.x;
    let aly = al.y;
    const ax = a.x;
    const ay = a.y;
    if (b.relative) {
      brx += b.x;
      bry += b.y;
    }
    if (a.relative) {
      alx += a.x;
      aly += a.y;
    }
    const builder = (x, y) => new Anchor(G20.vector(x, y));
    return subdivide(builder, bx, by, brx, bry, alx, aly, ax, ay, limit);
  }

  // src/lib/path.ts
  function get_dashes_offset(dashes) {
    return dashes["offset"];
  }
  function set_dashes_offset(dashes, offset) {
    dashes["offset"] = offset;
  }
  var min = Math.min;
  var max = Math.max;
  var vector = new G20();
  var Path = class extends Shape {
    #length = 0;
    #lengths = [];
    #fill = variable("none");
    #fill_change = null;
    #fillOpacity = variable(1);
    #stroke = variable("#000000");
    #stroke_change = null;
    #strokeWidth = variable(1);
    #strokeOpacity = variable(1);
    #vectorEffect = "non-scaling-stroke";
    /**
     * stroke-linecap
     */
    #cap = variable("round");
    /**
     * stroke-linejoin
     */
    #join = variable("round");
    /**
     * stroke-miterlimit
     */
    #miter = variable(4);
    #closed = true;
    #curved = false;
    #automatic = true;
    #beginning = 0;
    #ending = 1;
    #dashes = null;
    /**
     * The hidden variable behind the `vertices` property.
     */
    #vertices;
    // TODO; These could be unified into e.g. vertices_disposables.
    #vertices_insert = null;
    #vertices_remove = null;
    /**
     * [Q] What exactly is this?
     * [A] It appears to be a working storage between the model vertices here and those that are used to compute the SVG path `d` attribute.
     */
    #anchors = [];
    #anchor_change_map = /* @__PURE__ */ new Map();
    /**
     * @param vertices A list of {@link Anchor}s that represent the order and coordinates to construct the rendered shape.
     * @param closed Describes whether the path is closed or open.
     * @param curved Describes whether the path automatically calculates bezier handles for each vertex.
     * @param manual Describes whether the developer controls how vertices are plotted.
     */
    constructor(board, vertices = [], closed, curved, manual, attributes = {}) {
      super(board, attributes);
      this.zzz.fill$ = this.#fill.asObservable();
      this.zzz.fillOpacity$ = this.#fillOpacity.asObservable();
      this.zzz.stroke$ = this.#stroke.asObservable();
      this.zzz.strokeOpacity$ = this.#strokeOpacity.asObservable();
      this.zzz.strokeWidth$ = this.#strokeWidth.asObservable();
      this.flagReset(true);
      this.zzz.flags[6 /* ClipPath */] = false;
      this.zzz.flags[5 /* ClipFlag */] = false;
      this.zzz.vertices = [];
      this.zzz.vertices_subject = variable(0);
      this.zzz.vertices$ = this.zzz.vertices_subject.asObservable();
      this.closed = !!closed;
      this.curved = !!curved;
      this.beginning = 0;
      this.ending = 1;
      if (attributes.fill) {
        this.fill = attributes.fill;
      } else {
        this.fill = "#fff";
      }
      if (typeof attributes.fillOpacity === "number") {
        this.fillOpacity = attributes.fillOpacity;
      } else {
        this.fillOpacity = 1;
      }
      if (attributes.stroke) {
        this.stroke = attributes.stroke;
      } else {
        this.stroke = "#000";
      }
      if (typeof attributes.strokeWidth === "number") {
        this.strokeWidth = attributes.strokeWidth;
      } else {
        this.strokeWidth = 1;
      }
      if (typeof attributes.strokeOpacity === "number") {
        this.strokeOpacity = attributes.strokeOpacity;
      } else {
        this.strokeOpacity = 1;
      }
      this.className = "";
      this.cap = "butt";
      this.join = "miter";
      this.miter = 4;
      this.vertices = new Collection(vertices);
      this.automatic = !manual;
      this.dashes = [];
      set_dashes_offset(this.dashes, 0);
    }
    render(domElement, svgElement) {
      this.update();
      const changed = {};
      const flagMatrix = this.matrix.manual || this.zzz.flags[17 /* Matrix */];
      if (flagMatrix) {
        changed.transform = transform_value_of_matrix(this.matrix);
      }
      if (this.fill && is_color_provider(this.fill)) {
        this.zzz.hasFillEffect = true;
        this.fill.render(svgElement);
      }
      if (this.zzz.flags[10 /* Fill */]) {
        if (this.fill) {
          changed.fill = serialize_color(this.fill);
        }
        if (this.zzz.hasFillEffect && typeof this.fill === "string") {
          set_defs_dirty_flag(get_svg_element_defs(svgElement), true);
          delete this.zzz.hasFillEffect;
        }
      }
      if (this.stroke && is_color_provider(this.stroke)) {
        this.zzz.hasStrokeEffect = true;
        this.stroke.render(svgElement);
      }
      if (this.zzz.flags[28 /* Stroke */]) {
        if (this.stroke) {
          changed.stroke = serialize_color(this.stroke);
        }
        if (this.zzz.hasStrokeEffect && typeof this.stroke === "string") {
          set_defs_dirty_flag(get_svg_element_defs(svgElement), true);
          delete this.zzz.hasStrokeEffect;
        }
      }
      if (this.zzz.flags[16 /* Linewidth */]) {
        changed["stroke-width"] = `${this.strokeWidth}`;
      }
      if (this.zzz.flags[4 /* ClassName */]) {
        changed["class"] = this.classList.join(" ");
      }
      if (this.zzz.flags[32 /* VectorEffect */]) {
        changed["vector-effect"] = this.vectorEffect;
      }
      if (this.zzz.flags[3 /* Cap */]) {
        changed["stroke-linecap"] = this.cap;
      }
      if (this.zzz.flags[14 /* Join */]) {
        changed["stroke-linejoin"] = this.join;
      }
      if (this.zzz.flags[18 /* Miter */]) {
        changed["stroke-miterlimit"] = `${this.miter}`;
      }
      if (this.dashes && this.dashes.length > 0) {
        changed["stroke-dasharray"] = this.dashes.join(" ");
        changed["stroke-dashoffset"] = `${get_dashes_offset(this.dashes) || 0}`;
      }
      if (this.zzz.elem) {
        svg.setAttributes(this.zzz.elem, changed);
      } else {
        changed.id = this.id;
        this.zzz.elem = svg.createElement("path", changed);
        domElement.appendChild(this.zzz.elem);
        this.zzz.disposables.push(this.matrix.change$.subscribe((matrix) => {
          const change = {};
          change.transform = transform_value_of_matrix(matrix);
          svg.setAttributes(this.zzz.elem, change);
        }));
        this.zzz.disposables.push(this.zzz.vertices$.subscribe(() => {
          const change = {};
          change.d = svg.path_from_anchors(this.board, this.position, this.attitude, this.zzz.vertices, this.closed);
          svg.setAttributes(this.zzz.elem, change);
        }));
        this.zzz.disposables.push(this.zzz.fill$.subscribe((fill) => {
          const change = {};
          change.fill = serialize_color(fill);
          svg.setAttributes(this.zzz.elem, change);
          if (this.zzz.hasFillEffect && typeof fill === "string") {
            set_defs_dirty_flag(get_svg_element_defs(svgElement), true);
            delete this.zzz.hasFillEffect;
          }
          return function() {
          };
        }));
        this.zzz.disposables.push(this.zzz.fillOpacity$.subscribe((fillOpacity) => {
          const change = {};
          change["fill-opacity"] = `${fillOpacity}`;
          svg.setAttributes(this.zzz.elem, change);
          return function() {
          };
        }));
        this.zzz.disposables.push(this.zzz.opacity$.subscribe((opacity) => {
          const change = { opacity: `${opacity}` };
          if (opacity === 1) {
            svg.removeAttributes(this.zzz.elem, change);
          } else {
            svg.setAttributes(this.zzz.elem, change);
          }
          return function() {
          };
        }));
        this.zzz.disposables.push(this.zzz.stroke$.subscribe((stroke) => {
          const change = {};
          change.stroke = serialize_color(stroke);
          svg.setAttributes(this.zzz.elem, change);
          if (this.zzz.hasStrokeEffect && typeof stroke === "string") {
            set_defs_dirty_flag(get_svg_element_defs(svgElement), true);
            delete this.zzz.hasStrokeEffect;
          }
          return function() {
          };
        }));
        this.zzz.disposables.push(this.zzz.strokeOpacity$.subscribe((strokeOpacity) => {
          const change = {};
          change["stroke-opacity"] = `${strokeOpacity}`;
          svg.setAttributes(this.zzz.elem, change);
          return function() {
          };
        }));
        this.zzz.disposables.push(this.zzz.strokeWidth$.subscribe((strokeWidth) => {
          const change = {};
          change["stroke-width"] = `${strokeWidth}`;
          svg.setAttributes(this.zzz.elem, change);
          return function() {
          };
        }));
        this.zzz.disposables.push(this.zzz.visibility$.subscribe((visibility) => {
          switch (visibility) {
            case "visible": {
              const change = { visibility };
              svg.removeAttributes(this.zzz.elem, change);
              break;
            }
            default: {
              const change = { visibility };
              svg.setAttributes(this.zzz.elem, change);
              break;
            }
          }
          return function() {
          };
        }));
      }
      if (this.zzz.flags[5 /* ClipFlag */]) {
        const clip = svg.getClip(this, svgElement);
        const elem = this.zzz.elem;
        if (this.zzz.clip) {
          elem.removeAttribute("id");
          clip.setAttribute("id", this.id);
          clip.appendChild(elem);
        } else {
          clip.removeAttribute("id");
          elem.setAttribute("id", this.id);
          if (this.parent && this.parent instanceof ElementBase) {
            this.parent.zzz.elem.appendChild(elem);
          }
        }
      }
      if (this.zzz.flags[6 /* ClipPath */]) {
        if (this.clipPath) {
          this.clipPath.render(domElement, svgElement);
          this.zzz.elem.setAttribute("clip-path", "url(#" + this.clipPath.id + ")");
        } else {
          this.zzz.elem.removeAttribute("clip-path");
        }
      }
      this.flagReset();
    }
    /**
     * A convenience method for setting the `fill` attribute to "none".
     */
    noFill() {
      this.fill = "none";
      return this;
    }
    /**
     * A convenience method for setting the `stroke` attribute to "none".
     */
    noStroke() {
      this.stroke = "none";
      return this;
    }
    corner() {
      const bbox = this.getBoundingBox(true);
      const hw = (bbox.right - bbox.left) / 2;
      const hh = (bbox.bottom - bbox.top) / 2;
      const cx = (bbox.left + bbox.right) / 2;
      const cy = (bbox.top + bbox.bottom) / 2;
      for (let i = 0; i < this.vertices.length; i++) {
        const v = this.vertices.getAt(i);
        v.x -= cx;
        v.y -= cy;
        v.x += hw;
        v.y += hh;
      }
      if (this.clipPath) {
        this.clipPath.position.x -= cx;
        this.clipPath.position.x += hw;
        this.clipPath.position.y -= cy;
        this.clipPath.position.y += hh;
      }
      return this;
    }
    center() {
      const bbox = this.getBoundingBox(true);
      const cx = (bbox.left + bbox.right) / 2 - this.position.x;
      const cy = (bbox.top + bbox.bottom) / 2 - this.position.y;
      for (let i = 0; i < this.vertices.length; i++) {
        const v = this.vertices.getAt(i);
        v.x -= cx;
        v.y -= cy;
      }
      if (this.clipPath) {
        this.clipPath.position.x -= cx;
        this.clipPath.position.y -= cy;
      }
      return this;
    }
    getBoundingBox(shallow) {
      let left = Infinity;
      let right = -Infinity;
      let top = Infinity;
      let bottom = -Infinity;
      this.update();
      const M = shallow ? this.matrix : this.worldMatrix;
      let border = (this.strokeWidth || 0) / 2;
      const l = this.zzz.vertices.length;
      if (this.strokeWidth > 0 || this.stroke && typeof this.stroke === "string" && !/(transparent|none)/i.test(this.stroke)) {
        if (this.matrix.manual) {
          const { scaleX, scaleY } = decompose_2d_3x3_matrix(M);
          border = max(scaleX, scaleY) * (this.strokeWidth || 0) / 2;
        } else {
          border *= max(this.scaleXY.x, this.scaleXY.y);
        }
      }
      if (l <= 0) {
        return {};
      }
      for (let i = 0; i < l; i++) {
        const v1 = this.zzz.vertices[i];
        const v0 = this.zzz.vertices[(i + l - 1) % l];
        const [v0x, v0y] = M.multiply_vector(v0.x, v0.y);
        const [v1x, v1y] = M.multiply_vector(v1.x, v1.y);
        if (v0.controls && v1.controls) {
          let rx = v0.controls.b.x;
          let ry = v0.controls.b.y;
          if (v0.relative) {
            rx += v0.x;
            ry += v0.y;
          }
          const [c0x, c0y] = M.multiply_vector(rx, ry);
          let lx = v1.controls.a.x;
          let ly = v1.controls.a.y;
          if (v1.relative) {
            lx += v1.x;
            ly += v1.y;
          }
          const [c1x, c1y] = M.multiply_vector(lx, ly);
          const bb = getCurveBoundingBox(v0x, v0y, c0x, c0y, c1x, c1y, v1x, v1y);
          top = min(bb.min.y - border, top);
          left = min(bb.min.x - border, left);
          right = max(bb.max.x + border, right);
          bottom = max(bb.max.y + border, bottom);
        } else {
          if (i <= 1) {
            top = min(v0y - border, top);
            left = min(v0x - border, left);
            right = max(v0x + border, right);
            bottom = max(v0y + border, bottom);
          }
          top = min(v1y - border, top);
          left = min(v1x - border, left);
          right = max(v1x + border, right);
          bottom = max(v1y + border, bottom);
        }
      }
      return { top, left, right, bottom };
    }
    hasBoundingBox() {
      return true;
    }
    /**
     * TODO: Bad name. This function is called for its side effects which are to modify the Anchor.
     * Originally the function appears to promote a Vector and return an Anchor, but this is not used
     * and the call always involves an Anchor.
     * There is a return value but it is not being used.
     * @param t Percentage value describing where on the {@link Path} to estimate and assign coordinate values.
     * @param anchor - Object to apply calculated x, y to. If none available returns new `Object`.
     * @description Given a float `t` from 0 to 1, return a point or assign a passed `obj`'s coordinates to that percentage on this {@link Path}'s curve.
     */
    getPointAt(t, anchor) {
      const ank = anchor;
      let target = this.length * min(max(t, 0), 1);
      const Nvs = this.vertices.length;
      const last = Nvs - 1;
      let a = null;
      let b = null;
      const Nseg = this.#lengths.length;
      let sum = 0;
      for (let i = 0; i < Nseg; i++) {
        if (sum + this.#lengths[i] >= target) {
          let ia;
          let ib;
          if (this.closed) {
            ia = mod(i, Nvs);
            ib = mod(i - 1, Nvs);
            if (i === 0) {
              ia = ib;
              ib = i;
            }
          } else {
            ia = i;
            ib = min(max(i - 1, 0), last);
          }
          a = this.vertices.getAt(ia);
          b = this.vertices.getAt(ib);
          target -= sum;
          if (this.#lengths[i] !== 0) {
            t = target / this.#lengths[i];
          } else {
            t = 0;
          }
          break;
        }
        sum += this.#lengths[i];
      }
      if (a === null || b === null) {
        return null;
      }
      if (!a) {
        return b;
      } else if (!b) {
        return a;
      }
      const bb = b.controls && b.controls.b;
      const aa = a.controls && a.controls.a;
      const x1 = b.x;
      const y1 = b.y;
      let x2 = (bb || b).x;
      let y2 = (bb || b).y;
      let x3 = (aa || a).x;
      let y3 = (aa || a).y;
      const x4 = a.x;
      const y4 = a.y;
      if (bb && b.relative) {
        x2 += b.x;
        y2 += b.y;
      }
      if (aa && a.relative) {
        x3 += a.x;
        y3 += a.y;
      }
      const x = getComponentOnCubicBezier(t, x1, x2, x3, x4);
      const y = getComponentOnCubicBezier(t, y1, y2, y3, y4);
      const t1x = lerp(x1, x2, t);
      const t1y = lerp(y1, y2, t);
      const t2x = lerp(x2, x3, t);
      const t2y = lerp(y2, y3, t);
      const t3x = lerp(x3, x4, t);
      const t3y = lerp(y3, y4, t);
      const brx = lerp(t1x, t2x, t);
      const bry = lerp(t1y, t2y, t);
      const alx = lerp(t2x, t3x, t);
      const aly = lerp(t2y, t3y, t);
      ank.x = x;
      ank.y = y;
      ank.controls.a.x = brx;
      ank.controls.a.y = bry;
      ank.controls.b.x = alx;
      ank.controls.b.y = aly;
      if (!(typeof ank.relative === "boolean") || ank.relative) {
        ank.controls.a.x -= x;
        ank.controls.a.y -= y;
        ank.controls.b.x -= x;
        ank.controls.b.y -= y;
      }
      ank.t = t;
      return ank;
    }
    /**
     * Based on closed / curved and sorting of vertices plot where all points should be and where the respective handles should be too.
     */
    plot() {
      if (this.curved) {
        getCurveFromPoints(this.#vertices, this.closed);
        return this;
      }
      for (let i = 0; i < this.#vertices.length; i++) {
        this.#vertices.getAt(i).command = i === 0 ? Commands.move : Commands.line;
      }
      return this;
    }
    /**
     * Insert an anchor at the midpoint between every vertex.
     * @param limit - How many times to recurse subdivisions.
     */
    subdivide(limit) {
      this.update();
      const last = this.vertices.length - 1;
      const closed = this.closed || this.vertices.getAt(last).command === Commands.close;
      let b = this.vertices.getAt(last);
      let points = [], verts;
      this.vertices.forEach((a, i) => {
        if (i <= 0 && !closed) {
          b = a;
          return;
        }
        if (a.command === Commands.move) {
          points.push(new Anchor(G20.vector(b.x, b.y)));
          if (i > 0) {
            points[points.length - 1].command = Commands.line;
          }
          b = a;
          return;
        }
        verts = getSubdivisions(a, b, limit);
        points = points.concat(verts);
        verts.forEach(function(v, i2) {
          if (i2 <= 0 && b.command === Commands.move) {
            v.command = Commands.move;
          } else {
            v.command = Commands.line;
          }
        });
        if (i >= last) {
          if (this.closed && this.automatic) {
            b = a;
            verts = getSubdivisions(a, b, limit);
            points = points.concat(verts);
            verts.forEach(function(v, i2) {
              if (i2 <= 0 && b.command === Commands.move) {
                v.command = Commands.move;
              } else {
                v.command = Commands.line;
              }
            });
          } else if (closed) {
            points.push(new Anchor(G20.vector(a.x, a.y)));
          }
          points[points.length - 1].command = closed ? Commands.close : Commands.line;
        }
        b = a;
      });
      this.automatic = false;
      this.curved = false;
      this.vertices = new Collection(points);
      return this;
    }
    #updateLength(limit, silent = false) {
      if (!silent) {
        this.update();
      }
      const length = this.vertices.length;
      const last = length - 1;
      const closed = false;
      let b = this.vertices.getAt(last);
      let sum = 0;
      this.vertices.forEach((a, i) => {
        if (i <= 0 && !closed || a.command === Commands.move) {
          b = a;
          this.#lengths[i] = 0;
          return;
        }
        this.#lengths[i] = getCurveLength2(a, b, limit);
        sum += this.#lengths[i];
        if (i >= last && closed) {
          b = this.vertices.getAt((i + 1) % length);
          this.#lengths[i + 1] = getCurveLength2(a, b, limit);
          sum += this.#lengths[i + 1];
        }
        b = a;
      });
      this.#length = sum;
      this.zzz.flags[15 /* Length */] = false;
      return this;
    }
    update() {
      if (this.zzz.flags[31 /* Vertices */]) {
        if (this.automatic) {
          this.plot();
        }
        if (this.zzz.flags[15 /* Length */]) {
          this.#updateLength(void 0, true);
        }
        const closed = this.closed;
        const beginning = min(this.beginning, this.ending);
        const ending = max(this.beginning, this.ending);
        const lBound = Math.ceil(getIdByLength(this, beginning * this.length));
        const uBound = Math.floor(getIdByLength(this, ending * this.length));
        {
          let left;
          let next;
          const vertices = this.vertices;
          this.zzz.vertices.length = 0;
          {
            let right;
            let prev;
            const L = vertices.length;
            for (let i = 0; i < L; i++) {
              if (this.#anchors.length <= i) {
                this.#anchors.push(new Anchor(G20.vector(0, 0)));
              }
              if (i > uBound && !right) {
                const v = this.#anchors[i].copy(vertices.getAt(i));
                this.getPointAt(ending, v);
                v.command = this.#anchors[i].command;
                this.zzz.vertices.push(v);
                right = v;
                prev = vertices.getAt(i - 1);
                if (prev && prev.controls) {
                  if (v.relative) {
                    v.controls.b.clear();
                  } else {
                    v.controls.b.copyVector(v.origin);
                  }
                  if (prev.relative) {
                    this.#anchors[i - 1].controls.b.copyVector(prev.controls.b).lerp(G20.zero, 1 - v.t);
                  } else {
                    this.#anchors[i - 1].controls.b.copyVector(prev.controls.b).lerp(prev.origin, 1 - v.t);
                  }
                }
              } else if (i >= lBound && i <= uBound) {
                const v = this.#anchors[i].copy(vertices.getAt(i));
                this.zzz.vertices.push(v);
                if (i === uBound && contains(this, ending)) {
                  right = v;
                  if (!closed && right.controls) {
                    if (right.relative) {
                      right.controls.b.clear();
                    } else {
                      right.controls.b.copyVector(right.origin);
                    }
                  }
                } else if (i === lBound && contains(this, beginning)) {
                  left = v;
                  left.command = Commands.move;
                  if (!closed && left.controls) {
                    if (left.relative) {
                      left.controls.a.clear();
                    } else {
                      left.controls.a.copyVector(left.origin);
                    }
                  }
                }
              }
            }
          }
          if (lBound > 0 && !left) {
            const i = lBound - 1;
            const v = this.#anchors[i].copy(vertices.getAt(i));
            this.getPointAt(beginning, v);
            v.command = Commands.move;
            this.zzz.vertices.unshift(v);
            next = vertices.getAt(i + 1);
            if (next && next.controls) {
              v.controls.a.clear();
              if (next.relative) {
                this.#anchors[i + 1].controls.a.copyVector(next.controls.a).lerp(G20.zero, v.t);
              } else {
                vector.copyVector(next.origin);
                this.#anchors[i + 1].controls.a.copyVector(next.controls.a).lerp(next.origin, v.t);
              }
            }
          }
        }
        this.zzz.vertices_subject.set(this.zzz.vertices_subject.get() + 1);
      }
      super.update();
      return this;
    }
    flagReset(dirtyFlag = false) {
      this.zzz.flags[3 /* Cap */] = dirtyFlag;
      this.zzz.flags[5 /* ClipFlag */] = dirtyFlag;
      this.zzz.flags[10 /* Fill */] = dirtyFlag;
      this.zzz.flags[14 /* Join */] = dirtyFlag;
      this.zzz.flags[15 /* Length */] = dirtyFlag;
      this.zzz.flags[16 /* Linewidth */] = dirtyFlag;
      this.zzz.flags[6 /* ClipPath */] = dirtyFlag;
      this.zzz.flags[18 /* Miter */] = dirtyFlag;
      this.zzz.flags[28 /* Stroke */] = dirtyFlag;
      this.zzz.flags[32 /* VectorEffect */] = dirtyFlag;
      this.zzz.flags[31 /* Vertices */] = dirtyFlag;
      super.flagReset(dirtyFlag);
      return this;
    }
    get automatic() {
      return this.#automatic;
    }
    set automatic(automatic) {
      if (automatic === this.automatic) {
        return;
      }
      this.#automatic = !!automatic;
      this.vertices.forEach(function(v) {
        if (automatic) {
          v.ignore();
        } else {
          v.listen();
        }
      });
    }
    get beginning() {
      return this.#beginning;
    }
    set beginning(beginning) {
      this.#beginning = beginning;
      this.zzz.flags[31 /* Vertices */] = true;
    }
    /**
     * Defines the shape to be used at the end of open subpaths when they are stroked.
     * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap
     */
    get cap() {
      return this.#cap.get();
    }
    set cap(cap) {
      this.#cap.set(cap);
      this.zzz.flags[3 /* Cap */] = true;
    }
    get closed() {
      return this.#closed;
    }
    set closed(closed) {
      this.#closed = !!closed;
      this.zzz.flags[31 /* Vertices */] = true;
    }
    get curved() {
      return this.#curved;
    }
    set curved(curved) {
      this.#curved = !!curved;
      this.zzz.flags[31 /* Vertices */] = true;
    }
    get dashes() {
      return this.#dashes;
    }
    set dashes(dashes) {
      if (typeof get_dashes_offset(dashes) !== "number") {
        set_dashes_offset(dashes, this.dashes && get_dashes_offset(this.dashes) || 0);
      }
      this.#dashes = dashes;
    }
    get ending() {
      return this.#ending;
    }
    set ending(ending) {
      this.#ending = ending;
      this.zzz.flags[31 /* Vertices */] = true;
    }
    get fill() {
      return this.#fill.get();
    }
    set fill(fill) {
      if (this.#fill_change) {
        this.#fill_change.dispose();
        this.#fill_change = null;
      }
      this.#fill.set(fill);
      this.zzz.flags[10 /* Fill */] = true;
      if (is_color_provider(fill)) {
        this.#fill_change = fill.change$.subscribe(() => {
          this.zzz.flags[10 /* Fill */] = true;
        });
      }
    }
    get fillOpacity() {
      return this.#fillOpacity.get();
    }
    set fillOpacity(fillOpacity) {
      this.#fillOpacity.set(fillOpacity);
    }
    get join() {
      return this.#join.get();
    }
    set join(join) {
      this.#join.set(join);
      this.zzz.flags[14 /* Join */] = true;
    }
    get length() {
      if (this.zzz.flags[15 /* Length */]) {
        this.#updateLength();
      }
      return this.#length;
    }
    get lengths() {
      return this.#lengths;
    }
    get strokeWidth() {
      return this.#strokeWidth.get();
    }
    set strokeWidth(stroeWidth) {
      if (typeof stroeWidth === "number") {
        if (this.strokeWidth !== stroeWidth) {
          this.#strokeWidth.set(stroeWidth);
          this.zzz.flags[16 /* Linewidth */] = true;
        }
      }
    }
    get miter() {
      return this.#miter.get();
    }
    set miter(miter) {
      this.#miter.set(miter);
      this.zzz.flags[18 /* Miter */] = true;
    }
    get stroke() {
      return this.#stroke.get();
    }
    set stroke(stroke) {
      if (this.#stroke_change) {
        this.#stroke_change.dispose();
        this.#stroke_change = null;
      }
      this.#stroke.set(stroke);
      this.zzz.flags[28 /* Stroke */] = true;
      if (is_color_provider(stroke)) {
        this.#stroke_change = stroke.change$.subscribe(() => {
          this.zzz.flags[28 /* Stroke */] = true;
        });
      }
    }
    get strokeOpacity() {
      return this.#strokeOpacity.get();
    }
    set strokeOpacity(strokeOpacity) {
      this.#strokeOpacity.set(strokeOpacity);
    }
    get vertices() {
      return this.#vertices;
    }
    set vertices(vertices) {
      if (this.#vertices_insert) {
        this.#vertices_insert.dispose();
        this.#vertices_insert = null;
      }
      if (this.#vertices_remove) {
        this.#vertices_remove.dispose();
        this.#vertices_remove = null;
      }
      if (vertices instanceof Collection) {
        this.#vertices = vertices;
      } else {
        this.#vertices = new Collection(vertices || []);
      }
      this.#vertices_insert = this.vertices.insert$.subscribe((inserts) => {
        let i = inserts.length;
        while (i--) {
          const anchor = inserts[i];
          const subscription = anchor.change$.subscribe(() => {
            this.zzz.flags[31 /* Vertices */] = true;
          });
          this.#anchor_change_map.set(anchor, subscription);
        }
        this.zzz.flags[31 /* Vertices */] = true;
      });
      this.#vertices_remove = this.vertices.remove$.subscribe((removes) => {
        let i = removes.length;
        while (i--) {
          const anchor = removes[i];
          const subscription = this.#anchor_change_map.get(anchor);
          subscription.dispose();
          this.#anchor_change_map.delete(anchor);
        }
        this.zzz.flags[31 /* Vertices */] = true;
      });
      this.vertices.forEach((anchor) => {
        const subscription = anchor.change$.subscribe(() => {
          this.zzz.flags[31 /* Vertices */] = true;
        });
        this.#anchor_change_map.set(anchor, subscription);
      });
    }
    get vectorEffect() {
      return this.#vectorEffect;
    }
    set vectorEffect(vectorEffect) {
      this.#vectorEffect = vectorEffect;
      this.zzz.flags[32 /* VectorEffect */] = true;
    }
  };

  // src/lib/renderers/SVGViewFactory.ts
  var SVGViewFactory = class {
    constructor(params) {
      this.params = params;
    }
    createView(viewBox, containerId) {
      return new SVGView(viewBox, containerId, this.params);
    }
  };

  // src/lib/shapes/ArcSegment.ts
  var ArcSegment = class extends Path {
    /**
     * @name ArcSegment#_flagStartAngle
     * @private
     * @property {Boolean} - Determines whether the {@link ArcSegment#startAngle} needs updating.
     */
    _flagStartAngle = false;
    /**
     * @name ArcSegment#_flagEndAngle
     * @private
     * @property {Boolean} - Determines whether the {@link ArcSegment#endAngle} needs updating.
     */
    _flagEndAngle = false;
    /**
     * @name ArcSegment#_flagInnerRadius
     * @private
     * @property {Boolean} - Determines whether the {@link ArcSegment#innerRadius} needs updating.
     */
    _flagInnerRadius = false;
    /**
     * @name ArcSegment#_flagOuterRadius
     * @private
     * @property {Boolean} - Determines whether the {@link ArcSegment#outerRadius} needs updating.
     */
    _flagOuterRadius = false;
    /**
     * @name ArcSegment#_startAngle
     * @private
     * @see {@link ArcSegment#startAngle}
     */
    _startAngle = 0;
    /**
     * @name ArcSegment#_endAngle
     * @private
     * @see {@link ArcSegment#endAngle}
     */
    _endAngle = TWO_PI;
    /**
     * @name ArcSegment#_innerRadius
     * @private
     * @see {@link ArcSegment#innerRadius}
     */
    _innerRadius = 0;
    /**
     * @name ArcSegment#_outerRadius
     * @private
     * @see {@link ArcSegment#outerRadius}
     */
    _outerRadius = 0;
    constructor(board, x = 0, y = 0, ir = 0, or = 0, sa = 0, ea = 2 * Math.PI, res = 24) {
      const amount = res || Constants.Resolution * 3;
      const points = [];
      for (let i = 0; i < amount; i++) {
        points.push(new Anchor(G20.vector(0, 0)));
      }
      super(board, points, true, false, true);
      if (typeof ir === "number") {
        this.innerRadius = ir;
      }
      if (typeof or === "number") {
        this.outerRadius = or;
      }
      if (typeof sa === "number") {
        this.startAngle = sa;
      }
      if (typeof ea === "number") {
        this.endAngle = ea;
      }
      this.update();
      if (typeof x === "number") {
        this.position.x = x;
      }
      if (typeof y === "number") {
        this.position.y = y;
      }
    }
    static Properties = ["startAngle", "endAngle", "innerRadius", "outerRadius"];
    update() {
      if (this.zzz.flags[31 /* Vertices */] || this._flagStartAngle || this._flagEndAngle || this._flagInnerRadius || this._flagOuterRadius) {
        const sa = this._startAngle;
        const ea = this._endAngle;
        const ir = this._innerRadius;
        const or = this._outerRadius;
        const connected = mod(sa, TWO_PI) === mod(ea, TWO_PI);
        const punctured = ir > 0;
        const vertices = this.vertices;
        let length = punctured ? vertices.length / 2 : vertices.length;
        let command, id = 0;
        let i, last, pct, v, theta, step, x, y, amp;
        if (connected) {
          length--;
        } else if (!punctured) {
          length -= 2;
        }
        for (i = 0, last = length - 1; i < length; i++) {
          pct = i / last;
          v = vertices.getAt(id);
          theta = pct * (ea - sa) + sa;
          step = (ea - sa) / length;
          x = or * Math.cos(theta);
          y = or * Math.sin(theta);
          switch (i) {
            case 0:
              command = Commands.move;
              break;
            default:
              command = Commands.curve;
          }
          v.command = command;
          v.x = x;
          v.y = y;
          v.controls.a.clear();
          v.controls.b.clear();
          if (v.command === Commands.curve) {
            amp = or * step / Math.PI;
            v.controls.a.x = amp * Math.cos(theta - HALF_PI);
            v.controls.a.y = amp * Math.sin(theta - HALF_PI);
            v.controls.b.x = amp * Math.cos(theta + HALF_PI);
            v.controls.b.y = amp * Math.sin(theta + HALF_PI);
            if (i === 1) {
              v.controls.a.scale(2);
            }
            if (i === last) {
              v.controls.b.scale(2);
            }
          }
          id++;
        }
        if (punctured) {
          if (connected) {
            vertices.getAt(id).command = Commands.close;
            id++;
          } else {
            length--;
            last = length - 1;
          }
          for (i = 0; i < length; i++) {
            pct = i / last;
            v = vertices.getAt(id);
            theta = (1 - pct) * (ea - sa) + sa;
            step = (ea - sa) / length;
            x = ir * Math.cos(theta);
            y = ir * Math.sin(theta);
            command = Commands.curve;
            if (i <= 0) {
              command = connected ? Commands.move : Commands.line;
            }
            v.command = command;
            v.x = x;
            v.y = y;
            v.controls.a.clear();
            v.controls.b.clear();
            if (v.command === Commands.curve) {
              amp = ir * step / Math.PI;
              v.controls.a.x = amp * Math.cos(theta + HALF_PI);
              v.controls.a.y = amp * Math.sin(theta + HALF_PI);
              v.controls.b.x = amp * Math.cos(theta - HALF_PI);
              v.controls.b.y = amp * Math.sin(theta - HALF_PI);
              if (i === 1) {
                v.controls.a.scale(2);
              }
              if (i === last) {
                v.controls.b.scale(2);
              }
            }
            id++;
          }
          vertices.getAt(id).copy(vertices.getAt(0));
          vertices.getAt(id).command = Commands.line;
        } else if (!connected) {
          vertices.getAt(id).command = Commands.line;
          vertices.getAt(id).x = 0;
          vertices.getAt(id).y = 0;
          id++;
          vertices.getAt(id).copy(vertices.getAt(0));
          vertices.getAt(id).command = Commands.line;
        }
      }
      super.update();
      return this;
    }
    flagReset(dirtyFlag = false) {
      super.flagReset(dirtyFlag);
      this._flagStartAngle = this._flagEndAngle = this._flagInnerRadius = this._flagOuterRadius = false;
      return this;
    }
    get startAngle() {
      return this._startAngle;
    }
    set startAngle(v) {
      this._startAngle = v;
      this._flagStartAngle = true;
    }
    get endAngle() {
      return this._endAngle;
    }
    set endAngle(v) {
      this._endAngle = v;
      this._flagEndAngle = true;
    }
    get innerRadius() {
      return this._innerRadius;
    }
    set innerRadius(v) {
      this._innerRadius = v;
      this._flagInnerRadius = true;
    }
    get outerRadius() {
      return this._outerRadius;
    }
    set outerRadius(v) {
      this._outerRadius = v;
      this._flagOuterRadius = true;
    }
  };

  // src/lib/shapes/Arrow.ts
  var Arrow = class extends Path {
    #disposables = [];
    #axis;
    #headLength;
    #origin;
    constructor(board, axis, attributes = {}) {
      const vertices = [
        new Anchor(G20.vector(0, 0), Commands.move),
        // tail
        new Anchor(G20.vector(0, 0), Commands.line),
        // head
        new Anchor(G20.vector(0, 0), Commands.move),
        // port head
        new Anchor(G20.vector(0, 0), Commands.line),
        // port tail
        new Anchor(G20.vector(0, 0), Commands.move),
        // stbd head
        new Anchor(G20.vector(0, 0), Commands.line)
        // stbd tail
      ];
      super(board, vertices, false, false, true, path_attribs_from_arrow_attribs(attributes));
      this.#origin = G20.zero.clone();
      this.#axis = position_from_like(axis);
      if (typeof attributes.headLength === "number") {
        this.#headLength = G20.scalar(attributes.headLength);
      } else {
        this.#headLength = G20.scalar(0.25);
      }
      this.noFill();
      this.cap = "round";
      this.join = "round";
      this.#disposables.push(this.#axis.change$.subscribe(() => {
        this.#updateVertices();
      }));
      this.#disposables.push(this.#headLength.change$.subscribe(() => {
        this.#updateVertices();
      }));
      this.#disposables.push(this.#origin.change$.subscribe(() => {
        this.#updateVertices();
      }));
    }
    dispose() {
      dispose(this.#disposables);
      super.dispose();
    }
    #updateVertices() {
      update_arrow_vertices(this.axis, this.headLength, this.origin, this.vertices);
      this.zzz.flags[31 /* Vertices */] = true;
      super.update();
    }
    update() {
      if (this.zzz.flags[31 /* Vertices */]) {
      }
      super.update();
      return this;
    }
    flagReset(dirtyFlag = false) {
      super.flagReset(dirtyFlag);
      return this;
    }
    get axis() {
      return this.#axis;
    }
    set axis(axis) {
      if (axis instanceof G20) {
        this.#axis.copyVector(axis);
      }
    }
    get headLength() {
      return this.#headLength.a;
    }
    set headLength(headLength) {
      if (typeof headLength === "number") {
        if (this.headLength !== headLength) {
          this.#headLength.set(0, 0, headLength, 0);
        }
      }
    }
    get origin() {
      return this.#origin;
    }
    set origin(origin) {
      if (origin instanceof G20) {
        this.#origin.copyVector(origin);
      }
    }
  };
  function update_arrow_vertices(axis, headLength, origin, vertices) {
    const \u03B8 = Math.atan2(axis.y, axis.x);
    const \u03C6 = Math.PI / 6;
    const tail = vertices.getAt(0);
    const head = vertices.getAt(1);
    const port_head = vertices.getAt(2);
    const port_tail = vertices.getAt(3);
    const stbd_head = vertices.getAt(4);
    const stbd_tail = vertices.getAt(5);
    tail.origin.set(0, 0).sub(origin);
    head.origin.copyVector(axis).sub(origin);
    port_head.origin.copyVector(axis).sub(origin);
    port_tail.origin.set(axis.x - headLength * Math.cos(\u03B8 - \u03C6), axis.y - headLength * Math.sin(\u03B8 - \u03C6)).sub(origin);
    stbd_head.origin.copyVector(axis).sub(origin);
    stbd_tail.origin.set(axis.x - headLength * Math.cos(\u03B8 + \u03C6), axis.y - headLength * Math.sin(\u03B8 + \u03C6)).sub(origin);
  }
  function path_attribs_from_arrow_attribs(attributes) {
    const retval = {
      id: attributes.id,
      // attitude: attributes.attitude,
      // opacity: attributes.opacity,
      position: attributes.position,
      // visibility: attributes.visibility,
      // fill: attributes.fill,
      // fillOpacity: attributes.fillOpacity,
      // stroke: attributes.stroke,
      strokeOpacity: attributes.strokeOpacity,
      strokeWidth: attributes.strokeWidth
    };
    return retval;
  }

  // src/lib/shapes/Circle.ts
  var Circle = class extends Path {
    #radius = variable(1);
    constructor(board, options = {}) {
      const amount = options.resolution ? Math.max(options.resolution, 2) : 4;
      const points = [];
      for (let i = 0; i < amount; i++) {
        points.push(new Anchor(G20.vector(0, 0)));
      }
      super(board, points, true, true, true, path_attributes(options));
      this.zzz.radius$ = this.#radius.asObservable();
      if (typeof options.radius === "number") {
        this.#radius.set(options.radius);
      }
      this.flagReset(true);
      this.update();
    }
    dispose() {
      super.dispose();
    }
    update() {
      if (this.zzz.flags[31 /* Vertices */] || this.zzz.flags[20 /* Radius */]) {
        let length = this.vertices.length;
        if (!this.closed && length > 2) {
          length -= 1;
        }
        const c = 4 / 3 * Math.tan(Math.PI / (length * 2));
        const radius = this.radius;
        const rc = radius * c;
        const cos3 = Math.cos;
        const sin3 = Math.sin;
        for (let i = 0; i < this.vertices.length; i++) {
          const pct = i / length;
          const theta = pct * TWO_PI;
          const x = radius * cos3(theta);
          const y = radius * sin3(theta);
          const lx = rc * cos3(theta - HALF_PI);
          const ly = rc * sin3(theta - HALF_PI);
          const rx = rc * cos3(theta + HALF_PI);
          const ry = rc * sin3(theta + HALF_PI);
          const v = this.vertices.getAt(i);
          v.command = i === 0 ? Commands.move : Commands.curve;
          v.origin.set(x, y);
          v.controls.a.set(lx, ly);
          v.controls.b.set(rx, ry);
        }
      }
      super.update();
      return this;
    }
    flagReset(dirtyFlag = false) {
      this.zzz.flags[20 /* Radius */] = dirtyFlag;
      super.flagReset(dirtyFlag);
      return this;
    }
    get radius() {
      return this.#radius.get();
    }
    set radius(radius) {
      if (typeof radius === "number") {
        if (this.radius !== radius) {
          this.#radius.set(radius);
          this.zzz.flags[20 /* Radius */] = true;
          this.zzz.flags[15 /* Length */] = true;
          this.update();
        }
      }
    }
  };
  function path_attributes(attributes) {
    const retval = {
      attitude: attributes.attitude,
      position: attributes.position,
      fill: attributes.fill,
      fillOpacity: attributes.fillOpacity,
      stroke: attributes.stroke,
      strokeOpacity: attributes.strokeOpacity,
      strokeWidth: attributes.strokeWidth
    };
    return retval;
  }

  // src/lib/shapes/Ellipse.ts
  var cos2 = Math.cos;
  var sin2 = Math.sin;
  var Ellipse = class extends Path {
    _flagWidth = false;
    _flagHeight = false;
    _width = 0;
    _height = 0;
    constructor(board, attributes = {}) {
      const amount = attributes.resolution ? Math.max(attributes.resolution, 2) : 4;
      const points = [];
      for (let i = 0; i < amount; i++) {
        points.push(new Anchor(G20.vector(0, 0)));
      }
      super(board, points, true, true, true, path_attribs_from_ellipse_attribs(attributes));
      if (typeof attributes.rx === "number") {
        this.width = attributes.rx * 2;
      } else {
        this.width = 1;
      }
      if (typeof attributes.ry === "number") {
        this.height = attributes.ry * 2;
      } else {
        this.height = 1;
      }
      this.flagReset(true);
      this.update();
    }
    static Properties = ["width", "height"];
    update() {
      if (this.zzz.flags[31 /* Vertices */] || this._flagWidth || this._flagHeight) {
        let length = this.vertices.length;
        if (!this.closed && length > 2) {
          length -= 1;
        }
        const c = 4 / 3 * Math.tan(Math.PI / (this.vertices.length * 2));
        const radiusX = this._width / 2;
        const radiusY = this._height / 2;
        for (let i = 0; i < this.vertices.length; i++) {
          const pct = i / length;
          const theta = pct * TWO_PI;
          const x = radiusX * cos2(theta);
          const y = radiusY * sin2(theta);
          const lx = radiusX * c * cos2(theta - HALF_PI);
          const ly = radiusY * c * sin2(theta - HALF_PI);
          const rx = radiusX * c * cos2(theta + HALF_PI);
          const ry = radiusY * c * sin2(theta + HALF_PI);
          const v = this.vertices.getAt(i);
          v.command = i === 0 ? Commands.move : Commands.curve;
          v.origin.set(x, y);
          v.controls.a.set(lx, ly);
          v.controls.b.set(rx, ry);
        }
      }
      super.update();
      return this;
    }
    flagReset(dirtyFlag = false) {
      this._flagWidth = dirtyFlag;
      this._flagHeight = dirtyFlag;
      super.flagReset(dirtyFlag);
      return this;
    }
    get height() {
      return this._height;
    }
    set height(v) {
      this._height = v;
      this._flagHeight = true;
    }
    get width() {
      return this._width;
    }
    set width(v) {
      this._width = v;
      this._flagWidth = true;
    }
  };
  function path_attribs_from_ellipse_attribs(attributes) {
    const retval = {
      id: attributes.id,
      fill: attributes.fill,
      fillOpacity: attributes.fillOpacity,
      attitude: attributes.attitude,
      position: attributes.position,
      stroke: attributes.stroke,
      strokeOpacity: attributes.strokeOpacity,
      strokeWidth: attributes.strokeWidth,
      visibility: attributes.visibility
    };
    return retval;
  }

  // src/lib/shapes/Line.ts
  var Line = class extends Path {
    constructor(board, point1, point2, attributes = {}) {
      super(
        board,
        [
          new Anchor(position_from_like(point1), "M"),
          new Anchor(position_from_like(point2), "L")
        ],
        false,
        false,
        false,
        path_attribs_from_line_attribs(attributes)
      );
    }
    get point1() {
      return this.vertices.getAt(0);
    }
    set point1(point1) {
      if (point1 instanceof Anchor) {
        this.vertices.splice(0, 1, point1);
      } else {
        const error = new Error("Line.point1 argument is not an Anchor.");
        console.warn(error.name, error.message);
      }
    }
    get point2() {
      return this.vertices.getAt(1);
    }
    set point2(point2) {
      if (point2 instanceof Anchor) {
        this.vertices.splice(1, 1, point2);
      } else {
        const error = new Error("Line.point2 argument is not an Anchor.");
        console.warn(error.name, error.message);
      }
    }
  };
  function path_attribs_from_line_attribs(attributes) {
    const retval = {
      id: attributes.id,
      visibility: attributes.visibility,
      stroke: attributes.stroke,
      strokeOpacity: attributes.strokeOpacity,
      strokeWidth: attributes.strokeWidth
    };
    return retval;
  }

  // src/lib/shapes/Polygon.ts
  var Polygon = class extends Path {
    constructor(board, points = [], attributes = {}) {
      const vertices = points.map((point) => position_from_like(point)).map((position, index) => new Anchor(position, index === 0 ? "M" : "L"));
      super(board, vertices, true, false, false, path_attributes2(attributes));
      this.flagReset(true);
      this.update();
    }
  };
  function path_attributes2(attributes) {
    const retval = {
      id: attributes.id,
      opacity: attributes.opacity,
      fill: attributes.fill,
      fillOpacity: attributes.fillOpacity,
      stroke: attributes.stroke,
      strokeOpacity: attributes.strokeOpacity,
      strokeWidth: attributes.strokeWidth
    };
    return retval;
  }

  // src/lib/shapes/Rectangle.ts
  var Rectangle = class extends Path {
    #disposables = [];
    #width = variable(1);
    #height = variable(1);
    #origin = G20.zero.clone();
    constructor(board, attributes = {}) {
      const points = [
        new Anchor(G20.vector(0, 0), "M"),
        new Anchor(G20.vector(0, 0), "L"),
        new Anchor(G20.vector(0, 0), "L"),
        new Anchor(G20.vector(0, 0), "L")
      ];
      super(board, points, true, false, true, path_options_from_rectangle_options(attributes));
      this.zzz.width$ = this.#width.asObservable();
      this.zzz.height$ = this.#height.asObservable();
      if (typeof attributes.width === "number") {
        this.width = attributes.width;
      }
      if (typeof attributes.height === "number") {
        this.height = attributes.height;
      }
      this.#disposables.push(this.#origin.change$.subscribe(() => {
        this.zzz.flags[31 /* Vertices */] = true;
      }));
      this.#disposables.push(this.zzz.width$.subscribe((width) => {
        update_rectangle_vertices(width, this.height, this.origin, this.closed, this.vertices);
        this.zzz.flags[31 /* Vertices */] = true;
        this.zzz.flags[17 /* Matrix */] = true;
        super.update();
      }));
      this.#disposables.push(this.zzz.height$.subscribe((height) => {
        update_rectangle_vertices(this.width, height, this.origin, this.closed, this.vertices);
        this.zzz.flags[31 /* Vertices */] = true;
        this.zzz.flags[17 /* Matrix */] = true;
        super.update();
      }));
      this.#disposables.push(this.#origin.change$.subscribe((origin) => {
        update_rectangle_vertices(this.width, this.height, origin, this.closed, this.vertices);
        this.zzz.flags[31 /* Vertices */] = true;
        this.zzz.flags[17 /* Matrix */] = true;
        super.update();
      }));
      this.flagReset(true);
      this.update();
    }
    dispose() {
      dispose(this.#disposables);
      super.dispose();
    }
    update() {
      if (this.zzz.flags[31 /* Vertices */] || this.zzz.flags[33 /* Width */] || this.zzz.flags[12 /* Height */]) {
        update_rectangle_vertices(this.width, this.height, this.origin, this.closed, this.vertices);
      }
      super.update();
      return this;
    }
    flagReset(dirtyFlag = false) {
      this.zzz.flags[33 /* Width */] = dirtyFlag;
      this.zzz.flags[12 /* Height */] = dirtyFlag;
      super.flagReset(dirtyFlag);
      return this;
    }
    get height() {
      return this.#height.get();
    }
    set height(height) {
      if (typeof height === "number") {
        this.#height.set(height);
        this.zzz.flags[12 /* Height */] = true;
      }
    }
    get origin() {
      return this.#origin;
    }
    set origin(origin) {
      this.#origin.copyVector(origin);
      this.zzz.flags[31 /* Vertices */] = true;
    }
    get width() {
      return this.#width.get();
    }
    set width(width) {
      if (typeof width === "number") {
        this.#width.set(width);
        this.zzz.flags[33 /* Width */] = true;
      }
    }
  };
  function path_options_from_rectangle_options(attributes) {
    const retval = {
      id: attributes.id,
      attitude: attributes.attitude,
      opacity: attributes.opacity,
      position: attributes.position,
      visibility: attributes.visibility,
      fill: attributes.fill,
      fillOpacity: attributes.fillOpacity,
      stroke: attributes.stroke,
      strokeOpacity: attributes.strokeOpacity,
      strokeWidth: attributes.strokeWidth
    };
    return retval;
  }
  function update_rectangle_vertices(sizeX, sizeY, origin, closed, vertices) {
    const x = sizeX / 2;
    const y = sizeY / 2;
    if (!closed && vertices.length === 4) {
      vertices.push(new Anchor(G20.vector(0, 0)));
    }
    vertices.getAt(0).origin.set(-x, -y).sub(origin);
    vertices.getAt(1).origin.set(x, -y).sub(origin);
    vertices.getAt(2).origin.set(x, y).sub(origin);
    vertices.getAt(3).origin.set(-x, y).sub(origin);
    const anchor = vertices.getAt(4);
    if (anchor) {
      anchor.origin.set(-x, -y).sub(origin);
      anchor.command = "L";
    }
  }

  // src/lib/text.ts
  var min2 = Math.min;
  var max2 = Math.max;
  var Text = class _Text extends Shape {
    automatic;
    beginning;
    cap;
    closed;
    curved;
    ending;
    join;
    length;
    miter;
    #textContent = variable("");
    #fontFamily = variable("sans-serif");
    fontFamily$ = this.#fontFamily.asObservable();
    #fontSize = variable(13);
    fontSize$ = this.#fontSize.asObservable();
    #anchor = variable("start");
    #baseline = variable("auto");
    #fontStyle = variable("normal");
    #fontWeight = variable("normal");
    #decoration = variable(["none"]);
    /**
     * determine what direction the text should run.
     * Possibly values are `'ltr'` for left-to-right and `'rtl'` for right-to-left. Defaults to `'ltr'`.
     */
    #direction = variable("ltr");
    #dx = variable(0);
    #dy = variable(0);
    /**
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
     */
    #fill = variable("#000000");
    #fill_change = null;
    /**
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
     */
    #stroke = variable("none");
    #stroke_change = null;
    #strokeWidth = variable(1);
    #dashes = null;
    constructor(board, value, attributes = {}) {
      super(board, shape_attributes_from_text_attributes(attributes));
      this.zzz.anchor$ = this.#anchor.asObservable();
      this.zzz.baseline$ = this.#baseline.asObservable();
      this.zzz.decoration$ = this.#decoration.asObservable();
      this.zzz.direction$ = this.#direction.asObservable();
      this.zzz.dx$ = this.#dx.asObservable();
      this.zzz.dy$ = this.#dy.asObservable();
      this.zzz.fill$ = this.#fill.asObservable();
      this.zzz.fontStyle$ = this.#fontStyle.asObservable();
      this.zzz.fontWeight$ = this.#fontWeight.asObservable();
      this.zzz.stroke$ = this.#stroke.asObservable();
      this.zzz.strokeWidth$ = this.#strokeWidth.asObservable();
      this.zzz.textContent$ = this.#textContent.asObservable();
      this.zzz.flags[28 /* Stroke */] = true;
      this.value = value;
      this.dashes = [];
      set_dashes_offset(this.dashes, 0);
      if (attributes.anchor) {
        this.anchor = attributes.anchor;
      }
      if (attributes.baseline) {
        this.baseline = attributes.baseline;
      }
      if (attributes.decoration) {
        this.decoration = attributes.decoration;
      }
      if (attributes.direction) {
        this.direction = attributes.direction;
      }
      if (typeof attributes.dx === "number" || typeof attributes.dx === "string") {
        this.dx = attributes.dx;
      }
      if (typeof attributes.dy === "number" || typeof attributes.dy === "string") {
        this.dy = attributes.dy;
      }
      if (attributes.fontFamily) {
        this.fontFamily = attributes.fontFamily;
      }
      if (attributes.fill) {
        this.fill = attributes.fill;
      }
      if (attributes.strokeWidth) {
        this.strokeWidth = attributes.strokeWidth;
      }
      if (attributes.opacity) {
        this.opacity = attributes.opacity;
      }
      if (attributes.fontSize) {
        this.fontSize = attributes.fontSize;
      }
      if (attributes.stroke) {
        this.stroke = attributes.stroke;
      }
      if (attributes.fontStyle) {
        this.fontStyle = attributes.fontStyle;
      }
      if (attributes.value) {
        this.value = attributes.value;
      }
      if (typeof attributes.visibility === "string") {
        this.visibility = attributes.visibility;
      }
      if (attributes.fontWeight) {
        this.fontWeight = attributes.fontWeight;
      }
      this.flagReset(true);
    }
    render(domElement, svgElement) {
      this.update();
      const changed = {};
      const flagMatrix = this.matrix.manual || this.zzz.flags[17 /* Matrix */];
      if (flagMatrix) {
        changed.transform = transform_value_of_matrix(this.matrix);
      }
      if (this.zzz.flags[24 /* Size */]) {
        changed["font-size"] = `${this.fontSize}`;
      }
      {
        const fill = this.fill;
        if (fill) {
          if (is_color_provider(fill)) {
            this.zzz.hasFillEffect = true;
            fill.render(svgElement);
          } else {
            changed.fill = serialize_color(fill);
            if (this.zzz.hasFillEffect) {
              set_defs_dirty_flag(get_svg_element_defs(svgElement), true);
              delete this.zzz.hasFillEffect;
            }
          }
        }
      }
      {
        const stroke = this.stroke;
        if (stroke) {
          if (is_color_provider(stroke)) {
            this.zzz.hasStrokeEffect = true;
            stroke.render(svgElement);
          } else {
            changed.stroke = serialize_color(stroke);
            if (this.zzz.hasStrokeEffect) {
              set_defs_dirty_flag(get_svg_element_defs(svgElement), true);
              delete this.zzz.hasFillEffect;
            }
          }
        }
      }
      if (this.zzz.flags[4 /* ClassName */]) {
        changed["class"] = this.classList.join(" ");
      }
      if (this.dashes && this.dashes.length > 0) {
        changed["stroke-dasharray"] = this.dashes.join(" ");
        changed["stroke-dashoffset"] = `${get_dashes_offset(this.dashes) || 0}`;
      }
      if (this.zzz.elem) {
        svg.setAttributes(this.zzz.elem, changed);
      } else {
        changed.id = this.id;
        this.zzz.elem = svg.createElement("text", changed);
        domElement.appendChild(this.zzz.elem);
        this.zzz.disposables.push(this.matrix.change$.subscribe((matrix) => {
          const change = {};
          change.transform = transform_value_of_matrix(matrix);
          svg.setAttributes(this.zzz.elem, change);
        }));
        this.zzz.disposables.push(this.zzz.anchor$.subscribe((anchor) => {
          switch (anchor) {
            case "start": {
              svg.removeAttributes(this.zzz.elem, { "text-anchor": anchor });
              break;
            }
            case "middle":
            case "end": {
              svg.setAttributes(this.zzz.elem, { "text-anchor": anchor });
              break;
            }
          }
          return function() {
          };
        }));
        this.zzz.disposables.push(this.zzz.decoration$.subscribe((decoration) => {
          const change = {};
          change["text-decoration"] = decoration.join(" ");
          svg.setAttributes(this.zzz.elem, change);
          return function() {
          };
        }));
        this.zzz.disposables.push(this.zzz.direction$.subscribe((direction) => {
          if (direction === "rtl") {
            svg.setAttributes(this.zzz.elem, { direction });
          } else {
            svg.removeAttributes(this.zzz.elem, { direction });
          }
          return function() {
          };
        }));
        this.zzz.disposables.push(this.zzz.baseline$.subscribe((baseline) => {
          switch (baseline) {
            case "auto": {
              svg.removeAttributes(this.zzz.elem, { "dominant-baseline": baseline });
              break;
            }
            default: {
              svg.setAttributes(this.zzz.elem, { "dominant-baseline": baseline });
              break;
            }
          }
          return function() {
          };
        }));
        this.zzz.disposables.push(this.zzz.dx$.subscribe((dx) => {
          if (typeof dx === "number" && dx === 0) {
            svg.removeAttributes(this.zzz.elem, { dx: "" });
          } else {
            svg.setAttributes(this.zzz.elem, { dx: `${dx}` });
          }
          return function() {
          };
        }));
        this.zzz.disposables.push(this.zzz.dy$.subscribe((dy) => {
          if (typeof dy === "number" && dy === 0) {
            svg.removeAttributes(this.zzz.elem, { dy: "" });
          } else {
            svg.setAttributes(this.zzz.elem, { dy: `${dy}` });
          }
          return function() {
          };
        }));
        this.zzz.disposables.push(this.fontFamily$.subscribe((family) => {
          svg.setAttributes(this.zzz.elem, { "font-family": family });
        }));
        this.zzz.disposables.push(this.fontSize$.subscribe((size) => {
          svg.setAttributes(this.zzz.elem, { "font-size": `${size}` });
        }));
        this.zzz.disposables.push(this.zzz.fontStyle$.subscribe((fontStyle) => {
          const change = { "font-style": fontStyle };
          if (change["font-style"] === "normal") {
            svg.removeAttributes(this.zzz.elem, change);
          } else {
            svg.setAttributes(this.zzz.elem, change);
          }
          return function() {
          };
        }));
        this.zzz.disposables.push(this.zzz.fontWeight$.subscribe((fontWeight) => {
          const change = { "font-weight": `${fontWeight}` };
          if (change["font-weight"] === "normal") {
            svg.removeAttributes(this.zzz.elem, change);
          } else {
            svg.setAttributes(this.zzz.elem, change);
          }
          return function() {
          };
        }));
        this.zzz.disposables.push(this.zzz.opacity$.subscribe((opacity) => {
          const change = { opacity: `${opacity}` };
          if (opacity === 1) {
            svg.removeAttributes(this.zzz.elem, change);
          } else {
            svg.setAttributes(this.zzz.elem, change);
          }
          return function() {
          };
        }));
        this.zzz.disposables.push(this.zzz.strokeWidth$.subscribe((strokeWidth) => {
          const change = {};
          change["stroke-width"] = `${strokeWidth}`;
          svg.setAttributes(this.zzz.elem, change);
          return function() {
          };
        }));
        this.zzz.disposables.push(this.zzz.textContent$.subscribe((textContent) => {
          this.zzz.elem.textContent = textContent;
        }));
        this.zzz.disposables.push(this.zzz.visibility$.subscribe((visibility) => {
          switch (visibility) {
            case "visible": {
              const change = { visibility };
              svg.removeAttributes(this.zzz.elem, change);
              break;
            }
            default: {
              const change = { visibility };
              svg.setAttributes(this.zzz.elem, change);
              break;
            }
          }
          return function() {
          };
        }));
      }
      if (this.zzz.flags[5 /* ClipFlag */]) {
        const clip = svg.getClip(this, svgElement);
        const elem = this.zzz.elem;
        if (this.zzz.clip) {
          elem.removeAttribute("id");
          clip.setAttribute("id", this.id);
          clip.appendChild(elem);
        } else {
          clip.removeAttribute("id");
          elem.setAttribute("id", this.id);
          if (this.parent instanceof ElementBase) {
            this.parent.zzz.elem.appendChild(elem);
          }
        }
      }
      if (this.zzz.flags[6 /* ClipPath */]) {
        if (this.clipPath) {
          this.clipPath.render(domElement, svgElement);
          this.zzz.elem.setAttribute("clip-path", "url(#" + this.clipPath.id + ")");
        } else {
          this.zzz.elem.removeAttribute("clip-path");
        }
      }
      this.flagReset();
    }
    static Measure(text) {
      const width = text.value.length * text.fontSize * 0.6;
      const height = text.fontSize;
      return { width, height };
    }
    /**
     * Convenience method to set fill to `none`.
     */
    noFill() {
      this.fill = "none";
      return this;
    }
    /**
     * Convenience method to set stroke to `none`.
     */
    noStroke() {
      this.stroke = "none";
      return this;
    }
    getBoundingBox(shallow = false) {
      let left;
      let right;
      let top;
      let bottom;
      this.update();
      const matrix = shallow ? this.matrix : this.worldMatrix;
      const { width, height } = _Text.Measure(this);
      const border = (this.strokeWidth || 0) / 2;
      switch (this.anchor) {
        case "start": {
          left = -border;
          right = width + border;
          break;
        }
        case "middle": {
          left = -(width / 2 + border);
          right = width / 2 + border;
          break;
        }
        case "end": {
          left = -(width + border);
          right = border;
          break;
        }
      }
      switch (this.baseline) {
        case "middle":
          top = -(height / 2 + border);
          bottom = height / 2 + border;
          break;
        default:
          top = -(height + border);
          bottom = border;
      }
      const [ax, ay] = matrix.multiply_vector(left, top);
      const [bx, by] = matrix.multiply_vector(left, bottom);
      const [cx, cy] = matrix.multiply_vector(right, top);
      const [dx, dy] = matrix.multiply_vector(right, bottom);
      top = min2(ay, by, cy, dy);
      left = min2(ax, bx, cx, dx);
      right = max2(ax, bx, cx, dx);
      bottom = max2(ay, by, cy, dy);
      return { top, left, right, bottom };
    }
    hasBoundingBox() {
      return true;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    subdivide(limit) {
      throw new Error("Method not implemented.");
    }
    flagReset(dirtyFlag = false) {
      super.flagReset(dirtyFlag);
      this.zzz.flags[24 /* Size */] = dirtyFlag;
      this.zzz.flags[10 /* Fill */] = dirtyFlag;
      this.zzz.flags[28 /* Stroke */] = dirtyFlag;
      this.zzz.flags[5 /* ClipFlag */] = dirtyFlag;
      this.zzz.flags[4 /* ClassName */] = dirtyFlag;
      return this;
    }
    get anchor() {
      return this.#anchor.get();
    }
    set anchor(anchor) {
      if (typeof anchor === "string") {
        switch (anchor) {
          case "start":
          case "middle":
          case "end": {
            this.#anchor.set(anchor);
            break;
          }
        }
      }
    }
    get baseline() {
      return this.#baseline.get();
    }
    set baseline(baseline) {
      if (typeof baseline === "string") {
        switch (baseline) {
          case "alphabetic":
          case "auto":
          case "central":
          case "hanging":
          case "ideographic":
          case "mathematical":
          case "middle":
          case "text-bottom":
          case "text-top": {
            this.#baseline.set(baseline);
          }
        }
      }
    }
    get dashes() {
      return this.#dashes;
    }
    set dashes(v) {
      if (typeof get_dashes_offset(v) !== "number") {
        set_dashes_offset(v, this.dashes && get_dashes_offset(this.#dashes) || 0);
      }
      this.#dashes = v;
    }
    get decoration() {
      return this.#decoration.get();
    }
    set decoration(v) {
      this.#decoration.set(v);
    }
    get direction() {
      return this.#direction.get();
    }
    set direction(direction) {
      if (typeof direction === "string") {
        if (direction === "ltr" || direction === "rtl") {
          if (this.direction !== direction) {
            this.#direction.set(direction);
          }
        }
      }
    }
    get dx() {
      return this.#dx.get();
    }
    set dx(dx) {
      if (typeof dx === "number" || typeof dx === "string") {
        if (this.dx !== dx) {
          this.#dx.set(dx);
        }
      }
    }
    get dy() {
      return this.#dy.get();
    }
    set dy(dy) {
      if (typeof dy === "number" || typeof dy === "string") {
        if (this.dy !== dy) {
          this.#dy.set(dy);
        }
      }
    }
    get fontFamily() {
      return this.#fontFamily.get();
    }
    set fontFamily(family) {
      if (typeof family === "string") {
        if (this.fontFamily !== family) {
          this.#fontFamily.set(family);
        }
      }
    }
    get fill() {
      return this.#fill.get();
    }
    set fill(fill) {
      if (this.#fill_change) {
        this.#fill_change.dispose();
        this.#fill_change = null;
      }
      this.#fill.set(fill);
      this.zzz.flags[10 /* Fill */] = true;
      if (is_color_provider(this.fill)) {
        this.#fill_change = this.fill.change$.subscribe(() => {
          this.zzz.flags[10 /* Fill */] = true;
        });
      }
    }
    get strokeWidth() {
      return this.#strokeWidth.get();
    }
    set strokeWidth(strokeWidth) {
      if (typeof strokeWidth === "number") {
        if (this.strokeWidth !== strokeWidth) {
          this.#strokeWidth.set(strokeWidth);
        }
      }
    }
    get fontSize() {
      return this.#fontSize.get();
    }
    set fontSize(size) {
      if (typeof size === "number") {
        if (this.fontSize !== size) {
          this.#fontSize.set(size);
          this.zzz.flags[24 /* Size */] = true;
        }
      }
    }
    get stroke() {
      return this.#stroke.get();
    }
    set stroke(stroke) {
      if (this.#stroke_change) {
        this.#stroke_change.dispose();
        this.#stroke_change = null;
      }
      this.#stroke.set(stroke);
      this.zzz.flags[28 /* Stroke */] = true;
      if (is_color_provider(this.stroke)) {
        this.#stroke_change = this.stroke.change$.subscribe(() => {
          this.zzz.flags[28 /* Stroke */] = true;
        });
      }
    }
    get fontStyle() {
      return this.#fontStyle.get();
    }
    set fontStyle(fontStyle) {
      if (typeof fontStyle === "string") {
        this.#fontStyle.set(fontStyle);
      }
    }
    get value() {
      return this.#textContent.get();
    }
    set value(value) {
      if (typeof value === "string") {
        if (this.value !== value) {
          this.#textContent.set(value);
        }
      }
    }
    get fontWeight() {
      return this.#fontWeight.get();
    }
    set fontWeight(fontWeight) {
      this.#fontWeight.set(fontWeight);
    }
  };
  function shape_attributes_from_text_attributes(attributes) {
    const retval = {
      id: attributes.id,
      compensate: true,
      position: attributes.position
    };
    return retval;
  }

  // src/lib/utils/performance.ts
  var dateTime = root.performance && root.performance.now ? root.performance : Date;

  // src/lib/board.ts
  var Board = class {
    #view;
    #view_resize = null;
    /**
     * A wrapper group that is used to transform the scene from user coordinates to pixels.
     */
    #viewBox;
    /**
     * 
     */
    #scene;
    /**
     * The width of the instance's dom element.
     */
    width = 0;
    /**
     * The height of the instance's dom element.
     */
    height = 0;
    #size = variable({ width: this.width, height: this.height });
    size$ = this.#size.asObservable();
    /**
     * 
     */
    ratio = void 0;
    /**
     * A helper to handle sizing.
     */
    #fitter;
    #frameCount = variable(0);
    frameCount$ = this.#frameCount.asObservable();
    // Used to compute the elapsed time between frames.
    #curr_now = null;
    #prev_now = null;
    #boundingBox = { left: -5, top: 5, right: 5, bottom: -5 };
    goofy;
    constructor(elementOrId, options = {}) {
      const container = get_container(elementOrId);
      const container_id = get_container_id(elementOrId);
      this.#viewBox = new Group(this, [], { id: `${container_id}-viewbox` });
      if (typeof options.boundingBox === "object") {
        const left = options.boundingBox.left;
        const top = options.boundingBox.top;
        const right = options.boundingBox.right;
        const bottom = options.boundingBox.bottom;
        this.#boundingBox.left = left;
        this.#boundingBox.top = top;
        this.#boundingBox.right = right;
        this.#boundingBox.bottom = bottom;
        this.goofy = bottom > top;
      } else {
        this.goofy = false;
      }
      if (options.scene instanceof Group) {
        this.#scene = options.scene;
      } else {
        this.#scene = new Group(this, [], { id: `${container_id}-scene` });
      }
      this.#viewBox.add(this.#scene);
      if (typeof options.viewFactory === "object") {
        this.#view = options.viewFactory.createView(this.#viewBox, container_id);
      } else {
        this.#view = new SVGViewFactory().createView(this.#viewBox, container_id);
      }
      const config2 = config_from_options(container, options);
      this.#fitter = new Fitter(this, this.#view);
      if (container instanceof HTMLElement) {
        this.#fitter.set_target(container);
        this.#fitter.subscribe();
        this.#fitter.resize();
      }
      if (container instanceof HTMLElement) {
        this.appendTo(container);
      }
      if (config2.size) {
        this.#view.setSize(config2.size, this.ratio);
      }
      if (typeof this.#view.size$ === "object") {
        this.#view_resize = this.#view.size$.subscribe(({ width, height }) => {
          this.width = width;
          this.height = height;
          this.#update_view_box();
          this.#size.set({ width, height });
        });
      } else {
        throw new Error("view.size$ MUST be defined");
      }
    }
    dispose() {
      if (this.#view_resize) {
        this.#view_resize.dispose();
        this.#view_resize = null;
      }
      this.#fitter.unsubscribe();
    }
    /**
     * Here we are actually doing a job that is equvalent to the role of the SVG viewBox except that we are also
     * introducing a 90 degree rotation if the coordinate system is right-handed (a.k.a regular or not goofy).
     */
    #update_view_box() {
      const { left, top, right, bottom } = this.getBoundingBox();
      const \u0394x = this.width;
      const \u0394y = this.height;
      const RL = right - left;
      const TB = top - bottom;
      const sx = \u0394x / RL;
      const sy = \u0394y / TB;
      const x = -left * \u0394x / RL;
      const y = -bottom * \u0394y / TB;
      this.#viewBox.position.set(x, y);
      if (!this.goofy) {
        this.#viewBox.attitude.rotorFromAngle(Math.PI / 2);
      }
      this.#viewBox.scaleXY.set(sx, sy);
    }
    get scaleXY() {
      return this.#viewBox.scaleXY.clone();
    }
    get scene() {
      return this.#scene;
    }
    appendTo(container) {
      if (container && typeof container.nodeType === "number") {
        if (container.nodeType === Node.ELEMENT_NODE) {
          const domElement = this.#view.domElement;
          if (domElement instanceof SVGElement || domElement instanceof HTMLCanvasElement) {
            container.appendChild(this.#view.domElement);
          } else {
            throw new Error("domElement must be an SVGElement or HTMLCanvasElement");
          }
          if (!this.#fitter.is_target_body()) {
            this.#fitter.set_target(container);
          }
          this.update();
        }
      }
      return this;
    }
    getBoundingBox() {
      return this.#boundingBox;
    }
    /**
     * A number representing how much time has elapsed since the last frame in milliseconds.
     */
    getElapsedTime(fractionalDigits = 3) {
      if (typeof this.#prev_now === "number") {
        return parseFloat((this.#curr_now - this.#prev_now).toFixed(fractionalDigits));
      } else {
        return null;
      }
    }
    /**
     * Update positions and calculations in one pass before rendering.
     */
    update() {
      this.#prev_now = this.#curr_now;
      this.#curr_now = dateTime.now();
      if (this.#fitter.has_target() && !this.#fitter.is_bound()) {
        this.#fitter.subscribe();
        this.#fitter.resize();
      }
      const width = this.width;
      const height = this.height;
      const renderer = this.#view;
      if (width !== renderer.width || height !== renderer.height) {
        renderer.setSize({ width, height }, this.ratio);
      }
      this.#view.render();
      this.#frameCount.set(this.#frameCount.get() + 1);
    }
    add(...shapes) {
      this.#scene.add(...shapes);
      this.update();
      return this;
    }
    remove(...shapes) {
      this.#scene.remove(...shapes);
      this.update();
      return this;
    }
    circle(options = {}) {
      const circle = new Circle(this, options);
      this.add(circle);
      return circle;
    }
    ellipse(attributes = {}) {
      const ellipse = new Ellipse(this, attributes);
      this.add(ellipse);
      return ellipse;
    }
    line(point1, point2, attributes = {}) {
      const line = new Line(this, point1, point2, attributes);
      this.add(line);
      return line;
    }
    path(closed, ...points) {
      const path = new Path(this, points, closed);
      const bbox = path.getBoundingBox();
      if (typeof bbox.top === "number" && typeof bbox.left === "number" && typeof bbox.right === "number" && typeof bbox.bottom === "number") {
        path.center().position.set((bbox.left + bbox.right) / 2, (bbox.top + bbox.bottom) / 2);
      }
      this.add(path);
      return path;
    }
    point(position, attributes = {}) {
      const { left, top, right, bottom } = this.getBoundingBox();
      const sx = this.width / (top - left);
      const sy = this.height / (bottom - right);
      const rx = 4 / sx;
      const ry = 4 / sy;
      const ellipse_attribs = ellipse_attribs_from_point_attribs(attributes);
      ellipse_attribs.position = position;
      ellipse_attribs.rx = rx;
      ellipse_attribs.ry = ry;
      const ellipse = new Ellipse(this, ellipse_attribs);
      this.add(ellipse);
      return ellipse;
    }
    polygon(points = [], attributes = {}) {
      const polygon = new Polygon(this, points, attributes);
      this.add(polygon);
      return polygon;
    }
    rectangle(attributes) {
      const rect = new Rectangle(this, attributes);
      this.add(rect);
      return rect;
    }
    text(message, attributes) {
      const text = new Text(this, message, attributes);
      this.add(text);
      return text;
    }
    arrow(axis, attributes = {}) {
      const arrow = new Arrow(this, axis, attributes);
      this.add(arrow);
      return arrow;
    }
    curve(closed, ...anchors) {
      const curved = true;
      const curve = new Path(this, anchors, closed, curved);
      const bbox = curve.getBoundingBox();
      curve.center().position.set((bbox.left + bbox.right) / 2, (bbox.top + bbox.bottom) / 2);
      this.add(curve);
      return curve;
    }
    arc(x, y, innerRadius, outerRadius, startAngle, endAngle, resolution = Constants.Resolution) {
      const arcSegment = new ArcSegment(this, x, y, innerRadius, outerRadius, startAngle, endAngle, resolution);
      this.add(arcSegment);
      return arcSegment;
    }
    group(...shapes) {
      const group = new Group(this, shapes);
      this.add(group);
      return group;
    }
    // TODO
    /*
        interpret(svg: SVGElement, shallow?: boolean, add?: boolean): Group {
    
            const tag = svg.tagName.toLowerCase() as 'svg';
    
            add = (typeof add !== 'undefined') ? add : true;
    
            if (!(tag in read)) {
                return null;
            }
    
            const node = read[tag].call(this, svg);
    
            if (add) {
                this.add(shallow && node instanceof Group ? node.children : node);
            }
            else if (node.parent) {
                // Remove `g` tags that have been added to scenegraph / DOM
                // in order to be compatible with `getById` methods.
                node.remove();
            }
    
            return node;
    
        }
        */
    /*
        load(url: string): Promise<Group> {
            return new Promise<Group>((resolve, reject) => {
                const group = new Group(this);
                // let elem, i, child;
    
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const attach = (responseText: string) => {
                    // TODO
                    dom.temp.innerHTML = responseText;
    
                    for (i = 0; i < dom.temp.children.length; i++) {
                        elem = dom.temp.children[i];
                        child = this.interpret(elem, false, false);
                        if (child !== null) {
                            group.add(child);
                        }
                    }
    
                    if (typeof callback === 'function') {
                        const svg = dom.temp.children.length <= 1
                            ? dom.temp.children[0] : dom.temp.children;
                        callback(group, svg);
                    }
                };
    
                if (/\.svg$/i.test(url)) {
                    try {
                        xhr(url, attach);
                        resolve(group);
                    }
                    catch (e) {
                        reject(e);
                    }
                }
                else {
                    attach(url);
                    resolve(group);
                }
            });
        }
        */
  };
  var Fitter = class {
    #board;
    #view;
    #domElement;
    #target = null;
    #target_resize = null;
    constructor(board, view) {
      this.#board = board;
      this.#view = view;
      this.#domElement = view.domElement;
    }
    dispose() {
      this.unsubscribe();
    }
    is_bound() {
      return !!this.#target_resize;
    }
    /**
     * Idempotent subscribe to 'resize' events of the target.
     */
    subscribe() {
      this.unsubscribe();
      this.#target_resize = fromEvent(this.#target, "resize").pipe(debounceTime(200)).subscribe(() => {
        this.resize();
      });
    }
    /**
     * Idempotent unsubscribe from 'resize' events of the target.
     */
    unsubscribe() {
      if (this.#target_resize) {
        this.#target_resize.unsubscribe();
        this.#target_resize = null;
      }
    }
    has_target() {
      return !!this.#target;
    }
    set_target(target) {
      this.#target = target;
      if (this.is_target_body()) {
        document.body.style.overflow = "hidden";
        document.body.style.margin = "0";
        document.body.style.padding = "0";
        document.body.style.top = "0";
        document.body.style.left = "0";
        document.body.style.right = "0";
        document.body.style.bottom = "0";
        document.body.style.position = "fixed";
        this.#domElement.style.display = "block";
        this.#domElement.style.top = "0";
        this.#domElement.style.left = "0";
        this.#domElement.style.right = "0";
        this.#domElement.style.bottom = "0";
        this.#domElement.style.position = "fixed";
      }
      return this;
    }
    is_target_body() {
      return this.#target === document.body;
    }
    resize() {
      const board = this.#board;
      const size = this.#target.getBoundingClientRect();
      board.width = size.width;
      board.height = size.height;
      this.#view.setSize(size, board.ratio);
    }
  };
  function config_from_options(container, options) {
    const config2 = {
      resizeTo: compute_config_resize_to(container, options),
      size: compute_config_size(container, options)
    };
    return config2;
  }
  function compute_config_resize_to(container, options) {
    if (options.resizeTo) {
      return options.resizeTo;
    }
    return container;
  }
  function compute_config_size(container, options) {
    if (typeof options.size === "object") {
      return options.size;
    } else {
      if (container) {
        return null;
      } else {
        return { width: 640, height: 480 };
      }
    }
  }
  function get_container(elementOrId) {
    if (typeof elementOrId === "string") {
      return document.getElementById(elementOrId);
    } else {
      return elementOrId;
    }
  }
  function get_container_id(elementOrId) {
    if (typeof elementOrId === "string") {
      return elementOrId;
    } else {
      return elementOrId.id;
    }
  }
  function ellipse_attribs_from_point_attribs(attributes) {
    const retval = {
      id: attributes.id,
      fill: attributes.fill,
      fillOpacity: attributes.fillOpacity,
      // attitude: attributes.attitude,
      // position: attributes.position,
      stroke: attributes.stroke,
      strokeOpacity: attributes.strokeOpacity,
      strokeWidth: attributes.strokeWidth,
      visibility: attributes.visibility
    };
    return retval;
  }

  // src/main.ts
  document.addEventListener("DOMContentLoaded", function() {
    const board = new Board("my-board", {
      boundingBox: { left: -5, top: 5, right: 5, bottom: -5 }
    });
    const A = board.point([0, 0], { id: "A", visibility: "visible", fill: "red", stroke: "red" });
    const B = board.point([8, 0], { id: "B", visibility: "hidden" });
    const C = board.point([8, 4], { id: "C", visibility: "hidden" });
    const AB = B.position.__sub__(A.position);
    const AC = C.position.__sub__(A.position);
    const S = AC.normalize();
    const N = S.__mul__(G20.I);
    const ramp = board.polygon([A, B, C], { id: "ramp", opacity: 0.8 });
    ramp.fill = "rgba(0, 191, 168, 0.33)";
    ramp.stroke = "rgb(0, 191, 168)";
    ramp.strokeWidth = 2;
    ramp.center();
    const box = board.rectangle({ id: "box", width: 2, height: 1 });
    box.attitude.rotorFromDirections(AB, AC);
    box.fill = "rgba(255, 128, 0, 0.33)";
    box.stroke = "rgb(255, 128, 0)";
    box.strokeWidth = 2;
    box.position.copyVector(A.position).add(AC.__mul__(0.25)).add(N.__mul__(box.height / 2));
    const textA = board.text("A", {
      id: "text-A",
      anchor: "end",
      baseline: "middle",
      dx: -5,
      fontFamily: "Lato",
      fontSize: 20,
      opacity: 0.4,
      position: A.X
    });
    rescale(textA, board);
    const textB = board.text("B", {
      id: "text-B",
      anchor: "start",
      baseline: "middle",
      dx: 5,
      fontFamily: "Lato",
      fontSize: 20,
      opacity: 0.4,
      position: B.X
    });
    rescale(textB, board);
    const textC = board.text("C", {
      id: "text-C",
      anchor: "start",
      baseline: "middle",
      dx: 5,
      fontFamily: "Lato",
      fontSize: 20,
      opacity: 0.4,
      position: C.X
    });
    rescale(textC, board);
    const textD = board.text("Box", {
      id: "text-D",
      anchor: "middle",
      baseline: "middle",
      fontFamily: "Lato",
      fontSize: 20,
      position: box.X
    });
    textD.attitude.rotorFromDirections(AB, AC);
    rescale(textD, board);
    const textE = board.text("Ramp", {
      id: "text-E",
      anchor: "middle",
      baseline: "hanging",
      fontFamily: "Lato",
      fontSize: 20,
      position: ramp.X
    });
    textE.attitude.rotorFromDirections(AB, AC);
    rescale(textE, board);
    board.update();
    board.point([box.position.x, box.position.y], { id: "D", visibility: "hidden" });
    board.update();
    box.stroke = "#FFCC00";
    box.strokeWidth = 4;
    box.strokeOpacity = 0.6;
    box.fill = "#FFFF00";
    box.fillOpacity = 0.3;
    const Fg = board.arrow(G20.ey.scale(-2), {
      position: box.X,
      strokeWidth: 2
    });
    Fg.strokeOpacity = 0.4;
    const Fn = board.arrow(N.scale(1.5), {
      position: box.X,
      strokeOpacity: 0.4
    });
    Fn.strokeWidth = 2;
    const Fs = board.arrow(S.scale(1.5), {
      position: box.X
    });
    Fs.strokeOpacity = 0.4;
    Fs.strokeWidth = 2;
    const arrow = board.arrow(G20.ex.scale(1), {
      id: "arrow",
      strokeWidth: 4
    });
    arrow.axis = G20.ey;
    arrow.headLength = 0.25;
    arrow.origin = G20.ey.scale(1 / 2);
    box.position.copyVector(A.position).add(AC.__mul__(0.75)).add(N.__mul__(box.height / 2));
    window.onunload = function() {
      board.dispose();
    };
  });
  function rescale(text, board) {
    text.scaleXY.x = 1 / board.scaleXY.x;
    text.scaleXY.y = 1 / board.scaleXY.y;
  }
})();
//# sourceMappingURL=main.js.map
