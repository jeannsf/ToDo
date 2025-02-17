import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import Modal from "./components/Modal";

interface Task {
  id: string;
  user_email: string;
  title: string;
  description: string;
  progress: number;
  status: "pendente" | "em progresso" | "concluída";
  date: Date;
}

const App: React.FC = () => {
  const [cookies] = useCookies(["AuthToken", "Email"]);
  const authToken: string | undefined = cookies.AuthToken;
  const userEmail: string | undefined = cookies.Email;
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const getData = async (): Promise<void> => {
    if (!userEmail) return;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`
      );
      const json: any = await response.json();
      const tasksConverted: Task[] = json.map((task: any) => ({
        ...task,
        date: new Date(task.date),
      }));
      setTasks(tasksConverted);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, [authToken]);

  // Filter tasks based on search term
  const filteredTasks = tasks?.filter((task) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      task.title.toLowerCase().includes(searchLower) ||
      task.description.toLowerCase().includes(searchLower) ||
      task.status.toLowerCase().includes(searchLower)
    );
  });

  // Sort filtered tasks by date
  const sortedTasks: Task[] | undefined = filteredTasks?.sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );

  return (
    <div className="app">
      {!authToken && <Auth />}
      {authToken && (
        <>
          <div className="tasks-container">
            <ListHeader
              listName="Lista de Tarefas"
              getData={getData}
              setShowModal={setShowModal}
              email={userEmail || ""}
            />
            <div className="input-container">
              <input
                type="text"
                placeholder="Pesquisar tarefas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {sortedTasks?.length === 0 ? (
              <p className="status-text">Nenhuma tarefa encontrada</p>
            ) : (
              sortedTasks?.map((task) => (
                <ListItem key={task.id} task={task} getData={getData} />
              ))
            )}
          </div>
          {showModal && (
            <Modal
              mode="Crie"
              setShowModal={setShowModal}
              getData={getData}
            />
          )}
        </>
      )}
      <p className="copyright">© Jean</p>
    </div>
  );
};

export default App;