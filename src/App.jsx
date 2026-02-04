export default function App() {
  return (
    <main className="page">
      <section className="card">
        <p className="eyebrow">Cloudflare R2 + VPS + Docker</p>
        <h1>Vite React Test Project</h1>
        <p className="copy">
          This is a simple frontend build that can be uploaded to R2 and also
          served from a Dockerized Nginx container on your VPS.
        </p>
        <div className="row">
          <a className="button" href="https://cloudflare.com" target="_blank" rel="noreferrer">
            Cloudflare
          </a>
          <a className="button ghost" href="https://vitejs.dev" target="_blank" rel="noreferrer">
            Vite
          </a>
        </div>
      </section>
    </main>
  );
}
