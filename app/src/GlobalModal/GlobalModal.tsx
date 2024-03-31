// import { Modal } from "react-bootstrap";
// import { EmotionalIntelligenceStyles } from "../ProofOfWork/ImpactWallet/EmotionalIntelligence/EmotionalIntelligence.styles";
// import { useStore } from "../Store";

// export const GlobalModal = ({
//   uiStateReference,
//   children,
//   isModalOpen,
//   setIsModalOpen,
// }) => {
//   const { isFetching, startFetching, setResponse, setError } = useStore();

//   return (
//     <Modal
//       show={isModalOpen}
//       centered
//       keyboard
//       onHide={() => setIsModalOpen(false)}
//       style={{ zIndex: 1000000 }}
//     >
//       <Modal.Header
//         closeButton
//         closeVariant="white"
//         style={EmotionalIntelligenceStyles.EmotionHeader}
//       >
//         <Modal.Title style={{ fontFamily: "Bungee" }}>Co-founder</Modal.Title>
//       </Modal.Header>
//       <Modal.Body
//         style={{
//           ...EmotionalIntelligenceStyles.EmotionBody,
//           overflow: "scroll",
//         }}
//       >
//         {children}
//       </Modal.Body>
//     </Modal>
//   );
// };
