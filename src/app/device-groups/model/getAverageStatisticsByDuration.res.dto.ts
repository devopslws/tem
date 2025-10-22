import { LargeNumberLike } from "crypto";

export class GetAverageStatisticsByDurationResDto {
    id: number;
    serialNumber: string;
    averageTemperature: number;
    maxTemperature: number;
    minTemperature: number;
    mkt: number; //무슨 값일까?
}
