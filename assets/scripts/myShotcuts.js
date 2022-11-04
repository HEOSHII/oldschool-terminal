function $(nameOfClass) {
  if (document.querySelectorAll(nameOfClass).length > 1) {
    return document.querySelectorAll(nameOfClass);
  }
  return document.querySelector(nameOfClass);
}
