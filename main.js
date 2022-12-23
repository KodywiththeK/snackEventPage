import { setShareURLButton } from "./module/share.js";
import { countUp } from "./utils/countUp.js";
import { setTabMenu } from "./module/tabMenu.js";
import { setSelectCards, setSelectButton, setResultContainer } from "./module/selectCard.js";
import { setMbtiSection } from "./module/mbtiSelect.js";

const data = {
  participate: 25001,
};

const participateDOM = document.getElementById('participate-number');
participateDOM.innerHTML = data.participate; // 증가하는 애니메이션과 함꼐 갱신

countUp(participateDOM, data.participate, 2);

setTabMenu();

setSelectCards();
setSelectButton();

setResultContainer();

setMbtiSection();

setShareURLButton();
