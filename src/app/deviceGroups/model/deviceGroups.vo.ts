//dto는 조회 1건당 1쌍, entity는 테이블당 하나지만 vo는 select 조회시 마다 매번 다르게 만들어진다.
// 파일이 너무 많으면 관리가 안되니 vo는 하나의 파일 + 인터페이스로 관리하자
export interface getAverageStatisticsByDurationRtn {
    averageTemperature: number;
    maxTemperature: number;
    minTemperature: number;
    mkt: string
}
     