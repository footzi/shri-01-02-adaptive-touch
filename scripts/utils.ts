const paint = (element: any, content: any): void => {
    if (typeof content === "string") {
        element.insertAdjacentHTML("beforeend", content);
    } else if (typeof content === "object") {
        element.appendChild(content);
    }
};

const remove = (element: HTMLElement): void => {
    element.innerHTML = "";
};

export { paint, remove };
