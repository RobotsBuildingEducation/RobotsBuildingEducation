import { Button, Form, Modal } from "react-bootstrap";
import isEmpty from "lodash/isEmpty";
import { CodeDisplay } from "../../CodeDisplay/CodeDisplay";
import {
  japaneseThemePalette,
  textBlock,
} from "../../../../../styles/lazyStyles";
import { RoxanaLoadingAnimation } from "../../../../uiSchema";
import { styling } from "./SoftwareEngineer.styles";

export const SoftwareEngineer = ({
  isModalOpen,
  setIsModalOpen,
  isLoading,
  formState,
  apiResponse,
  handleInputChange,
  handleSubmit,
}) => {
  return (
    <Modal
      show={isModalOpen}
      centered
      keyboard
      onHide={() => setIsModalOpen(false)}
      style={{ zIndex: 10000 }}
    >
      <Modal.Header closeButton closeVariant="white" style={styling.Header}>
        <Modal.Title style={{ fontFamily: "Bungee" }}>Co-founder</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          ...styling.Body,
          overflow: "scroll",
        }}
      >
        <div>
          <Form>
            <Form.Group controlId="descriptionTextarea">
              <Form.Label>Let's create code</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder="How do I create an AI app?"
                value={formState.description}
                onChange={handleInputChange}
              />
            </Form.Group>

            <br />
            <Button variant="primary" onClick={handleSubmit}>
              Create
            </Button>
          </Form>
        </div>
        <br />
        {isLoading ? <RoxanaLoadingAnimation /> : null}
        <br />
        {!isEmpty(apiResponse) ? (
          <div>
            <div
              style={{
                ...textBlock(japaneseThemePalette.KyotoPurple, 0, 12),
                marginBottom: 12,
              }}
            >
              <h3 style={{ fontFamily: "Bungee" }}>Frontend</h3>
              <p style={{ lineHeight: "1.5" }}>
                {apiResponse.frontend_code.explanation}
              </p>
            </div>
            <CodeDisplay code={apiResponse.frontend_code.code} />
            <br />
            <br />
            <br />
            <div
              style={{
                ...textBlock(japaneseThemePalette.BambooForestGreen, 0, 12),
                marginBottom: 12,
              }}
            >
              {" "}
              <h3 style={{ fontFamily: "Bungee" }}>Backend</h3>
              <p style={{ lineHeight: "1.5" }}>
                {apiResponse.backend_code.explanation}
              </p>
            </div>
            <CodeDisplay code={apiResponse.backend_code.code} />
          </div>
        ) : null}
      </Modal.Body>
    </Modal>
  );
};
