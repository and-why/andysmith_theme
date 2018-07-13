var paralaxItem = document.querySelectorAll('.paralax');
paralaxItem.forEach(function(x) {
  let lastPos = x.offsetTop;
  
  window.addEventListener('scroll', e => {
    x.style.top = (lastPos - (window.scrollY / x.dataset.speed)) + 'px';
    console.log(x.style.top)
  });
});