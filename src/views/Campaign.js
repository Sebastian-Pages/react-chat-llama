import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { getConfig } from "../config";
import { Input, Button, Container, Row, Col } from "reactstrap";

import Loading from "../components/Loading";

export const CampaignComponent = () => {
  const location = useLocation();
  const { campaignId, campaignQuest } = location.state;
  const { apiOrigin = "http://localhost:8000", audience } = getConfig();
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [state, setState] = useState({
    showResult: false,
    apiMessage: "",
    error: null,
  });
  const [campaigns, setCampaigns] = useState([]);
  const {
    getAccessTokenSilently,
    loginWithPopup,
    getAccessTokenWithPopup,
  } = useAuth0();
  const handleConsent = async () => {
    try {
      await getAccessTokenWithPopup();
      setState({
        ...state,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }

    await callApi();
  };

  const handleLoginAgain = async () => {
    try {
      await loginWithPopup();
      setState({
        ...state,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }

    await callApi();
  };

  const callApi = async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(`${apiOrigin}/api/public/campaigns`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      //   const response = await fetch(`${apiOrigin}/api/public/campaigns`)
      console.log(response);
      const responseData = await response.json();

      setState({
        ...state,
        showResult: true,
        apiMessage: responseData,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }
  };

  const handleSend = async () => {
  try {
    const token = await getAccessTokenSilently();

    const requestBody = {
      campaign_id: campaignId,
      user_id: 'user_me',
      text: inputValue
    };
    const response = await fetch(`${apiOrigin}/api/private/new_chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    // Handle the response as needed
  } catch (error) {
    console.error(error);
  }
};


  return (
    <div>
      <h2>Campaign Page</h2>
      <p>Campaign ID: {campaignId}</p>
      <p>Campaign Quest: {campaignQuest}</p>
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
          <Button color="primary" onClick={handleSend}>
            Send
          </Button>
        </Col>
      </Row>
    </Container>
    
    </div>
  );
};

export default withAuthenticationRequired(CampaignComponent, {
  onRedirecting: () => <Loading />,
});
