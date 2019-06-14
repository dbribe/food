import {Caserola} from "./platforms/Caserola";
import {SushiTerra} from "./platforms/SushiTerra";
import {TakeAway} from "./platforms/TakeAway";



window.addEventListener("foodMessage", event => {
    const getMerchantOrder = () => {
        return window.location.host === "www.caserola.ro" ? Caserola :
            window.location.host === "sushi-terra.ro" ? SushiTerra : TakeAway;
    };

    event = event.detail;
    if (event.type === "order") {
        getMerchantOrder().getInstance().order(event.value);
    } else if (event.type === "fillOrder") {
        getMerchantOrder().getInstance().fillOrder();
    }
});