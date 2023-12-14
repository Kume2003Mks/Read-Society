
import '../../Style/Global.css';
import styles from '../../Style/uploadPage.module.css';

import CreationBar from '../../components/navigation/CreationBar';


const Upload_EP = () => {

  return (
    <main className="flex-row h-screen flex p-container">
      <CreationBar />
      <div className={`h-full flex flex-1 flex-row py-8 px-16 gap-8 ${styles.input_template}`}>
        <label className={styles.box_input}>
          <h1>Book Name</h1>
          <input type="text" placeholder="Book name" />
        </label>
      </div>
    </main>
  );
};

export default Upload_EP;
