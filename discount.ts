///<reference path="node_modules/@types/jquery/index.d.ts" />

// 折扣介面
interface IDiscount{
    GetDiscount(price:number, qty:number):number;
}

// VIP會員折扣
class VIPDiscount implements IDiscount{
    GetDiscount(price:number, qty:number){
        if(price*qty >= 500){
            return 0.8;
        }
        else{
            return 1;
        }
    }
}

// 一般會員折扣
class NormalDiscount implements IDiscount{
    GetDiscount(price:number, qty:number){
        if(price*qty>=1000 && qty>3){
            return 0.85;
        }
        else{
            return 1;
        }
    }
}

// 會員階級列舉
enum Level{
    VIP = 0,
    Normal = 1
}

//計算價錢
class Calculate{
    Calculate(price:number, qty:number, level:Level):number{
        let totalPrice = price * qty;
        
        if(level == Level.VIP){
            var vipDiscount = new VIPDiscount();
            totalPrice *= vipDiscount.GetDiscount(price, qty);
            return totalPrice;
        }
        else if(level == Level.Normal){
            var normalDiscount = new NormalDiscount();
            totalPrice *= normalDiscount.GetDiscount(price, qty);
            return totalPrice;
        }
        else{
            return totalPrice;
        }
    }
}

//測試計算邏輯
let calculate = new Calculate();
let finalPrice:number;

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