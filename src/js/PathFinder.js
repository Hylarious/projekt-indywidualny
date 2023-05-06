class PathFinder {
  constructor(element){
    const thisFinder = this;

    thisFinder.element = element;
   
    thisFinder.step = 1;

    thisFinder.renderGrid(element);
    thisFinder.pathDraw(element);
  }

  renderGrid(element){
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
    console.log(generatedHTML);
    thisFinder.element.innerHTML = generatedHTML;
   

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
      element.querySelector('.grid').appendChild(row);
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
            [row, col - 1]); 

        } else if (neighbors.some(n => n[0] === row && n[1] === col)) {
          link.classList.add('clicked');
          neighbors.push([row - 1, col],
            [row, col + 1],
            [row + 1, col],
            [row, col - 1]);
          console.log(neighbors);
        }
        
      }});
  }
}
export default PathFinder;


// const arr=[
//   { row: [0,0,0,0,0,0,0,0,0,0]
//     row: [0,0,0,0,0,0,0,0,0,0]
//     row: [0,0,0,0,0,0,0,0,0,0]
//     row: [0,0,0,0,0,0,0,0,0,0]
//     row: [0,0,0,0,0,0,0,0,0,0]
//     row: [0,0,0,0,0,0,0,0,0,0]
//     row: [0,0,0,0,0,0,0,0,0,0]
//     row: [0,0,0,0,0,0,0,0,0,0]
//     row: [0,0,0,0,0,0,0,0,0,0]}
// ]