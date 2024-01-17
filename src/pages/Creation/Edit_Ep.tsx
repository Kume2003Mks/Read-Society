import '../../Style/Global.css';
import styles from '../../Style/uploadPage.module.css';
import fromStyle from '../../Style/form.module.css';
import Loading from "../../components/loading/Loading";

import CreationBar from '../../components/navigation/CreationBar';
import { ChangeEvent, DragEvent, useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Books from '../../function/Books';
import { useAuth } from '../../function/context/AuthContext';

const Edit_EP = () => {

  const { userData } = useAuth();
  const { editbook_id, editep_id } = useParams();
  const navigate = useNavigate();

  const [epName, setEpName] = useState<string | undefined>('');
  const [url, seturl] = useState<string | undefined>('');
  const [file, setFile] = useState<File | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [startloading, setstartloading] = useState<boolean>(false);


  useEffect(() => {

    async function loadBooks() {
      try {
        setLoading(true);
        const id: string = editbook_id!;
        const ed_id: string = editep_id!;
        const book = new Books();
        const loadedBook = await book.getBookById(id);
        const loadedEp = await book.getSomeEp(id, ed_id)
        setLoading(false);
        setEpName(loadedEp?.title);
        seturl(loadedEp?.url);

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
  }, [editbook_id, editep_id, userData]);

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
    if (!epName) {
      Swal.fire({
        title: '<strong>Please fill in all required fields.</strong>',
        icon: 'error',
        confirmButtonText: '<h1>Ok</h1>',
      });
      return;
    }
    setstartloading(true);
    try {
      const booksManager = new Books();
      await booksManager.editEp(
        editbook_id!,
        editep_id!,
        epName,
        file
      );
      setFile(null);
      setEpName('');

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

  const handleDel = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confrim'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const booksManager = new Books();
        await booksManager.deleteEpisode(editbook_id!, editep_id!);
        Swal.fire({
          title: 'Delete successful!',
          icon: 'success',
          confirmButtonText: '<h1>Ok</h1>',
        }).then(() => {
          navigate("/")
        });
      }
    })
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
              value={epName}
              onChange={(e) => setEpName(e.target.value)} />
          </label>
          <p>Book url: &nbsp;<a className='text-red-500 underline-offset-1' href={url} target='_blank'>click here</a></p>
          <label htmlFor="pdfUpload" className={styles.box_input}>
            <h1>Upload PDF</h1>
            <div className={fromStyle.pdf_upload}>
              <div className={fromStyle.icon_container}>
                <Icon icon="fluent:document-pdf-32-filled" className='w-full h-full' />
              </div>
              {file && (
                <a target='_blank' className='hover:underline hover:text-red-500' href={URL.createObjectURL(file)}>{file.name}</a>
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

            <div className='w-full flex flex-row gap-4 justify-end'>
              <div className={`${fromStyle.confirm_btn} bg-red-500 border-red-500 `} onClick={handleDel}>
                Delete
              </div>
              <div className={fromStyle.confirm_btn} onClick={handleUpload}>
                Submit
              </div>
            </div>

          )}

        </div>) : (<p>Only the owner can upload.</p>)}
    </main>
  );
};

export default Edit_EP;
