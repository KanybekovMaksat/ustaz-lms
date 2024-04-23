import ProfileCard from "../../../components/ProfileCard";
import ProfileInfo from "../../../components/ProfileInfo";
import "./index.css";


const StudentProfile = () => {
  return (
    <section className="profile">
      <div className="profile-user">
        <ProfileCard />
        <ProfileInfo />
      </div>
    </section>
  );
};

export default StudentProfile;
