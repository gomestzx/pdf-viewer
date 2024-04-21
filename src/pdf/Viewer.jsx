import React, { useEffect, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
// now import the pdf
import pdf from "../pdf/Design_Procedure_of_a_Topologically_Opti.pdf";
// import icons
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Viewer = () => {
  const [totalPages, settotalPages] = useState(0);
  const [pageNumber, setpageNumber] = useState(1); // by default i will keep page number 1

  useEffect(() => {
    // on load adding pdfjs worker
    // and now add the pdfjs cdn here
    // i will copy my code and paste it here from my another project.

    // Now here `pdfjs.version` will return you pdfjs cdn version which we are using with react-pdf lib
    // (this is what version of pdfjs cdn you will use here.)

    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }, []);

  //   now i will create a Viewer here using tailwind css
  //    so i will just copy and past my css and jsx code.

  /**
   *
   * @param {Object} event
   *
   * this function will be called when pdf is loaded
   */
  function onDocLoad(event) {
    console.log("Pdf loaded: ", event.numPages);
    // here i will store this total pages in my state
    settotalPages(event.numPages);
  }

  //   now lets add some css to it.
  //   so again i will copy my css from my project and paste it here.
  // css added
  //    now let's display pdf on right right side of viewer

  const changePage = (param) => {
    if (param === "prev") {
      // on previous button clicked it will minus one page number
      setpageNumber((prev) => prev - 1);
    }

    if (param === "next") {
      // similarly on next button clicked it will add one page number

      setpageNumber((prev) => prev + 1);
    }
  };

  return (
    <div className=" w-full h-screen flex justify-start items-start overflow-hidden">
      <div className="border-r-2 border-gray-400 px-3 w-60 p-2 h-full">
        <div className="px-2 py-3 border-b-2 text-center font-semibold text-lg">
          Documents
        </div>
        <div className="h-full">
          {/* this is left side of viewer here I will display all pdf pages */}
          {/* here in file i will pass my pdf url */}
          {/*so i will add a pdf in local directory  */}
          <Document
            className={
              "flex flex-col justify-start items-center overflow-auto h-full"
            }
            file={pdf}
            onLoadSuccess={onDocLoad}
          >
            {
              // here i will page all my pdf pages
              // here totalPages is a state where I'm storing total number of pages pdf has.
              Array(totalPages)
                .fill()
                .map((_, index) => (
                  <div
                    onClick={() => {
                      setpageNumber(index);
                    }}
                    className={`border-[4px] cursor-pointer relative rounded my-2 ${
                      pageNumber === index ? "border-green-700" : ""
                    }`}
                  >
                    <Page
                      height={180}
                      pageIndex={index + 1}
                      pageNumber={index}
                    ></Page>
                  </div>
                ))
            }
          </Document>
        </div>
      </div>
      <div className="w-full h-full">
        {/* I will copy my jsx and css from my old project */}
        <div className="w-full bg-slate-100 h-full">
          <div className="bg-white h-16 py-2 px-4 flex justify-between items-center">
            <div className="font-semibold text-lg">Pdf File Name</div>
            <div className="flex justify-center items-center gap-1">
              {/* here i wll add a button so on click we should able to change pages */}
              <div className="flex justify-center items-center gap-1">
                {/* this is back/previous button */}
                <IoIosArrowBack
                  className="cursor-pointer"
                  onClick={() => changePage("prev")}
                />
                {/* here current pagenumber and total number of pages in pdf will be displayed  */}
                <div className="px-3 py-1 rounded">{pageNumber}</div>
                of
                <div className="px-3 py-1 rounded">{totalPages}</div>
                {/* this is next button */}
                <IoIosArrowForward
                  className="cursor-pointer"
                  onClick={() => changePage("next")}
                />
              </div>
            </div>
            <div>
              <button className="bg-black text-white px-6 cursor-pointer py-2 rounded">
                Download
              </button>
            </div>
          </div>
          <div className="w-full bg-slate-100 p-4 h-full overflow-auto flex justify-center items-start">
            {/* here I will add pdf page */}
            {/* Now as you can see 1st page is displaying from pdf */}
            {/* Now in next video i will change pdf pages */}
            <Document file={pdf}>
              <Page pageNumber={pageNumber} pageIndex={pageNumber}></Page>
            </Document>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewer;
