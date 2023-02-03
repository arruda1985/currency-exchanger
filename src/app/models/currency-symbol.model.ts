import { ISymbol } from "../interfaces/symbol.interface";

export class CurrencySymbol implements ISymbol {
    id: string;
    name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
}