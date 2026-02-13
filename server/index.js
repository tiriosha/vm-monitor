
const { exec } = require('child_process')
const express = require('express');

const app = express();
const cors = require('cors')
app.use(cors())

app.get('/', (req, res) => {
    res.send('Server is working');
});

app.get('/test', (req, res) => {
    res.send('Test route done');
});

app.get('/api/vms', (req, res) => {
    exec('virsh -c qemu:///system list --all', (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: stderr })
        }

        const lines = stdout.split('\n').slice(2).filter(line => line.trim() !== '')

        const vms = lines.map(line => {
            const parts = line.trim().split(/\s+/)
            const rawStatus = parts.slice(2).join(' ')

            let normalizedStatus = 'DOWN'

            if (
                rawStatus.includes('running') ||
                rawStatus.includes('работает')
            ) {
                normalizedStatus = 'UP'
            }
            return {
                id: parts[0] !== '-' ? parts[0] : null,
                name: parts[1],
                status: normalizedStatus
            }
        })

        res.json(vms)
    })
})
app.post('/api/vms/:name/start', (req, res) => {
    const { name } = req.params

    exec(`virsh -c qemu:///system start ${name}`, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: stderr })
        }

        res.json({ message: `${name} started` })
    })
})

app.post('/api/vms/:name/shutdown', (req, res) => {
    const { name } = req.params

    exec(`virsh -c qemu:///system shutdown ${name}`, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: stderr })
        }

        res.json({ message: `${name} shutting down` })
    })
})

app.post('/api/vms/:name/reboot', (req, res) => {
    const { name } = req.params

    exec(`virsh -c qemu:///system reboot ${name}`, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: stderr })
        }

        res.json({ message: `${name} rebooting` })
    })
})
app.listen(3002, () => {
    console.log('Server started on port 3002');
});

