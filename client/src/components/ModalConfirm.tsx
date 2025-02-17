import React from "react";

interface ModalConfirmProps {
  actionType: "concluir" | "excluir"; 
  taskTitle: string; 
  onConfirm: () => void; 
  onCancel: () => void; 
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({
  actionType,
  taskTitle,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="overlay">
      <div className="modal">
        {/* Cabeçalho do Modal */}
        <div className="form-title-container">
          <h3>Confirmação</h3>
          <button onClick={onCancel}>X</button>
        </div>

        {/* Corpo do Modal */}
        <p className="modal-message">
          Você tem certeza que deseja{" "}
          <span className={`modal-status ${actionType}`}>
            {actionType === "concluir" ? "concluir" : "excluir"}
          </span>{" "}
          a tarefa "<strong>{taskTitle}</strong>"?
        </p>

        {/* Botões de Ação */}
        <div className="modal-actions">
          <button className="cancel" onClick={onCancel}>
            Cancelar
          </button>
          <button className={`confirm ${actionType}`} onClick={onConfirm}>
            {actionType === "concluir" ? "Concluir" : "Excluir"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
