import "../style/node.css";

export default function Node({
  visualState,
  row,
  col,
  node,
  onPointerDown,
  onPointerEnter,
  onPointerUp,
}) {
  const nodeClass = (node) => {
    if (visualState.generatingResult) return "node " + node.type;
    if (node.type === "empty") {
      if (node.path) return "node path";
      if (node.visited.src || node.visited.dest) return "node visit";
    }
    return "node " + node.type;
  };

  return (
    <div
      id={`${row}-${col}`}
      className={nodeClass(node)}
      onPointerDown={(e) => onPointerDown(e, row, col)}
      onPointerEnter={(e) => onPointerEnter(e, row, col)}
      onPointerUp={onPointerUp}
    ></div>
  );
}
