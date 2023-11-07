import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@chakra-ui/react";

function Header() {
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();

  return (
    <header className="w-full p-3 md:py-4 md:px-6 fixed top-0 bg-white shadow-md">
      <div className="flex items-center justify-between">
        {isAuthenticated ? (
          <div className="text-xl  font-bold text-gray-700 ">
            Welcome Back 👍 <span className="text-xs">{user?.nickname}</span>
          </div>
        ) : (
          <div className="text-xl md:text-2xl font-bold text-gray-700 ">
            Admin Dashboard
          </div>
        )}
        {isAuthenticated ? (
          <Button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Log Out
          </Button>
        ) : (
          <Button onClick={() => loginWithRedirect()}>Log In</Button>
        )}
      </div>
    </header>
  );
}

export default Header;
