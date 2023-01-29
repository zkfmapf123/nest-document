import { alias, serializable, serialize } from 'serializr';

/**
 * [ ] Optional 처리
 * [ ] Serialize
 * [ ] Deserialize
 * [ ] 각 필드의 대한 제한처리...
 */
export class DonggyuDto {
  @serializable(alias('salon_key')) salonKey: string;
  @serializable(alias('employee_key')) employeeKey: string;
  @serializable(alias('customer_key')) customerKey: string;
  @serializable(alias('event_key')) eventKey: string;

  getProperty(data: any, response = null) {
    if (!data) return response;
    return data;
  }

  constructor(data: any = {}) {
    this.salonKey = this.getProperty(data?.salon_key);
    this.employeeKey = this.getProperty(data?.employee_key);
    this.customerKey = this.getProperty(data?.customer_key);
    this.customerKey = this.getProperty(data?.event_key);
  }

  toDict() {
    return serialize(this);
  }
}
