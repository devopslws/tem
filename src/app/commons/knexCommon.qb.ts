import { Knex } from 'knex';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';

//1. repo계층에서 반복적인 예외처리를 감춘다.
//2. IDE타입 추론의 취약점인 경계 지점에서 타입확정 가능 하도록 보장
export abstract class KnexCommonBuilder {
    //QB끼리 의존하는 경우는 없으니 괜찮을듯?
    constructor(@Inject('knex') protected readonly knex: Knex) {}

    /** 값 있는지 확인 */
    protected checkSingleResult <T>(result: T | undefined, keyword?: string):T {
        if (result !== undefined && result !== null) {
            return result;
        } else {
            throw new BadRequestException(`${keyword? keyword:''} 조회 결과가 없습니다`);
        }
    }

    /** QB도 넣어서 쿼리빌드 까지 공통화 하려 했는데 그러면 지네릭스의 타입 추론을 받지 못한다. 단순 결과만 */
    protected checkIsExist <T>(result: T | undefined): boolean {
        return (result !== undefined && result !== null) ? true: false;
    }
}