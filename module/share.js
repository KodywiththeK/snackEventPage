const shareURLButton = document.getElementById('url-share-button');

export const setShareURLButton = () => {
  shareURLButton.onclick = () => {
    //현재 URL을 클립보드에 복사
    navigator.clipboard.writeText(location.href); // location.href는 현재 url을 받아옴.
  }
}