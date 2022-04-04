import { inRange } from 'lodash';

export const isStatusCodeSuccess = (statusCode: number): boolean => inRange(statusCode, 200, 300); //[200,300)
