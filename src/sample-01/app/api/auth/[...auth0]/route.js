import { handleAuth } from '@auth0/nextjs-auth0';
import { getSession } from '@auth0/nextjs-auth0';

export const GET = handleAuth();

// Example component using session
export default async function Profile() {
  const session = await getSession();
  
  if (!session) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <h1>Welcome {session.user.name}</h1>
      <p>Email: {session.user.email}</p>
    </div>
  );
}