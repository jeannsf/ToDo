import React from "react";


interface ModalViewProps {
  task: {
    title: string;
    description: string;
    progress: number;
    status: "pendente" | "em progresso" | "concluída";
    date: Date;
  };
  onClose: () => void;
}

const ModalView: React.FC<ModalViewProps> = ({ task, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Cabeçalho do Modal */}
        <header className="modal-header">
          <h2>Visualizar Tarefa</h2>
          <button onClick={onClose} className="modal-close-btn" aria-label="Fechar modal">
            &times;
          </button>
        </header>

        {/* Corpo do Modal */}
        <main className="modal-body">
          <div className="modal-item">
            <span className="modal-label">Título:</span>
            <p className="modal-content">{task.title}</p>
          </div>
          <div className="modal-item">
            <span className="modal-label">Descrição:</span>
            <p className="modal-content">{task.description}</p>
          </div>
          <div className="modal-item">
            <span className="modal-label">Progresso:</span>
            <p className="modal-content">{task.progress}%</p>
          </div>
          <div className="modal-item">
            <span className="modal-label">Status:</span>
            <p
              className={`modal-status ${
                task.status === "pendente"
                  ? "pendente"
                  : task.status === "em progresso"
                  ? "progresso"
                  : task.status === "concluída"
                  ? "concluida"
                  : ""
              }`}
            >
              {task.status === "pendente"
                ? "Pendente"
                : task.status === "em progresso"
                ? "Em Progresso"
                : "Concluída"}
            </p>
          </div>
          <div className="modal-item">
            <span className="modal-label">Data:</span>
            <p className="modal-content">{task.date.toLocaleDateString()}</p>
          </div>
        </main>

        {/* Rodapé do Modal */}
        <footer className="modal-footer">
          <button onClick={onClose} className="modal-close-action">
            Fechar
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ModalView;
