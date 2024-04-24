document.getElementById('toggle-theme').addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});

document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', function (e) {
      let x = e.clientX - e.target.offsetLeft;
      let y = e.clientY - e.target.offsetTop;
      let ripples = document.createElement('span');
      ripples.style.left = x + 'px';
      ripples.style.top = y + 'px';
      this.appendChild(ripples);

      setTimeout(() => {
          ripples.remove();
      }, 1000);
  });
});

window.addEventListener('scroll', reveal);

function reveal() {
  var reveals = document.querySelectorAll('.attraction');

  for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;

      if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add('active');
      } else {
          reveals[i].classList.remove('active');
      }
  }
}

document.styleSheets[0].insertRule(`
  .attraction {
      opacity: 0;
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
`, document.styleSheets[0].cssRules.length);

document.styleSheets[0].insertRule(`
  .attraction.active {
      opacity: 1;
      transform: translateY(0);
  }
`, document.styleSheets[0].cssRules.length);

window.addEventListener('scroll', function() {
  document.querySelectorAll('img').forEach(img => {
      var distanceToTop = img.getBoundingClientRect().top;
      var scale = 1 + (window.innerHeight - distanceToTop) / 500;
      if (scale > 1 && scale < 1.15) {
          img.style.transform = `scale(${scale})`;
      }
  });
});

document.body.addEventListener('mousemove', function(e) {
  var follower = document.getElementById('cursor-follower');
  if (!follower) {
      follower = document.createElement('div');
      follower.id = 'cursor-follower';
      follower.style.position = 'absolute';
      follower.style.width = '20px';
      follower.style.height = '20px';
      follower.style.backgroundColor = 'rgba(0, 100, 250, 0.5)';
      follower.style.borderRadius = '50%';
      follower.style.pointerEvents = 'none'; 
      document.body.appendChild(follower);
  }
  follower.style.left = e.pageX + 'px';
  follower.style.top = e.pageY + 'px';
});


var topButton = document.getElementById('back-to-top');
window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }
};

topButton.onclick = function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0; 
};
