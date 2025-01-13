import React, { useEffect, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import useAuth from "../hooks/useAuth.js";

const PDF_URL =
  "https://firebasestorage.googleapis.com/v0/b/livrosgratuitos-14482.appspot.com/o/pdf%2Fo-pequeno-principe.pdf?alt=media&token=cb7b8f63-e9ac-4154-bc40-2fad4bbec002";

const Viewer = () => {
  const { isAuth } = useAuth();
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }, []);

  const handleDocumentLoadSuccess = (document) => {
    setTotalPages(document.numPages);
  };

  const changePage = (direction) => {
    if (direction === "prev") {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    } else if (direction === "next") {
      setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white h-16 px-6 flex justify-between items-center shadow-md">
        <h1 className="font-semibold text-lg">O Pequeno Príncipe</h1>
        {isAuth && <p>auth</p>}
        <div className="flex items-center gap-3">
          <IoIosArrowBack
            className="cursor-pointer text-xl hover:text-blue-300"
            onClick={() => changePage("prev")}
          />
          <span className="text-base">
            Página {currentPage} de {totalPages}
          </span>
          <IoIosArrowForward
            className="cursor-pointer text-xl hover:text-blue-300"
            onClick={() => changePage("next")}
          />
        </div>
        <button className="bg-blue-500 px-5 py-2 rounded-lg shadow hover:bg-blue-400 transition">
          Baixar
        </button>
      </header>

      {/* Conteúdo Principal */}
      <div className="flex flex-1">
        {/* Painel Lateral (Miniaturas) */}
        <aside className="w-64 bg-gray-100 border-r shadow-md overflow-y-auto p-4">
          <h2 className="text-lg font-semibold text-center mb-4">Miniaturas</h2>
          <Document
            file={PDF_URL}
            onLoadSuccess={handleDocumentLoadSuccess}
            className="space-y-4"
          >
            {Array.from({ length: totalPages }).map((_, index) => {
              const thumbnailPage = index + 1;
              return (
                <div
                  key={thumbnailPage}
                  onClick={() => setCurrentPage(thumbnailPage)}
                  className={`cursor-pointer border-2 rounded-lg overflow-hidden ${
                    currentPage === thumbnailPage
                      ? "border-blue-600"
                      : "border-gray-300"
                  }`}
                >
                  <Page pageNumber={thumbnailPage} height={100} />
                </div>
              );
            })}
          </Document>
        </aside>

        {/* Área do PDF */}
        <main className="flex-1 p-6 bg-white overflow-auto shadow-inner">
          <Document file={PDF_URL}>
            <Page pageNumber={currentPage} />
          </Document>
        </main>
      </div>
    </div>
  );
};

export default Viewer;
