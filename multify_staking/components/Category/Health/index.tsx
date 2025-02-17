import React, { Component } from "react";
import { Box, Text } from "@chakra-ui/react";

//API Key
const API_KEY = "ckey_4e73d56514984838ab3206fbaf4";

class Health extends Component {
  state = {
    items: [],
  };

  getApiHealth = async (e: {
    target: {
      elements: {
        chainId: { value: any };
        dexName: { value: any };
      };
    };
    preventDefault: () => void;
  }) => {
    const chainId = e.target.elements.chainId.value;
    e.preventDefault();
    const dexName = e.target.elements.dexName.value;
    e.preventDefault();

    const api_call = await fetch(
      `https://api.covalenthq.com/v1/${chainId}/xy=k/${dexName}/health/?quote-currency=USD&format=JSON&key=${API_KEY}`
    );
    const data = await api_call.json();
    this.setState({ items: data.data.items });

    console.log(this.state.items);
  };

  render() {
    return (
      <div>
        <Text
          letterSpacing={2}
          fontSize="3xl"
          fontWeight="semibold"
          decoration="lightblue"
          textTransform="uppercase"
        >
          Health
        </Text>

        {/* <DexSelectBtn getApi={this.getApiHealth} /> */}
        <Box>
          {this.state.items.map((item) => (
            <ul key={item.latest_block_height}>
              <li>{item.latest_block_signed_at}</li>
              <li>{item.synced_block_height}</li>
              <li>{item.synced_block_signed_at}</li>
            </ul>
          ))}
        </Box>
      </div>
    );
  }
}
export default Health;
