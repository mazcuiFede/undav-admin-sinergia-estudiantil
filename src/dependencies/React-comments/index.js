function _interopDefault(ex) {
  return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex
}

var React = require("react")
var React__default = _interopDefault(React)
var uuid = _interopDefault(require("react-uuid"))
require("reactjs-popup/dist/index.css")
var Popup = _interopDefault(require("reactjs-popup"))
var reactFontawesome = require("@fortawesome/react-fontawesome")
var freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons")

var styles = {
  section: "_Style__section__12xdX",
  inputBox: "_Style__inputBox__2STY7",
  inputActions: "_Style__inputActions__9-5lp",
  postBtn: "_Style__postBtn__3oc4k",
  cancelBtn: "_Style__cancelBtn__36TCS",
  form: "_Style__form__CXD_f",
  userImg: "_Style__userImg__27hXc",
  postComment: "_Style__postComment__1blCt",
  displayComments: "_Style__displayComments__1SugS",
  halfDiv: "_Style__halfDiv__qWiSF",
  userInfo: "_Style__userInfo__1i6uS",
  commentsTwo: "_Style__commentsTwo__155_V",
  fullName: "_Style__fullName__2Axcq",
  replyBtn: "_Style__replyBtn__1Njvz",
  userActions: "_Style__userActions__34q_J",
  actionsBtn: "_Style__actionsBtn__3ypnz",
  replySection: "_Style__replySection__l0opN",
  actionDiv: "_Style__actionDiv__yEQPV",
  editBtn: "_Style__editBtn__333BI",
  deleteBtn: "_Style__deleteBtn__2YYVO",
  signBox: "_Style__signBox__1Vv8n",
  signLine: "_Style__signLine__1Ogr8",
  loginBtn: "_Style__loginBtn__1Oc7K",
  signBtn: "_Style__signBtn__20VaH",
}

var ActionContext = React.createContext()
var ActionProvider = function ActionProvider(_ref) {
  var children = _ref.children,
    currentUser = _ref.currentUser,
    setComment = _ref.setComment,
    comments = _ref.comments,
    signinUrl = _ref.signinUrl,
    signupUrl = _ref.signupUrl,
    customInput = _ref.customInput

  var _useState = React.useState([]),
    replies = _useState[0],
    setReplies = _useState[1]

  var _useState2 = React.useState(),
    user = _useState2[0],
    setUser = _useState2[1]

  var _useState3 = React.useState([]),
    editArr = _useState3[0],
    setEdit = _useState3[1]

  React.useEffect(function () {
    if (currentUser) {
      setUser(true)
    } else {
      setUser(false)
    }
  })

  var handleAction = function handleAction(id, edit) {
    edit
      ? setEdit([].concat(editArr, [id]))
      : setReplies([].concat(replies, [id]))
  }

  var handleCancel = function handleCancel(id, edit) {
    if (edit) {
      var list = [].concat(editArr)
      var newList = list.filter(function (i) {
        return i !== id
      })
      setEdit(newList)
    } else if (!edit) {
      var _list = [].concat(replies)

      var _newList = _list.filter(function (i) {
        return i !== id
      })

      setReplies(_newList)
    }
  }

  var onSubmit = function onSubmit(text, parentId, child) {
    if (text.length > 0) {
      if (!parentId && !child) {
        setComment(
          [].concat(comments, [
            {
              userId: currentUser.userId,
              comId: uuid(),
              avatarUrl: currentUser.avatarUrl,
              fullName: currentUser.name,
              text: text,
            },
          ])
        )
      } else if (parentId && child) {
        var newList = [].concat(comments)
        var index = newList.findIndex(function (x) {
          return x.comId === parentId
        })
        newList[index].replies.push({
          userId: currentUser.userId,
          comId: uuid(),
          avatarUrl: currentUser.avatarUrl,
          fullName: currentUser.name,
          text: text,
        })
        setComment(newList)
      } else if (parentId && !child) {
        var _newList2 = [].concat(comments)

        var _index = _newList2.findIndex(function (x) {
          return x.comId === parentId
        })

        var newReplies =
          _newList2[_index].replies === undefined
            ? []
            : [].concat(_newList2[_index].replies)
        newReplies.push({
          userId: currentUser.userId,
          comId: uuid(),
          avatarUrl: currentUser.avatarUrl,
          fullName: currentUser.name,
          text: text,
        })
        _newList2[_index].replies = newReplies
        setComment(_newList2)
      }
    }
  }

  var editText = function editText(id, text, parentId) {
    if (parentId === undefined) {
      var newList = [].concat(comments)
      var index = newList.findIndex(function (x) {
        return x.comId === id
      })
      newList[index].text = text
      setComment(newList)
    } else if (parentId !== undefined) {
      var _newList3 = [].concat(comments)

      var _index2 = _newList3.findIndex(function (x) {
        return x.comId === parentId
      })

      var replyIndex = _newList3[_index2].replies.findIndex(function (i) {
        return i.comId === id
      })

      _newList3[_index2].replies[replyIndex].text = text
      setComment(_newList3)
    }
  }

  var deleteText = function deleteText(id, parentId) {
    if (parentId === undefined) {
      var newList = [].concat(comments)
      var filter = newList.filter(function (x) {
        return x.comId !== id
      })
      setComment(filter)
    } else if (parentId !== undefined) {
      var _newList4 = [].concat(comments)

      var index = _newList4.findIndex(function (x) {
        return x.comId === parentId
      })

      var _filter = _newList4[index].replies.filter(function (x) {
        return x.comId !== id
      })

      _newList4[index].replies = _filter
      setComment(_newList4)
    }
  }

  var submit = function submit(
    cancellor,
    text,
    parentId,
    edit,
    setText,
    child
  ) {
    if (edit) {
      editText(cancellor, text, parentId)
      handleCancel(cancellor, edit)
      setText("")
    } else {
      onSubmit(text, parentId, child)
      handleCancel(cancellor)
      setText("")
    }
  }

  return /*#__PURE__*/ React__default.createElement(
    ActionContext.Provider,
    {
      value: {
        onSubmit: onSubmit,
        userImg: currentUser && currentUser.avatarUrl,
        userId: currentUser && currentUser.userId,
        handleAction: handleAction,
        handleCancel: handleCancel,
        replies: replies,
        setReplies: setReplies,
        editArr: editArr,
        onEdit: editText,
        onDelete: deleteText,
        signinUrl: signinUrl,
        signupUrl: signupUrl,
        user: user,
        customInput: customInput,
        submit: submit,
      },
    },
    children
  )
}

var InputField = function InputField(_ref) {
  var cancellor = _ref.cancellor,
    parentId = _ref.parentId,
    child = _ref.child,
    value = _ref.value,
    edit = _ref.edit,
    main = _ref.main

  var _useState = React.useState(""),
    text = _useState[0],
    setText = _useState[1]

  var handleChange = function handleChange(e) {
    setText(e.target.value)
  }

  React.useEffect(
    function () {
      setText(value)
    },
    [value]
  )
  var actions = React.useContext(ActionContext)
  return /*#__PURE__*/ React__default.createElement(
    "form",
    {
      className: styles.form,
      style:
        !child && !edit && main === undefined
          ? {
              marginLeft: 36,
            }
          : {
              marginLeft: 8,
            },
    },
    /*#__PURE__*/ React__default.createElement(
      "div",
      {
        className: styles.userImg,
      },
      /*#__PURE__*/ React__default.createElement("img", {
        src: actions.userImg,
        style: {
          width: 38,
          height: 38,
          borderRadius: 38 / 2,
        },
        alt: "userIcon",
      })
    ),
    /*#__PURE__*/ React__default.createElement("input", {
      className: styles.postComment,
      type: "text",
      placeholder: "Type your reply here.",
      component: "input",
      value: text,
      onChange: handleChange,
    }),
    /*#__PURE__*/ React__default.createElement(
      "div",
      {
        className: styles.inputActions,
      },
      /*#__PURE__*/ React__default.createElement(
        "button",
        {
          className: styles.postBtn,
          onClick: function onClick() {
            return edit === true
              ? actions.submit(cancellor, text, parentId, true, setText)
              : actions.submit(cancellor, text, parentId, false, setText)
          },
          type: "button",
          disabled: !text,
          style: !text
            ? {
                backgroundColor: "#84dcff",
              }
            : {
                backgroundColor: "#30c3fd",
              },
        },
        "Post"
      ),
      (text || parentId) &&
        /*#__PURE__*/ React__default.createElement(
          "button",
          {
            className: styles.cancelBtn,
            onClick: function onClick() {
              return edit
                ? actions.handleCancel(cancellor, edit)
                : actions.handleCancel(cancellor)
            },
          },
          "Cancelar"
        )
    )
  )
}

var modal = {
  fontSize: "16px",
}
var modalClose = {
  cursor: "pointer",
  position: "absolute",
  display: "block",
  padding: "2px 5px",
  lineHeight: "20px",
  right: "-10px",
  top: "-10px",
  fontSize: "24px",
  background: "#ffffff",
  borderRadius: "18px",
  border: "1px solid #cfcece",
  outline: "none",
}
var modalHeader = {
  width: "100%",
  borderBottom: "1px solid gray",
  fontSize: "18px",
  textAlign: "center",
  padding: "5px",
}
var modalContent = {
  width: "100%",
  padding: "10px 10px",
}
var modalActions = {
  width: " 100%",
  padding: " 10px 5px",
  margin: " auto",
  textAlign: " center",
}
var modalActionBtn = {
  backgroundColor: "transparent",
  outline: "none",
  border: "1px solid gray",
  padding: "4px 12px",
  cursor: "pointer",
}
var modalDelBtn = {
  backgroundColor: "transparent",
  outline: "none",
  border: "1px solid gray",
  marginLeft: "10px",
  padding: "4px 12px",
  cursor: "pointer",
}

var CommentStructure = function CommentStructure(_ref) {
  var i = _ref.i,
    reply = _ref.reply,
    parentId = _ref.parentId
  var actions = React.useContext(ActionContext)
  var edit = true
  return /*#__PURE__*/ React__default.createElement(
    "div",
    {
      className: styles.halfDiv,
    },
    /*#__PURE__*/ React__default.createElement(
      "div",
      {
        className: styles.userInfo,
        style: reply && {
          marginLeft: 15,
          marginTop: "6px",
        },
      },
      /*#__PURE__*/ React__default.createElement("div", null, i.text),
      /*#__PURE__*/ React__default.createElement(
        "div",
        {
          className: styles.commentsTwo,
        },
        /*#__PURE__*/ React__default.createElement(
          "div",
          null,
          /*#__PURE__*/ React__default.createElement("img", {
            src: i.avatarUrl,
            style: {
              width: 24,
              height: 24,
              borderRadius: 24 / 2,
            },
            alt: "userIcon",
          })
        ),
        /*#__PURE__*/ React__default.createElement(
          "div",
          {
            className: styles.fullName,
          },
          i.fullName,
          " "
        ),
        /*#__PURE__*/ React__default.createElement(
          "div",
          null,
          /*#__PURE__*/ React__default.createElement(
            "button",
            {
              className: styles.replyBtn,
              onClick: function onClick() {
                return actions.handleAction(i.comId)
              },
              disabled: !actions.user,
            },
            " ",
            /*#__PURE__*/ React__default.createElement(
              reactFontawesome.FontAwesomeIcon,
              {
                icon: freeSolidSvgIcons.faReply,
                size: "1x",
                color: "#a5a5a5",
              }
            ),
            " Reply"
          )
        )
      )
    ),
    /*#__PURE__*/ React__default.createElement(
      "div",
      {
        className: styles.userActions,
      },
      actions.userId === i.userId &&
        actions.user &&
        /*#__PURE__*/ React__default.createElement(
          Popup,
          {
            role: "tooltip",
            trigger: /*#__PURE__*/ React__default.createElement(
              "button",
              {
                className: styles.actionsBtn,
              },
              /*#__PURE__*/ React__default.createElement(
                reactFontawesome.FontAwesomeIcon,
                {
                  icon: freeSolidSvgIcons.faEllipsisV,
                  size: "1x",
                  color: "#b9b9b9",
                }
              )
            ),
            position: "right center",
            nested: true,
          },
          /*#__PURE__*/ React__default.createElement(
            "div",
            {
              className: styles.actionDiv,
            },
            /*#__PURE__*/ React__default.createElement(
              "div",
              null,
              /*#__PURE__*/ React__default.createElement(
                "button",
                {
                  className: styles.editBtn,
                  onClick: function onClick() {
                    return actions.handleAction(i.comId, edit)
                  },
                },
                " ",
                "editar"
              )
            ),
            /*#__PURE__*/ React__default.createElement(
              "div",
              null,
              /*#__PURE__*/ React__default.createElement(
                Popup,
                {
                  trigger: /*#__PURE__*/ React__default.createElement(
                    "button",
                    {
                      className: styles.deleteBtn,
                    },
                    " eliminar"
                  ),
                  modal: true,
                  nested: true,
                },
                function (close) {
                  return /*#__PURE__*/ React__default.createElement(
                    "div",
                    {
                      className: "modal",
                      style: modal,
                    },
                    /*#__PURE__*/ React__default.createElement(
                      "button",
                      {
                        className: "close",
                        onClick: close,
                        style: modalClose,
                      },
                      "\xD7"
                    ),
                    /*#__PURE__*/ React__default.createElement(
                      "div",
                      {
                        className: "header",
                        style: modalHeader,
                      },
                      " ",
                      "Eliminar Comentario",
                      " "
                    ),
                    /*#__PURE__*/ React__default.createElement(
                      "div",
                      {
                        className: "content",
                        style: modalContent,
                      },
                      " ",
                      "Eliminar comentario?"
                    ),
                    /*#__PURE__*/ React__default.createElement(
                      "div",
                      {
                        className: "actions",
                        style: modalActions,
                      },
                      /*#__PURE__*/ React__default.createElement(
                        "button",
                        {
                          className: "button",
                          style: modalActionBtn,
                          onClick: function onClick() {
                            actions.onDelete(i.comId, parentId)
                            close()
                          },
                        },
                        "Eliminar"
                      ),
                      /*#__PURE__*/ React__default.createElement(
                        "button",
                        {
                          className: "button",
                          style: modalDelBtn,
                          onClick: function onClick() {
                            close()
                          },
                        },
                        "Cancelar"
                      )
                    )
                  )
                }
              )
            )
          )
        )
    )
  )
}

var DisplayComments = function DisplayComments(_ref) {
  var comments = _ref.comments
  var actions = React.useContext(ActionContext)
  return /*#__PURE__*/ React__default.createElement(
    "div",
    null,
    comments.map(function (i, index) {
      return /*#__PURE__*/ React__default.createElement(
        "div",
        {
          key: i.comId,
        },
        actions.editArr.filter(function (id) {
          return id === i.comId
        }).length !== 0
          ? actions.customInput
            ? actions.customInput({
                cancellor: i.comId,
                value: i.text,
                handleCancel: actions.handleCancel,
                submit: actions.submit,
                edit: true,
              })
            : /*#__PURE__*/ React__default.createElement(InputField, {
                cancellor: i.comId,
                value: i.text,
                edit: true,
              })
          : /*#__PURE__*/ React__default.createElement(CommentStructure, {
              i: i,
              handleEdit: function handleEdit() {
                return actions.handleAction
              },
            }),
        actions.replies.filter(function (id) {
          return id === i.comId
        }).length !== 0 &&
          (actions.customInput
            ? actions.customInput({
                cancellor: i.comId,
                parentId: i.comId,
                submit: actions.submit,
                handleCancel: actions.handleCancel,
                edit: false,
              })
            : /*#__PURE__*/ React__default.createElement(InputField, {
                cancellor: i.comId,
                parentId: i.comId,
              })),
        /*#__PURE__*/ React__default.createElement(
          "div",
          {
            className: styles.replySection,
          },
          i.replies &&
            i.replies.map(function (a, index) {
              return /*#__PURE__*/ React__default.createElement(
                "div",
                {
                  key: a.comId,
                },
                actions.editArr.filter(function (id) {
                  return id === a.comId
                }).length !== 0
                  ? actions.customInput
                    ? actions.customInput({
                        cancellor: a.comId,
                        value: a.text,
                        handleCancel: actions.handleCancel,
                        edit: true,
                        parentId: i.comId,
                        submit: actions.submit,
                      })
                    : /*#__PURE__*/ React__default.createElement(InputField, {
                        cancellor: a.comId,
                        value: a.text,
                        edit: true,
                        parentId: i.comId,
                      })
                  : /*#__PURE__*/ React__default.createElement(
                      CommentStructure,
                      {
                        i: a,
                        reply: true,
                        parentId: i.comId,
                        handleEdit: function handleEdit() {
                          return actions.handleAction
                        },
                      }
                    ),
                actions.replies.filter(function (id) {
                  return id === a.comId
                }).length !== 0 &&
                  (actions.customInput
                    ? actions.customInput({
                        cancellor: a.comId,
                        parentId: i.comId,
                        child: true,
                        submit: actions.submit,
                        handleCancel: actions.handleCancel,
                        edit: false,
                      })
                    : /*#__PURE__*/ React__default.createElement(InputField, {
                        cancellor: a.comId,
                        parentId: i.comId,
                        child: true,
                      }))
              )
            })
        )
      )
    })
  )
}

var SignField = function SignField() {
  var actions = React.useContext(ActionContext)

  var handleDivClick = function handleDivClick(e) {
    if (e.target.name === "login") {
      window.location.href = actions.signinUrl
    } else if (e.target.name === "signup") {
      window.location.href = actions.signupUrl
    }
  }

  return /*#__PURE__*/ React__default.createElement(
    "div",
    {
      className: styles.signBox,
    },
    /*#__PURE__*/ React__default.createElement(
      "div",
      {
        className: styles.signLine,
      },
      "Log in or sign up to leave a comment"
    ),
    /*#__PURE__*/ React__default.createElement(
      "div",
      null,
      /*#__PURE__*/ React__default.createElement(
        "button",
        {
          className: styles.loginBtn,
          name: "login",
          onClick: function onClick(e) {
            return handleDivClick(e)
          },
        },
        "Log In"
      ),
      /*#__PURE__*/ React__default.createElement(
        "button",
        {
          className: styles.signBtn,
          name: "signup",
          onClick: function onClick(e) {
            return handleDivClick(e)
          },
        },
        "Sign Up"
      )
    )
  )
}

var Input = function Input() {
  var action = React.useContext(ActionContext)
  return action.customInput
    ? action.customInput({
        authorImg: action.userImg,
        main: true,
        handleCancel: action.handleCancel,
        submit: action.submit,
      })
    : /*#__PURE__*/ React__default.createElement(InputField, {
        authorImg: action.userImg,
        main: true,
      })
}

var CommentSection = function CommentSection(_ref) {
  var commentsArray = _ref.commentsArray,
    currentUser = _ref.currentUser,
    setComment = _ref.setComment,
    signinUrl = _ref.signinUrl,
    signupUrl = _ref.signupUrl,
    customInput = _ref.customInput

  var _useState = React.useState(commentsArray),
    comments = _useState[0],
    setComments = _useState[1]

  React.useEffect(
    function () {
      setComments(commentsArray)
    },
    [commentsArray]
  )
  return /*#__PURE__*/ React__default.createElement(
    ActionProvider,
    {
      currentUser: currentUser,
      setComment: setComment,
      comments: comments,
      signinUrl: signinUrl,
      signupUrl: signupUrl,
      customInput: customInput,
    },
    /*#__PURE__*/ React__default.createElement(
      "div",
      {
        className: styles.section,
      },
      /*#__PURE__*/ React__default.createElement(
        "div",
        {
          className: styles.inputBox,
        },
        signupUrl && !currentUser
          ? /*#__PURE__*/ React__default.createElement(SignField, null)
          : /*#__PURE__*/ React__default.createElement(Input, null)
      ),
      /*#__PURE__*/ React__default.createElement(
        "div",
        {
          className: styles.displayComments,
        },
        /*#__PURE__*/ React__default.createElement(DisplayComments, {
          comments: comments,
        })
      )
    )
  )
}

exports.CommentSection = CommentSection
//# sourceMappingURL=index.js.map
