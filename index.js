function calculateOrder(scannedItems) {
    const items = [];
    let googlePrice = 49.99, macPrice = 5399.99, alexaPrice = 109.50, rasberryPrice = 30;

    items.push(
        {sku: '120P90', name: 'Google Home', price: googlePrice, qty: 10, promo: 'buy3pay2', freeSku: ''},
        {sku: '43N23P', name: 'Macbook Pro', price: macPrice, qty: 5, promo: 'freerasberry', freeSku: '234234'},
        {sku: 'A304SD', name: 'Alexa Speaker', price: alexaPrice, qty: 10, promo: 'buymorethan3discount10percent', freeSku: ''},
        {sku: '234234', name: 'Rasberry Pi B', price: rasberryPrice, qty: 2, promo: 'unavailable', freeSku: ''},
    );
    
    const orders = scannedItems.split(',');
    let total = 0;
    let countGoogleHome = 0;
    let countAlexa = 0;

    if (orders && orders.length > 0) {   
        for (let i = 0; i < orders.length; i++) {
            let item = items.find((obj) => obj.name === removeFirstSpace(orders[i]));

            if (item.promo === 'freerasberry') {
                if (orders[i+1]) {
                    let freeItem = items.find((i) => i.sku === item.freeSku);
                    freeItem.price = 0;
                }                
            }

            if (item.promo === 'buy3pay2') {
                countGoogleHome += 1;

                if (countGoogleHome > 2) {
                    if (i === orders.length - 1) {
                        item.price = 0;
                    }
                }
            }

            if (item.promo === 'buymorethan3discount10percent') {
                countAlexa += 1;
            }

            total += item.price;
        }

        if (countAlexa > 2) {
            total = total - (total * 10 / 100);
        }     
    }

    return total;
}

function removeFirstSpace(text) {
    if(text && text[0] === ' ') {
        return text.substring(1, text.length);
    }

    return text;
}

console.log('\nRunning test from index.js \n');

let scannedItems = 'Macbook Pro, Rasberry Pi B, Macbook Pro, Rasberry Pi B';
let total = calculateOrder(scannedItems);

console.log('Scanned Items:', scannedItems);
console.log('Total:', total);
console.log('Expected:', 5399.99 * 2);

scannedItems = 'Google Home, Google Home, Google Home';
total = calculateOrder(scannedItems);

console.log('\nScanned Items:', scannedItems);
console.log('Total:', total);
console.log('Expected:', 49.99 * 2);

scannedItems = 'Alexa Speaker, Alexa Speaker, Alexa Speaker, Alexa Speaker';
total = calculateOrder(scannedItems);

console.log('\nScanned Items:', scannedItems);
console.log('Total:', total);
console.log('Expected:', (109.50 * 4) - (109.50 * 4 * 10 / 100));
console.log();

module.exports = { calculateOrder };