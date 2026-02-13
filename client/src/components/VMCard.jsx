export default function VMCard({ vm, onAction }) {
  return (
    <div className={`card ${vm.status === "UP" ? "up" : "down"}`}>
      <div className="card-header">
        <h3>{vm.name}</h3>
        <span className="status">{vm.status}</span>
      </div>

      <div className="actions">
        {vm.status === "DOWN" && (
          <button className="start" onClick={() => onAction(vm.name, "start")}>
            Start
          </button>
        )}

        {vm.status === "UP" && (
          <>
            <button
              className="shutdown"
              onClick={() => onAction(vm.name, "shutdown")}
            >
              Shutdown
            </button>
            <button
              className="reboot"
              onClick={() => onAction(vm.name, "reboot")}
            >
              Reboot
            </button>
          </>
        )}
      </div>
    </div>
  );
}
