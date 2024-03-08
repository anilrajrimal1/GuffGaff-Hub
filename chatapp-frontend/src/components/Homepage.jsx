import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { BsTelegram } from 'react-icons/bs';
import ChatCard from './ChatCard/ChatCard';
import MessageCard from './MessageCard/MessageCard';
import { useNavigate } from 'react-router-dom';
import Profile from './Profile/Profile';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CreateGroup from './Group/CreateGroup';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser, logoutUser, searchUser } from '../Redux/Auth/Action';
import { createChat, getUserChat } from '../Redux/Chat/Action';
import { deleteGroup } from '../Redux/Chat/Action';
import { createMessage, getAllMessages } from '../Redux/Message/Action';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';

const Homepage = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [currentChat, setcurrentChat] = useState('');
    const [content, setcontent] = useState('');
    const [isprofile, setisprofile] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [isGroup, setIsGroup] = useState(false);
    const dispatch = useDispatch();
    const { auth, chat, message } = useSelector(store => store);
    const token = localStorage.getItem("token");
    const [stompClient, setStompClient] = useState();
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [lastMessages, setLastMessages] = useState({});
    const [groupMenuOpen, setGroupMenuOpen] = useState(false);
    const [groupMenuAnchorEl, setGroupMenuAnchorEl] = useState(null);
    const [deletedGroupId, setDeletedGroupId] = useState(null);

// Function to establish a WebSocket connection
    const connect = () => {
        const socket = new SockJS("http://localhost:8080/ws");
        const temp = over(socket);
        setStompClient(temp);

        const headers = {
            Authorization: `Bearer ${token}`,
            "X-XSRF-TOKEN": getCookie("XSRF-TOKEN")
        };
    // Connect to WebSocket server
        temp.connect(headers, onConnect, onError);
    };


 // Function to get a specific cookie by name
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop().split(";").shift();
        }
    }


  // Callback for WebSocket connection error
    const onError = (error) => {
        console.log("WebSocket Connection Error: ", error);
    };
  // Callback for successful WebSocket connection
    const onConnect = () => {
        console.log("WebSocket Connected ");
        setIsConnected(true);
    };


  // Effect to handle incoming new messages from WebSocket
    useEffect(() => {
        if (message.newMessage && stompClient) {
            console.log("Sending message:", message.newMessage);
            stompClient.send("/app/message", {}, JSON.stringify(message.newMessage));
        }
    }, [message.newMessage]);

  // Effect to set the messages state from the store
  useEffect(() => {
    if (message.messages) {
      setMessages(message.messages);
    }
  }, [message.messages]);

    // Callback to handle received messages from WebSocket
    const onMessageReceiver = (payload) => {
        console.log("Received Message:", JSON.parse(payload.body));

        const receivedMessage = JSON.parse(payload.body);
        setMessages((messages) => [...messages, receivedMessage]);
    };

// Effect to subscribe to a group chat when connected to WebSocket
    useEffect(() => {
    if (isConnected && stompClient && auth.reqUser && currentChat) {
        const subscription = stompClient.subscribe(
            "/group" + currentChat.id.toString(), onMessageReceiver
        );

        return () => {
            subscription.unsubscribe();
        };
    }
}, [isConnected, stompClient, auth.reqUser, currentChat, onMessageReceiver]);

// Effect to establish a WebSocket connection
    useEffect(() => {
        connect();
    }, []);


    useEffect(() => {
       setMessages(message.messages)
    }, [message.messages]);

 // Function to handle user search
    const handleSearch = (keyword) => {
        dispatch(searchUser({ keyword, token }));
    }

// Function to handle clicking on a chat card
    const HandleClickOnChat = (userId) => {
        dispatch(createChat({ token, data: { userId } }));
        setQuery("");
    }

  // Function to create a new message
    const handleCreateNewMessage = () => {
        dispatch(createMessage({ token, data: { chatId: currentChat.id, content: content } })
        );
        }

 // Function to navigate to the user's profile
    const HandleNavigate = () => {
        //  navigate('/profile');
        setisprofile(true);
    }

// Function to close the user's profile
    const HandleCloseOpenProfile = () => {
        setisprofile(false);
    }

// Function to handle opening the user menu
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

// Function to handle closing the user menu
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCreateGroup = () => {
        setIsGroup(true);
    };

// Function to handle user logout
    const handleLogOut = () => {
        dispatch(logoutUser());
        navigate("/signin");
    };

    const HandleCurrentChat = (item) => {
        setcurrentChat(item);
    }
// Effect to get user chats and groups
    useEffect(() => {
       // console.log('getting your chats');
        dispatch(getUserChat({ token }))
    }, [chat.createdChat, dispatch, token, chat.createdGroup, message.newMessage]);

    useEffect(() => {
       // console.log("getting your All groups & Chat ", currentChat);
        if (currentChat?.id) {
            dispatch(getAllMessages({ chatId: currentChat.id, token }));
        }
    }, [currentChat, dispatch, token, message.newMessage]);


    useEffect(() => {
        if (token && !auth.reqUser) {
           // console.log("Getting your Profile.....", auth);
            dispatch(currentUser(token));
        }

    }, [token, dispatch, auth, auth.reqUser]);

    useEffect(() => {
        if (auth.reqUser === null) {
            navigate("/signin");
        }
        if (auth.reqUser?.fullName) {
            navigate("/");
        }
    }, [auth.reqUser, navigate]);
    console.log("Messages ",messages);

      // Effect to update lastMessages when messages change
      useEffect(() => {
        const prevLastMessages = lastMessages;
        if (message.messages && message.messages.length > 0) {
          message.messages?.forEach((msg) => {
            prevLastMessages[msg.chat.id] = msg;
          });

          setLastMessages(prevLastMessages);
        }
      }, [message.messages, lastMessages]);


const handleGroupMenuClick = (event) => {
    setGroupMenuAnchorEl(event.currentTarget);
    setGroupMenuOpen(true);
  };

  const handleGroupMenuClose = () => {
    setGroupMenuAnchorEl(null);
    setGroupMenuOpen(false);
  };

const handleDeleteCurrentGroup = (groupId) => {
    // Your delete group logic
    dispatch(deleteGroup(groupId, token));

    // Update local state
    setDeletedGroupId(groupId);

    // Store in local storage or perform any additional cleanup as needed
    localStorage.setItem('deletedGroupId', groupId);
  };

  // Effect to update deletedGroupId state when the deletedGroupId changes
  useEffect(() => {
    if (deletedGroupId) {
      setDeletedGroupId(null);
    }
  }, [deletedGroupId]);


    return (
        <>
            <div className='relative'>

                <div className='w-full py-14 bg-[#3CCAEC]'></div>

                <div className='flex bg-[#f0f2f5] h-[90vh] absolute top-[5vh] left-[2vw] w-[96vw]'>

                    <div className='left w-[30%] h-full bg-[#bcdef5]'>

                        {/* Profile and Group Sections */}
                        {isGroup && <CreateGroup setIsGroup={setIsGroup} />}

                        {isprofile &&
                            <div className='w-full h-full'>
                                <  Profile HandleCloseOpenProfile={HandleCloseOpenProfile} />
                            </div>

                        }

                        {/* Home Section */}
                        {!isprofile && !isGroup && (
                            <div className='w-full'>
                                < div className='flex justify-between items-center p-3'>
                                    <div onClick={HandleNavigate} className='flex items-center space-x-3 cursor-pointer'>
                                        <img
                                            className='rounded-full w-14 h-14'
                                            src={auth.reqUser?.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                            alt="profile"
                                        />
                                        <p>{auth.reqUser?.fullName}</p>

                                    </div>

                                    <div className='space-x-3 text-2xl flex items-center'>
                                        <div>
                                            <BsThreeDotsVertical
                                                id="basic-button"
                                                aria-controls={open ? 'basic-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleClick}
                                                className='cursor-pointer'
                                            />

                                            <Menu
                                                id="basic-menu"
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                                MenuListProps={{
                                                    'aria-labelledby': 'basic-button',
                                                }}
                                            >
                                                <MenuItem onClick={HandleNavigate}>Profile</MenuItem>
                                                <MenuItem onClick={handleCreateGroup}>Create Group</MenuItem>
                                                <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                                            </Menu>
                                        </div>
                                    </div>
                                </div>

                            {/* Search Bar */}
                                            <div className='relative flex justify-center items-center bg-white py-4 px-3'>
                                              <div className='relative w-full'>
                                                <input
                                                  className='border-none outline-none bg-slate-200 rounded-md w-full pl-10 py-2 focus:ring focus:border-blue-300'
                                                  type='text'
                                                  placeholder='Search or Start new chat'
                                                  onChange={(e) => {
                                                    handleSearch(e.target.value);
                                                    setQuery(e.target.value);
                                                  }}
                                                  value={query}
                                                />
                                                <AiOutlineSearch className='absolute left-3 top-3 text-gray-600' />
                                              </div>
                                            </div>

                            {/* User and Group Chats */}
                                <div className='bg-white overflow-y-auto h-[70vh] px-3'>
                                    {query && auth.searchUser?.map((item, index) => (
                                        <div key = {index} onClick={() => HandleClickOnChat(item.id)}>
                                            <hr />
                                            <ChatCard name={item.fullName} userImg={item.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                            lastMessage={{
                                            content:
                                            lastMessages[item.id]?.content || "Start your conversation",
                                            timestamp: lastMessages[item.id]?.timestamp || "",}}
                                            />
                                        </div>
                                    ))}

                                    {chat.chats?.length > 0 &&
                                     !query &&
                                     chat.chats?.map((item, index) => (
                                        <div onClick={() => HandleCurrentChat(item)} key={item.id}>
                                            <hr />
                                            {item.group ? (
                                                <ChatCard
                                                    name={item.chatName}
                                                    userImg={item.chatImg || "https://cdn.pixabay.com/photo/2017/11/10/05/46/group-2935521_1280.png"}
                                                    lastMessage={{
                                                    content:
                                                    lastMessages[item.id]?.content ||
                                                    "Start your conversation",
                                                    timestamp: lastMessages[item.id]?.timestamp || "",
                                                    }}
                                                />
                                            ) : (
                                                <ChatCard
                                                    isChat={true}
                                                    name=
                                                    {auth.reqUser?.id !== item.users[0]?.id
                                                        ? item.users[0].fullName
                                                        : item.users[1].fullName
                                                    }
                                                    userImg={
                                                        auth.reqUser?.id !== item.users[0]?.id
                                                            ? item.users[0].profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                                            : item.users[1].profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                                    }
                                                    lastMessage={{
                                                    content:lastMessages[item.id]?.content || "Start your conversation",
                                                    timestamp: lastMessages[item.id]?.timestamp || "",
                                                    }}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                   {/* Default Landing Page */}
                    <div className='w-[70%]'>
                        {!currentChat &&
                            <div class='flex items-center justify-center h-full'>
                                <div class='w-[70%] flex flex-col items-center justify-center h-full'>
                                    <div class='max-w-[70%] text-center'>
                                        <img src="https://www.pngall.com/wp-content/uploads/10/Message-Silhouette-Background-PNG-Image.png"
                                        alt="profilepic main chat"
                                        class='h-[20rem] w-[20rem]' />
                                        <h1 class='text-4xl mt-5'>Welcome, {auth.reqUser?.fullName?.split(' ')[0]}</h1>
                                        <p class='text-gray-500 text-sm mt-5 '>Please Select any Chat to Continue</p>

                                    </div>
                                </div>
                            </div>
                        }

                        { /* When clicked on Message Card */}
                        {currentChat && (
                            <div className='w-full relative'>

                                <div className='right header absolute top-0 w-full bg-[#f0f2f5]'>

                                    <div className='flex justify-between'>

                                        <div className='py-3 space-x-4 flex items-center px-3'>

                                            <img className='w-12 h-12 rounded-full'
                                                src={currentChat.group ? currentChat.chatImg ||
                                                    "https://cdn.pixabay.com/photo/2017/11/10/05/46/group-2935521_1280.png"
                                                    : (auth.reqUser.id !== currentChat.users[0].id
                                                        ? currentChat.users[0].profilePicture ||
                                                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                                        : currentChat.users[1].profilePicture ||
                                                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")} alt="card chat img" />
                                            <p>
                                                {currentChat.group ? currentChat.chatName : (auth.reqUser?.id === currentChat.users[0].id ? currentChat.users[1].fullName : currentChat.users[0].fullName)}
                                            </p>
                                        </div>

                                        <div className='py-3 flex space-x-4  items-center px-3'>

                                              <div>
                                                                <BsThreeDotsVertical
                                                                  id="group-menu"
                                                                  aria-controls={groupMenuOpen ? 'group-menu' : undefined}
                                                                  aria-haspopup="true"
                                                                  aria-expanded={groupMenuOpen ? 'true' : undefined}
                                                                  onClick={handleGroupMenuClick}
                                                                />

                                                                <Menu
                                                                  id="group-menu"
                                                                  anchorEl={groupMenuAnchorEl}
                                                                  open={groupMenuOpen}
                                                                  onClose={handleGroupMenuClose}
                                                                  MenuListProps={{
                                                                    'aria-labelledby': 'group-menu',
                                                                  }}
                                                                >
                                                                  <MenuItem onClick={() => handleDeleteCurrentGroup(currentChat.id)}>
                                                                    Delete Group
                                                                  </MenuItem>
                                                                </Menu>
                                                              </div>
                                                            </div>
                                                        </div>
                                                     </div>

                                {/* Message Section code  */}
                                <div className='px-10 h-[85vh] overflow-y-auto bg-white'>
                                    <div className='flex flex-col space-y-2 mt-20 py-2'>
                                        { messages?.length>0
                                        && messages?.map((item, i) => (
                                            <MessageCard
                                                key={i}
                                                isReqUserMessage={item.user.id !== auth.reqUser.id}
                                                content={item.content}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Footer for sending messages  */}
                                <div className='footer h-12 bg-[#f0f2f5] absolute bottom w-full py-1'>
                                    <div className='flex items-center px-3'>
                                        <input className='py-2 px-4 outline-none border border-solid border-gray-300
                                        bg-white rounded-full w-full focus:ring focus:border-blue-300'
                                            type='text'
                                            onChange={(e) => setcontent(e.target.value)}
                                            placeholder="Type your message"
                                             value={content}
                                             onKeyPress={(e) => {
                                                if (e.key === "Enter") {
                                                    handleCreateNewMessage();
                                                    setcontent('');
                                                }
                                            }}
                                            />
                                        <BsTelegram
                                          onClick={() => {
                                            handleCreateNewMessage();
                                            setcontent('');
                                          }}
                                          size={30}
                                          className='ml-3 cursor-pointer text-blue-500'
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
export default Homepage