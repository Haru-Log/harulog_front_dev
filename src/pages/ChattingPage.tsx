import React, { useEffect } from 'react'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '../ui/resizable-panel'
import { ScrollArea } from '../ui/scroll-area'
import MessageListHeader from '../components/ChattingPage/MessageListHeader'
import MessageList from '../components/ChattingPage/MessageList'
import Chatroom from '../components/ChattingPage/Chatroom'
import { useChatStore } from '../zustand/chatStore'
import { fetchChatsList } from '../api/chats/FetchChatsList'
import { ChatRoom } from '../types/ChatRoom.type'
import { outChatRoom } from '../api/chats/OutChatRoom'
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const ChattingPage = () => {
  const { setChatList, selectedChatroomInfo, selectChatroomInfo } = useChatStore();
  let client = new SockJS(`${process.env.REACT_APP_BACKEND_DEPLOY}/ws`);
  let stompClient = Stomp.over(client);
  const accessToken = localStorage.getItem('AccessToken');
  const myName = localStorage.getItem('nickname');

  useEffect(() => {
    const initializeStompClient = async () => {
      stompClient.connect({
        'accept-version': '1.2,1.1,1.0',
        login: 'harulog',
        passcode: 'hhaarruulloogg',
        Authorization: `Bearer ${accessToken}`,
      }, () => {
        console.log('STOMP connected');
        stompClient.subscribe(`/queue/user.${myName}`, (message) => {
          console.log('Received message:', message.body);
          selectChatroomInfo({ ...selectedChatroomInfo, messages: [...selectedChatroomInfo.messages, JSON.parse(message.body)] });
        });
      }, function(e:any) {
        alert('STOMP error ' + e);
      });
    };

    initializeStompClient();

    return () => {
      if (stompClient && stompClient.connected) {
        stompClient.disconnect();
        console.log('STOMP disconnected');
      }
    };
  }, [accessToken, myName, stompClient ,selectedChatroomInfo, selectChatroomInfo]);

  // useEffect(() => {
  //   if (selectedChatroomInfo.roomId) {
  //     outChatRoom(selectedChatroomInfo.roomId);
  //   }
  //   const initialChatroomInfo: ChatRoom = {
  //     roomId: '',
  //     userCount: 0,
  //     messages: [],
  //   };
  //   selectChatroomInfo(initialChatroomInfo);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetchChatsList();
        setChatList(response);
      }
      catch (error) {
        console.error(error);
      }
    }
    fetchChats();
  }, [setChatList]);

  
  return (

    <div className='mt-12 font-ibm'>
      <ResizablePanelGroup
        direction="horizontal"
        className="h-fit border-b"
      >
        <ResizablePanel defaultSize={20} className='min-w-[300px] max-w-[500px] h-full'>
          <ScrollArea className="h-[1000px]">
            <MessageListHeader />
            <MessageList />
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          <ScrollArea className="h-[1000px]">
            {selectedChatroomInfo.roomId ? <Chatroom stompClient={stompClient} /> : <div className='bg-[#EAF0F7] h-[1000px] flex items-center justify-center'><div>채팅방을 선택해보세요!</div></div>}
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default ChattingPage
