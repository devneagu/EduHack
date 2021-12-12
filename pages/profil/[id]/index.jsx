import ProfileHeader from "../../../components/ProfileHeader";
import {useRouter} from "next/router";

export default function ProfileUser(){
    const router = useRouter();
    const profileId = router.query.id;
    return (
        <ProfileHeader profileId={profileId} />
    )
}


