import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  updateDoc,
  doc,
  where,
  onSnapshot,
} from "firebase/firestore";
import {
  Card,
  Container,
  Button,
  Stack,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { database } from "../database/firebaseResources";
import { responsiveBox } from "../styles/lazyStyles";
import { IdentityCard } from "../common/ui/Elements/IdentityCard/IdentityCard";

export const Dashboard = () => {
  let env_passcode = import.meta.env.VITE_SUDO_DASHBOARD;
  const loginCheck = localStorage.getItem("dashboard_code") === env_passcode;

  const [tickets, setTickets] = useState([]);
  const [tokens, setTokens] = useState([]); // New state for tokens
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(loginCheck);

  useEffect(() => {
    if (!loginCheck || !isLoggedIn) return;

    const ticketsCollectionRef = query(
      collection(database, "tickets"),
      where("isComplete", "==", false), // Only fetch tickets that are not completed
      orderBy("createdAt", "desc")
    );

    // Subscribe to real-time updates for tickets
    const unsubscribeTickets = onSnapshot(ticketsCollectionRef, (snapshot) => {
      const updatedTickets = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt?.toDate().toLocaleString(),
      }));
      setTickets(updatedTickets);
    });

    // Fetch tokens collection
    const tokensCollectionRef = collection(database, "tokens");
    const fetchTokens = async () => {
      const tokenDocs = await getDocs(tokensCollectionRef);
      const tokenList = tokenDocs.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTokens(tokenList);
    };

    fetchTokens();

    // Cleanup subscription on component unmount
    return () => unsubscribeTickets();
  }, [isLoggedIn]);

  const toggleComplete = async (ticket) => {
    const ticketDocRef = doc(database, "tickets", ticket.id);
    await updateDoc(ticketDocRef, {
      isComplete: !ticket.isComplete,
    });
  };

  useEffect(() => {
    if (password === env_passcode) {
      localStorage.setItem("dashboard_code", env_passcode);
      setIsLoggedIn(true);
    }
  }, [password]);

  if (!isLoggedIn) {
    return (
      <Container className="mt-3" style={responsiveBox}>
        <h3>zero knowledge passcode</h3>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Enter password"
            aria-label="Enter password"
            aria-describedby="basic-addon2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>
      </Container>
    );
  }

  return (
    <Container className="mt-3" style={{ width: "95%" }}>
      <h1>Requests</h1>
      <Stack gap={3} className="mt-3">
        {tickets.map((ticket) => (
          <Card
            key={ticket.id}
            bg={ticket.isComplete ? "success" : "light"}
            text={ticket.isComplete ? "white" : "dark"}
          >
            <Card.Body>
              <div style={{ textAlign: "left" }}>
                <Card.Title>Contact: {ticket.contact}</Card.Title>
              </div>
              <br />
              <Card.Text>
                <div style={{ textAlign: "left" }}>{ticket.message}</div>
              </Card.Text>
              <div style={{ display: "flex", textAlign: "center" }}>
                <Form.Check
                  type="checkbox"
                  label="complete?"
                  checked={ticket.isComplete}
                  onChange={() => toggleComplete(ticket)}
                  className="mb-2"
                />
              </div>
              <Card.Footer className="text-muted">
                Submitted on: {ticket.createdAt}
              </Card.Footer>
            </Card.Body>
          </Card>
        ))}
      </Stack>

      <h1>Tokens</h1>
      <Stack gap={3} className="mt-3">
        {tokens.map((token) => (
          // <Card key={token.id} bg="light" text="dark">
          //   <Card.Body>
          //     <Card.Text>{token.cashuToken}</Card.Text>
          //   </Card.Body>
          // </Card>
          <IdentityCard
            theme="cashu"
            number={token.cashuToken?.substr(0, 16) + "..."}
            name={"Balance: 1 SAT"}
            realValue={token.cashuToken}
          />
        ))}
      </Stack>
    </Container>
  );
};
