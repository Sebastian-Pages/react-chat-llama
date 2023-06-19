import React, { useState } from "react";
import { Input, Button, Container, Row, Col } from "reactstrap";

const ChatEntry = ({ username, text }) => {
    return (
      <div>
        <Row>
          <Col xs={3}>
            <div className='username text-primary font-weight-bold'>{username}</div>
          </Col>
          <Col xs={9}>
            <div>{text}</div>
          </Col>
        </Row>
        <hr />
      </div>
    );
  };

export default ChatEntry;
