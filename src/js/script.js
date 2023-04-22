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
      console.log(page.id);
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

    for (let i = 0; i < 10; i++) {
      let row = document.createElement('div');
      row.className = 'row row' + (i+1);
      row.id = 'row' +(i+1);
      for(let j = 0; j<10; j++){
        let  node = document.createElement('div');
        node.className = 'node node' + ((i*10)+(j+1));
        node.id = 'node' + ((i*10)+(j+1));

        row.appendChild(node);
      }
      thisApp.pathFinderContainer.appendChild(row);
    }
  },
  
  init: function () {
    const thisApp = this;

    thisApp.initPages();
    thisApp.initGrid();
  },
};
app.init();
