import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pt-4 pb-10 px-8 sm:pt-0 sm:px-20 sm:pb-10 gap-10 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 sm:items-center">
        <Image
          src="/Investment.svg"
          alt="Next.js logo"
          width={250}
          height={38}
          priority
        />
        <p className="list-inside list-decimal font-semibold text-sm/6 text-center m-10 sm:text-left font-[family-name:var(--font-geist-mono)]">
          Bem-vindo ao seu gerenciador de clientes!
          Aqui você pode visualizar todas as informações importantes dos seus clientes e editá-las facilmente. Vamos juntos organizar seus contatos de forma prática e rápida! Comece escolhendo o que gostaria de visualizar.
        </p>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#6e2194] dark:hover:bg-[#dbbfff] dark:hover:text-[#171717] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="/clientes"
          >
            Clientes
          </a>
          <a
            className="rounded-full dark:hover:text-[#171717] border border-solid border-black/[.5] dark:border-white/[.5] transition-colors flex items-center justify-center hover:bg-[#dbbfff] dark:hover:bg-[#994ecf] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[178px]"
            href="/ativos"
          >
            Ativos financeiros
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] text-xs flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/Camilay3"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/github.svg"
            alt="Github icon"
            width={16}
            height={16}
          />
          Github
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.linkedin.com/in/camila-azevedo-7a9b9b354/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/linkedin.svg"
            alt="Linkedin icon"
            width={16}
            height={16}
          />
          Linkedin
        </a>
      </footer>
    </div>
  );
}
