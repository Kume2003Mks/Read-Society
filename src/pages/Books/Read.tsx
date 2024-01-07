import { useParams } from "react-router-dom";
import { useAuth } from "../../function/context/AuthContext";
import { useEffect, useState } from "react";
import { Episode } from "../../function/DeclareType";
import { Document, Page, pdfjs } from "react-pdf";
import Books from "../../function/Books";

import Styles from "../../Style/read.module.css"
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import SideBar from "../../components/Layouts/SideBar";
import Loading from "../../components/loading/Loading";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Read = () => {

    const { isLoggedIn } = useAuth();
    const { book_id, ep_id } = useParams();

    const [epload, setepLoading] = useState<Episode | null>(null)
    const [isLoading, setLoading] = useState<boolean>(false)

    useEffect(() => {

        async function loadEp() {
            try {
                setLoading(true);
                const id: string = book_id!;
                const ed_id: string = ep_id!;
                const book = new Books();
                const loadedEp = await book.getSomeEp(id, ed_id)
                setepLoading(loadedEp);
                console.log(loadedEp);
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
        <main className="flex flex-row justify-between flex-1 flex-wrap h-screen p-container">
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    {isLoggedIn ? (
                        <div className="flex flex-1 h-full">
                            <SideBar className="sticky">
                                <div>
                                    <button onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber === 1}>
                                        Previous 
                                    </button>
                                    <button onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber === numPages}>
                                        Next 
                                    </button>
                                </div>

                                <p>
                                    Page {pageNumber} of {numPages}
                                </p>

                                {Array.from({ length: numPages ?? 0 }, (_, index) => (
                                    <p
                                        key={index + 1}
                                        onClick={() => setPageNumber(index + 1)}
                                        className={pageNumber === index + 1 ? Styles.highlighted : ''}
                                    >
                                        Page {index + 1}
                                    </p>
                                ))}
                            </SideBar>
                            <Document
                                className="flex flex-1 justify-center"
                                file={epload?.url}
                                onLoadSuccess={onDocumentLoadSuccess}
                                onLoadError={(error) => console.error("Error loading PDF:", error)}
                            >
                                <Page
                                    className="h-fit"
                                    pageNumber={pageNumber}
                                />
                            </Document>
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


