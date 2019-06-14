import {BasePlatform} from "./BasePlatform";
import {config} from "../config";

export class SushiTerra extends BasePlatform {
    getDishes() {
        const elements = document.querySelectorAll(".product");
        return [...elements].map(element => {
            return {
                element: element,
                title: element.querySelector(".desc>h4>a").innerText.trim().toLowerCase(),
                price: parseFloat(element.querySelector('.price .amount').innerText.replace(",","."))
            }
        });
    }

    orderItems(itemsToOrder) {
        let total = 0;
        let index = -1;
        const intervalOrder = setInterval(() => {
            index++;
            if (index == itemsToOrder.length) {
                clearInterval(intervalOrder);
            }
            const item = itemsToOrder[index];
            item.element.querySelector(".add_to_cart_button").click();
            total += item.price;
            console.log(total);
        }, 1000);
    }

    fillOrder() {
        document.querySelector("#billing_address_1").value =  config.street + config.number + config.block;
        document.querySelector("#billing_address_2").value = config.stairs + config.floor;
        document.querySelector("#billing_first_name").value = config.firstName;
        document.querySelector("#billing_last_name").value = config.lastName;
        document.querySelector("#billing_email").value = config.email;
        document.querySelector("#billing_phone").value = config.phone;
        document.querySelector("#billing_city").value = config.city;
        document.querySelector(`[name="terms"]`).click()
    }
}