// mbti 섹션

const mbtiQuestionDOM = document.getElementsByClassName('mbti-question')[0];
const [yesButton, noButton] = document.getElementsByClassName('mbti-select')[0].children;
const [selectDOM, pendingDOM, resultDOM] = document.getElementsByClassName('mbti-container')
const mbtiResultTitleDOM = document.getElementsByClassName('mbti-result')[0]
const mbtiResultDescriptionDOM = document.getElementsByClassName('mbti-description')[0]
const mbtiRetryButton = document.getElementsByClassName('mbti-retry-button')[0]

const mbtiQuestionList = [
  '짠 과자가 단 과자보다 좋다.',
  '봉지 과자가 박스 과자보다 좋다.',
  '과자를 뜯으면 한 번에 다 먹는다.',
];

const getMbtiResult = (resultValue) => {
  //결과를 받아서 결과 정보를 반환해주는 함수
  //결과 정보의 형태는 
  // {
  //   title: '',
  //   description: '',
  // }
  switch(resultValue) {
    case 0:
      return {
        title: '과자 어린이 유형',
        description: '과자 어린이 유형 설명'
      }
    case 1:
      return {
        title: '과자 초심자 유형',
        description: '과자 초심자 유형 설명'
      }
    case 2:
      return {
        title: '과자 중급자 유형',
        description: '과자 중급자 유형 설명'
      }
    case 3:
      return {
        title: '과자 고수 유형',
        description: '과자 고수 유형 설명'
      }
  }
}

let currentRound = 0;
let resultValue = 0;
const maxRound = mbtiQuestionList.length;

const setPendingSection = () => {
  // pendingDOM을 나타나게하고 3초 후에 없어지게 해야 함
  pendingDOM.style.display = 'block';
  selectDOM.style.display = 'none'

  setTimeout(() => {
    pendingDOM.style.display = 'none'
    resultDOM.style.display = 'block'
  }, 3000)
}

const initialize = () => {
  // 다시하기 클릭했을 때 처음 상태로 되돌려줌
  currentRound = 0;
  resultValue = 0;
  selectDOM.style.display = 'block';
  pendingDOM.style.display = 'none';
  resultDOM.style.display = 'none';
}

const setResultSection = () => {
  // 결과 정보들을 DOM에 주입하는 함수
  const { title, description } = getMbtiResult(resultValue)
  mbtiResultTitleDOM.innerHTML = title;
  mbtiResultDescriptionDOM.innerHTML = description;

  mbtiRetryButton.onclick = initialize;
}

export const setMbtiSection = () => {
  // 질문을 표시
  // 버튼 눌렸을 떄 다음 질문으로 넘어감

  if(currentRound == maxRound) {
    // 재귀 탈출. 끝. -> pending을 3초간 표시 -> result 표시
    setPendingSection();
    setResultSection();
    return;
  }
  selectDOM.style.display = 'block';

  mbtiQuestionDOM.innerHTML = mbtiQuestionList[currentRound++] 
  // 뒤에 나오는 증감연산자는 앞에 코드 실행 후 실행되기 때문에 currentRound에는 0부터 들어간다.
  yesButton.onclick = () => {
    resultValue ++;
    setMbtiSection();
  }
  noButton.onclick = () => {
    setMbtiSection();
  }
}