import { useEffect, useState } from "react";
import VMList from "./components/VMList";
import "./index.css";

function App() {
  const [vms, setVms] = useState([]);

  const fetchData = async () => {
    const res = await fetch("http://localhost:3002/api/vms");
    const data = await res.json();
    setVms(data);
  };

  const handleAction = async (name, action) => {
    await fetch(`http://localhost:3002/api/vms/${name}/${action}`, {
      method: "POST",
    });
    fetchData();
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h1>VM Monitor</h1>
      <VMList vms={vms} onAction={handleAction} />
    </div>
  );
}

export default App;
