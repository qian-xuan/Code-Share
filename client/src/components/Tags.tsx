import { Tag } from "antd";
import React from "react";

const Tags: React.FC<{ tags: string[] }> = ({tags}) => {
  tags;
  return (
    <div>
      {tags.map((tag, index) => (
        <Tag key={index} color="blue" className="rounded-xl">
          {tag}
        </Tag>
      ))}
    </div>
  );
};

export default Tags;