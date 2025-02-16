import React, { useState } from "react";
import TickIcon from "./TickIcon";
import Modal from "./Modal";
import ProgressBar from "./ProgressBar";

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
              status: "concluída"    
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

  return (
    <li className="list-item">
      <div className="info-container">
        <TickIcon checked={task.progress === 100} onChange={handleCheck} />
        <p className="task-title">{task.title}</p>
        <ProgressBar progress={task.progress} />
        <p className={`task-status ${task.status.replace(" ", "-")}`}>
          {task.status}
        </p>
      </div>

      <div className="button-container">
        <button className="edit" onClick={() => setShowModal(true)}>
          Editar
        </button>
        <button className="delete" onClick={deleteItem}>
          Apagar
        </button>
      </div>
      {showModal && (
        <Modal
          mode="edite"
          setShowModal={setShowModal}
          getData={getData}
          task={task}
        />
      )}
    </li>
  );
};

export default ListItem;
