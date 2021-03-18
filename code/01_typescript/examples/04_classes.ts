class Waldo {
    public doStuff(things: Foobar): Foobar { return }

    private iterateNumber(num: number) {
        return num + 1;
    }

    private addExclamationPoint(str: string) {
        return `${str}!`;
    }
}

const testWaldo = new Waldo(); // Create a Waldo instance
testWaldo.iterateNumber(2); // Error!