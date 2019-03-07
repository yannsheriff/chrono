export function humanize(sec_num) {
  let hours = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  let seconds = sec_num - (hours * 3600) - (minutes * 60);

  hours = hours > 0 ? `${hours}h ` : '';
  minutes = minutes > 0 ? `${minutes}m ` : '';
  seconds = seconds > 0 ? `${seconds}s ` : '';

  return hours + minutes + seconds;
}

export const test = 'tedst';
