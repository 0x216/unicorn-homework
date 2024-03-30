import { FaUser } from "react-icons/fa";
import "../../assets/styles/ProfilePage.css";

function ProfilePage() {
  return (
    <div className="login-container">
      <form className="login-form">
        <h2>Profile Page</h2>
        <FaUser className="profile-logo" />
        <input type="email" placeholder="Email" />
        <input type="text" placeholder="Name" />
        <input type="password" placeholder="Old Password" />
        <input type="password" placeholder="New Password" />
        <input type="password" placeholder="Confirm New Password" />
        <div className="button-container">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}

export default ProfilePage;
