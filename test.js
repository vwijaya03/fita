const { calculateOrder } = require('./index');

xit('buy mac free rasberry pi', () => {
    const scannedItems = 'Macbook Pro, Rasberry Pi B, Macbook Pro, Rasberry Pi B, Rasberry Pi B';
    const total = calculateOrder(scannedItems);

    expect(total).toBe(5399.99 * 2);
});

it('buy 3 pay 2', () => {
    const scannedItems = 'Google Home, Google Home, Google Home';
    const total = calculateOrder(scannedItems);

    expect(total).toBe(49.99 * 2);
});

xit('buy 3 discount 10%', () => {
    const scannedItems = 'Alexa Speaker, Alexa Speaker, Alexa Speaker, Alexa Speaker';
    const total = calculateOrder(scannedItems);

    // console.log('total', total);
    expect(total).toBe( (109.50 * 4) - (109.50 * 4 * 10 / 100) );
});