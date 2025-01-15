import React, { useEffect, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { getUserIdFromToken } from "../hooks/getUserIdFromToken";
import { CgSoftwareDownload } from "react-icons/cg";
import { FaChevronRight, FaReadme } from "react-icons/fa";
import { BiZoomIn, BiZoomOut } from "react-icons/bi";
import AdBanner from "../components/AdBanner";
import Loading from "../components/Loading/Loading";
import { FaChevronLeft } from "react-icons/fa";
import useIsMobile from "../hooks/useIsMobile";
import { useSearchParams } from "react-router-dom";
import { useFetchBook } from "../hooks/useFetchBook";
import AdBannerVertical from "../components/Loading/AdBannerVertical";
import SEO from "../components/SEO";

const PDF_URL =
  "https://firebasestorage.googleapis.com/v0/b/livrosgratuitos-14482.appspot.com/o/pdf%2Fo-pequeno-principe.pdf?alt=media&token=cb7b8f63-e9ac-4154-bc40-2fad4bbec002";

const Viewer = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isAsideOpen, setIsAsideOpen] = useState(true);
  const [urlPdf, setUrlPdf] = useState(PDF_URL);

  const isMobile = useIsMobile();

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

  useEffect(() => {
    if (isMobile) {
      setZoomLevel(0.5);
    }
  }, [isMobile]);

  const handleDocumentLoadSuccess = (document) => {
    console.log("PDF loaded: ", document.numPages);
    setTotalPages(document.numPages);
  };

  const zoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom + 0.2, 3));
  };

  const zoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.2, 0.5));
    console.log(zoomLevel);
  };

  const changePage = (direction) => {
    if (direction === "prev") {
      setCurrentPage((prevPage) => prevPage - 1);
    } else if (direction === "next") {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const [searchParams] = useSearchParams();
  const bookId = searchParams.get("id");

  const { book, isLoading } = useFetchBook(bookId ?? "");

  useEffect(() => {
    if (book && book.pdf !== "") {
      setUrlPdf(book.pdf ?? PDF_URL);
    }
  }, [book]);

  const handleDownload = async () => {
    try {
      if (!urlPdf) {
        console.error("Nenhum URL para download disponível.");
        return;
      }

      const response = await fetch(urlPdf);

      if (!response.ok) {
        throw new Error(`Erro ao baixar o PDF: ${response.statusText}`);
      }

      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = book ? `${book.titulo}.pdf` : "livro.pdf";
      link.click();

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Erro ao baixar o PDF:", error);
    }
  };

  return (
    <>
      <SEO
        title={book ? book.titulo : ""}
        description={
          book
            ? `${book.description}`
            : "Leia livros gratuitos em nosso site."
        }
        image={book?.capa}
        shouldIndexPage={true}
      />
      <div className=" overflow-hidden">
        <header className=" bg-white h-16 py-2 px-4 flex justify-between items-center">
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
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2529229033686497"
            crossorigin="anonymous"
          ></script>
          <meta
            name="google-site-verification"
            content="KOaKjo4TUKs2O2SdRxRs61dwmfSAe-f-4RvutfYlBnY"
          />
          <meta
            name="google-adsense-account"
            content="ca-pub-2529229033686497"
          ></meta>
          <div className="rounded-lg flex justify-center items-center gap-3">
            <a href="https://livrosgratuitos.com" className=" cursor-pointer">
              <img
                className=" bg-slate-100 p-2 rounded-lg"
                src="/logo.png"
                style={{ width: 40, height: 40 }}
                alt=""
              />
            </a>
            <h1 className="font-normal text-black text-lg font-sans-3 hidden md:block">
              {book ? book.titulo : "O Pequeno Príncipe"}
            </h1>
          </div>

          <div className=" flex justify-center items-center gap-2">
            <div className=" flex justify-center items-center md:gap-2 border-r border-customLightPurple-300 md:pr-2">
              <button
                onClick={zoomOut}
                className=" text-black px-3 cursor-pointer py-3 rounded-full flex justify-center items-center gap-2"
              >
                <BiZoomOut size={20} />
              </button>
              <button
                onClick={zoomIn}
                className=" text-black px-3 cursor-pointer py-3 rounded-full flex justify-center items-center gap-2"
              >
                <BiZoomIn size={20} />
              </button>
            </div>
            <button
              onClick={handleDownload}
              className=" bg-customOrange hover:bg-customOrange hover:text-white md:bg-transparent border-2 border-customOrange text-white md:text-customOrange px-2 py-2 md:px-4 cursor-pointer rounded-full flex justify-center items-center gap-2 md:ml-4"
            >
              <span className=" hidden md:block font-normal">Download</span>
              <CgSoftwareDownload size={20} />
            </button>
            {book && book._id && (
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://livrosgratuitos.com/livro?bookId=${book._id}`}
                className="  bg-main-400 hover:bg-main-400 hover:text-white md:bg-transparent border-2 border-main-400 text-white
             md:text-main-400  px-2 py-2 md:px-4 cursor-pointer  rounded-full flex justify-center items-center gap-2"
              >
                <span className=" hidden md:block font-normal">Ler online</span>
                <FaReadme size={20} />
              </a>
            )}
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
            } h-full transition-all duration-500 ease-in-out overflow-hidden relative hidden md:block`}
          >
            <div className="h-full">
              <Document
                className="flex flex-col justify-start items-center overflow-auto h-full"
                file={urlPdf}
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
              className=" px-1 h-full justify-center items-center bg-customLightPurple-200 hover:bg-customLightPurple-300 cursor-pointer hidden md:flex"
            >
              <FaChevronLeft size={12} />
            </button>
          ) : (
            <button
              onClick={() => setIsAsideOpen(true)}
              className=" px-1 h-full hidden md:flex justify-center items-center bg-customLightPurple-200 hover:bg-customLightPurple-300 cursor-pointer"
            >
              <FaChevronRight size={12} />
            </button>
          )}

          <main className="w-full h-full relative">
            <div className="w-full bg-slate-100 h-full">
              {/* {JSON.stringify(book)} */}
              <section className="w-full bg-slate-100 p-4 pb-96 h-full overflow-auto ">
                <AdBanner
                  dataAdFormat="auto"
                  dataAdSlot="9774541568"
                  customClassName="mb-2 pt-2"
                />
                <div className="flex justify-center items-center">
                  <AdBannerVertical dataAdSlot="" />
                  <Document
                    file={urlPdf}
                    loading={<Loading label="Carregando PDF" />}
                  >
                    <Page pageNumber={currentPage} scale={zoomLevel} />
                  </Document>
                  <AdBannerVertical dataAdSlot="3432494495" />
                </div>
                <div className="h-[300px]"></div>
              </section>
            </div>
            {/* Absolute desktop */}
            <div className="absolute bottom-14 left-0 right-0 justify-center items-end mb-6 z-50 hidden md:flex">
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
      {/* Absolute mobile */}
      <div className="absolute bottom-1 left-0 right-0 flex justify-center items-end mb-6 z-50 md:hidden">
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
    </>
  );
};

export default Viewer;
