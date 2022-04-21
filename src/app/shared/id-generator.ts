import { getTime } from 'date-fns';

export function idGenerator() {
  return getTime(new Date());
}
