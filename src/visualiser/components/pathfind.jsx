import { pathFindingAlgorithms } from "../../scripts/algorithms";

export default function PathFind({
  board,
  setBoard,
  visualState,
  setVisualState,
  animation,
  pathFindAlgo,
  setPathFindAlgo,
}) {
  function visualise() {
    if (visualState.generatingResult) return;
    setVisualState({
      ...visualState,
      generatingResult: true,
      solved: false,
    });
    animation.update(board);
    animation.visualise(pathFindAlgo.algorithm);
  }

  let disable = visualState.generatingResult || visualState.generatingMaze;

  return (
    <>
      <div className="dropdown m-2">
        <button
          id="menu-btn"
          className="btn btn-primary dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          disabled={disable}
        >
          Algorithms
        </button>
        <ul className="dropdown-menu">
          {Object.entries(pathFindingAlgorithms).map(([key, value]) => (
            <li key={key}>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => setPathFindAlgo(value)}
              >
                {value.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <button
        id="menu-btn"
        className="btn btn-primary m-2"
        onClick={() => visualise()}
        disabled={disable}
      >
        Visualise {pathFindAlgo.name}
      </button>
    </>
  );
}
