import PathFinder from './PathFinder.js';

const app = {
  initPages: function () {
    const thisApp = this;

    thisApp.pages = document.querySelector('#pages').children;
    thisApp.navLinks = document.querySelectorAll('.main-nav a');

    const idFromHash = window.location.hash.replace('#/', '');
    let pageMatchingHash = thisApp.pages[0].id;

    for (let page of thisApp.pages) {
      if (page.id == idFromHash) {
        pageMatchingHash = page.id;
        break;
      }
    }
    console.log(pageMatchingHash);
    thisApp.activatePage(pageMatchingHash);

    for (let link of thisApp.navLinks) {
      link.addEventListener('click', function (event) {
        const clickedElement = this;
        event.preventDefault();
        const id = clickedElement.getAttribute('href').replace('#', '');

        // run thiApp.activatePage with that id
        thisApp.activatePage(id);

        // change URL hash
        window.location.hash = '#/' + id;
      });
    }
  },
  activatePage: function (pageId) {
    const thisApp = this;

    // add class 'active' to matching pages, remove from non-matching
    for (let page of thisApp.pages) {
      page.classList.toggle('active', page.id == pageId);
      
    }
    // add class 'active' to matching links, remove from non-matching
    for (let link of thisApp.navLinks) {
      link.classList.toggle(
        'active',
        link.getAttribute('href') == '#' + pageId
      );
    }
  },
  initGrid: function () {
    const thisApp = this;
    thisApp.pathFinderContainer = document.querySelector(
      '.path-finder-container'
    );
    console.log( thisApp.pathFinderContainer );
    thisApp.pathFinder = new PathFinder(thisApp.pathFinderContainer);
    
  },
  initAnimationOnScroll: function(){
    const observer = new IntersectionObserver(entries => {
      entries.forEach((entry) => {
        if (entry.isIntersecting){
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show');
        }
      });
    },
    {
      rootMargin: '-201px'
    });
    
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));
  },
  init: function () {
    const thisApp = this;

    thisApp.initPages();
    thisApp.initGrid();
    thisApp.initAnimationOnScroll();
  },
};
app.init();
