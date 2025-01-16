import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import SEO from "../components/SEO";
import { useFetchPDFs } from "../hooks/useFetchPDFs";
import Footer from "../components/Footer/Footer";

const Skeleton = () => (
  <div className="animate-pulse flex-shrink-0 w-40 h-64 bg-gray-700 rounded-md"></div>
);

const Home = () => {
  const { PDFs, isLoading } = useFetchPDFs();
  const [imageLoaded, setImageLoaded] = useState({});

  const handleImageLoad = (id) => {
    setImageLoaded((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <>
      <SEO
        title="Livros gratuitos em PDF"
        description="Descubra uma vasta coleção de livros em PDF de domínio público, totalmente gratuitos e disponíveis para todos. Leia online ou faça o download para aproveitar essas obras clássicas onde e quando quiser, sem nenhum custo."
      />
      <div
        className="bg-black overflow-auto"
        style={{
          backgroundImage:
            "url('https://livrosgratuitos.com/_next/static/media/background.c48aab92.svg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "50%",
        }}
      >
        <div className="p-4 max-w-6xl mx-auto h-screen ">
          <Navbar />
          <h1
            className=" text-center text-2xl md:text-4xl font-semibold text-white mt-3"
            style={{
              textDecorationColor: "rgb(123, 102, 255)",
              textDecorationThickness: "5px",
              textDecorationLine: "underline",
            }}
          >
            Livros gratuitos em PDF
          </h1>
          <p className="text-white text-center font-normal text-base mt-2 leading-relaxed max-w-lg mx-auto">
            Descubra uma vasta coleção de livros em PDF de domínio público,
            totalmente gratuitos e disponíveis para todos. Leia online ou faça o
            download para aproveitar essas obras clássicas onde e quando quiser,
            sem nenhum custo.
          </p>
          <div className="flex justify-center items-center gap-4 flex-wrap mt-6">
            {isLoading || !PDFs.length
              ? Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} />)
              : PDFs.map((item) => (
                  <a href={`/livro?id=${item._id}`} key={item._id}>
                    <div className="flex-shrink-0 w-40 shadow-lg flex flex-col justify-center items-center">
                      {!imageLoaded[item._id] && <Skeleton />}
                      <img
                        src={item.capa}
                        style={{ width: 160, height: "auto" }}
                        className={`h-full object-cover rounded-md ${
                          !imageLoaded[item._id] ? "hidden" : ""
                        }`}
                        alt=""
                        onLoad={() => handleImageLoad(item._id)}
                      />
                      <div
                        className={`flex flex-col justify-between p-4 w-full mt-2 ${
                          !imageLoaded[item._id] ? "hidden" : ""
                        }`}
                      >
                        <div className="flex flex-col justify-center items-center h-12">
                          <h1 className="text-sm text-center font-bold text-white leading-4">
                            {item.titulo}
                          </h1>
                          {item.autor && (
                            <span className="text-sm text-white mt-1 text-center font-lexend font-light">
                              {item.autor}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
