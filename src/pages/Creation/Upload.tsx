import { useState } from 'react';
import '../../Style/Global.css';
import styles from '../../Style/uploadPage.module.css';
import fromStyle from '../../Style/form.module.css';
import CreationBar from '../../components/navigation/CreationBar';
import Swal from 'sweetalert2';
import { Icon } from '@iconify/react';

const TypeOptionset: string[] = ['Novel', 'Cartoon', 'General'];
const GenreOptionset: string[] = ['Moc', 'Cartoon', 'General'];

const Upload = () => {
  const [imgfile, setImgfile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState('');
  const [TypeOption, setTypeOption] = useState('');
  const [GenreOption, setGenreOption] = useState('');
  const [subGenreOption, setsubGenreOption] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [bookName, setBookName] = useState('');
  const [description, setDescription] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size <= 2 * 1024 * 1024) {
        const imageUrl = URL.createObjectURL(file);
        setPreviewImage(imageUrl);
        setImgfile(file);
      } else {
        Swal.fire({
          title: '<strong>File size exceeds the limit (Max: 2MB)</strong>',
          icon: 'error',
          confirmButtonText: '<h1>Ok</h1>',
        });
      }
    }
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTag = e.target.value;
    // You may want to add more validation for tags
    setTags((prevTags) => [...prevTags, newTag]);
  };

  const handleSubmit = () => {

    console.log({
      imgfile,
      TypeOption,
      GenreOption,
      subGenreOption,
      tags,
      bookName,
      description,
    });

    Swal.fire({
      title: 'Upload successful!',
      icon: 'success',
      confirmButtonText: '<h1>Ok</h1>',
    });
  };

  return (
    <main className="flex-row h-screen flex p-container">
      <CreationBar />
      <div className={`h-full flex flex-1 flex-row py-8 px-16 gap-8 ${styles.input_template}`}>
        <div className="flex flex-1 flex-col items-center">
          <h1 className="w-full text-center">Upload thumbnail</h1>
          <label htmlFor="uploadInput" className={styles.edit_image}>
            {previewImage ? (
              <>
                <img src={previewImage} alt="Preview" />
                <p className={styles.preview_label}>Preview</p>
              </>
            ) : (
              <div className={styles.upload_box}>
                <Icon icon="mdi:upload" className={styles.upload_icon} />
              </div>
            )}
            <input
              type="file"
              id="uploadInput"
              accept="image/*"
              className={styles.upload_input}
              onChange={handleImageUpload}
            />
          </label>

          <label className={styles.box_input} style={{ marginTop: '8px' }}>
            <h1>Add tag</h1>
            <input type="text" placeholder="Add tag" onChange={handleTagChange} />
          </label>
        </div>

        <div className="flex flex-[3] flex-col px-4 gap-2">
          <label className={styles.box_input}>
            <h1>Book Name</h1>
            <input type="text" placeholder="Book name" onChange={(e) => setBookName(e.target.value)} />
          </label>

          <div className="flex flex-row justify-between gap-8">
            <label className={styles.box_input}>
              <h1>Type</h1>
              <select value={TypeOption} onChange={(event) => setTypeOption(event.target.value)}>
                <option value="" disabled hidden>
                  None
                </option>
                {TypeOptionset.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className={styles.box_input}>
              <h1>Genre</h1>
              <select value={GenreOption} onChange={(event) => setGenreOption(event.target.value)}>
                <option value="" disabled hidden>
                  None
                </option>
                {GenreOptionset.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className={styles.box_input}>
              <h1>Genre 2 (optional)</h1>
              <select value={subGenreOption} onChange={(event) => setsubGenreOption(event.target.value)}>
                <option value="" disabled hidden>
                  None
                </option>
                {GenreOptionset.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className={styles.box_input}>
            <h1>Description</h1>
            <textarea
              id="aboutMe"
              placeholder="Write some description."
              className={styles.desc_input}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <div className={fromStyle.confirm_btn} onClick={handleSubmit}>
            Submit
          </div>
        </div>
      </div>
    </main>
  );
};

export default Upload;
