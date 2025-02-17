import React, { useState } from "react";
import TickIcon from "./TickIcon";
import Modal from "./Modal";
import ProgressBar from "./ProgressBar";
import ModalConfirm from "./ModalConfirm";
import ModalView from "./ModalView";

interface Task {
  id: string;
  user_email: string;
  title: string;
  description: string;
  progress: number;
  status: "pendente" | "em progresso" | "concluída";
  date: Date;
}

interface ListItemProps {
  task: Task;
  getData: () => void;
}

const ListItem: React.FC<ListItemProps> = ({ task, getData }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  const [showViewModal, setShowViewModal] = useState<boolean>(false); // Modal de Visualização
  const [actionType, setActionType] = useState<"concluir" | "excluir" | null>(
    null
  ); // Tipo de ação selecionada

  const deleteItem = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/todos/${task.id}`,
        { method: "DELETE" }
      );
      if (response.status === 200) {
        getData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheck = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    if (checked) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVERURL}/todos/${task.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_email: task.user_email,
              title: task.title,
              description: task.description,
              progress: 100,
              date: task.date,
              status: "concluída",
            }),
          }
        );
        if (response.status === 200) {
          getData();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const isCompleted = task.status === "concluída" && task.progress === 100;

  const openConfirmationModal = (action: "concluir" | "excluir") => {
    setActionType(action);
    setShowConfirmationModal(true);
  };

  const handleConfirmation = () => {
    if (actionType === "concluir") {
      handleCheck({
        target: { checked: true },
      } as React.ChangeEvent<HTMLInputElement>);
    } else if (actionType === "excluir") {
      deleteItem();
    }
    setShowConfirmationModal(false);
  };

  const handleCancel = () => {
    setShowConfirmationModal(false);
  };

  const openViewModal = () => {
    setShowViewModal(true); // Abre o Modal de Visualização
  };

  const closeViewModal = () => {
    setShowViewModal(false); // Fecha o Modal de Visualização
  };

  return (
    <li
      className={`list-item ${isCompleted ? "completed" : ""}`}
      data-completed={isCompleted}
    >
      <div
        className={`list-item-content ${
          isCompleted ? "completed-content" : ""
        }`}
      >
        <div className="info-container">
          <TickIcon
            checked={task.progress === 100}
            onChange={() => {
              if (task.status !== "concluída") {
                openConfirmationModal("concluir");
              }
            }}
          />{" "}
          <p className="task-title">
            {task.title.length > 10
              ? `${task.title.substring(0, 10)}...`
              : task.title}
          </p>
        </div>
        <p>{task.date.toLocaleDateString()}</p>

        <div className="progres-item">
          <ProgressBar progress={task.progress} status={task.status} />
          <p className={`task-status ${task.status.replace(" ", "-")}`}>
            {task.status}
          </p>
        </div>

        <div className="button-container">
          <button className="edit" onClick={() => setShowModal(true)}>
            Editar
          </button>
          <button
            className="delete"
            onClick={() => openConfirmationModal("excluir")}
          >
            Apagar
          </button>
          <button className="view" onClick={openViewModal}>
            Ver
          </button>
        </div>
      </div>

      {showModal && (
        <Modal
          mode="Edite"
          setShowModal={setShowModal}
          getData={getData}
          task={task}
        />
      )}

      {showConfirmationModal && (
        <ModalConfirm
          actionType={actionType!}
          taskTitle={task.title}
          onConfirm={handleConfirmation}
          onCancel={handleCancel}
        />
      )}

      {/* Modal de Visualização */}
      {showViewModal && <ModalView task={task} onClose={closeViewModal} />}
    </li>
  );
};

export default ListItem;
