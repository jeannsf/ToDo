import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";

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

  const getData = async (): Promise<void> => {
    if (!userEmail) return;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`
      );
      const json: any = await response.json();
      // Converte a propriedade 'date' de string para Date
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

  console.log(tasks);

  // Ordena as tarefas por data
  const sortedTasks: Task[] | undefined = tasks?.sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );

  return (
    <div className="app">
      {!authToken && <Auth />}
      {authToken && (
        <>
          <ListHeader listName="To do List" getData={getData} />
          <p className="user-email">Bem-Vindo {userEmail}</p>
          {sortedTasks?.map((task) => (
            <ListItem key={task.id} task={task} getData={getData} />
          ))}
        </>
      )}
      <p className="copyright">© Jean</p>
    </div>
  );
};

export default App;
