function Validation() {}

Validation.prototype.isValid = function (
  checkValid,
  value,
  divId,
  mess,
  constrains
) {
  if (checkValid(value, constrains)) {
    getElem(divId).style.display = "none";
    getElem(divId).innerHTML = "";
    return true;
  }

  getElem(divId).style.display = "block";
  getElem(divId).innerHTML = mess;
  return false;
};

function isEmpty(value) {
  return value.length;
}

function isValidLength(value, validLengthInterval) {
  return (
    validLengthInterval[0] <= value.length &&
    value.length <= validLengthInterval[1]
  );
}

function isInValidRange(value, validRangeInterval) {
  return validRangeInterval[0] <= +value && +value <= validRangeInterval[1];
}

function isValidPattern(value, regexPattern) {
  return value.match(regexPattern);
}

function isAccountNonExist(account) {
  const userAccounts = document.getElementsByClassName("user-account");
  for (const userAccount of userAccounts)
    if (account === userAccount.innerHTML) return false;

  return true;
}
