export const showError = (form, text) => {
    const errorBlock = form.querySelector(`.error`);
    errorBlock.innerHTML = text;
    errorBlock.classList.add(`active`);
}