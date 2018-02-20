import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

const FORMAT = 'YYYY-MM-DD HH:mm:ss';

// http://momentjs.com/docs/#/manipulating/add/
const UNIT = {
  years: 'y',
  quarters: 'Q',
  months: 'M',
  weeks: 'w',
  days: 'd',
  hours: 'h',
  minutes: 'm',
  seconds: 's',
  milliseconds: 'ms',
};

const shouldProceed = (range, unit) => {
  const divisions = Array.from(range.by(unit));
  return divisions.length >= 0;
};

const checkDecades = range => {
  const years = Array.from(range.by(UNIT.years));

  if (years.length < 10) {
    return false;
  }
  // quarters of range
  const num = years.length * 4;
  return {
    rects: num,
    labels: years.map(d => {}),
  };
};

const checkYears = range => {
  const years = Array.from(range.by(UNIT.years));
};

const getRange = (start, end) => {
  const startTime = moment(start, FORMAT);
  const endTime = moment(end, FORMAT);

  const range = moment.range(startTime, endTime);

  const res = checkDecades(range);
  //
  // for (let month of range.by('month')) {
  //     month.format('YYYY-MM-DD');
  // }
  //
  // const years = Array.from(range.by('year'));
  // years.length == 5 // true
  // years.map(m => m.format('YYYY')) // ['2010', '2011', '2012', '2013', '2014', '2015']
};

export default getRange;
