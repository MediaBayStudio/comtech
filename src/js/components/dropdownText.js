;(function() {
  let faqBlock = document.querySelector('.faq-sect__text-block');

  if (faqBlock) {
    let faqBlocks = faqBlock.children,

      initDropdown = function() {
        let childs = faqBlocks[0].children;

        hideText(1);
        faqBlocks[0].style.maxHeight = childs[0].scrollHeight + childs[1].scrollHeight + 'px';
        faqBlocks[0].classList.add('active');

        faqBlock.addEventListener('click', function() {
          let target = event.target;
          if (target.tagName === 'BUTTON') {
            dropdownText(target);
          }
        });

      },

      dropdownText = function(element) {
        element = element || faqBlocks[0]; // если элемент не передали, то открываем первый

        let minHeight = element.scrollHeight,
          parent = element.parentElement,
          answer = element.nextElementSibling,
          answerHeight = answer.scrollHeight;

        if (parent.classList.contains('active')) {
          if (faqBlocks.length > 1) {
            parent.style.maxHeight = minHeight + 'px';
            parent.classList.remove('active');
          }
        } else {
          hideText(0);

          parent.classList.add('active');
          parent.style.maxHeight = minHeight + answerHeight + 'px';
        }
      },
      
      hideText = function(start) {
        for (let i = start; i < faqBlocks.length; i++) {
          faqBlocks[i].classList.remove('active');
          faqBlocks[i].style.maxHeight = faqBlocks[i].children[0].scrollHeight + 'px';
        }
      };

    initDropdown();

  }

})();