import "../style/node.css";

const nodeClass = (type) => "node " + type;

export default function Node({
  row,
  col,
  type,
  onMouseDown,
  onMouseEnter,
  onPointerDown,
  onPointerEnter,
  onPointerUp,
}) {
  return (
    <div
      id={`${row}-${col}`}
      className={nodeClass(type)}
      onMouseDown={(e) => onMouseDown(e, row, col)}
      onMouseEnter={(e) => onMouseEnter(e, row, col)}
      onPointerDown={(e) => onPointerDown(e, row, col)}
      onPointerEnter={(e) => onPointerEnter(e, row, col)}
      onPointerUp={onPointerUp}
    ></div>
  );
}
