import React, { useState } from "react";
import Highlight from "./Highlight";
import { Input, Button, Container, Row, Col } from "reactstrap";

const CurrentCampaignComponent = ({ current_campaign,handleSend}) => {
  const [inputValue, setInputValue] = useState("");

    return (
        <div className="card-container">
        {current_campaign.id}
        <Highlight>
            <span>{JSON.stringify(current_campaign, null, 2)}</span>
        </Highlight>
        <Container>
      <Row>
        <Col>
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter text..."
          />
        </Col>
        <Col xs="auto">
          <Button color="primary" onClick={() => handleSend(inputValue)}>
            Send
          </Button>
        </Col>
      </Row>
    </Container>
        <hr />
        </div>
      );
    };
    
export default CurrentCampaignComponent;