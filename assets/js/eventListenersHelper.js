let buttonEventListeners = [];

function addAnEventListener(id, node, type, listener) {
  node.addEventListener(type, listener);
  buttonEventListeners[id] = {type, listener};
}

function cloneWithEventListeners(node) {
  let clonedNode = node.cloneNode(true);
  const newButtons = clonedNode.querySelectorAll("button");

  newButtons.forEach(button => {
    const id = parseInt(button.id.substr(-1));
    const { type, listener } = buttonEventListeners[id];
    
    button.addEventListener(type, listener);
  });

  return clonedNode;
}