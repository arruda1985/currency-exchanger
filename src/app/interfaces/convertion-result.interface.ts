import { IInfo } from "./info.interface";
import { IResultQuery } from "./result-query.interface";

export interface IConvertionResult {
    result: number;
    query: IResultQuery
    info: IInfo
}