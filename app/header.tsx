import { getCurrentUser } from "@/lib/sessions";
import UserStatus from "@/components/userStatus";

export default async function Header() {
  const user = await getCurrentUser();

  return <div className="h-24 sticky pt-5 px-28 z-40 bg-blue flex flex-row justify-end">{user && <UserStatus user={{ name: user.name, image: user.image, email: user.email }} />}</div>;
}
