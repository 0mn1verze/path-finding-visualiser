import "../style/node.css";

const nodeClass = (type) => "node " + type;

export default function Node({ row, col, type, onMouseDown, onMouseEnter }) {
  return (
    <div
      id={`${row}-${col}`}
      className={nodeClass(type)}
      onMouseDown={(e) => onMouseDown(e, row, col)}
      onMouseEnter={(e) => onMouseEnter(e, row, col)}
    ></div>
  );
}
