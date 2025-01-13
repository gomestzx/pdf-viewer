import React, { useEffect, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import getUserIdFromToken from '../hooks/getUserIdFromToken'

const PDF_URL =
  "https://firebasestorage.googleapis.com/v0/b/livrosgratuitos-14482.appspot.com/o/pdf%2Fo-pequeno-principe.pdf?alt=media&token=cb7b8f63-e9ac-4154-bc40-2fad4bbec002";

const Viewer = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }, []);

  useEffect(() => {
    const fetchUserId = async () => {
      const userId = await getUserIdFromToken();
      if (userId) {
        console.log("ID do usuário encontrado:", userId);
      } else {
        console.log("Nenhum ID de usuário encontrado.");
      }
    };

    fetchUserId();
  }, []);

  const handleDocumentLoadSuccess = (document) => {
    console.log("PDF loaded: ", document.numPages);
    setTotalPages(document.numPages);
  };

  const changePage = (direction) => {
    if (direction === "prev") {
      setCurrentPage((prevPage) => prevPage - 1);
    } else if (direction === "next") {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="w-full h-screen flex justify-start items-start overflow-hidden">
      <aside className="border-r-2 border-gray-400 px-3 w-60 p-2 h-full">
        <h2 className="px-2 py-3 border-b-2 text-center font-semibold text-lg">
          Documents
        </h2>
        <div className="h-full">
          <Document
            className="flex flex-col justify-start items-center overflow-auto h-full"
            file={PDF_URL}
            onLoadSuccess={handleDocumentLoadSuccess}
          >
            {Array.from({ length: totalPages }).map((_, index) => {
              const thumbnailPage = index + 1;
              return (
                <div
                  key={thumbnailPage}
                  onClick={() => setCurrentPage(thumbnailPage)}
                  className={`border-[4px] cursor-pointer relative rounded my-2 ${
                    currentPage === thumbnailPage ? "border-green-700" : ""
                  }`}
                >
                  <Page height={180} pageNumber={thumbnailPage} />
                </div>
              );
            })}
          </Document>
        </div>
      </aside>

      <main className="w-full h-full">
        <div className="w-full bg-slate-100 h-full">
          <header className="bg-white h-16 py-2 px-4 flex justify-between items-center">
            <h1 className="font-semibold text-lg">Pdf File Name</h1>
            <div className="flex justify-center items-center gap-1">
              <IoIosArrowBack
                className="cursor-pointer"
                onClick={() => changePage("prev")}
              />
              <div className="px-3 py-1 rounded">{currentPage}</div>
              <span>of</span>
              <div className="px-3 py-1 rounded">{totalPages}</div>
              <IoIosArrowForward
                className="cursor-pointer"
                onClick={() => changePage("next")}
              />
            </div>
            <button className="bg-black text-white px-6 cursor-pointer py-2 rounded">
              Download
            </button>
          </header>

          <section className="w-full bg-slate-100 p-4 pb-96 h-full overflow-auto flex justify-center items-start">
            <Document file={PDF_URL}>
              <Page pageNumber={currentPage} />
            </Document>
            <div className="h-[300px]"></div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Viewer;
