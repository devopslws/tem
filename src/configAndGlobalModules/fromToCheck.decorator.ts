import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsAfterFrom(
  targetField: string, // 검사할 기준 필드명 (ex. 'from')
  message?: string,    // 커스텀 메시지 (ex. 'to must be after from')
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isAfterFrom',
      target: object.constructor,
      propertyName,
      constraints: [targetField, message],
      options: { message }, // class-validator 내부 표준 메시지 필드에도 넣어줌 (optional)
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [targetFieldName] = args.constraints;
          const fromValue = (args.object as any)[targetFieldName];

          if (fromValue == null || value == null) return true; // null 허용
          const fromDate = new Date(fromValue);
          const toDate = new Date(value);
          if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) return false;

          return fromDate.getTime() <= toDate.getTime();
        },
        defaultMessage(args: ValidationArguments) {
          const [, customMessage] = args.constraints;
          // customMessage가 있으면 그대로, 없으면 기본 메시지
          if (customMessage) return customMessage;

          const [targetFieldName] = args.constraints;
          return `${args.property} must be after or equal to ${targetFieldName}`;
        },
      },
    });
  };
}
