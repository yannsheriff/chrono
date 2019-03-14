export function humanize(sec_num) {
  let hours = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  let seconds = sec_num - (hours * 3600) - (minutes * 60);

  hours = hours > 0 ? `${hours}h ` : '';
  minutes = minutes > 0 ? `${minutes}m ` : '';
  seconds = seconds > 0 ? `${seconds}s ` : '';

  return hours + minutes + seconds;
}

export function chrono(sec_num) {
  const hours = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  let seconds = Math.floor(sec_num - (hours * 3600) - (minutes * 60));

  minutes = minutes > 0 ? `${minutes}:` : '00:';
  seconds = seconds > 0 ? seconds > 10 ? `${seconds}` : `0${seconds}` : '00';

  return minutes + seconds;
}


export function minutes(sec_num) {
  const hours = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - (hours * 3600)) / 60);


  minutes = minutes > 0 ? `${minutes} min ` : ' < 1 min';
  return minutes;
}

export const test = 'tedst';
