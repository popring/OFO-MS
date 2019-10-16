export default {
  
  formate(date) {
    if(!date) {
      return '';
    }
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }
}