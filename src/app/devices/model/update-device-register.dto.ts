export class UpdateDeviceRegisterDto {
    //validate로 Hex 검증
    temperatures: string;
    sereaiNumber: string;
    registeredAt: Date;
    interval: number;
    
}