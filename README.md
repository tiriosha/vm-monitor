# VM Monitor

Simple fullstack application for monitoring virtual machines health.

## 🚀 Tech Stack

- Backend: Node.js + Express
- Frontend: React (Vite)
- API: REST (JSON)

---

## 📦 Project Structure

vm-monitor/
├── server/ # Express backend
├── client/ # React frontend
└── README.md


---

## 🔧 Backend Setup

```bash
cd server
npm install
npm run dev
Server runs on:

http://localhost:3002/api/vms
💻 Frontend Setup
cd client
npm install
npm run dev
Frontend runs on:

http://localhost:5173
🔄 Features
Fetch VM health status from API

Auto refresh every 5 seconds

Visual status indicator (UP / DOWN)
## ⚙️ VM Management

- Start virtual machine
- Shutdown virtual machine
- Reboot virtual machine
- Real-time status refresh (5s)

VM control is powered by:

virsh -c qemu:///system

---

## 🧠 Architecture

React → Express → virsh → libvirt (qemu:///system) → KVM

---

## 📊 Next Steps

- Extended VM statistics (CPU / RAM via virsh domstats)
- Deployment with systemd
- Docker containerization


