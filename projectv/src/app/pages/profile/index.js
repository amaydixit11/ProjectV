// pages/profile/index.js
import { useSession } from "next-auth/client";
import ProfileForm from "../../components/Profile/ProfileForm";
import MatchList from "../../components/Profile/MatchList";

export default function Profile() {
  const [session, loading] = useSession();

  if (loading) return <p>Loading...</p>;

  if (!session) {
    return <p>You need to be authenticated to view this page.</p>;
  }

  return (
    <div>
      <h1>Welcome, {session.user.name}</h1>
      <ProfileForm email={session.user.email} />
      <MatchList email={session.user.email} />
    </div>
  );
}
