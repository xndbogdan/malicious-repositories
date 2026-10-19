import { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { WalletHook } from "./utils/ethereum";
import { woolBalance } from "./utils/wool";
import { useApollo } from "./utils/apollo";
import Page from "./Page";
import Modal from "react-modal";
const App = () => {
    const client = useApollo();

    const { wallet, chain } = WalletHook();
    const [wool, setWool] = useState("?");

    useEffect(() => {
        Modal.setAppElement("body");
        console.log("Mounting app");
    }, []);

    useEffect(() => {
        const loadWool = async () => {
            if (!wallet) return;
            setWool(await woolBalance(wallet));
        };
        loadWool();
    }, [wallet, chain]);

    return (
        <ApolloProvider client={client}>
            <Page
                wallet={wallet}
                chain={chain}
                wool={wool}
                reload={async () => {
                    if (!wallet) return;
                    setWool(await woolBalance(wallet));
                }}
            />
        </ApolloProvider>
    );
};

export default App;
