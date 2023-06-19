import React, { Fragment } from "react";
import CampaignCard from "./CampaignCard";
import CreateCampaignCard from "./CreateCampaignCard";


const CampaignMenuComponent = ({ campaigns_preview, setCurrent_campaign,create_new_campaign}) => {

    return (
        <Fragment>
            <CreateCampaignCard create_new_campaign={create_new_campaign}/>
            <div className="card-container">
            {Object.entries(campaigns_preview).map(([campaignId, campaignData]) => (
                <CampaignCard
                key={campaignId}
                campaignId={campaignId}
                campaignData={campaignData}
                setCurrent_campaign={setCurrent_campaign}
                />
            ))}
            </div>
        </Fragment>

      );
    };
    
export default CampaignMenuComponent;