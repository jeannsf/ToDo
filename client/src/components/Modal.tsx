import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
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
  mode: "Edite" | "Crie";
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
  const [cookies] = useCookies(["Email"]);
  const editMode = mode === "Edite";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Data>({
    defaultValues: {
      user_email: editMode && task ? task.user_email : cookies.Email,
      title: editMode && task ? task.title : "",
      description: editMode && task ? task.description : "",
      progress: editMode && task ? task.progress : 50,
      status: editMode && task ? task.status : "pendente",
      date: editMode && task ? task.date : new Date(),
    },
  });

  const progressValue = watch("progress");
  const getStatusFromProgress = (progress: number): Data["status"] => {
    if (progress === 0) return "pendente";
    else if (progress === 100) return "concluída";
    else return "em progresso";
  };

  const currentStatus = getStatusFromProgress(progressValue);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendente":
        return "red";
      case "em progresso":
        return "orange";
      case "concluída":
        return "green";
      default:
        return "black";
    }
  };

  const onSubmit: SubmitHandler<Data> = async (formData) => {
    const updatedData: Data = {
      ...formData,
      status: getStatusFromProgress(formData.progress),
    };

    try {
      if (editMode) {
        const response = await fetch(
          `${process.env.REACT_APP_SERVERURL}/todos/${task?.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
          }
        );
        if (response.status === 200) {
          setShowModal(false);
          getData();
        }
      } else {
        const response = await fetch(
          `${process.env.REACT_APP_SERVERURL}/todos`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
          }
        );
        if (response.status === 200) {
          setShowModal(false);
          getData();
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>{mode} Sua Atividade</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Campo oculto para o email do usuário */}
          <input type="hidden" {...register("user_email")} />

          <input
            required
            maxLength={30}
            placeholder="Sua Tarefa Vai Aqui"
            {...register("title", { required: true, maxLength: 30 })}
          />
          {errors.title && <span>Este campo é obrigatório</span>}
          <br />

          <input
            required
            maxLength={100}
            placeholder="Descrição da Tarefa"
            {...register("description", { required: true, maxLength: 100 })}
          />
          {errors.description && <span>Este campo é obrigatório</span>}
          <br />

          <label htmlFor="range">Arraste e selecione seu progresso</label>
          <br />
          <input
            required
            type="range"
            id="range"
            min="0"
            max="100"
            {...register("progress", { required: true, valueAsNumber: true })}
            style={{ marginBottom: "0px" }}
          />
          <div className="status-text">
            <label style={{ color: getStatusColor(currentStatus) }}>
              {currentStatus}
            </label>
          </div>

          <input
            className={mode}
            type="submit"
            value={editMode ? "Editar Tarefa" : "Criar Tarefa"}
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;
