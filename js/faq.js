function show(selectedDiv) {
  let targetDivs = document.querySelectorAll('.targetDiv');

  for (let i = 0; i < targetDivs.length; i++) {
    if (targetDivs[i].style.display == 'block') {
      targetDivs[i].style.display = 'none';
    }
  }
  document.getElementById(selectedDiv).style.display = 'block';
}