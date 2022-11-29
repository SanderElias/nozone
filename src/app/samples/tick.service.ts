import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { scan } from 'rxjs/operators';

const newPrice = () => Math.random() * 500;
const tail = (arr: any[]) => arr[arr.length - 1];

@Injectable()
export class TickService {
    /**
     * ticks$ is a observer that returns
     * a array with the last 15 stock prices.
     * it starts of with a single price, and then
     * new prices move in from the end.
     */
    tickImmutable$ = interval(10).pipe(
        scan((priceArr: number[], n: number) => {
            const lastPrice = tail(priceArr) || newPrice();
            const newArr =
                priceArr.length > 14
                    ? priceArr.slice(1)
                    : priceArr;
            return [...newArr, this.nextVal(lastPrice, 0.5)];
        }, [])
    );

    /**
     * The same as the above, but instead use mutable array's instead of returning new ones.
     * it needs to be a function, otherwise all calls will get the same array.
     */
    tickMutable$ = () =>
        interval(10).pipe(
            scan((priceArr: number[], n: number) => {
                const lastPrice = tail(priceArr) || newPrice();
                if (priceArr.length > 14) { priceArr.shift(); }
                priceArr.push(this.nextVal(lastPrice, 0.5));
                return priceArr;
            }, [])
        );

    /**
     * this function calculates the next price.
     * according to the internets, this algorithm is a pretty
     * good mock for actual stock prices.
     * I'm not to sure, because I had to fix it. after a little while
     * it only gives stock prices below 0.20, which makes a boring graph.
     * @param oldPrice previous price to base the new on upon
     * @param volatility  value, to make it more or less random.
     */
    nextVal(oldPrice, volatility = Math.random()) {
        const rnd = Math.random(); // generate number, 0 <= x < 1.0
        let changePercent = 2 * volatility * rnd;
        if (changePercent > volatility) {
            changePercent -= 2 * volatility;
        }
        if (oldPrice < 0.2 ) {
            // fix to 'restart' the sequence once it hits below 0.2
            oldPrice = Math.random() * 500;
        }
        return Math.round((oldPrice + oldPrice * changePercent) * 100) / 100;
    }
}
