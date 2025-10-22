export class InsertTemperatureValueReqDto {
    //validate로 Hex 검증
    temperatures: string;
    sereaiNumber: string;
    //음? 다른건 timestamp 서식인데 이건 T가 없네? 음.. 맨 처음 mapping시에 자동으로 타입을 일치 하도록 만들어주자 T 포함으로
    //데이터 들어가고 정리 하면 골치 아파짐
    registeredAt: Date; 
    interval: number;
    
}