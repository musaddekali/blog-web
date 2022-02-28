import GoBack from "../../components/GoBack/GoBack";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import UpdateProfileForm from "./UpdateProfileForm";

const UpdateProfile = () => {
    return (
        <section className="edit-profile">
            <div className="container">
                <GoBack />
                <SectionTitle>
                    Update you profile
                </SectionTitle>
                <UpdateProfileForm />
            </div>
        </section>
    )
}

export default UpdateProfile;
