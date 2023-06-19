// api.js
// import { getConfig } from "../config";

export const fetchCampaigns = async (
    apiOrigin,
    getAccessTokenSilently,
    setCampaigns
) => {
    try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`${apiOrigin}/api/public/campaigns`);
        const data = await response.json();
        setCampaigns(data);
    } catch (error) {
        console.error(error);
    }
};

export const fetchCampaign = async (apiOrigin, campaignId, setCampaign) => {
    try {
        const response = await fetch(
            `${apiOrigin}/api/public/campaigns/${campaignId}`
        );
        const data = await response.json();
        setCampaign(data);
    } catch (error) {
        console.error(error);
    }
};

export const createCampaign = async (
    apiOrigin,
    getAccessTokenSilently,
    campaignTitle,
    campaignQuest
) => {
    const requestBody = {
        id: campaignTitle,
        quest: campaignQuest,
        status: "open",
        chat: [],
        users: {},
    };

    try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`${apiOrigin}/api/private/campaign`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(requestBody),
        });

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        throw new Error(error);
    }
};

export const sendMessage = async (
    apiOrigin,
    getAccessTokenSilently,
    campaign_id_,
    nickname,
    inputValue
) => {
    const requestBody = {
        campaign_id: campaign_id_,
        user_id: nickname,
        text: inputValue,
    };
    try {
        const token = await getAccessTokenSilently();
        const response = await fetch(
            `${apiOrigin}/api/private/campaigns/${campaign_id_}/chat`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            }
        );

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        throw new Error(error);
    }
};

export const fetchChatResponse = async (
    campaignId,
    apiOrigin,
    getAccessTokenSilently,
    setIsLoadingReply,
    handleRefresh,
    chat_type
) => {
    const token = await getAccessTokenSilently();
    const url = `${apiOrigin}/api/private/campaigns/${campaignId}/chat/${chat_type}`;

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch campaign chat");
    }

    const chat = await response.json();
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return chat;
};

// export const callPublicApi = async (apiOrigin, getAccessTokenSilently) => {
//   try {
//     const token = await getAccessTokenSilently();
//     const response = await fetch(`${apiOrigin}/api/public/campaigns`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// export const create_new_campaign = async (
//   apiOrigin,
//   getAccessTokenSilently,
//   campaignTitle,
//   campaignQuest
// ) => {
//   const requestBody = {
//     campaign_id: campaignTitle,
//     campaign_quest: campaignQuest,
//   };

//   try {
//     const token = await getAccessTokenSilently();

//     const response = await fetch(`${apiOrigin}/api/private/new_campaign`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(requestBody),
//     });

//     const responseData = await response.json();
//     return responseData;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// const callApi = async () => {
//   try {
//     const token = await getAccessTokenSilently();

//     // const response = await fetch(`${apiOrigin}/api/public/campaigns`, {
//     //   headers: {
//     //     Authorization: `Bearer ${token}`,
//     //   },
//     // });

//     const response = await fetch(`${apiOrigin}/api/public/campaigns`)
//     console.log(response)
//     const responseData = await response.json();

//     setState({
//       ...state,
//       showResult: true,
//       apiMessage: responseData,
//     });
//   } catch (error) {
//     setState({
//       ...state,
//       error: error.error,
//     });
//   }
// };
// export const createNewCampaign = async (campaignTitle, campaignQuest, token) => {
//   const { apiOrigin } =  "http://localhost:8000";

//   const requestBody = {
//     campaign_id: campaignTitle,
//     campaign_quest: campaignQuest
//   };

//   try {
//     const response = await fetch(`${apiOrigin}/api/private/new_campaign`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//       },
//       body: JSON.stringify(requestBody)
//     });

//     const responseData = await response.json();
//     return responseData;
//   } catch (error) {
//     throw new Error(error);
//   }
// };
