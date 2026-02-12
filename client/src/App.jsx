import { useEffect, useState } from 'react'

function App() {
  const [vms, setVms] = useState([])
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(null)
useEffect(() => {
  const fetchData = () => {
    fetch('http://localhost:3002/api/vms')
      .then(res => res.json())
      .then(data => setVms(data))
      .catch(err => console.error(err))
      console.log('restart')
  }

  fetchData()

const interval = setInterval(fetchData, 10000)

  return () => clearInterval(interval)
}, [])

  useEffect(() => {
    fetch('http://localhost:3002/api/vms')
      .then(res => res.json())
      .then(data => {
        setVms(data)
        setLoading(false)
        setLastUpdate(new Date())
      })
      .catch(err => {
        console.error('Error:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <h2>Loading...</h2>
  }
const styles = {
  container: {
    padding: '40px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#222221',
    minHeight: '100vh'
  },
  title: {
    marginBottom: '30px'
  },
  card: {
    backgroundColor: '#b9b9b9',
    padding: '20px',
    marginBottom: '15px',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  vmName: {
    margin: 0
  },
  status: {
    color: '#ffffff',
    padding: '6px 12px',
    borderRadius: '20px',
    fontWeight: 'bold'
  }
}
  return (
  <div style={styles.container}>
    <h1 style={styles.title}>VM Monitor</h1>
    <p>Last update: {new Date().toLocaleTimeString()}</p>
    {vms.map((vm, index) => (
      <div
        key={index}
        style={{
          ...styles.card,
          borderLeft: vm.status === 'UP'
            ? '30px solid #22c55e'
            : '30px solid #ef4444'
        }}
      >
        <h3 style={styles.vmName}>{vm.name}</h3>

        <span
          style={{
            ...styles.status,
            backgroundColor:
              vm.status === 'UP' ? '#22c55e' : '#ef4444'
          }}
        >
          {vm.status}
        </span>
      </div>
    ))}
  </div>
)

}

export default App