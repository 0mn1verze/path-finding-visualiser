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

  console.log(pathFindAlgo);

  return (
    //   <li className="nav-item dropdown">
    //   <a
    //     className="nav-link dropdown-toggle text-white"
    //     data-bs-toggle="dropdown"
    //     href="#"
    //     role="button"
    //     aria-expanded="false"
    //   >
    //     Path Find Algorithms
    //   </a>
    //   <ul className="dropdown-menu">
    //     <li>
    //       <a className="dropdown-item" href="#">
    //         Dijkstra's
    //       </a>
    //     </li>
    //     <li>
    //       <a className="dropdown-item" href="#">
    //         A*
    //       </a>
    //     </li>
    //   </ul>
    // </li>
    //   <button
    //     className=""
    //     onClick={() => visualise()}
    //     disabled={disable}
    //   >
    //     Visualise {algorithm.name}
    //   </button>
    <>
      <div className="dropdown m-2">
        <button
          className="btn btn-primary dropdown-toggle pathfind dropdown"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          disabled={disable}
        >
          {pathFindAlgo.name}
        </button>
        <ul className="dropdown-menu">
          {Object.entries(pathFindingAlgorithms).map(([key, value]) => (
            <li>
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
        className="btn btn-primary m-2 pathfind visualise"
        onClick={() => visualise()}
        disabled={disable}
      >
        Visualise {pathFindAlgo.name}
      </button>
    </>
  );
}
