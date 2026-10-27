"use client";

export default function ErrorPage({ retry }: { error: unknown; retry: () => void }) {
  return (
    <section className="panel state">
      <h1>Algo deu errado</h1>
      <p className="muted">Não foi possível carregar os dados. Verifique se a API está no ar.</p>
      <button type="button" className="button button--primary" onClick={() => retry()}>
        Tentar novamente
      </button>
    </section>
  );
}
