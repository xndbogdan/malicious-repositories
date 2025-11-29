import axios from 'axios';
import { toast } from 'react-toastify';

export const useApi = () => {
  const getUserProfile = async (address) => {
    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/get_profile`, {
        address: address
      }, {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      });
      if (data.success) {
        console.log('success', data)
        return data
      } else {
        console.log('error', data)
        return null;
      }
    } catch (err) {
      toast.error(err.message)
      console.log(err)
    }
  }

  const getPokerTables = async (gameId) => {
    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/get_poker_tables`, {
        gameId: gameId
      }, {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      });
      if (data.success) {
        return data.result
      } else {
        toast.error('Failed to load all games.')
        return null;
      }
    } catch (err) {
      toast.error(err.message)
      console.log(err)
    }
  }

  const getGameById = async (gameId) => {
    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/get_game_by_id`, {
        gameId: gameId
      }, {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      });
      if (data.success) {
        return data.result
      } else {
        toast.error('Failed to load all games.')
        return null;
      }
    } catch (err) {
      toast.error(err.message)
      console.log(err)
    }
  }


  return {
    getUserProfile,
    getPokerTables,
    getGameById,
  }
}