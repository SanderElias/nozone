import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { scan } from 'rxjs/operators';

@Injectable()
export class TickService {
    /**
     * ticks$ is a observer that returns
     * a array with the last 15 stock prices.
     * it starts of with a single price, and then
     * new prices move in from the end.
     */
    tick$ = interval(10).pipe(
        scan((priceArr: number[], n: number) => {
            const lastPrice =
                priceArr.length === 0
                    ? Math.random() * 500
                    : priceArr[priceArr.length - 1];
            const newArr =
                priceArr.length > 14
                    ? priceArr.slice(1, priceArr.length)
                    : priceArr;
            return [...newArr, this.nextVal(lastPrice, 0.5)];
        }, [])
        // tap(arr => console.log(arr[arr.length - 1]))
    );

    tickMutable$ = () =>
        interval(2).pipe(
            scan((priceArr: number[], n: number) => {
                const lastPrice =
                    priceArr.length === 0
                        ? Math.random() * 500
                        : priceArr[priceArr.length - 1];
                if (priceArr.push(this.nextVal(lastPrice)) > 15) {
                    priceArr.shift();
                }
                // console.log(priceArr);
                return priceArr;
            }, [])
            // tap(arr => console.log(arr[arr.length - 1]))
        );
    constructor() {}

    /**
     * this function calculates the next price.
     * accouring to the internets, this algorithm is a pretty
     * good mock for actual stockprices.
     * I'm not to sure, because I had to fix it. ater a little while
     * it only gives stock prices below 0.20, which makes a boring graph.
     * @param oldPrice previous price to bacse the new on upon
     * @param volatility  value, to make it more or less random.
     */
    nextVal(oldPrice, volatility = Math.random()) {
        const rnd = Math.random(); // generate number, 0 <= x < 1.0
        let changePercent = 2 * volatility * rnd;
        if (changePercent > volatility) {
            changePercent -= 2 * volatility;
        }
        if (oldPrice < 0.2) {
            // fix to 'restart' the sequence once it hits below 0.2
            oldPrice = Math.random() * 500;
        }
        return Math.round((oldPrice + oldPrice * changePercent) * 100) / 100;
    }
}
