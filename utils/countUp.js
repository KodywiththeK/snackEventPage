// dom : innerHTML이 갱신될 노드
// target : 목표 숫자
// second : 총 몇 초가 걸릴지 -> 5
// term : 몇 초마다 함수 실행할지 -> 15ms

// countTerm : 한 term에 몇이 증가해야 하는지 -> second, term으로 계산해서 넣어주기
// 매개변수 term이 들어오지 않는다면 15 default 값으로 적요됨
export const countUp = (dom, target, second, term = 15) => {
  // 특정 돔의 innerHTML을 갱신
  // innerHTML이 n초를 간격으로 갱신
  // value += 10
  if(!dom || isNaN(Number(target)) || isNaN(Number(second)) || isNaN(Number(term))) return;
  const countTerm = Math.floor((target/second) * (term/1000))
  // target / second => 1 초에 얼만큼씩 증가할 지?
  
  let nowNumber = 0; //현재 값
  // 현재값이 0 -> 0 + term -> o+term*2 -> ... -> target 까지 가는 것.

  const timerID = setInterval(() => { // 타이머가 돌아감, 곧 자원을 사용하고있다는 의미
    if(nowNumber >= target) {
      nowNumber = target;
      clearInterval(timerID); // 자원 그만 쓰게 함. setInterval 탈출
      return;
    }
    nowNumber += countTerm;
    dom.innerHTML = `${nowNumber.toLocaleString()}`
  }, term)
}