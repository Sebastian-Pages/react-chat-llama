import React, { useState } from "react";
import { Card, CardBody, CardTitle, CardText, Button, Input, Form, FormGroup, Label,Row, Col  } from "reactstrap";
import { createCampaign } from "../utils/api_functions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateCampaignCard = ({ apiOrigin,getAccessTokenSilently }) => {
  const [campaignTitle, setCampaignTitle] = useState("");
  const [campaignQuest, setCampaignQuest] = useState("");

  const handleCreateCampaign = async () => {
    try {
      const responseData = await createCampaign(apiOrigin, getAccessTokenSilently, campaignTitle, campaignQuest);
      console.log("Response Data:", responseData);
      toast.success(responseData.message); // Display success toast notification
    } catch (error) {
      console.error(error);
      toast.error("An error occurred"); // Display error toast notification
    }
  };

  const do_toast = () => {
    toast.success("Hello")

    };

  return (
    <Card>
      <CardBody>
        <CardTitle>Create New Campaign</CardTitle>
        <Form>
          <FormGroup>
            <div className="d-flex">
              <Label for="title">Title</Label>
              <Input
                type="text"
                id="title"
                value={campaignTitle}
                onChange={(e) => setCampaignTitle(e.target.value)}
              />
            </div>
          </FormGroup>
          <FormGroup>
            <div className="d-flex">
              <Label for="quest">Quest</Label>
              <Input
                type="select"
                id="quest"
                value={campaignQuest}
                onChange={(e) => setCampaignQuest(e.target.value)}
              >
                <option value="">Select Quest</option>
                <option value="desert_darkness">Desert Darkness</option>
                <option value="jungle_trap">Jungle Trap</option>
                {/* Add more quest options as needed */}
              </Input>
            </div>
          </FormGroup>
          <FormGroup className="text-center">
            <Button color="primary" onClick={handleCreateCampaign}>
              Create
            </Button>
          </FormGroup>
        </Form>
      </CardBody>
      <Button color="primary" onClick={do_toast}>
              Toast
            </Button>
    </Card>

    
  );
};

export default CreateCampaignCard;
