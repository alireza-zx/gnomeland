<p align="center">
<img src="https://nodejs.org/static/images/logo.svg" alt="Node.js">
</p>

# 🧙‍♂️ GnomeLand
A Node.js framework for rapid http application development
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
import gnome from 'gnomeland';

const app = gnome.craftApp({ parseBody: { limit: 5000 }, parseCookies: true }); // 5000 bytes == 5kb

app.middleware((req, res, next) => {
  console.log(`> New request hit server: ${req.method} - ${req.path}`);
  next();
});

app.get('/', (req, res) => {
  res.status(200).text('Hello World');
});

app.post('/api/posts', authMiddleware, userMiddleware, routeHandler);

app.post('/api/login', (req, res, next) => {
  if (req.body.password !== 'pass1234')
    return next({ statusCode: 401, message: 'Unauthorized' });

  res.status(200).json({ message: 'successfully logged in!' });
});

app.error((err, req, res) => {
  console.log(`> Error! :\n`, err);
  res.status(err.statusCode).json({ status: 'error', message: err.message });
});

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