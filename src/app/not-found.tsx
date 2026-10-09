import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-dukla-black px-6 text-center font-ag-text text-ag-pale-gray">
      <Image src="/brand/dukla-mark.webp" alt="" width={96} height={80} className="animate-glow" />
      <h1 className="m-0 font-ag-display text-ag-section">Tu je tma.</h1>
      <p className="m-0 text-ag-body text-ag-gray-500">
        Táto stránka neexistuje. Parket je ale stále otvorený.
      </p>
      <Link
        href="/"
        className="inline-flex min-h-12 items-center rounded-ag-pill bg-dukla-cyan px-7 text-[17px] font-medium text-dukla-black transition-colors hover:bg-dukla-glow"
      >
        Späť na úvod
      </Link>
    </main>
  );
}
