import React, { useState } from "react";
import {
  selectIsLogged,
  selectUser,
} from "../../redux-store/authenticationSlice";

import ConfirmDelete from "./ConfirmDelete";
import UpdateComment from "./UpdateComment";
import { getUser } from "../../api/backend/account";
import pencil from "../../assets/img/icons/pencil.svg";
import report from "../../assets/img/icons/report.svg";
import trash from "../../assets/img/icons/trash.svg";
import { useSelector } from "react-redux";

function Comment({ comment, update, delComment, isModified }) {
  const [isUpdate, setIsUpdate] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const isLogged = useSelector(selectIsLogged);
  const user = useSelector(selectUser);

  async function getAvatarAndUsername(userId) {
    const response = await getUser(userId);
    const { avatar, username } = response.data.user;
    setAvatar(avatar);
    setUsername(username);
  }

  getAvatarAndUsername(comment.uuid_user);

  return (
    <div key={comment._id}>
      <div className="flex border-2 border-gradient-v rounded-lg py-2 px-4 mb-2">
        <div className="w-full">
          <div className="flex justify-between">
            <div className="flex">
              <div className="flex items-center w-8 h-8 mr-2">
                <img
                  className="w-full rounded-full"
                  src={avatar}
                  alt="avatar"
                />
              </div>
              <div className="flex items-center">
                <div className="font-semibold text-dark">{username}</div>
              </div>
            </div>
            {isModified && (
              <div className="mr-2 flex items-center">
                <small>Modifié le {new Date(comment.updatedAt).toLocaleDateString()} à {new Date(comment.updatedAt).toLocaleTimeString()}</small>
              </div>
            )}
          </div>
          {isUpdate ? (
            <UpdateComment
              comment={comment}
              setIsUpdate={setIsUpdate}
              update={update}
            />
          ) : (
            <div className="mt-2 text-dark">{comment.comment}</div>
          )}
        </div>
        <div className="flex flex-row">
          {!isUpdate &&
            isLogged &&
            user != null &&
            comment.uuid_user === user.uuid && (
              <div className="flex items-end">
                <button type="submit" onClick={() => setIsUpdate(!isUpdate)}>
                  <img src={pencil} alt="" />
                </button>
              </div>
            )}
          {/* {!isUpdate && (
            <div className="flex items-end ml-1">
              <img src={report} alt="" />
            </div>
          )} */}
          {!isUpdate &&
            isLogged &&
            user != null &&
            comment.uuid_user === user.uuid && (
              <div className="flex items-end ml-1 w-5">
                <button type="submit" onClick={() => setShowConfirm(true)}>
                  <img src={trash} alt="" />
                </button>
              </div>
            )}
          {showConfirm && (
            <ConfirmDelete
              setShowConfirm={setShowConfirm}
              delComment={delComment}
              uuid={comment.uuid}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Comment;
