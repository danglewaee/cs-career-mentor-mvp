import React, { useState, useEffect } from 'react';
import rawData from '../data/roadmapData.json';
import { formatTree } from '../utils/formatTree';
import './RoadmapGrid.css';

function RoadmapCard({ node }) {
  // Nếu node.id có kí tự lạ (dấu chấm, space), bạn có thể sanitize ở đây:
  const safeId = node.id.replace(/\W/g, '_');
  
  return (
    <div id={safeId} className="roadmap__card">
      <div className="roadmap__card-title">{node.name}</div>
      
      {node.children?.length > 0 && (
        <div className="roadmap__subgrid">
          {node.children.map(child => (
            <RoadmapCard key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function RoadmapGrid() {
  const [cols, setCols] = useState([]);

  useEffect(() => {
    setCols(formatTree(rawData));
  }, []);

  if (!cols.length) return <div>Loading…</div>;

  return (
    <div className="roadmap">
      <h1 className="roadmap__title">Roadmap</h1>
      <div className="roadmap__grid">
        {cols.map(col => (
          <div key={col.name} className="roadmap__col">
            <div className="roadmap__col-header">{col.name}</div>
            {col.children.map(child => (
              <RoadmapCard key={child.id} node={child} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
