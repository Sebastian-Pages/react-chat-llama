import React, { useState } from "react";
import { PaperAirplaneIcon, SyncIcon } from "@primer/octicons-react";

import Highlight from "./Highlight";
import { Input, Button, Container, Row, Col } from "reactstrap";
import { toast } from "react-toastify";
import { sendMessage, fetchChatResponse } from "../utils/api_functions";
const ChatComponent = ({
    auth_user,
    campaign_id,
    apiOrigin,
    getAccessTokenSilently,
    setIsLoadingReply,
    button_state,
    handleRefresh,
    isChatEmpty,
}) => {
    const [inputValue, setInputValue] = useState("");

    const handleSend = async () => {
        try {
            const responseData = await sendMessage(
                apiOrigin,
                getAccessTokenSilently,
                campaign_id,
                // auth_user.nickname,
                "183938193",
                inputValue
            );
            console.log("Response Data:", responseData);
            setIsLoadingReply(true);
            toast.success(responseData.message); // Display success toast notification
            setInputValue("");

            await handleRefresh();
            await fetchChatResponse(
                campaign_id,
                apiOrigin,
                getAccessTokenSilently,
                setIsLoadingReply,
                handleRefresh,
                "solution"
            );
            await handleRefresh();
            await fetchChatResponse(
                campaign_id,
                apiOrigin,
                getAccessTokenSilently,
                setIsLoadingReply,
                handleRefresh,
                "situation"
            );
            await handleRefresh();
            setIsLoadingReply(false);
        } catch (error) {
            console.error(error);
            toast.error("An error occurred"); // Display error toast notification
        }
    };

    const handleStart = async () => {
        try {
            setIsLoadingReply(true);

            await fetchChatResponse(
                campaign_id,
                apiOrigin,
                getAccessTokenSilently,
                setIsLoadingReply,
                handleRefresh,
                "situation"
            );
            await handleRefresh();
            setIsLoadingReply(false);
        } catch (error) {
            console.error(error);
            toast.error("An error occurred"); // Display error toast notification
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    return (
        <div className="card-container">
            {isChatEmpty ? (
                <div className="d-flex justify-content-center">
                    <Button
                        color="primary"
                        onClick={() => handleStart()}
                        disabled={button_state ? true : false}
                    >
                        Start
                    </Button>
                </div>
            ) : (
                <div>
                    <div className="input-group mb-3">
                        <Input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Enter text..."
                        />
                        <div className="input-group-append">
                            <Button
                                color="secondary"
                                onClick={() => handleRefresh()}
                            >
                                <SyncIcon size={16} />
                            </Button>
                            <Button
                                color="primary"
                                onClick={() => handleSend(inputValue)}
                                disabled={button_state ? true : false}
                            >
                                <PaperAirplaneIcon size={16} />
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatComponent;
