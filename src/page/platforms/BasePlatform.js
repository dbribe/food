import {levenshtein} from "../Utils";

export class BasePlatform {
    dishes = [];
    mismatches = [];

    // Format of the array should be {element, title, price}
    getDishes() {
        return [];
    }

    findItem(str) {
        let dish, bestScore = 1e6;
        for (let i = 0; i < this.dishes.length; i += 1) {
            const score = (levenshtein(str, this.dishes[i].title) + Math.abs(str.length - this.dishes[i].title.length)) / (str.length + this.dishes[i].title.length);
            if (score < bestScore) {
                bestScore = score;
                dish = this.dishes[i];
            }
        }
        if (bestScore > .25) {
            console.warn("Mismatch", str, bestScore);
            this.mismatches.push(str.trim());
            return null;
        }
        return dish;
    }

    order(data) {
        this.mismatches = [];
        this.dishes = this.getDishes();
        let total = 0;
        let itemsToOrder = [];
        for (const person of data.split`\n`) {
            let str = person.trim().toLowerCase().split(/\s+/).slice(1).join` `;
            let personOrder = person.trim().split(/\s+/)[0];
            let matchPriceWithSpace = str.match(/- \d+/);
            let matchPriceNoSpace = str.match(/-\d+/);
            if (matchPriceWithSpace) {
                str = str.slice(0,matchPriceWithSpace.index);
            }
            if (matchPriceNoSpace) {
                str = str.slice(0,matchPriceNoSpace.index);
            }
            let totalCost = 0;
            let personItems = [];
            for (const item of str.split`+`) {
                if (item.trim() === "") {
                    continue;
                }
                let times = parseInt(item);
                let itemStr = item;
                if (isNaN(times)) {
                    times = 1;
                }
                const extraMatch = item.match(/\(.*\)/);
                let extra;
                if (extraMatch) {
                    extra = extraMatch[0];
                    itemStr = itemStr.slice(0, extraMatch.index)
                }
                const itemToOrder = this.findItem(itemStr);
                if (!itemToOrder) {
                    continue;
                }
                totalCost += times * itemToOrder.price;

                for (let j = 0; j < times; j += 1) {
                    personItems.push(itemToOrder.title + (extra ? "(" + extra + ")" : ""));
                    itemsToOrder.push(itemToOrder);
                }
            }
            console.log(personOrder, personItems.join` + `, totalCost);
        }

        this.orderItems(itemsToOrder);
    }

    showMismatches() {
        if (this.mismatches.length) {
            alert("Mismatched dishes:\n• " + this.mismatches.join("\n• ") + "\nPlease order these items manually.");
        } else {
            alert("No mismatches :). You can continue safely.");
        }
    }

    orderItems() {}

    fillOrder() {}

    static getInstance() {
        if (!this.instance) {
            this.instance= new this();
        }
        return this.instance;
    }
}