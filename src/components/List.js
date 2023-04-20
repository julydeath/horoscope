import React from "react";

const List = ({ list }) => {
  return (
    <div>
      {list?.map((li) => (
        <div key={li.header}>
          <h2>{li.header}:</h2>
          <h4>{li.text}</h4>
        </div>
      ))}
    </div>
  );
};

export default List;
