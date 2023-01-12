import React from "react";

export default function TextCheckAndFix(inputText) {
  // This method checks if input string has conflict marks in html and add escape to illegal one
  function escapeHtml(textString) {
    var entityMap = {
      "&": "\\&",
      "<": "\\<",
      ">": "\\>",
      '"': '\\"',
      "'": "\\'",
      "/": "\\/",
    };
    return String(textString).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  }
  return escapeHtml(inputText);
}
