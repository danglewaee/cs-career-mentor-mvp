import React, { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';// react-d3-tree is a library for rendering tree structures in React
import rawData from '../data/roadmapData.json';

function formatTree(raw) { // this function formats the raw data into a tree structure
  const groups = raw.reduce((acc, item) => { // it groups items by their group property
    // the function uses the reduce method to iterate over the raw array and build an accumulator object (acc). 
    //The accumulator serves as a container for the grouped data. 
    // During each iteration, the function checks if the current item's group property already exists as a key in the accumulator (acc). 
    //If it doesn't exist, a new entry is created in the accumulator with the group name as the key.
    // This entry is initialized as an object containing the name of the group and an empty children array 
    if (!acc[item.group]) {
      acc[item.group] = { name: item.group, children: [] };
    }
    // next, the function adds the current item to the children array of the corresponding group
 //each child is represented a object containing id, name (derived form the item's title property), and an empty children array    
 acc[item.group].children.push({ id: item.id, name: item.title, children: [] });
 // the initial value of the accumulator is an empty object which allows the function to dynamically build the grouped structure as it proceses each item in the array. 
 // by the end of the reduce operation, the groups object contains all the data from the raw array, orgainzed into a tree-ike format based on the group property   
    return acc;
  }, {});

  raw.forEach(item => //this loop iterates over an array called raw, which appears to contain objects representing nodes in the tree tree
    // each node in raw has properties like next, group, id and title. the foreach method loops through each item in the raw array.
    // for every item, the code checks if the next property contains any elements  
     {
    if (item.next.length) {
      // if item.next is not empty, the code identifies the parent node in the groups object
      // the groups object is likely a collection of tree nodes grouped by some criteria; the parent node is located by accessing the children array of the appropriate group (groups[item.group]) and finding the node whose id matches the current item's id 
      const parent = groups[item.group].children.find(n => n.id === item.id);
      // once the parent node is identified -> its children property is populated -> the item.next array contains IDs of child nodes, and the map function is used to transform these IDs into child node objects
      // for each childID in item.next, the code searches the raw array to find the corresponding child node (raw.find(x => X.ID === childID))
      parent.children = item.next.map(childId => {
        // for each child node found -> a new object is created with 2 properties name (which is set to the title of the child node) and children (which is initialized as an empty array) 
        const child = raw.find(x => x.id === childId);
        return { name: child.title, children: [] };
      });
    }
  });

  return Object.values(groups);
}

const CustomNode = ({ nodeDatum }) => {
  if (!nodeDatum.name) return null;
  // the customnode component is a functional react component designed to render a custom graphical node -> it uses SVG (scalable vector graphics) elements to define the appearance of the node
  // the component receives a single prop -> nodeDatum which is expected to contain data about the node, including its name
  return (
    <g>
      <rect
        x={-60}
        y={-15}
        width={120}
        height={30}
        fill="#FFF4C1"
        stroke="#E2B71D"
        rx={6}
      />
      <text
        x={0}
        y={0}
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize={11}
        fill="#333"
      >
        {nodeDatum.name}
      </text>
    </g>
  );
};

export default function RoadmapTree() {
  // RoadmapTree is a react functional component designed to render a hierarchical tree structure using the Tree component from a library (likely react-d3-tree)
  // it visualizes roamap data in a vertical orientation and provides customization options for appearance and behavior
  const [treeData, setTreeData] = useState([]);
  // the component begins by initializing a state variable a state variable treedata using the usestate hook. this state holds the formatted tree strucutre that will be displayed. initially, treedata is set to an empty array. 
  // the useeeffect hook is used to populate this state when the component mounts; inside the effect, the formattree function is called with rawdata to transform the raw data into a tree-like structure
  // the result is stored in treedata. since the dependency array of useeffect is empty -> this effect runs only once during the componnent's lifecycle
  useEffect(() => {
    setTreeData(formatTree(rawData));
  }, []);

  const width = window.innerWidth;
  const height = window.innerHeight * 0.85;

  const treeRoot = { name: 'AI Engineer', children: treeData };
console.log('treeData: ', treeData);
console.log('treeRoot:', {name: 'AI Engineer', children: treeData})
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Tree
        data={[treeRoot]}
        orientation="vertical"
        translate={{ x: width / 2, y: 50 }}
        nodeSize = {{x: 200, y: 150}}
        pathFunc="elbow"
        renderCustomNodeElement={CustomNode}
        zoomable
        collapsible={false}
        separation={{ siblings: 1.5, nonSiblings: 2 }}
        linkSvgProps={{ stroke: '#E2B71D', strokeWidth: 1.2, strokeDasharray: '3,3' }}
      />
    </div>
  );
}