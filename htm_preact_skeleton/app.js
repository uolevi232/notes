import { html, render, useState } from "./htm_preact.js";

function Button({ title, onClick }) {
  return html`<button onClick=${onClick}>${title}</button>`;
}

function EditBox({ text }) {}

function App() {

  const [getN, setN] = useState(0);
  const buttonOnclick = (e) => {
    console.log(e);
    setN(getN + 1);
  };
  return html`<div>
    <h1>Hello!</h1>
    <${Button} title="button, value is ${getN}" onClick=${buttonOnclick} />
  </div>`;
}

render(html`<${App} />`, document.body);
