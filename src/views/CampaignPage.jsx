import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { getConfig } from "../config";
import { fetchCampaign } from "../utils/api_functions";

import Loading from "../components/Loading";
import Highlight from "../components/Highlight";
import ChatComponent from "../components/Chat";
import ChatEntry from "../components/ChatEntry";
import forest from "../assets/forest.png";
const CampaignPageComponent = () => {
    const { auth_user, getAccessTokenSilently } = useAuth0();
    const { apiOrigin = "http://localhost:8000", audience } = getConfig();
    const { campaignId } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingReply, setIsLoadingReply] = useState(false);
    const [campaign, setCampaign] = useState({});
    // const [users, setUsers] = useState([]);

    const handleRefresh = async () => {
        try {
            console.log("Refreshing campaign data...");
            const data = await fetchCampaign(
                apiOrigin,
                campaignId,
                setCampaign
            );
            console.log("Refreshed campaign data:", data);
        } catch (error) {
            console.error(error);
            // Handle error case
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            // fetchCampaign(apiOrigin, campaignId, setCampaign);
            console.log("Fetching campaign data...");
            const data = await fetchCampaign(
                apiOrigin,
                campaignId,
                setCampaign
            );
            console.log("Fetched campaign data:", data);
        };
        if (Object.keys(campaign).length === 0) {
            fetchData();
        }
        setIsLoading(false);
    }, []);

    return (
        <div>
            <h2>Campaign: {campaignId}</h2>
            {isLoading ? (
                <div>Loading data...</div>
            ) : (
                <div>
                    <img src={forest} alt="User Image" />

                    <hr />
                    {campaign.chat &&
                        campaign.chat.map((entry) => (
                            <ChatEntry
                                key={entry.user_id}
                                username={entry.username}
                                text={entry.text}
                            />
                        ))}
                    {isLoadingReply ? (
                        <ChatEntry username="Game Master" text="Loading ..." />
                    ) : (
                        <div>Your turn</div>
                    )}
                    {campaign.chat && (
                        <ChatComponent
                            auth_user={auth_user}
                            campaign_id={campaign.id}
                            apiOrigin={apiOrigin}
                            getAccessTokenSilently={getAccessTokenSilently}
                            setIsLoadingReply={setIsLoadingReply}
                            button_state={isLoadingReply}
                            handleRefresh={handleRefresh}
                            isChatEmpty={campaign.chat.length === 0}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default withAuthenticationRequired(CampaignPageComponent, {
    onRedirecting: () => <Loading />,
});
