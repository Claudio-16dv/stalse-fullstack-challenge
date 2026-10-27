import Link from "next/link";

export default function NotFound() {
  return (
    <section className="panel state">
      <h1>Página não encontrada</h1>
      <p className="muted">O endereço acessado não existe.</p>
      <Link href="/tickets" className="button button--primary">
        Voltar para tickets
      </Link>
    </section>
  );
}
