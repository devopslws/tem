import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class TrimStringsPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value === 'string') {
      return value.trim().replace(/;+$/g, '');;
    }

    if (typeof value === 'object' && value !== null) {
      return this.trimObject(value);
    }

    return value;
  }

  private trimObject(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map((v) => (typeof v === 'string' ? v.trim() : v));
    }
    const result = {};
    for (const key in obj) {
      const val = obj[key];
      if (typeof val === 'string') {
        result[key] = val.trim();
      } else {
        result[key] = val;
      }
    }
    return result;
  }
}
