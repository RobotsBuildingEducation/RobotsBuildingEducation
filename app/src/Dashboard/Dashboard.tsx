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

export const Dashboard = () => {
  let env_passcode = import.meta.env.VITE_SUDO_DASHBOARD;
  const loginCheck = localStorage.getItem("dashboard_code") === env_passcode;

  const [tickets, setTickets] = useState([]);
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(loginCheck);

  useEffect(() => {
    if (!loginCheck || !isLoggedIn) return;

    const ticketsCollectionRef = query(
      collection(database, "tickets"),
      where("isComplete", "==", false), // Only fetch tickets that are not completed
      orderBy("createdAt", "desc")
    );

    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(ticketsCollectionRef, (snapshot) => {
      const updatedTickets = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt?.toDate().toLocaleString(),
      }));
      setTickets(updatedTickets);
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, [isLoggedIn]);

  const toggleComplete = async (ticket) => {
    const ticketDocRef = doc(database, "tickets", ticket.id);
    await updateDoc(ticketDocRef, {
      isComplete: !ticket.isComplete,
    });
    // setTickets(
    //   tickets.map((t) =>
    //     t.id === ticket.id ? { ...t, isComplete: !t.isComplete } : t
    //   )
    // );
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
      {/* <Button
        variant="secondary"
        onClick={() => setShowCompleted(false)}
        className="me-2"
      >
        Show Incomplete Tickets
      </Button>
      <Button variant="secondary" onClick={() => setShowCompleted(true)}>
        Show Completed Tickets
      </Button> */}

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
    </Container>
  );
};
