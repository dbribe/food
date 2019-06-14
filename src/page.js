(function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _taggedTemplateLiteral(strings, raw) {
    if (!raw) {
      raw = strings.slice(0);
    }

    return Object.freeze(Object.defineProperties(strings, {
      raw: {
        value: Object.freeze(raw)
      }
    }));
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var levenshtein = function levenshtein(a, b) {
    if (!a || !b) return (a || b).length;
    var m = [];

    for (var i = 0; i <= b.length; i++) {
      m[i] = [i];
      if (i === 0) continue;

      for (var j = 0; j <= a.length; j++) {
        m[0][j] = j;
        if (j === 0) continue;
        m[i][j] = b.charAt(i - 1) == a.charAt(j - 1) ? m[i - 1][j - 1] : Math.min(m[i - 1][j - 1] + 1, m[i][j - 1] + 1, m[i - 1][j] + 1);
      }
    }

    return m[b.length][a.length];
  };

  function _templateObject4() {
    var data = _taggedTemplateLiteral(["+"]);

    _templateObject4 = function _templateObject4() {
      return data;
    };

    return data;
  }

  function _templateObject3() {
    var data = _taggedTemplateLiteral([" + "]);

    _templateObject3 = function _templateObject3() {
      return data;
    };

    return data;
  }

  function _templateObject2() {
    var data = _taggedTemplateLiteral([" "]);

    _templateObject2 = function _templateObject2() {
      return data;
    };

    return data;
  }

  function _templateObject() {
    var data = _taggedTemplateLiteral(["\n"], ["\\n"]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }
  var BasePlatform =
  /*#__PURE__*/
  function () {
    function BasePlatform() {
      _classCallCheck(this, BasePlatform);

      this.dishes = [];
    }

    _createClass(BasePlatform, [{
      key: "getDishes",
      // Format of the array should be {element, title, price}
      value: function getDishes() {
        return [];
      }
    }, {
      key: "findItem",
      value: function findItem(str) {
        var dish,
            bestScore = 1e6;

        for (var i = 0; i < this.dishes.length; i += 1) {
          var score = (levenshtein(str, this.dishes[i].title) + Math.abs(str.length - this.dishes[i].title.length)) / (str.length + this.dishes[i].title.length);

          if (score < bestScore) {
            bestScore = score;
            dish = this.dishes[i];
          }
        }

        if (bestScore > .25) {
          console.warn("Mismatch", str, bestScore);
          return null;
        }

        return dish;
      }
    }, {
      key: "order",
      value: function order(data) {
        this.dishes = this.getDishes();
        var itemsToOrder = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = data.split(_templateObject())[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var person = _step.value;
            var str = person.trim().toLowerCase().split(/\s+/).slice(1).join(_templateObject2());
            var personOrder = person.trim().split(/\s+/)[0];
            var matchPriceWithSpace = str.match(/- \d+/);
            var matchPriceNoSpace = str.match(/-\d+/);

            if (matchPriceWithSpace) {
              str = str.slice(0, matchPriceWithSpace.index);
            }

            if (matchPriceNoSpace) {
              str = str.slice(0, matchPriceNoSpace.index);
            }

            var totalCost = 0;
            var personItems = [];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = str.split(_templateObject4())[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var item = _step2.value;

                if (item.trim() === "") {
                  continue;
                }

                var times = parseInt(item);
                var itemStr = item;

                if (isNaN(times)) {
                  times = 1;
                }

                var extraMatch = item.match(/\(.*\)/);
                var extra = void 0;

                if (extraMatch) {
                  extra = extraMatch[0];
                  itemStr = itemStr.slice(0, extraMatch.index);
                }

                var itemToOrder = this.findItem(itemStr);

                if (!itemToOrder) {
                  continue;
                }

                totalCost += times * itemToOrder.price;

                for (var j = 0; j < times; j += 1) {
                  personItems.push(itemToOrder.title + (extra ? "(" + extra + ")" : ""));
                  itemsToOrder.push(itemToOrder);
                }
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                  _iterator2.return();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }

            console.log(personOrder, personItems.join(_templateObject3()), totalCost);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        this.orderItems(itemsToOrder);
      }
    }, {
      key: "orderItems",
      value: function orderItems() {}
    }, {
      key: "fillOrder",
      value: function fillOrder() {}
    }], [{
      key: "getInstance",
      value: function getInstance() {
        if (!this.instance) {
          this.instance = new this();
        }

        return this.instance;
      }
    }]);

    return BasePlatform;
  }();

  var Caserola =
  /*#__PURE__*/
  function (_BasePlatform) {
    _inherits(Caserola, _BasePlatform);

    function Caserola() {
      _classCallCheck(this, Caserola);

      return _possibleConstructorReturn(this, _getPrototypeOf(Caserola).apply(this, arguments));
    }

    _createClass(Caserola, [{
      key: "getDishes",
      value: function getDishes() {
        var elements = document.querySelectorAll(".product");
        return _toConsumableArray(elements).map(function (element) {
          return {
            element: element,
            title: element.querySelector(".product-title").innerText.trim().toLowerCase(),
            price: parseFloat(element.querySelector('.subsection-price>:first-child').innerText.replace(",", "."))
          };
        });
      }
    }, {
      key: "orderItems",
      value: function orderItems(itemsToOrder) {
        var total = 0;
        var index = -1;
        var intervalOrder = setInterval(function () {
          index++;

          if (index == itemsToOrder.length) {
            clearInterval(intervalOrder);
          }

          var item = itemsToOrder[index];
          item.element.querySelector(".add-to-cart-button").click();
          total += item.price;
          console.log(total);
        }, 1000);
      }
    }]);

    return Caserola;
  }(BasePlatform);

  var config = {
    "city": "Bucuresti ",
    "sector": "Sector 1 ",
    "postalCode": "Cod postal: 010073 ",
    "street": "Calea Victoriei ",
    "number": "155 ",
    "block": "Bloc D1 ",
    "stairs": "Tronson 7 ",
    "floor": "Etaj 8 ",
    "apt": "Apt A8 ",
    "intercom": "-",
    "firstName": "Andrei ",
    "lastName": "Popescu ",
    "phone": "0771799018",
    "email": "csafood123@gmail.com"
  };

  var SushiTerra =
  /*#__PURE__*/
  function (_BasePlatform) {
    _inherits(SushiTerra, _BasePlatform);

    function SushiTerra() {
      _classCallCheck(this, SushiTerra);

      return _possibleConstructorReturn(this, _getPrototypeOf(SushiTerra).apply(this, arguments));
    }

    _createClass(SushiTerra, [{
      key: "getDishes",
      value: function getDishes() {
        var elements = document.querySelectorAll(".product");
        return _toConsumableArray(elements).map(function (element) {
          return {
            element: element,
            title: element.querySelector(".desc>h4>a").innerText.trim().toLowerCase(),
            price: parseFloat(element.querySelector('.price .amount').innerText.replace(",", "."))
          };
        });
      }
    }, {
      key: "orderItems",
      value: function orderItems(itemsToOrder) {
        var total = 0;
        var index = -1;
        var intervalOrder = setInterval(function () {
          index++;

          if (index == itemsToOrder.length) {
            clearInterval(intervalOrder);
          }

          var item = itemsToOrder[index];
          item.element.querySelector(".add_to_cart_button").click();
          total += item.price;
          console.log(total);
        }, 0);
      }
    }, {
      key: "fillOrder",
      value: function fillOrder() {
        document.querySelector("#billing_address_1").value = config.street + config.number + config.block;
        document.querySelector("#billing_address_2").value = config.stairs + config.floor;
        document.querySelector("#billing_first_name").value = config.firstName;
        document.querySelector("#billing_last_name").value = config.lastName;
        document.querySelector("#billing_email").value = config.email;
        document.querySelector("#billing_phone").value = config.phone;
        document.querySelector("#billing_city").value = config.city;
      }
    }]);

    return SushiTerra;
  }(BasePlatform);

  var TakeAway =
  /*#__PURE__*/
  function (_BasePlatform) {
    _inherits(TakeAway, _BasePlatform);

    function TakeAway() {
      _classCallCheck(this, TakeAway);

      return _possibleConstructorReturn(this, _getPrototypeOf(TakeAway).apply(this, arguments));
    }

    _createClass(TakeAway, [{
      key: "getDishes",
      value: function getDishes() {
        var elements = document.querySelectorAll(".meal");
        return _toConsumableArray(elements).map(function (element) {
          return {
            element: element,
            title: element.querySelector(".meal-name").innerText.trim().toLowerCase(),
            price: parseFloat(element.querySelector('.meal__price').innerText.replace(",", "."))
          };
        });
      }
    }, {
      key: "orderItems",
      value: function orderItems(itemsToOrder) {
        var index = -1;
        var total = 0;
        var intervalOrder = setInterval(function () {
          index++;

          if (index == itemsToOrder.length) {
            clearInterval(intervalOrder);
          }

          var item = itemsToOrder[index];
          item.element.click();
          total += item.price;
          console.log(total);
          setTimeout(function () {
            if (parseFloat(document.querySelector(".btn-cart-price").innerText.replace(",", ".")) != total.toFixed(2)) {
              item.element.querySelector(".cartbutton-button-sidedishes").click();
            }
          }, 1400);
        }, 2000);
      }
    }, {
      key: "fillOrder",
      value: function fillOrder() {
        document.querySelector("#iaddress").value = config.street + config.number;
        document.querySelector("#iblock").value = config.block;
        document.querySelector("#ientrance").value = config.stairs;
        document.querySelector("#ifloor").value = config.floor;
        document.querySelector("#iapartmentname").value = config.apt;
        document.querySelector("#iintercom").value = config.intercom;
        document.querySelector("#isurname").value = config.firstName + config.lastName;
        document.querySelector("#iphonenumber").value = config.phone;
        document.querySelector("#ipaymentmethods > div.paymentbuttonwrapper.payment-method-type-online.paymentmethod31_2.paymentbuttonchecked").click();
      }
    }]);

    return TakeAway;
  }(BasePlatform);

  window.addEventListener("foodMessage", function (event) {
    var getMerchantOrder = function getMerchantOrder() {
      return window.location.host === "www.caserola.ro" ? Caserola : window.location.host === "sushi-terra.ro" ? SushiTerra : TakeAway;
    };

    event = event.detail;

    if (event.type === "order") {
      getMerchantOrder().getInstance().order(event.value);
    } else if (event.type === "fillOrder") {
      getMerchantOrder().getInstance().fillOrder();
    }
  });

}());
//# sourceMappingURL=page.js.map
