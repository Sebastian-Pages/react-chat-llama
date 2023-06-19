import React, { useState, useEffect } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

import CampaignMenuComponent from "../components/CampaignMenuComponent";
import CurrentCampaignComponent from "../components/CurrentCampaignComponent";
import Loading from "../components/Loading";
import Highlight from "../components/Highlight";

import { getConfig } from "../config";

export const PlayComponent = () => {
    const { user, getAccessTokenSilently } = useAuth0();
    const { apiOrigin = "http://localhost:8000", audience } = getConfig();

    const [isLoading, setIsLoading] = useState(true);
    const [campaigns_preview, setCampaigns_preview] = useState({});
    const [current_campaign_id, setCurrent_campaign_id] = useState("");
    const [current_campaign, setCurrent_campaign] = useState({});
    const [current_user, setCurrent_user] = useState("");

    const create_new_campaign = async (campaignTitle, campaignQuest) => {
        const requestBody = {
            campaign_id: campaignTitle,
            campaign_quest: campaignQuest,
            user_id: user.sub,
            user_name: user.nickname,
        };

        try {
            const token = await getAccessTokenSilently();

            const response = await fetch(
                `${apiOrigin}/api/private/new_campaign`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(requestBody),
                }
            );

            console.log(response);
            const responseData = await response.json();
            setCurrent_campaign_id(responseData);
        } catch (error) {
            throw new Error(error);
        }
    };

    const handleSend = async (inputValue) => {
        try {
            const token = await getAccessTokenSilently();

            const requestBody = {
                campaign_id: current_campaign_id,
                user_id: user.sub,
                text: inputValue,
            };
            console.log("TEST", current_campaign_id);
            console.log("TEST", user.sub);
            console.log("TEST", inputValue);

            const response = await fetch(`${apiOrigin}/api/private/new_chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(requestBody),
            });
            const data = await response.json();
            console.log(data);
            setCurrent_campaign(data.data);

            // Handle the response as needed
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await getAccessTokenSilently();
                const response = await fetch(
                    `${apiOrigin}/api/public/campaigns`
                );
                const responseData = await response.json();
                setCampaigns_preview(responseData);
                // ************
                const userResponse = await fetch(
                    `${apiOrigin}/api/public/user?user_id=${user.sub}`
                );
                const userData = await userResponse.json();
                setCurrent_user(userData);
                setCurrent_campaign_id(userData[0]["current_campaign"]);
                if (userData[0]["current_campaign"] !== "") {
                    const campaignResponse = await fetch(
                        `${apiOrigin}/api/public/campaign?campaign_id=${userData[0]["current_campaign"]}`
                    );
                    const campaignData = await campaignResponse.json();
                    setCurrent_campaign(campaignData);
                    console.log("DEBUG[current_campaign]: ", campaignData);
                }

                setIsLoading(false);
                console.log("DEBUG[current_user]: ", current_user);
                console.log(
                    "DEBUG[current_campaign_id]: ",
                    userData[0]["current_campaign"]
                );

                //********** */
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [apiOrigin, getAccessTokenSilently]);

    return (
        <div>
            <h2>Play</h2>

            {isLoading ? (
                <div>Loading current user...</div>
            ) : (
                <div>
                    {current_campaign_id ? (
                        <CurrentCampaignComponent
                            current_campaign={current_campaign}
                            handleSend={handleSend}
                        />
                    ) : (
                        <CampaignMenuComponent
                            campaigns_preview={campaigns_preview}
                            setCurrent_campaign_id={setCurrent_campaign_id}
                            create_new_campaign={create_new_campaign}
                        />
                    )}
                    <Highlight>
                        <span>{JSON.stringify(user, null, 2)}</span>
                    </Highlight>
                    {current_user.user_id}
                    <Highlight>
                        <span>{JSON.stringify(current_user)}</span>
                    </Highlight>
                    <Highlight>
                        <span>{JSON.stringify(current_campaign_id)}</span>
                    </Highlight>
                    <Highlight>
                        <span>{JSON.stringify(current_campaign)}</span>
                    </Highlight>
                </div>
            )}
        </div>
    );
};

export default withAuthenticationRequired(PlayComponent, {
    onRedirecting: () => <Loading />,
});
