// ハンバーガーメニュー

document.querySelector('.hamburger').addEventListener('click', function () {
  this.classList.toggle('active');
  document.querySelector('.slide-menu').classList.toggle('active');
})

// フェードイン

function fadeinEvent() {
  var fadeinClass= Array.prototype.slice.call(document.getElementsByClassName("fadein"));

  fadeinClass.forEach(function( element ) {
      var boundingClientRect = element.getBoundingClientRect();
      var scroll = document.documentElement.scrollTop || document.body.scrollTop;
      var windowHeight = window.innerHeight;

      if (scroll > scroll + boundingClientRect.top - windowHeight + 200){
          element.style.opacity = "1";
          element.style.transform = "translateY(0)";
      }
  });
}

window.onload = function(){
  fadeinEvent();
  window.addEventListener('scroll', fadeinEvent, false);
}


