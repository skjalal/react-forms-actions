import React from "react";

import Opinion from "./Opinion.tsx";
import { useOpinion } from "../store/opinions-context.tsx";

const Opinions: React.FC = () => {
  const { opinions } = useOpinion();

  return (
    <div id="opinions">
      <h2>User Opinions</h2>
      {opinions && (
        <ul>
          {opinions.map((o) => (
            <li key={o.id}>
              <Opinion opinion={o} />
            </li>
          ))}
        </ul>
      )}
      {!opinions && (
        <p>No opinions found. Maybe share your opinion on something?</p>
      )}
    </div>
  );
};

export default Opinions;
