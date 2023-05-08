class PathFinder {
  constructor(element){
    const thisFinder = this;

    thisFinder.element = element;
    thisFinder.pathNodes = [];
    thisFinder.startFinishNodes = [];
    thisFinder.step = 1;

    thisFinder.grid = {};
    for(let row = 0; row <= 9; row++) {
      thisFinder.grid[row] = {};
      for(let col = 0; col <= 9; col++) {
        thisFinder.grid[row][col] = false;
      }
    }
   
    thisFinder.render(thisFinder.grid);
    
  }

  render(grid){
    const thisFinder = this;

    let pageData = null;

    switch(thisFinder.step) {
    case 1:
      pageData = { title: 'Draw routes', buttonText: 'Finish drawing' };
      break;
    case 2:
      pageData = { title: 'Pick start and finish', buttonText: 'Compute' };
      break;
    case 3:
      pageData = { title: 'The best route is', buttonText: 'Start again' };
      break;
    }

    const template = Handlebars.compile(document.getElementById('template-path-finder').innerHTML);
    const generatedHTML = template(pageData);
   
    thisFinder.element.innerHTML = generatedHTML;
   
    
    for (let i = 0; i < 10; i++) {
      let row = document.createElement('div');
      row.className = 'row row' + (i);
      row.id = 'row' +(i);
      
      for(let j = 0; j<10; j++){
        let  node = document.createElement('div');
        node.className = 'node node' + ((i*10)+(j));
        node.id = 'node' + ((i*10)+(j));
      
        if(grid[i][j] == true){
          node.className =  'node node' + ((i*10)+(j)) + ' clicked';
        }

        row.appendChild(node);
      }
      thisFinder.element.querySelector('.grid').appendChild(row);
    }

    const nodes = document.querySelectorAll('.node');
    
    for(let node of nodes){
      let nodeId = node.getAttribute('id');
      console.log(nodeId, thisFinder.pathNodes, thisFinder.startFinishNodes);
      // if ()
    }
    thisFinder.initAction();
  }

  changeStep(newStep) {
    const thisFinder = this;
    thisFinder.step = newStep;
    console.log(thisFinder.step);
    thisFinder.render(thisFinder.grid);
    
  }
  
  drawPath(event){
    const thisFinder = this;
    const link = event.target;
    
    function addNeighbors(row, col){
      if (thisFinder.grid.hasOwnProperty(row+1) && thisFinder.grid[row+1].hasOwnProperty(col)) {
        if(!thisFinder.grid[row+1][col] === true){
          thisFinder.grid[row+1][col] = 'n';
        }
      }
      if (thisFinder.grid.hasOwnProperty(row) && thisFinder.grid[row].hasOwnProperty(col+1)) {
        if(!thisFinder.grid[row][col+1] === true){
          thisFinder.grid[row][col+1] = 'n';
        }
      }
      if (thisFinder.grid.hasOwnProperty(row-1) && thisFinder.grid[row-1].hasOwnProperty(col)) {
        if(!thisFinder.grid[row-1][col] === true){
          thisFinder.grid[row-1][col] = 'n';
        }
      }
      if (thisFinder.grid.hasOwnProperty(row) && thisFinder.grid[row].hasOwnProperty(col-1)) {
        if(!thisFinder.grid[row][col-1] === true){
          thisFinder.grid[row][col-1] = 'n';
        }
      }
    }
    
    if(link.classList.contains('node')){
      
      const nodeId = link.getAttribute('id');
      const row = parseInt(link.parentNode.id.replace('row', ''));
      const col = parseInt(nodeId.slice(-1));
      
      if(thisFinder.pathNodes.length === 0 ){ 
        link.classList.add('clicked');
        thisFinder.pathNodes.push(nodeId);
        thisFinder.grid[row][col] = true;
        addNeighbors(row, col);
        
      
      } else if (!(thisFinder.grid[row][col] === false) && thisFinder.grid[row][col] === 'n' ) {
        link.classList.add('clicked');
        thisFinder.pathNodes.push(nodeId),
        thisFinder.grid[row][col] = true;
        addNeighbors(row, col);
      }
    }
  }

  startFinish(event){
    const thisFinder = this;
    const link = event.target;
    const nodeId = link.getAttribute('id');
    
    if(link.classList.contains('node') && thisFinder.pathNodes.includes(nodeId)){
      if(thisFinder.startFinishNodes.length === 0){
        link.classList.replace('clicked', 'start');
        thisFinder.startFinishNodes.push(nodeId);
      } else if(thisFinder.startFinishNodes.length === 1){
        link.classList.replace('clicked', 'finish');
        thisFinder.startFinishNodes.push(nodeId);
      }
    }
  }

  initAction(){
    const thisFinder = this;

    thisFinder.node = thisFinder.element.querySelectorAll('.node');
    thisFinder.button  = thisFinder.element.querySelector('.pf-button');
    
    const areaListener = new AbortController();

    if (thisFinder.step === 1){
      thisFinder.element.addEventListener('click', thisFinder.drawPath.bind(thisFinder), {signal: areaListener.signal});
      thisFinder.button.addEventListener('click', function(event){
        event.preventDefault();
        thisFinder.changeStep(2);
        areaListener.abort();
      });
    } 

    if(thisFinder.step === 2){
      thisFinder.element.addEventListener('click', thisFinder.startFinish.bind(thisFinder), {signal: areaListener.signal});
      thisFinder.button.addEventListener('click', function(event){
        event.preventDefault();
        thisFinder.changeStep(3);
        areaListener.abort();
      });
    }

    if (thisFinder.step === 3){
      console.log(thisFinder.pathNodes, thisFinder.startFinishNodes);
    }
  }
}
export default PathFinder;
