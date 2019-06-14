import {BasePlatform} from "./BasePlatform";

export class Caserola extends BasePlatform{
    getDishes() {
        const elements = document.querySelectorAll(".product");
        return [...elements].map(element => {
            return {
                element,
                title: element.querySelector(".product-title").innerText.trim().toLowerCase(),
                price: parseFloat(element.querySelector('.subsection-price>:first-child').innerText.replace(",","."))
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
            item.element.querySelector(".add-to-cart-button").click();
            total += item.price;
            console.log(total);
        }, 1000);
    }
}