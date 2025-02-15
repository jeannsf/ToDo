import React from 'react';
import { FaCheckSquare } from 'react-icons/fa';

interface ListHeaderProps {
  listName: string;
}

const ListHeader: React.FC<ListHeaderProps> = ({ listName }) => {
  return (
    <div className="list-header">
      <FaCheckSquare className="list-header-icon" size={30} />
      <h1 className="list-header-title">{listName}</h1>
    </div>
  );
};

export default ListHeader;
