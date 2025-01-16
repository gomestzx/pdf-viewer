import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="font-lexend font-light">
        <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
          <nav className="flex flex-wrap justify-center -mx-5 -my-2">
            <div className="px-5 py-2">
              <a href="/" className="text-base leading-6 text-white ">
                Sobre nós
              </a>
            </div>
            <div className="px-5 py-2">
              <a href="/" className="text-base leading-6 text-white ">
                Blog
              </a>
            </div>

            <div className="px-5 py-2">
              <a href="/" className="text-base leading-6 text-white ">
                Contato
              </a>
            </div>
            <div className="px-5 py-2">
              <a href="/" className="text-base leading-6 text-white ">
                Termos e Condições
              </a>
            </div>
          </nav>
          <p className="mt-8 text-base leading-6 text-center text-white">
            © 2025 livrosgratuitos.com Todos os direitos reservados.
          </p>
        </div>
        <div className=" border-t-2 border-gray-500 pb-16 lg:pb-4">
          <p className=" text-white py-3">
            O{" "}
            <a href="https://livrosgratuitos.com" className="border-b-2  border-main-400 inline-block">
              livrosgratuitos.com
            </a>{" "}
            é uma iniciativa dedicada a democratizar a cultura, oferecendo
            acesso gratuito a uma vasta coleção de livros de domínio público.
            Nosso objetivo é levar conhecimento e literatura a todos, sem
            custos, disponibilizando clássicos e obras importantes de forma
            acessível.{" "}
          </p>
        </div>
      </footer>
    </>
  );
}
