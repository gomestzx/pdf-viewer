import React, { useEffect, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { getUserIdFromToken } from "../hooks/getUserIdFromToken";
import { CgSoftwareDownload } from "react-icons/cg";
import { FaChevronRight, FaReadme } from "react-icons/fa";
import { AiOutlineZoomIn, AiOutlineZoomOut } from "react-icons/ai";
import { BiZoomIn, BiZoomOut } from "react-icons/bi";
import AdBanner from "../components/AdBanner";
import { IoDocument } from "react-icons/io5";
import Loading from "../components/Loading/Loading";
import { FaCaretLeft } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";

const PDF_URL =
  "https://firebasestorage.googleapis.com/v0/b/livrosgratuitos-14482.appspot.com/o/pdf%2Fo-pequeno-principe.pdf?alt=media&token=cb7b8f63-e9ac-4154-bc40-2fad4bbec002";

const Viewer = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAsideOpen, setIsAsideOpen] = useState(true);

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
    setIsLoading(false);
  };

  const zoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom + 0.2, 3));
  };

  const zoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.2, 0.5));
  };

  const changePage = (direction) => {
    if (direction === "prev") {
      setCurrentPage((prevPage) => prevPage - 1);
    } else if (direction === "next") {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className=" overflow-hidden">
      <header className=" bg-main-400 h-16 py-2 px-4 flex justify-between items-center">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap"
          rel="stylesheet"
        ></link>
        <div className="rounded-lg flex justify-center items-center gap-3">
          <a href="https://livrosgratuitos.com" className=" cursor-pointer">
            <img
              className=" bg-slate-100 p-2 rounded-lg"
              src="/logo.png"
              style={{ width: 40, height: 40 }}
              alt=""
            />
          </a>
          <h1 className="font-normal text-white text-lg font-sans-3">
            O Pequeno Principe
          </h1>
        </div>

        <div className=" flex justify-center items-center gap-2">
          <button
            onClick={zoomOut}
            className="bg-white text-main-400 px-3 cursor-pointer py-3 rounded-full flex justify-center items-center gap-2"
          >
            <BiZoomOut size={20} />
          </button>
          <button
            onClick={zoomIn}
            className="bg-white text-main-400 px-3 cursor-pointer py-3 rounded-full flex justify-center items-center gap-2"
          >
            <BiZoomIn size={20} />
          </button>
          <button className="bg-white text-main-400 px-3 py-3 md:px-4 cursor-pointer md:py-2 rounded-full flex justify-center items-center gap-2">
            <span className=" hidden md:block">Download</span>
            <CgSoftwareDownload size={20} />
          </button>
          <button className="bg-white text-main-400 px-3 py-3 md:px-4 cursor-pointer md:py-2  rounded-full flex justify-center items-center gap-2">
            <span className=" hidden md:block">Ler online</span>
            <FaReadme size={20} />
          </button>
        </div>
      </header>
      <div className="w-full h-screen flex justify-start items-start overflow-hidden">
        <aside
          style={{
            backgroundColor: "#ECEAFF",
            scrollbarWidth: "thin",
            scrollbarColor: "#7d7d7d #FFFFFF",
          }}
          className={`${
            isAsideOpen ? "w-60 opacity-100" : "w-0 opacity-0"
          } h-full transition-all duration-500 ease-in-out overflow-hidden relative`}
        >
          <div className="h-full">
            <Document
              className="flex flex-col justify-start items-center overflow-auto h-full"
              file={PDF_URL}
              onLoadSuccess={handleDocumentLoadSuccess}
              loading={<></>}
            >
              {Array.from({ length: totalPages }).map((_, index) => {
                const thumbnailPage = index + 1;
                return (
                  <div
                    key={thumbnailPage}
                    onClick={() => setCurrentPage(thumbnailPage)}
                    className={`border-[2px] cursor-pointer relative rounded my-2 ${
                      currentPage === thumbnailPage ? "border-main-400" : ""
                    } ${index === 0 && "mt-4"}`}
                  >
                    <Page height={180} pageNumber={thumbnailPage} />
                  </div>
                );
              })}
            </Document>
          </div>
        </aside>
        {isAsideOpen ? (
          <button
            onClick={() => setIsAsideOpen(false)}
            className=" px-1 h-full flex justify-center items-center bg-customLightPurple-200 hover:bg-customLightPurple-300 cursor-pointer"
          >
            <FaChevronLeft size={12} />
          </button>
        ) : (
          <button
            onClick={() => setIsAsideOpen(true)}
            className=" px-1 h-full flex justify-center items-center bg-customLightPurple-200 hover:bg-customLightPurple-300 cursor-pointer"
          >
            <FaChevronRight size={12} />
          </button>
        )}

        <main className="w-full h-full relative">
          <div className="w-full bg-slate-100 h-full">
            <AdBanner
              dataAdFormat="auto"
              dataAdSlot="2423907456"
              customClassName="mb-2 pt-2"
            />
            <section className="w-full bg-slate-100 p-4 pb-96 h-full overflow-auto flex justify-center items-start">
              <Document
                file={PDF_URL}
                loading={<Loading label="Carregando PDF" />}
              >
                <Page pageNumber={currentPage} scale={zoomLevel} />
              </Document>
              <div className="h-[300px]"></div>
            </section>
          </div>
          <div className="absolute bottom-14 left-0 right-0 flex justify-center items-end mb-6 z-50">
            <div className="flex justify-center items-center gap-1 bg-slate-900 rounded-full text-white px-4 py-2">
              <FaChevronLeft
                className="cursor-pointer"
                onClick={() => changePage("prev")}
                size={14}
              />
               
              <div className="px-3 py-1 rounded">{currentPage}</div>
              <span>de</span>
              <div className="px-3 py-1 rounded">{totalPages}</div>
              <FaChevronRight
                className="cursor-pointer"
                onClick={() => changePage("next")}
                size={14}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Viewer;
