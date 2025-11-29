import React, { useState, useEffect, useContext } from 'react'
import SocketContext from './socketContext'
import io from 'socket.io-client'
import { useNavigate } from 'react-router-dom'
import {
  CS_DISCONNECT,
  CS_FETCH_LOBBY_INFO,
  SC_PLAYERS_UPDATED,
  SC_RECEIVE_LOBBY_INFO,
  SC_TABLES_UPDATED,
} from '../../pokergame/actions'
import globalContext from '../global/globalContext'
import config from '../../clientConfig'

const WebSocketProvider = ({ children }) => {
  const { setTables, setPlayers, setChipsAmount } = useContext(globalContext)
  const navigate = useNavigate()

  const [socket, setSocket] = useState(null)
  const [socketId, setSocketId] = useState(null)

  useEffect(() => {
    window.addEventListener('beforeunload', cleanUp)
    window.addEventListener('beforeclose', cleanUp)
    return () => cleanUp()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
      console.log('socket context')
      const webSocket = socket || connect()

      return () => cleanUp()
    // eslint-disable-next-line
  }, [])

  function cleanUp() {
    window.socket && window.socket.emit(CS_DISCONNECT)
    window.socket && window.socket.close()
    setSocket(null)
    setSocketId(null)
    setPlayers(null)
    setTables(null)
  }

  function connect() {
    const socket = io(config.socketURI, {
      transports: ['websocket'],
      upgrade: false,
    })
    registerCallbacks(socket)
    window.socket = socket
    return socket
  }

  function registerCallbacks(socket) {
    socket.on('connect', () => {
      setSocket(socket)
    })

    socket.on(SC_RECEIVE_LOBBY_INFO, ({ tables, players, socketId, amount }) => {
      console.log(SC_RECEIVE_LOBBY_INFO, tables, players, socketId)
      setSocketId(socketId)
      setChipsAmount(amount)
      setTables(tables)
      setPlayers(players)
    })
    
    socket.on(SC_PLAYERS_UPDATED, (players) => {
      console.log(SC_PLAYERS_UPDATED, players)
      setPlayers(players)
    })

    socket.on(SC_TABLES_UPDATED, (tables) => {
      console.log(SC_TABLES_UPDATED, tables)
      setTables(tables)
    })

  }

  return (
    <SocketContext.Provider value={{ socket, socketId, cleanUp }}>
      {children}
    </SocketContext.Provider>
  )
}

export default WebSocketProvider
