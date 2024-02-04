const regexEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const regexDigit = /[0-9]/;
const regexLetter = /^(?=.*[A-Za-z])/;
const regexLower = /^(?=.*?[a-z])/;
const regexUpper = /^(?=.*?[A-Z])/;

export { regexEmail, regexDigit, regexLetter, regexLower, regexUpper };
