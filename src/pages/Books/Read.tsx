import { useParams } from "react-router-dom";
import { useAuth } from "../../function/context/AuthContext";
import { useEffect, useState } from "react";
import { Book, Episode } from "../../function/DeclareType";
import { Document, Page, pdfjs } from "react-pdf";
import Books from "../../function/Books";

import Styles from "../../Style/read.module.css"
import SideBar from "../../components/Layouts/SideBar";
import Loading from "../../components/loading/Loading";
import { Icon } from "@iconify/react";

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Read = () => {

    const { isLoggedIn } = useAuth();
    const { book_id, ep_id } = useParams();

    const [epload, setepLoading] = useState<Episode | null>(null)
    const [Bookload, setBookLoading] = useState<Book | null>(null)

    const [isLoading, setLoading] = useState<boolean>(false)

    useEffect(() => {

        async function loadEp() {
            try {
                setLoading(true);
                const id: string = book_id!;
                const ed_id: string = ep_id!;
                const book = new Books();
                const loadedEp = await book.getSomeEp(id, ed_id)
                const loadedBook = await book.getBookById(id)
                setepLoading(loadedEp);
                setBookLoading(loadedBook);
                setLoading(false);

            } catch (error) {
                console.error("Error loading book:", error);
                setLoading(false);
            }
        }
        loadEp();
    }, [book_id, ep_id]);

    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }

    return (
        <main className="flex flex-row justify-between flex-1 flex-wrap h-screen p-container ">
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    {isLoggedIn ? (
                        <div className="flex flex-1 h-full relative">
                            <SideBar className="flex">
                                <h1 className="text-2xl font-bold text-center">{Bookload?.title}</h1>
                                <h1 className="text-lg text-center py-2"> EP: {epload?.title}</h1>

                                <div className="overflow-y-auto">
                                    {Array.from({ length: numPages ?? 0 }, (_, index) => (
                                        <div
                                            key={index + 1}
                                            onClick={() => setPageNumber(index + 1)}
                                            className={`${Styles.navigate} ${pageNumber === index + 1 ? Styles.highlighted : ''}`}
                                        >
                                            <div className={pageNumber === index + 1 ? Styles.highlighted_nav : ''} />
                                            <p>
                                                Page {index + 1}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <p className="text-center my-4">
                                    Page {pageNumber} of {numPages}
                                </p>

                            </SideBar>
                            <div className="flex flex-1 flex-wrap justify-center max-h-full overflow-auto">
                                <Document
                                    file={epload?.url}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                    renderMode="canvas"
                                    className="max-h-full mt-0"

                                    onLoadError={(error) => console.error("Error loading PDF:", error)}>
                                    <Page
                                        renderTextLayer={false}
                                        renderAnnotationLayer={false}
                                        pageNumber={pageNumber}
                                        className={Styles.pdfPage}
                                        scale={1.5}
                                    />
                                </Document>
                            </div>

                            <div className="absolute top-4 right-4">
                                <div className="flex justify-center gap-4">
                                    <button
                                        onClick={() => setPageNumber(pageNumber - 1)}
                                        disabled={pageNumber === 1}
                                        className="flex flex-col items-center" >
                                        <Icon icon="fluent-mdl2:skype-arrow" className="icon-from" />
                                        <p>
                                            Previous
                                        </p>
                                    </button>
                                    <button
                                        onClick={() => setPageNumber(pageNumber + 1)}
                                        disabled={pageNumber === numPages}
                                        className="flex flex-col items-center">
                                        <Icon icon="fluent-mdl2:skype-arrow" className="icon-from" rotate={2} />
                                        <p>
                                            Next
                                        </p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <p>Please log in to view this content.</p>
                        </div>
                    )}
                </>
            )}
        </main>
    )
}

export default Read


