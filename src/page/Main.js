import {Caserola} from "./platforms/Caserola";
import {SushiTerra} from "./platforms/SushiTerra";
import {TakeAway} from "./platforms/TakeAway";
import {FoodPanda} from "./platforms/FoodPanda";



window.addEventListener("foodMessage", event => {
    const getMerchantOrder = () => {
        return window.location.host === "www.caserola.ro" ? Caserola :
            window.location.host === "sushi-terra.ro" ? SushiTerra :
            window.location.host === "www.foodpanda.ro" ? FoodPanda : TakeAway;
    };

    event = event.detail;
    if (event.type === "order") {
        getMerchantOrder().getInstance().order(event.value);
    } else if (event.type === "fillOrder") {
        getMerchantOrder().getInstance().fillOrder();
    }
});