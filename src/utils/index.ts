import moment from 'moment';

/**
 * Date Converting
 * ---------------------------------------------------------------------------------------------------------------------
 *
 * @param momentDate : Date Value
 */
export function convertDateToString(momentDate: any) {
  return moment(momentDate).format('YYYY-MM-DD');
}

/**
 * Date Converting
 * ---------------------------------------------------------------------------------------------------------------------
 *
 * @param momentDate : Object Value
 */
export function convertDateMonthToString(momentDate: any) {
  return moment(momentDate).format('YYYY-MM');
}

/**
 * DateTime Converting
 * ---------------------------------------------------------------------------------------------------------------------
 *
 * @param momentDate : Date Value
 */
export function convertDateTimeToString(momentDate: any) {
  return moment(momentDate).format('YYYY-MM-DD HH:mm');
}

/**
 * 콤마찍기
 * ---------------------------------------------------------------------------------------------------------------------
 *
 * @param number : Object Value
 */
export function numberWithCommas(number: number) {
  try {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } catch (e) {
    return '0';
  }
}

/**
 * Calendar How Many Weeks
 * Weeks start on Another
 * ---------------------------------------------------------------------------------------------------------------------
 */
export function weeks(year: number, month: number) {
  let firstDay = new Date(year, month, 1).getDay(); //## 1일의 요일
  let lastDay = new Date(year, month + 1, 0).getDate(); //## 마지막 날짜

  return Math.ceil((firstDay + lastDay) / 7);
}

/**
 * Calendar Weeks length
 * ---------------------------------------------------------------------------------------------------------------------
 */
export function lastWeek(date: any) {
  let lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return Math.ceil(lastDate.getDate() / 7);
}
