import {BasePlatform} from "./BasePlatform";
import {config} from "../config";

export class TakeAway extends BasePlatform {
    getDishes() {
        const elements = document.querySelectorAll(".meal");
        return [...elements].map(element => {
            return {
                element,
                title: element.querySelector(".meal-name").innerText.trim().toLowerCase(),
                price: parseFloat(element.querySelector('.meal__price').innerText.replace(",","."))
            }
        });
    }

    orderItems(itemsToOrder) {
        let index = -1;
        let total = 0;
        const intervalOrder = setInterval(() => {
            index++;
            if (index == itemsToOrder.length) {
                clearInterval(intervalOrder);
            }
            const item = itemsToOrder[index];
            item.element.click();
            total += item.price;
            console.log(total);
            setTimeout(() => {
                if (parseFloat(document.querySelector(".btn-cart-price").innerText.replace(",",".")) != total.toFixed(2)) {
                    item.element.querySelector(".cartbutton-button-sidedishes").click();
                }
            }, 1400);
        }, 2000);
    }

    fillOrder() {
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
}