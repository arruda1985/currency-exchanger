export class PopularCards {
    public currency: string | undefined;
    public value: number | undefined;

    constructor(currency: string, value: number) {
        this.currency = currency;
        this.value = value;

    }
}