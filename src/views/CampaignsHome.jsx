import React, { useState, useEffect } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

// import CampaignMenuComponent from "../components/CampaignMenuComponent";
// import CurrentCampaignComponent from "../components/CurrentCampaignComponent";
import CampaignCard from "../components/CampaignCard";
import CreateCampaignCard from "../components/CreateCampaignCard";
import Loading from "../components/Loading";
import Highlight from "../components/Highlight";

import { getConfig } from "../config";
import { fetchCampaigns } from "../utils/api_functions";

export const CampaignsHomeComponent = () => {
    const { auth_user, getAccessTokenSilently } = useAuth0();
    const { apiOrigin = "http://localhost:8000", audience } = getConfig();

    const [isLoading, setIsLoading] = useState(true);
    const [campaigns, setCampaigns] = useState({});
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            fetchCampaigns(apiOrigin, getAccessTokenSilently, setCampaigns);
        };

        fetchData();
        setIsLoading(false);
    }, [apiOrigin, getAccessTokenSilently]);

    return (
        <div>
            <h2>Campaigns Menu</h2>

            {isLoading ? (
                <div>Loading data...</div>
            ) : (
                <div>
                    <CreateCampaignCard
                        apiOrigin={apiOrigin}
                        getAccessTokenSilently={getAccessTokenSilently}
                    />

                    <div className="card-container">
                        {Object.entries(campaigns).map(([index, campaign]) => (
                            <CampaignCard key={index} campaign={campaign} />
                        ))}
                    </div>
                    <Highlight>
                        <span>{JSON.stringify(campaigns)}</span>
                    </Highlight>
                </div>
            )}
        </div>
    );
};

export default withAuthenticationRequired(CampaignsHomeComponent, {
    onRedirecting: () => <Loading />,
});
