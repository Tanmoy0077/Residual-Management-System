// import logo from "../assets/ISRO-Black.svg";
// import LogoutButton from "./LogoutButton";

// const Navbar = () => {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
//       <a className="navbar-brand" href="/">
//         <img
//           src={logo}
//           width="30"
//           height="30"
//           className="d-inline-block align-top mx-3"
//           alt="ISRO logo"
//         ></img>
//         ISRO
//       </a>
//       <div className="collapse navbar-collapse" id="navbarNavDropdown">
//         <ul className="navbar-nav">
//           <li className="nav-item active">
//             <a className="nav-link" href="/">
//               Home
//             </a>
//           </li>
//           <li className="nav-item">
//             <a className="nav-link" href="/about">
//               About
//             </a>
//           </li>
//           <li className="nav-item">
//             <a className="nav-link" href="/contact">
//               Contact Us
//             </a>
//           </li>
//         </ul>
//           <LogoutButton/>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import logo from "../assets/ISRO-Black.svg";
import LogoutButton from "./LogoutButton";

// Define the shape of the mock response data
interface AuthorizedRequest {
  id: string;
}

const AppNavbarSM: React.FC = () => {
  // Define state variables with appropriate types
  const [authorizedRequestsCount, setAuthorizedRequestsCount] = useState<number>(0);
  const [authorizedRequests, setAuthorizedRequests] = useState<string[]>([]);

  // Fetch the authorized requests (mocked) when the component mounts
  useEffect(() => {
    const fetchAuthorizedRequests = async (): Promise<void> => {
      try {
        // Mock data for testing instead of actual API call
        const mockData: AuthorizedRequest[] = [{ id: "REQ123" }, { id: "REQ456" }, { id: "REQ789" }];
        
        // Simulate API call delay (optional for testing)
        await new Promise(resolve => setTimeout(resolve, 1000)); 

        // Update state with mock data
        const requestNumbers = mockData.map((request) => request.id);
        setAuthorizedRequests(requestNumbers);
        setAuthorizedRequestsCount(requestNumbers.length);
      } catch (error) {
        console.error("Error fetching authorized requests:", error);
      }
    };

    fetchAuthorizedRequests();
  }, []);

  const handleAuthorizedRequestsClick = (): void => {
    if (authorizedRequests.length === 0) {
      alert("No authorized requests found.");
    } else {
      alert(`Authorized Requests:\n${authorizedRequests.join("\n")}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <a className="navbar-brand" href="/">
        <img
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top mx-3"
          alt="ISRO logo"
        />
        ISRO
      </a>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="/">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/about">
              About
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/contact">
              Contact Us
            </a>
          </li>
        </ul>
        <div className="ml-auto d-flex align-items-center">
          {/* Authorized Requests button */}
          <button
            className="btn btn-primary mx-3"
            onClick={handleAuthorizedRequestsClick}
          >
            Authorized Requests ({authorizedRequestsCount})
          </button>

          {/* Logout button */}
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
};

export default AppNavbarSM;



