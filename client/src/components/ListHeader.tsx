import React, { useState } from 'react'
import Modal from './Modal'
import { useCookies } from 'react-cookie'

interface ListHeaderProps {
  listName: string
  getData: () => void
}

const ListHeader: React.FC<ListHeaderProps> = ({ listName, getData }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['Email', 'AuthToken'])
  const [showModal, setShowModal] = useState<boolean>(false)

  const signOut = (): void => {
    console.log('signout')
    removeCookie('Email')
    removeCookie('AuthToken')
    window.location.reload()
  }

  return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div className="button-container">
        <button className="create" onClick={() => setShowModal(true)}>
          Adicionar
        </button>
        <button className="signout" onClick={signOut}>
          Sair
        </button>
      </div>
      {showModal && (
        <Modal
          mode="Crie"
          setShowModal={setShowModal}
          getData={getData}
        />
      )}
    </div>
  )
}

export default ListHeader
