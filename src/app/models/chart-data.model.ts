export class ChartData {
    labels: Array<string> | undefined;
    dataSetLabel: string | undefined;
    dataSetValues: Array<string> | undefined;

    constructor(labels?: Array<string>,
        dataSetLabel?: string,
        dataSetValues?: Array<string>) {

        this.labels = labels != null ? labels : new Array<string>();
        this.dataSetLabel = dataSetLabel != null ? dataSetLabel : '';
        this.dataSetValues = dataSetValues != null ? labels : new Array<string>();
    }

}