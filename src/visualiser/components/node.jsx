import "../style/node.css";

const nodeClass = (type) => "node " + type;

export default function Node({
  row,
  col,
  type,
  onPointerDown,
  onPointerEnter,
  onPointerUp,
}) {
  return (
    <div
      id={`${row}-${col}`}
      className={nodeClass(type)}
      onPointerDown={(e) => onPointerDown(e, row, col)}
      onPointerEnter={(e) => onPointerEnter(e, row, col)}
      onPointerUp={onPointerUp}
    ></div>
  );
}
