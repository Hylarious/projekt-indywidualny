

class PathFinder {
  constructor(element){
    const thisFinder = this;

    thisFinder.element = element;
    thisFinder.pathNodes = [];
    thisFinder.path = [];
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
      
        switch(grid[i][j]){
        case true:
          node.className =  'node node' + ((i*10)+(j)) + ' clicked';
          break;
        case 's':
          node.className =  'node node' + ((i*10)+(j)) + ' start';
          break;
        case 'f':
          node.className =  'node node' + ((i*10)+(j)) + ' finish';
          break;
        }

        row.appendChild(node);
      }
      thisFinder.element.querySelector('.grid').appendChild(row);
      
    }
    thisFinder.initAction();
  }

  changeStep(newStep) {
    const thisFinder = this;
    thisFinder.step = newStep;
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
      const row = parseInt(link.parentNode.id.replace('row', ''));
      const col = parseInt(nodeId.slice(-1));

      if(thisFinder.startFinishNodes.length === 0){
        link.classList.replace('clicked', 'start');
        thisFinder.startFinishNodes.push(nodeId); 
        thisFinder.grid[row][col] = 's'; 

      } else if(thisFinder.startFinishNodes.length === 1){
        link.classList.replace('clicked', 'finish');
        thisFinder.startFinishNodes.push(nodeId);
        thisFinder.grid[row][col] = 'f';
      }
    }
   
  }

  findPath(start, finish){
    const thisFinder = this;

    const queue = [];
    const parentForCell = {};

    const finishRow = Math.floor(finish.replace('node', '') / 10);
    const finishCol = parseInt(finish.slice(-1));
     
    const startRow = Math.floor(start.replace('node', '') / 10);
    const startCol = parseInt(start.slice(-1));

    
    queue.push({row: startRow, col: startCol});
   
    while(queue.length > 0){
      const { row, col } = queue.shift();
      const currentKey = row + 'x' + col;

      const neighbors = [
        {row: row - 1, col},
        {row, col: col + 1 },
        {row: row + 1, col},
        {row, col: col -1 }
      ];

      for (let i = 0; i < neighbors.length; ++i){

        const nRow = neighbors[i].row;
        const nCol = neighbors[i].col;

        const gridLength =  Object.keys(thisFinder.grid).length;
        if (nRow < 0 || nRow > gridLength - 1 ){
          continue;
        }

        if (nCol < 0 || nCol > gridLength - 1 ){
          continue;
        }
        
        if (thisFinder.grid[nRow][nCol]==='n' || thisFinder.grid[nRow][nCol]===false){
          continue;
        }

        const key = nRow + 'x' + nCol;

        if (key in parentForCell){
          continue;
        }
      
        parentForCell[key] = {
          key: currentKey,
          node: 'node' + parseInt(row*10+col)
        };
        console.log(parentForCell);

        queue.push(neighbors[i]);
      }
    }
   
    let currentKey = finishRow +'x'+ finishCol;

    let current = finish;

    console.log(currentKey, finish, parentForCell);
    
    while (current !== start){
      thisFinder.path.push(current);
      
      const {key, node} = parentForCell[currentKey];
      current = node;
      currentKey = key;
      
    } 
    for (let tile of thisFinder.pathNodes){
      if (thisFinder.path.includes(tile)){
        thisFinder.element.querySelector('.'+tile).classList.replace('clicked', 'path');

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
     
      const start = thisFinder.startFinishNodes[0];
      const finish = thisFinder.startFinishNodes[1];
      thisFinder.findPath(start, finish);

      thisFinder.button.addEventListener('click', function(event){
        event.preventDefault();
        thisFinder.pathNodes = [];
        thisFinder.path = [];
        thisFinder.startFinishNodes = [];
          
        console.log(thisFinder);

        thisFinder.grid = {};
        for(let row = 0; row <= 9; row++) {
          thisFinder.grid[row] = {};
          for(let col = 0; col <= 9; col++) {
            thisFinder.grid[row][col] = false;
          }
        }
        thisFinder.changeStep(1);
      });
    }
  }
}
export default PathFinder;
