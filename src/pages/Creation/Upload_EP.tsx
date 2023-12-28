import '../../Style/Global.css';
import styles from '../../Style/uploadPage.module.css';
import fromStyle from '../../Style/form.module.css';
import Loading from "../../components/loading/Loading";

import CreationBar from '../../components/navigation/CreationBar';
import { ChangeEvent, DragEvent, useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Books from '../../function/Books';
import { useAuth } from '../../function/context/AuthContext';


const Upload_EP = () => {

  const { userData } = useAuth();
  const { upload_id } = useParams();

  const [epName, seEpName] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [startloading, setstartloading] = useState<boolean>(false);


  useEffect(() => {
    async function loadBooks() {
      try {
        const id: string = upload_id!;
        const book = new Books();
        const loadedBook = await book.getBookById(id);
        setLoading(false);

        if (loadedBook?.owner === (userData && userData.user?.uid)) {
          console.log("Is owner");
          setEditing(true);
        }

      } catch (error) {
        console.error("Error loading book:", error);
        setLoading(false);
      }
    }

    loadBooks();


  }, [upload_id, userData]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const droppedFile = event.dataTransfer.files[0];
      setFile(droppedFile);
    }
  };

  const handleUpload = async () => {
    if (!epName || !file) {
      Swal.fire({
        title: '<strong>Please fill in all required fields.</strong>',
        icon: 'error',
        confirmButtonText: '<h1>Ok</h1>',
      });
      return;
    }
    setstartloading(true);
    try {
      const id: string = upload_id!;
      const booksManager = new Books();
      await booksManager.uploadEp(
        id,
        epName,
        file
      );
      setFile(null);
      seEpName('');

      Swal.fire({
        title: 'Upload successful!',
        icon: 'success',
        confirmButtonText: '<h1>Ok</h1>',
      });
      setstartloading(false);
    } catch (error) {
      console.error('Error uploading book:', error);
    }
  }

  return (
    <main className="flex-row h-screen flex p-container"
      onDragOver={handleDragOver}
      onDrop={handleDrop}>
      <CreationBar />
      {loading ? (
        <Loading />
      ) : editing ? (
        <div className={`h-full flex flex-1 flex-col py-8 px-16 gap-8 ${styles.input_template}`}>
          <label className={styles.box_input}>
            <h1>EP Name</h1>
            <input
              type="text"
              placeholder="EP Name"
              onChange={(e) => seEpName(e.target.value)} />
          </label>
          <label htmlFor="pdfUpload" className={styles.box_input}>
            <h1>Upload PDF</h1>
            <div className={fromStyle.pdf_upload}>
              <div className={fromStyle.icon_container}>
                <Icon icon="fluent:document-pdf-32-filled" className='w-full h-full' />
              </div>
              {file && (
                <p>{file.name}</p>
              )}
            </div>

            <input type="file"
              id="pdfUpload"
              accept=".pdf"
              className={fromStyle.upload_input}
              onChange={handleFileChange} />
          </label>
          {startloading ? (
            <p>loading</p>
          ) : (
            <div className={fromStyle.confirm_btn} onClick={handleUpload}>
              Submit
            </div>
          )}

        </div>) : (<p>Only the owner can upload.</p>)}
    </main>
  );
};

export default Upload_EP;
