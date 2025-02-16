import { useEffect, useState } from "react";
import ListItem  from "./components/ListItem";
import ListHeader from "./components/ListHeader";

type Task = {
  id: number;
  date: string;
  title: string;
  completed: boolean;
};


const App: React.FC = () => {
  const userEmail: string = 'usuario@exemplo.com';
  const [tasks, setTasks] = useState<Task[]>([]); 

  const getData = async (): Promise<void> => {
    try {
      const response: Response = await fetch(`http://localhost:8000/todos/${userEmail}`);
      const json: any = await response.json(); 
      setTasks(json);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(tasks);

  //Sort by Date
  const sortedTasks: Task[] = [...tasks].sort(
    (a: Task, b: Task) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="app">
      <ListHeader listName="To do list App" />
      {sortedTasks.map((task) => (
        <div key={task.id}>
          <p>{task.title} - {task.date}</p>
        </div>
      ))}
    </div>
  );
};


export default App;
