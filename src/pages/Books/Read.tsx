import { useParams } from "react-router-dom";
import { useAuth } from "../../function/context/AuthContext";
import { useEffect, useState } from "react";
import { Episode } from "../../function/DeclareType";
import { Document, Page, pdfjs } from "react-pdf";
import Books from "../../function/Books";

import Styles from "../../Style/read.module.css"
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Read = () => {

    const { isLoggedIn } = useAuth();
    const { book_id, ep_id } = useParams();

    const [epload, setepLoading] = useState<Episode | null>(null)
    const [Loading, setLoading] = useState<boolean>(false)

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
        <main className="flex-col flex flex-1 items-center p-container">
            <Document
                file={epload?.url}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={(error) => console.error("Error loading PDF:", error)}
            >
                <Page 
                pageNumber={pageNumber}
                 />
            </Document>
            <p onClick={() => setPageNumber(pageNumber + 1)}>
                Page {pageNumber} of {numPages}
            </p>
        </main>
    )
}

export default Read