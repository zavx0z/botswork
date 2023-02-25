## BotsWork web app

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
#  --path "%PUBLIC_URL%" \
