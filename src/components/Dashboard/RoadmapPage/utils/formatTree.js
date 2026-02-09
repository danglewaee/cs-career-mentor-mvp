export function formatTree(raw) {

    // 1. Build a map of id→node
    const nodes = {};
    // This will hold all nodes with their id as the key
    raw.forEach(item => {
      nodes[item.id] = {
        id: item.id,
        name: item.title,
        children: [],
        group: item.group,
      };
    });
  
    // 2. Wire up children
    raw.forEach(item => {
      item.next.forEach(childId => {
        // For each childId in the item's next array, find the corresponding node
        if (nodes[item.id] && nodes[childId]) {
          nodes[item.id].children.push(nodes[childId]);
        }
      });
    });
  
    // 3. Figure out which items are _not_ roots
    const nonRoots = new Set(raw.flatMap(item => item.next));
  
    // 4. Group the true roots by `group`
    const groups = {};
    raw.forEach(item => {
      // Initialize group if it doesn't exist
      if (!groups[item.group]) groups[item.group] = [];
      // Only include nodes that never appear as a child
      if (!nonRoots.has(item.id)) {
        groups[item.group].push(nodes[item.id]);
      }
    });
  
    // 5. Turn into an array of { name: groupName, children: […] }
    return Object.entries(groups).map(([groupName, children]) => ({
      name: groupName,
      children,
    }));
  }
  //-> now each group.children array will contain only the top-level nodes. any deeper nodes live solely in their parent's children array.