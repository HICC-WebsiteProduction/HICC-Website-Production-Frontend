// 객체애서 value로 key를 가져오고 싶을 때
function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}
export default getKeyByValue;
