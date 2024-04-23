import styled from "styled-components";

//import components
import ProfileCard from "../../../components/ProfileCard";
import ProfileInfo from "../../../components/ProfileInfo";


//styles
const StyledSection = styled.section`
  padding: 50px;
  display:flex;
  flex-direction:column;
`

const MentorProfile = () => {
  return (
    <StyledSection>
      <ProfileCard/>
      <ProfileInfo/>
    </StyledSection>
  );
};

export default MentorProfile;
