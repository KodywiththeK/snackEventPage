import { SELECT_RESULT_KEY } from "../constants/result.js";
import { appendChildrenList, makeDOMwithProperties } from "../utils/dom.js"

const cardInfoList = [
  {
    id: 1, 
    imgSrc: '../public/assets/초코꼬북칩.jpeg',
    name: '초코꼬북칩',
    description: '맛있는 초코꼬북칩'
  },
  {
    id: 2, 
    imgSrc: '../public/assets/나쵸.jpeg',
    name: '나쵸',
    description: '맛있는 나쵸'
  },
  {
    id: 3, 
    imgSrc: '../public/assets/허니버터칩.jpeg',
    name: '허니버터칩',
    description: '맛있는 허니버터칩'
  },
  {
    id: 4, 
    imgSrc: '../public/assets/홈런볼.jpeg',
    name: '홈런볼',
    description: '맛있는 홈런볼'
  },
]

const snackCardList = document.getElementsByClassName('snack-card-list')[0]
const selectButtonDOM = document.getElementsByClassName('participate-button')[0];
const [notyetContainerDOM, resultContainerDOM] = document.getElementsByClassName('result-container')
const [, resultImageDOM, resultNameDOM, resultDescriptionDOM, selectRetryButtonDOM] = resultContainerDOM.children;

const getSelectedCard = () => { //선택된 카드 가져오는 함수
  return document.getElementsByClassName('select')[0]
}
const getCardById = (id) => { //id에 해당하는 요소 가져오기
  return document.getElementById(`select-${id}`);
}

const handleSelectCard = (cardId) => {
  //기존에 있던 카드 제거하고
  const originalSelectedCard = getSelectedCard();
  originalSelectedCard?.classList.remove('select');
  //선택된 카드를 표시
  const newSelectedCard = getCardById(cardId)
  newSelectedCard?.classList.add('select');
}

const getSelectCardDOM = ({
  id,
  imgSrc,
  name, 
  description
}) => {
  const snackCardDOM = makeDOMwithProperties('button', {
    id: `select-${id}`, 
    className: 'snack-card', 
    onclick: () => handleSelectCard(id)
  })

  const imageDOM = makeDOMwithProperties('img', {
    src: imgSrc,
    alt: name,
  });

  const descriptionContainerDOM = makeDOMwithProperties('div',  {
    className: 'snack-description',
  })

  const nameDOM = makeDOMwithProperties('div', {
    innerHTML: name,
  });

  const descriptionDOM = makeDOMwithProperties('div' , {
    innerHTML: description,
  })
  
  appendChildrenList(descriptionContainerDOM, [nameDOM, descriptionDOM])
  appendChildrenList(snackCardDOM, [imageDOM, descriptionContainerDOM])

  return snackCardDOM;
}


export const setSelectCards = () => { //과자 카드 리스트 세팅해주는 함수
  // 기존의 snackCardList의 자식요소들을 받아와서 -> 순회하면서 없애준 후
  // 새로운 자식들을 할당하기
  const originalSnackCards = Object.assign([], snackCardList.children);
  // 객체 복사해서 []배열에 반환
  originalSnackCards.forEach((snackCard) => snackCard.remove());
  // 기존에 있던  카드리스트 삭제

  cardInfoList.forEach((cardInfo) => {
    const selectCardDOM = getSelectCardDOM(cardInfo)
    snackCardList.appendChild(selectCardDOM)
  })
  //이미 선택되어져있는 과자 id를 localStorage에서 가져와서 표시
  const cardId = Number(localStorage.getItem(SELECT_RESULT_KEY))
  // 로컬스토리지에는 문자열로만 저장되기 때문에 number 변환 필요
  if(!cardId || isNaN(cardId)) return;
  handleSelectCard(cardId)
} 

export const setSelectButton = () => {
  selectButtonDOM.onclick = () => {
    const selectedCard = getSelectedCard();
    if(!selectedCard) {
      alert("선택된 카드가 없습니다.")
      return;
    } 
    const cardId = selectedCard.id?.split('-')[1]
    localStorage.setItem(SELECT_RESULT_KEY, cardId )
    setResultContainer();
  }
}

const initialize = () => {
  // 결과영역의 다시하기 버튼 클릭에 반응해서
  // 과자가 선택되기 전의 상태로 되돌려주는 함수. 
  localStorage.removeItem(SELECT_RESULT_KEY);
  setSelectCards(); // 초기 상태로 돌려줘야하기 때문. 
  setResultContainer();

  const selectSectionDOM = document.getElementById('participate-section');
  const scrollTargetY = selectSectionDOM.offsetTop

  window.scroll({
    top: scrollTargetY,
    left: 0,
    behavior: 'smooth'
  })
}

export const setResultContainer = () => {
  // result 구역에 선택된 과자 노출시키는 함수

  const selectedId = Number(localStorage.getItem(SELECT_RESULT_KEY));

  const isSelected = !!selectedId; 
  // 부정연산자 두번 사용하면, 불린형으로 명시적 형변환 가능
  if(!isSelected) {
    //notyetContainer를 드러내고, resultContainer 숨겨야 함
    notyetContainerDOM.style.display = 'block'
    resultContainerDOM.style.display = 'none'
    return; // 아래 구문 실행하지 않고 함수 끝내기
  }
  // 선택되어있다면 notyetContainer 숨기고, resultContainer 드러내기
  // resultContainer에 선택된 과자의 정보 주입하기
  notyetContainerDOM.style.display = 'none'
  resultContainerDOM.style.display = 'flex'

  //id가 같은 데이터를 find를 통해서 찾아서 할당해주기
  const cardInfo = cardInfoList.find((info) => info.id === selectedId)
  // 선택된 카드 정보 resultContainer에 연결
  resultImageDOM.src = cardInfo.imgSrc;
  resultImageDOM.alt = cardInfo.name;
  resultNameDOM.innerHTML = cardInfo.name;
  resultDescriptionDOM.innerHTML = cardInfo.description;

  // 다시하기 버튼 구현
  selectRetryButtonDOM.onclick = initialize;
}