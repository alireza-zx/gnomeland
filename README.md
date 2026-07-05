<p align="center">
<img src="https://nodejs.org/static/images/logo.svg" alt="Node.js">
</p>

![Node.js](https://img.shields.io/badge/Node.js-v22.x-5FA04E?logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)
  
# 🧙‍♂️ GnomeLand
A Node.js web framework for rapid http application development
---

## 🧭 Features
- Add route handlers and middlewares to a specific path and method
- Add middlewares globally for all routes
- Get parsed body in json and buffer form
- Get query parameters in object form
- Get extra methods on response object such as sendFile, download, json, status, text, etc
- JSDoc included
- Automatically forbid undefined routes
- Send cookies easily with res.setCookie
- Get cookies in req.cookies, in a nice object form

## Example
```ts
import gnome { type GnomeRequest, type GnomeResponse, type Next } from 'gnomeland';

// Crafting the Gnome app 🔨
const app = gnome.craftApp({ parseBody: true, parseCookies: true });

// Adding middlewares
app.middleware((req: GnomeRequest, res: GnomeResponse, next: Next) => {
  console.log(`> New request hit server: ${req.method} - ${req.path}`);
  next();
});

// Adding routes
app.get('/', (req: GnomeRequest, res: GnomeResponse) => {
  res.status(200).text('Hello World');
});

function auth(req: GnomeRequest, res: GnomeResponse, next: Next) {
  if (req.cookies.token !== 'GodIsTheBest') {
    return next({ statusCode: 401, message: "Unauthorized" });
  }

  next();
}

function createPost(req: GnomeRequest, res: GnomeResponse, next: Next) {
  if (req.body.title && req.body.description) {
    // ...
    return res.status(201).json({ message: "Post created successfully!" });
  } else next({ statusCode: 400, message: "Please provide title and description!" });
}

app.post('/api/posts', auth, createPost);

// Handling errors properly and in a centralized way
app.error((err: any, req: GnomeRequest, res: GnomeResponse) => {
  console.log(`> Error! :\n`, err);
  res.status(err.statusCode).json({ status: 'error', message: err.message });
});

// Starting the server
app.listen(3000, () => console.log('server running on port 3000'));

```

## 🔧 Installation
- Install using npm
```bash
npm i gnomeland
```

- Clone the project
```bash
git clone https://github.com/alireza-zx/gnomeland.git
cd gnomeland
npm i
npm run build
```