import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Info, LocalStorage } from "../../../controllers/info";
import { UserController } from "../../../controllers/user";
import "./style.css";
export const FriendRequest = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      await Info.isUserLogin(navigate);
      const user = await UserController.getCurrentUserInformation();

      if (user) {
        setRequests(user.friendRequests);
      }
    })();
  }, []);
  const friendCard = ({ bntText, onClick, user }) => {
    return (
      <div key={user._id} id="friend-card">
        <div className="request-img-div">
          <div>
            <img src={user.profilePicture} />
          </div>
          <small>{user.userName}</small>
        </div>
        <div className="friend-card-buttons">
          <button onClick={onClick[0]}>{bntText[0]}</button>
          <button onClick={onClick[1]}>{bntText[1]}</button>
        </div>
      </div>
    );
  };

  const acceptFriendRequest = async (friendRequest) => {
    const receiver = friendRequest.receiver;
    const sender = friendRequest.sender;
    const requestId = friendRequest._id;
    await UserController.acceptFriendRequest({
      receiver,
      sender,
      requestId,
    });
    for (let i = 0; i < requests.length; i++) {
      if (friendRequest._id === requests[i]._id) {
        requests.splice(i, 1);
        Info.user.friends.push({
          userName: friendRequest.sender.userName,
          _id: friendRequest.sender._id,
          profilePicture: friendRequest.sender._profilePicture,
        });
        LocalStorage.setItem("user", JSON.stringify(Info.user));
        setTimeout(() => {
          setRequests([...requests]);
        }, 500);

        break;
      }
    }
  };
  const deleteFriendRequest = async (friendRequest) => {
    const receiver = friendRequest.receiver;
    const requestId = friendRequest._id;
    await UserController.deleteFriendRequest({
      receiver,
      requestId,
    });
    for (let i = 0; i < requests.length; i++) {
      if (friendRequest._id === requests[i]._id) {
        requests.splice(i, 1);
        setTimeout(() => {
          setRequests([...requests]);
        }, 500);

        break;
      }
    }
  };
  return (
    <div id="fiend-suggestions-main-div">
      <div className="suggestions-class">
        <h3>Friend Requests</h3>
        {requests.map((friendRequest) => {
          return friendCard({
            onClick: [
              () => {
                acceptFriendRequest(friendRequest);
              },
              () => {
                deleteFriendRequest();
              },
            ],
            bntText: ["Accept", "Remove"],
            user: friendRequest.sender,
          });
        })}
      </div>
    </div>
  );
};
