import { Link } from "react-router-dom"
import Sidebarnav from "../../components/navigation/Sidebarnav"

const Help = () => {
  return (
    <main className="flex-row h-screen justify-between flex p-container">
      <Sidebarnav />
      <div className="flex flex-1 flex-col p-8 gap-4">
        <div>
          <h1 className="text-xl font-bold">Forget Password</h1>
          <Link to='/user/forgot-password' className="underline text-red-600">click here</Link>
        </div>
        <div>
          <h1 className="text-xl font-bold">How to upload your book?</h1>
          <p>1. Go to <Link to='/mycreation/mybooks' className="underline text-red-600">my creation.</Link></p>
          <p>2. Choose Upload menu.</p>
          <p>3. Fill out the information and upload.</p>
        </div>
        <div>
          <h1 className="text-xl font-bold">How to upload your episode?</h1>
          <p>1. Go to <Link to='/mycreation/mybooks' className="underline text-red-600">my creation.</Link></p>
          <p>2. Choose Your Books menu and click in bookcard.</p>
          <p>3. click icon in episode view.</p>
          <p>4. Fill out the information and upload(PDF only).</p>

        </div>
      </div>
    </main>
  )
}

export default Help