"use strict";(()=>{var i=class extends HTMLElement{constructor(){super()}connectedCallback(){let e=this.attachShadow({mode:"open"});e.innerHTML=this.render(),e.querySelector("button").addEventListener("click",()=>this.remove())}render(){return`
      <style>
        :host {
          align-items: center;
          display: flex;
          gap: 0.5rem;
          justify-content: space-between;
        }
        slot {
          word-break: break-word;
        }
      </style>
      <slot></slot>
      <button title="Remove">\u{1F5D1}\uFE0F</button>
    `}};customElements.define("output-item",i);var t=class extends Error{},c=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,m=/^[0-9()-]+$/;function l(r){let e=new FormData(r),s=e.get("name")?.toString();if(!s||s==="")throw new t("Name is required.");let n=e.get("email")?.toString();if(!n||n==="")throw new t("Email is required.");if(!c.test(n))throw new t("Email is not valid.");let a=e.get("birthdate")?.toString();if(!a||a==="")throw new t("Date of birth is required.");let o=e.get("tel")?.toString();if(!o||o==="")throw new t("Phone is required.");if(!m.test(o))throw new t("Phone number is not valid.");return{name:s,email:n,birthdate:a,tel:o}}document.querySelector("form").addEventListener("submit",function(r){r.preventDefault();try{this.error.innerText="";let e=document.createElement("output-item");e.innerText=JSON.stringify(l(this)),this.data.append(e),this.reset()}catch(e){e instanceof t?this.error.innerText=e.message:this.error.innerText="Unexpected error."}});})();
//# sourceMappingURL=main.js.map
