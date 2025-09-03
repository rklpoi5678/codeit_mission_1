const $modalBackColor = document.querySelector(".modal-show");
const $modalContainer = document.querySelector(".modal-container");
const $modalPara = document.querySelector(".modal-para");
const $modalBtn = document.querySelector(".modal-button");

/**
 * 모달창
 * @param {String} msg 
 * @returns {YaYHo}
 */
export default function modalShow(msg) {
  $modalBackColor.style.display = "initial";
  $modalContainer.style.display = "flex";
  $modalPara.textContent = msg || "";

  $modalBtn.addEventListener("click", () => {
    $modalContainer.style.display = "none";
    $modalBackColor.style.display = "none";
  });
}
