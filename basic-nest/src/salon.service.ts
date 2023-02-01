import { Injectable, Scope } from '@nestjs/common';

interface SalonServiceParamas {
  salonKey: string;
  employeeKey: string;
  userKey: string;
  userPhone: string;
}

/**
 * @desc
 * SingleTon Instance의 장점
 * 인스턴스가 상태를 저장하지 않을때, Observing의 용이하다.
 */
@Injectable({ scope: Scope.REQUEST })
export class SalonService {
  retrieve(params: SalonServiceParamas) {}

  update() {}

  delete() {}
}
