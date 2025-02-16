import React from 'react';
import { FaCheckSquare } from 'react-icons/fa';

interface ListHeaderProps {
  listName: string;
}

const ListHeader: React.FC<ListHeaderProps> = ({ listName }) => {
const signOut = () => {
  console.log('signout')
};


  return (
    <div className="list-header">
      <h1 className="list-header-title">
        <FaCheckSquare className="list-header-icon" size={30} /> {listName}
      </h1>
      <div className='button-container'>

      <button className="create">Adicionar</button>
      <button className='signout' onClick={signOut}>Sair</button>
      </div>
    </div>
  );
};

export default ListHeader;
