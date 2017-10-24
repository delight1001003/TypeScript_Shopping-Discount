"use strict";
///<reference path="node_modules/@types/jquery/index.d.ts" />
// VIP會員折扣
var VIPDiscount = /** @class */ (function () {
    function VIPDiscount() {
    }
    VIPDiscount.prototype.GetDiscount = function (price, qty) {
        if (price * qty >= 500) {
            return 0.8;
        }
        else {
            return 1;
        }
    };
    return VIPDiscount;
}());
// 一般會員折扣
var NormalDiscount = /** @class */ (function () {
    function NormalDiscount() {
    }
    NormalDiscount.prototype.GetDiscount = function (price, qty) {
        if (price * qty >= 1000 && qty > 3) {
            return 0.85;
        }
        else {
            return 1;
        }
    };
    return NormalDiscount;
}());
// 會員階級列舉
var Level;
(function (Level) {
    Level[Level["VIP"] = 0] = "VIP";
    Level[Level["Normal"] = 1] = "Normal";
})(Level || (Level = {}));
//計算價錢
var Calculate = /** @class */ (function () {
    function Calculate() {
    }
    Calculate.prototype.Calculate = function (price, qty, level) {
        var totalPrice = price * qty;
        if (level == Level.VIP) {
            var vipDiscount = new VIPDiscount();
            totalPrice *= vipDiscount.GetDiscount(price, qty);
            return totalPrice;
        }
        else if (level == Level.Normal) {
            var normalDiscount = new NormalDiscount();
            totalPrice *= normalDiscount.GetDiscount(price, qty);
            return totalPrice;
        }
        else {
            return totalPrice;
        }
    };
    return Calculate;
}());
//測試計算邏輯
var calculate = new Calculate();
var finalPrice;
//400
finalPrice = calculate.Calculate(50, 8, Level.VIP);
console.log(finalPrice);
//200
finalPrice = calculate.Calculate(200, 1, Level.VIP);
console.log(finalPrice);
//720
finalPrice = calculate.Calculate(900, 1, Level.VIP);
console.log(finalPrice);
//5000
finalPrice = calculate.Calculate(2500, 2, Level.Normal);
console.log(finalPrice);
//1700
finalPrice = calculate.Calculate(500, 4, Level.Normal);
console.log(finalPrice);
//360
finalPrice = calculate.Calculate(60, 6, Level.Normal);
console.log(finalPrice);
//# sourceMappingURL=discount.js.map