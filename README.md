# Python Linux

```shell
poetry env use /usr/bin/python3.11
poetry install
```

# WSL network

powershell admin

Посмотреть ip на Linux WSL

```shell
ip addr
```

Посмотреть ip на Windows

```powershell
ipconfig
```

```powershell
netsh interface portproxy show v4tov4
```

```powershell
netsh interface portproxy add v4tov4 listenport=5173 listenaddress=0.0.0.0 connectport=5173 connectaddress=172.22.154.223
```

```powershell
netsh interface portproxy delete v4tov4 listenport=3000 listenaddress=localhost
netsh interface portproxy delete v4tov4 listenport=80 listenaddress=localhost
```

Открыть порты в FireWall windows

```powershell
New-NetFirewallRule -Name "WSL Ports" -DisplayName "Allow WSL Ports" -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 3000-6000
```

## Bun

### обновить пакеты

```shell

```
