import React from "react";
import { useCookies } from "react-cookie";

interface ListHeaderProps {
  listName: string;
  getData: () => void;
  setShowModal: (show: boolean) => void; 
  email: string;
}

const ListHeader: React.FC<ListHeaderProps> = ({ listName, getData, setShowModal, email }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["Email", "AuthToken"]);

  const signOut = (): void => {
    console.log("signout");
    removeCookie("Email");
    removeCookie("AuthToken");
    window.location.reload();
  };

  return (
    <div className="list-header">
      <div className="listheader-content">
        <h1>{listName}</h1> 
        <p className="user-email">Bem-Vindo {email}</p>
      </div>
      <div className="button-container">
        <button className="create" onClick={() => setShowModal(true)} style={{ color: "black" }}>
          Adicionar
        </button>
        <button className="signout" onClick={signOut}>
          Sair
        </button>
      </div>
    </div>
  );
};

export default ListHeader;