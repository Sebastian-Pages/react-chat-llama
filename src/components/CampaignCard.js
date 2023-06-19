import React from "react";
import { Card, CardBody, CardTitle, CardText,Button, Row, Col } from "reactstrap";
import Highlight from "./Highlight";
import { Link } from "react-router-dom";


const CampaignCard = ({ campaign }) => {

  return (
    <Card>
      <CardBody>
        <Row>
          <Col>
            <CardTitle>{campaign.id}</CardTitle>
          </Col>
          <Col>
            <CardText>{campaign.quest}</CardText>
          </Col>
          <Col className="text-right">
          <Link to={`/campaign/${campaign.id}`}>
            <button>Join</button>
          </Link>
          </Col>
        </Row>
        
      </CardBody>
      <Highlight>
          <span>{JSON.stringify(campaign)}</span>
      </Highlight>
    </Card>
  );
};

export default CampaignCard;
