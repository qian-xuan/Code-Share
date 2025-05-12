import { Tag } from "antd";
import React from "react";

const Tags: React.FC<{ tags: string[] }> = ({tags}) => {
  tags;
  return (
    <>
      {tags.map((tag, index) => (
        <Tag key={index} color="blue" className="rounded-xl">
          {tag}
        </Tag>
      ))}
    </>
  );
};

export default Tags;