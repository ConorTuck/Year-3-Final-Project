import React,{useRef} from 'react';
import {Graph, CanvasContainer} from './CanvasElements.js';
const CanvasGraph = () => {
  return (
      <CanvasContainer>
              <Graph />
      </CanvasContainer>
  );
};

export default CanvasGraph;
