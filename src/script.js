let headerElement = document.getElementById("pageHeaders");
let headerElementClone = headerElement.content.cloneNode(true);
let body = document.body;
let firstChild = body.firstChild;
body.insertBefore(headerElementClone, firstChild);

let footerElement = document.getElementById("pageFooters");
let footerElementClone = footerElement.content.cloneNode(true);
document.body.appendChild(footerElementClone);