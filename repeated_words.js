"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

$(document).ready(function() {
   $("#fileinput").change(calculate);
});


function generateOutput(contents) {
  return contents.replace(/(\w+)([\s\n])+(\1$|(\1([\s\n])+)+)/ig, '<span class="repeated">$1</span>$2');

  // '(\w+)([\s\n])+' => Una palabra seguida de uno o mas espacios o salto de linea
  // '\1$' => La palabra que cazó, al final del texto.
  // '(\1([\s\n])+)+' => La palabra que cazó antes, seguida de uno o mas espacios o 
  // saltos de linea, y todo esto una o más veces. Asi conseguimos eliminar las palabras repetidas más de una vez
}

function calculate(evt) {
  var f = evt.target.files[0]; 
  var contents = '';

  if (f) {
    var r = new FileReader();
    r.onload = function(e) { 
      contents = e.target.result;
      var escaped  = escapeHtml(contents);
      var outdiv = document.getElementById("out");
      outdiv.className = 'unhidden';
      finaloutput.innerHTML = generateOutput(escaped);
      initialinput.innerHTML = escaped;
    }
    r.readAsText(f);
  } else {
    alert("Failed to load file");
  }
}

var entityMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': '&quot;',
  "'": '&#39;',
  "/": '&#x2F;'
};


function escapeHtml(string) {
  return String(string).replace(/[\\&<>"'\/]/g, function ($1) { // s es el primer argumento que recibe la funcion que se pasa como parametro a replace
    return entityMap[$1];
  });
}