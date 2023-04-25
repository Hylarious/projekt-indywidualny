class PathFinder {
  constructor(element){
    const thisFinder = this;
    
    thisFinder.renderGrid(element);
    thisFinder.pathDraw(element);
  }

  renderGrid(element){
    for (let i = 0; i < 10; i++) {
      let row = document.createElement('div');
      row.className = 'row row' + (i);
      row.id = 'row' +(i);
      for(let j = 0; j<10; j++){
        let  node = document.createElement('div');
        node.className = 'node node' + ((i*10)+(j));
        node.id = 'node' + ((i*10)+(j));
        row.appendChild(node);
      }
      element.appendChild(row);
    }
  }

  pathDraw(element) {
    const thisFinder = this;

    
    thisFinder.node = element.querySelectorAll('.node');
   
    let pathNodes = [];
		let neighbors =[];

    element.addEventListener('click', function(event){
      const link = event.target;
			

      if(link.classList.contains('node')){
        const nodeId = link.getAttribute('id');
        const row = parseInt(link.parentNode.id.replace('row', ''));
        const col = parseInt(nodeId.slice(-1));
        
       
        if(pathNodes.length === 0 ){ 
          link.classList.add('clicked');
          pathNodes.push(nodeId);
          neighbors.push([row - 1, col],
            [row, col + 1],
            [row + 1, col],
            [row, col - 1],) 

        } else if (neighbors.some(n => n[0] === row && n[1] === col)) {
					link.classList.add('clicked');
					neighbors.push([row - 1, col],
            [row, col + 1],
            [row + 1, col],
            [row, col - 1],)
						console.log(neighbors);
				};
        //trzeba zmienić to tak, by tworzyć tablicę obiektów o kluczu row i numerze col i nadpisywać go  z 0 na 1 w zależności czy jest zaznaczony czy nie 
      }})
  }
}
export default PathFinder;