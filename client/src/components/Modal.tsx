import React, { useState } from "react";
import { useCookies } from "react-cookie";

interface Task {
  id: string;
  user_email: string;
  title: string;
  description: string;
  progress: number;
  status: "pendente" | "em progresso" | "concluída";
  date: Date;
}

interface ModalProps {
  mode: "edite" | "Crie";
  setShowModal: (value: boolean) => void;
  getData: () => void;
  task?: Task;
}

interface Data {
  user_email: string;
  title: string;
  description: string;
  progress: number;
  status: "pendente" | "em progresso" | "concluída";
  date: Date;
}

const Modal: React.FC<ModalProps> = ({ mode, setShowModal, getData, task }) => {

  const [cookies, setCookie, removeCookie] = (useCookies([]) as unknown) as [
    { Email: string },
    (name: string, value: any, options?: any) => void,
    (name: string, options?: any) => void,
    unknown
  ];

  const editMode = mode === "edite" ? true : false;

  const [data, setData] = useState<Data>({
    user_email: editMode && task ? task.user_email : cookies.Email,
    title: editMode && task ? task.title : "",
    description: editMode && task ? task.description : "",
    progress: editMode && task ? task.progress : 50,
    status: editMode && task ? task.status : "pendente",
    date: editMode && task ? task.date : new Date(),
  });

  console.log("Server URL:", process.env.REACT_APP_SERVERURL);

  const postData = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/todos`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (response.status === 200) {
        console.log("WORKED");
        setShowModal(false);
        getData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const editData = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/todos/${task?.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (response.status === 200) {
        setShowModal(false);
        getData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData((prevData) => {
      let newData = {
        ...prevData,
        [name]: name === "progress" ? Number(value) : value,
      };
  
      if (name === "progress") {
        const progressValue = Number(value);
        if (progressValue === 0) {
          newData.status = "pendente";
        } else if (progressValue === 100) {
          newData.status = "concluída";
        } else {
          newData.status = "em progresso";
        }
      }
  
      return newData;
    });
  };
  
  

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>{mode} Sua Atividade</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>

        <form>
          <input
            required
            maxLength={30}
            placeholder="Sua Tarefa Vai Aqui"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
          <br />

          {/* Input para descrição */}
          <input
            required
            maxLength={100}
            placeholder="Descrição da Tarefa"
            name="description"
            value={data.description}
            onChange={handleChange}
          />
          <br />

          <label htmlFor="range">Arraste e selecione seu progresso</label>
          <br />
          {/* Input para progresso */}
          <input
            required
            type="range"
            id="range"
            min="0"
            max="100"
            name="progress"
            value={data.progress}
            onChange={handleChange}
          />
          <br />

          <label htmlFor="status">Status</label>
          <br />
          <input
            id="status"
            name="status"
            value={data.status}
            readOnly
          />
          <br />
          <input
            className={mode}
            type="submit"
            onClick={editMode ? editData : postData}
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;
