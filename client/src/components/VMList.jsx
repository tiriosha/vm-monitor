import VMCard from "./VMCard";

export default function VMList({ vms, onAction }) {
  return (
    <div className="vm-list">
      {vms.map((vm) => (
        <VMCard key={vm.name} vm={vm} onAction={onAction} />
      ))}
    </div>
  );
}
