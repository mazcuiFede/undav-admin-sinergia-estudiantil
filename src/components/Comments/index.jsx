import React, { useEffect, useState } from "react"
import userService from "../../services/user.service"
import dudaServices from "../../services/dudas.service"
import { CommentSection } from "./../../dependencies/React-comments"
import "./../../dependencies/React-comments/index.css"
import "./Comments.css"

const Comments = ({ data, idcomentario }) => {
  const [comment, setComment] = useState(data)
  const [user, setUser] = useState(null)

  useEffect(() => {
    userService.getUserData().then((response) => {
      debugger
      setUser(response.user)
    })
  }, [])

  const setearComentarios = (comments) => {
    setComment(comments)
    dudaServices.putDudaComment(idcomentario, comments).then((response) => {
      debugger
    })
  }

  const signinUrl = "/login"

  let count = 0
  comment.map((i) => {
    count += 1
    i.replies && i.replies.map((i) => (count += 1))
  })

  return (
    <div className="commentSection" style={{ width: "80%" }}>
      <div className="header">{count} Comentarios</div>

      <CommentSection
        currentUser={
          user && {
            userId: user.id,
            avatarUrl: user.avatarUrl,
            name: user.nombre + " " + user.apellido,
          }
        }
        commentsArray={comment}
        setComment={setearComentarios}
        signinUrl={signinUrl}
        signupUrl={signinUrl}
      />
    </div>
  )
}

export default Comments
