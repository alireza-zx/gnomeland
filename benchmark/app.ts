import gnome, { type GnomeRequest, type GnomeResponse, type Next } from 'gnomeland';

const app = gnome.craftApp({
  parseBody: true,
  parseCookies: true
});

app.middleware((req: GnomeRequest, res: GnomeResponse, next: Next) => { next() });
app.middleware((req: GnomeRequest, res: GnomeResponse, next: Next) => { next() });
app.middleware((req: GnomeRequest, res: GnomeResponse, next: Next) => { next() });
app.middleware((req: GnomeRequest, res: GnomeResponse, next: Next) => { next() });
app.middleware((req: GnomeRequest, res: GnomeResponse, next: Next) => { next() });
app.middleware((req: GnomeRequest, res: GnomeResponse, next: Next) => { next() });
app.middleware((req: GnomeRequest, res: GnomeResponse, next: Next) => { next() });
app.middleware((req: GnomeRequest, res: GnomeResponse, next: Next) => { next() });
app.middleware((req: GnomeRequest, res: GnomeResponse, next: Next) => { next() });
app.middleware((req: GnomeRequest, res: GnomeResponse, next: Next) => { next() });
app.middleware((req: GnomeRequest, res: GnomeResponse, next: Next) => { next() });
app.middleware((req: GnomeRequest, res: GnomeResponse, next: Next) => { next() });
app.middleware((req: GnomeRequest, res: GnomeResponse, next: Next) => { next() });
app.middleware((req: GnomeRequest, res: GnomeResponse, next: Next) => { next() });
app.middleware((req: GnomeRequest, res: GnomeResponse, next: Next) => { next() });
app.middleware((req: GnomeRequest, res: GnomeResponse, next: Next) => { next() });
app.middleware((req: GnomeRequest, res: GnomeResponse, next: Next) => { next() });
app.middleware((req: GnomeRequest, res: GnomeResponse, next: Next) => { next() });
app.middleware((req: GnomeRequest, res: GnomeResponse, next: Next) => { next() });
app.middleware((req: GnomeRequest, res: GnomeResponse, next: Next) => { next() });
app.middleware((req: GnomeRequest, res: GnomeResponse, next: Next) => { next() });
app.middleware((req: GnomeRequest, res: GnomeResponse, next: Next) => { next() });
app.middleware((req: GnomeRequest, res: GnomeResponse, next: Next) => { next() });
app.middleware((req: GnomeRequest, res: GnomeResponse, next: Next) => { next() });
app.middleware((req: GnomeRequest, res: GnomeResponse, next: Next) => { next() });
app.middleware((req: GnomeRequest, res: GnomeResponse, next: Next) => { next() });
app.middleware((req: GnomeRequest, res: GnomeResponse, next: Next) => { next() });
app.middleware((req: GnomeRequest, res: GnomeResponse, next: Next) => { next() });
app.middleware((req: GnomeRequest, res: GnomeResponse, next: Next) => { next() });
app.middleware((req: GnomeRequest, res: GnomeResponse, next: Next) => { next() });
app.middleware((req: GnomeRequest, res: GnomeResponse, next: Next) => { next() });
app.middleware((req: GnomeRequest, res: GnomeResponse, next: Next) => { next() });
app.middleware((req: GnomeRequest, res: GnomeResponse, next: Next) => { next() });
app.middleware((req: GnomeRequest, res: GnomeResponse, next: Next) => { next() });
app.middleware((req: GnomeRequest, res: GnomeResponse, next: Next) => { next() });
app.middleware((req: GnomeRequest, res: GnomeResponse, next: Next) => { next() });
app.middleware((req: GnomeRequest, res: GnomeResponse, next: Next) => { next() });
app.middleware((req: GnomeRequest, res: GnomeResponse, next: Next) => { next() });
app.middleware((req: GnomeRequest, res: GnomeResponse, next: Next) => { next() });
app.middleware((req: GnomeRequest, res: GnomeResponse, next: Next) => { next() });
app.middleware((req: GnomeRequest, res: GnomeResponse, next: Next) => { next() });

app.get('/1', (req: GnomeRequest, res: GnomeResponse) => { res.end() });
app.get('/2', (req: GnomeRequest, res: GnomeResponse) => { res.end() });
app.get('/3', (req: GnomeRequest, res: GnomeResponse) => { res.end() });
app.get('/4', (req: GnomeRequest, res: GnomeResponse) => { res.end() });
app.get('/5', (req: GnomeRequest, res: GnomeResponse) => { res.end() });
app.get('/6', (req: GnomeRequest, res: GnomeResponse) => { res.end() });
app.get('/7', (req: GnomeRequest, res: GnomeResponse) => { res.end() });
app.get('/8', (req: GnomeRequest, res: GnomeResponse) => { res.end() });
app.get('/9', (req: GnomeRequest, res: GnomeResponse) => { res.end() });
app.get('/10', (req: GnomeRequest, res: GnomeResponse) => { res.end() });
app.get('/11', (req: GnomeRequest, res: GnomeResponse) => { res.end() });
app.get('/12', (req: GnomeRequest, res: GnomeResponse) => { res.end() });
app.get('/13', (req: GnomeRequest, res: GnomeResponse) => { res.end() });
app.get('/14', (req: GnomeRequest, res: GnomeResponse) => { res.end() });
app.get('/15', (req: GnomeRequest, res: GnomeResponse) => { res.end() });
app.get('/16', (req: GnomeRequest, res: GnomeResponse) => { res.end() });
app.get('/17', (req: GnomeRequest, res: GnomeResponse) => { res.end() });
app.get('/18', (req: GnomeRequest, res: GnomeResponse) => { res.end() });
app.get('/19', (req: GnomeRequest, res: GnomeResponse) => { res.end() });
app.get('/20', (req: GnomeRequest, res: GnomeResponse) => { res.end() });
app.get('/21', (req: GnomeRequest, res: GnomeResponse) => { res.end() });
app.get('/22', (req: GnomeRequest, res: GnomeResponse) => { res.end() });
app.get('/23', (req: GnomeRequest, res: GnomeResponse) => { res.end() });

app.get('/:name', (req: GnomeRequest, res: GnomeResponse) => {
  res.text(`Hello ${req.params.name}`);
});


app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});


// I got around 12k RPS on my computer with this app that has a lot of middlewares and routes
// but my computer is old and slow, try it yourself to find out gnomeland's real speed!😉
// I recommend autocannon to benchmark