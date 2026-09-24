# Muhammad Saim Ayan — AI Engineering Portfolio

A responsive portfolio for junior AI engineer Muhammad Saim Ayan. It presents his background, technical skills, and projects, including FaceWell AI Suite and PulmoVision, a chest X-ray pneumonia classifier built with PyTorch and TorchVision. The site is static HTML, CSS, and JavaScript.

## Preview locally

From this directory:

```powershell
cd webapp
npm install
npm run dev
```

## Deploy

The site lives in `webapp/`, which is the Cloudflare Pages app directory. The Vite build outputs to `webapp/dist`, as configured in `wrangler.jsonc`.

```powershell
cd webapp
npm install
npm run build
```

To publish with Wrangler, authenticate with Cloudflare and run:

```powershell
npm run deploy
```

The repository keeps its existing Cloudflare Pages configuration and MIT license. Contact and social destinations are defined in `webapp/index.html`.
