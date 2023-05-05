## ElectronBotsWork web app

!['img'](public/img/apple-icon-180.png)

### generate favicon, icons and splash screen

```bash
npx pwa-asset-generator src/images/logo.svg public/img \
  --favicon \
  --index public/index.html \
  --manifest public/manifest.json \
  -b "transparent" \
  -o false 
```

### i18next

```bash
https://api.i18nexus.com/project_resources/translations/de/default.json?api_key=mWraj9wt4Y4906lt2iFujQ
```
### PWA
[blog](https://blog.logrocket.com/pwa-create-react-app-service-workers/)


### Установка сертификата
```shell
sudo apt install libnss3-tools -y
sudo apt install mkcert
mkcert -install

```