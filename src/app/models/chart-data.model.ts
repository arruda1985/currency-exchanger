export class ChartData {
    labes: Array<string>;
    dataSetLabel: string;
    dataSetValues: Array<string>

    constructor(labels: Array<string>,
        dataSetLabel: string,
        dataSetValues: Array<string>) {
        this.labes = labels;
        this.dataSetLabel = dataSetLabel;
        this.dataSetValues = dataSetValues;
    }
}