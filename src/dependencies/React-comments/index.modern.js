import React, { createContext, useState, useEffect, useContext } from 'react';
import uuid from 'react-uuid';
import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

var styles = {"section":"_Style__section__12xdX","inputBox":"_Style__inputBox__2STY7","inputActions":"_Style__inputActions__9-5lp","postBtn":"_Style__postBtn__3oc4k","cancelBtn":"_Style__cancelBtn__36TCS","form":"_Style__form__CXD_f","userImg":"_Style__userImg__27hXc","postComment":"_Style__postComment__1blCt","displayComments":"_Style__displayComments__1SugS","halfDiv":"_Style__halfDiv__qWiSF","userInfo":"_Style__userInfo__1i6uS","commentsTwo":"_Style__commentsTwo__155_V","fullName":"_Style__fullName__2Axcq","replyBtn":"_Style__replyBtn__1Njvz","userActions":"_Style__userActions__34q_J","actionsBtn":"_Style__actionsBtn__3ypnz","replySection":"_Style__replySection__l0opN","actionDiv":"_Style__actionDiv__yEQPV","editBtn":"_Style__editBtn__333BI","deleteBtn":"_Style__deleteBtn__2YYVO","signBox":"_Style__signBox__1Vv8n","signLine":"_Style__signLine__1Ogr8","loginBtn":"_Style__loginBtn__1Oc7K","signBtn":"_Style__signBtn__20VaH"};

const ActionContext = createContext();
const ActionProvider = ({
  children,
  currentUser,
  setComment,
  comments,
  signinUrl,
  signupUrl,
  customInput
}) => {
  const [replies, setReplies] = useState([]);
  const [user, setUser] = useState();
  const [editArr, setEdit] = useState([]);
  useEffect(() => {
    if (currentUser) {
      setUser(true);
    } else {
      setUser(false);
    }
  });

  const handleAction = (id, edit) => {
    edit ? setEdit([...editArr, id]) : setReplies([...replies, id]);
  };

  const handleCancel = (id, edit) => {
    if (edit) {
      const list = [...editArr];
      const newList = list.filter(i => i !== id);
      setEdit(newList);
    } else if (!edit) {
      const list = [...replies];
      const newList = list.filter(i => i !== id);
      setReplies(newList);
    }
  };

  const onSubmit = (text, parentId, child) => {
    if (text.length > 0) {
      if (!parentId && !child) {
        setComment([...comments, {
          userId: currentUser.userId,
          comId: uuid(),
          avatarUrl: currentUser.avatarUrl,
          fullName: currentUser.name,
          text: text
        }]);
      } else if (parentId && child) {
        const newList = [...comments];
        const index = newList.findIndex(x => x.comId === parentId);
        newList[index].replies.push({
          userId: currentUser.userId,
          comId: uuid(),
          avatarUrl: currentUser.avatarUrl,
          fullName: currentUser.name,
          text: text
        });
        setComment(newList);
      } else if (parentId && !child) {
        const newList = [...comments];
        const index = newList.findIndex(x => x.comId === parentId);
        const newReplies = newList[index].replies === undefined ? [] : [...newList[index].replies];
        newReplies.push({
          userId: currentUser.userId,
          comId: uuid(),
          avatarUrl: currentUser.avatarUrl,
          fullName: currentUser.name,
          text: text
        });
        newList[index].replies = newReplies;
        setComment(newList);
      }
    }
  };

  const editText = (id, text, parentId) => {
    if (parentId === undefined) {
      const newList = [...comments];
      const index = newList.findIndex(x => x.comId === id);
      newList[index].text = text;
      setComment(newList);
    } else if (parentId !== undefined) {
      const newList = [...comments];
      const index = newList.findIndex(x => x.comId === parentId);
      const replyIndex = newList[index].replies.findIndex(i => i.comId === id);
      newList[index].replies[replyIndex].text = text;
      setComment(newList);
    }
  };

  const deleteText = (id, parentId) => {
    if (parentId === undefined) {
      const newList = [...comments];
      const filter = newList.filter(x => x.comId !== id);
      setComment(filter);
    } else if (parentId !== undefined) {
      const newList = [...comments];
      const index = newList.findIndex(x => x.comId === parentId);
      const filter = newList[index].replies.filter(x => x.comId !== id);
      newList[index].replies = filter;
      setComment(newList);
    }
  };

  const submit = (cancellor, text, parentId, edit, setText, child) => {
    if (edit) {
      editText(cancellor, text, parentId);
      handleCancel(cancellor, edit);
      setText('');
    } else {
      onSubmit(text, parentId, child);
      handleCancel(cancellor);
      setText('');
    }
  };

  return /*#__PURE__*/React.createElement(ActionContext.Provider, {
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
      submit: submit
    }
  }, children);
};

const InputField = ({
  cancellor,
  parentId,
  child,
  value,
  edit,
  main
}) => {
  const [text, setText] = useState('');

  const handleChange = e => {
    setText(e.target.value);
  };

  useEffect(() => {
    setText(value);
  }, [value]);
  const actions = useContext(ActionContext);
  return /*#__PURE__*/React.createElement("form", {
    className: styles.form,
    style: !child && !edit && main === undefined ? {
      marginLeft: 36
    } : {
      marginLeft: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.userImg
  }, /*#__PURE__*/React.createElement("img", {
    src: actions.userImg,
    style: {
      width: 38,
      height: 38,
      borderRadius: 38 / 2
    },
    alt: "userIcon"
  })), /*#__PURE__*/React.createElement("input", {
    className: styles.postComment,
    type: "text",
    placeholder: "Type your reply here.",
    component: "input",
    value: text,
    onChange: handleChange
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.inputActions
  }, /*#__PURE__*/React.createElement("button", {
    className: styles.postBtn,
    onClick: () => edit === true ? actions.submit(cancellor, text, parentId, true, setText) : actions.submit(cancellor, text, parentId, false, setText),
    type: "button",
    disabled: !text,
    style: !text ? {
      backgroundColor: '#84dcff'
    } : {
      backgroundColor: '#30c3fd'
    }
  }, "Post"), (text || parentId) && /*#__PURE__*/React.createElement("button", {
    className: styles.cancelBtn,
    onClick: () => edit ? actions.handleCancel(cancellor, edit) : actions.handleCancel(cancellor)
  }, "Cancel")));
};

const modal = {
  fontSize: '16px'
};
const modalClose = {
  cursor: 'pointer',
  position: 'absolute',
  display: 'block',
  padding: '2px 5px',
  lineHeight: '20px',
  right: '-10px',
  top: '-10px',
  fontSize: '24px',
  background: '#ffffff',
  borderRadius: '18px',
  border: '1px solid #cfcece',
  outline: 'none'
};
const modalHeader = {
  width: '100%',
  borderBottom: '1px solid gray',
  fontSize: '18px',
  textAlign: 'center',
  padding: '5px'
};
const modalContent = {
  width: '100%',
  padding: '10px 10px'
};
const modalActions = {
  width: ' 100%',
  padding: ' 10px 5px',
  margin: ' auto',
  textAlign: ' center'
};
const modalActionBtn = {
  backgroundColor: 'transparent',
  outline: 'none',
  border: '1px solid gray',
  padding: '4px 12px',
  cursor: 'pointer'
};
const modalDelBtn = {
  backgroundColor: 'transparent',
  outline: 'none',
  border: '1px solid gray',
  marginLeft: '10px',
  padding: '4px 12px',
  cursor: 'pointer'
};

const CommentStructure = ({
  i,
  reply,
  parentId
}) => {
  const actions = useContext(ActionContext);
  const edit = true;
  return /*#__PURE__*/React.createElement("div", {
    className: styles.halfDiv
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.userInfo,
    style: reply && {
      marginLeft: 15,
      marginTop: '6px'
    }
  }, /*#__PURE__*/React.createElement("div", null, i.text), /*#__PURE__*/React.createElement("div", {
    className: styles.commentsTwo
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: i.avatarUrl,
    style: {
      width: 24,
      height: 24,
      borderRadius: 24 / 2
    },
    alt: "userIcon"
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.fullName
  }, i.fullName, " "), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    className: styles.replyBtn,
    onClick: () => actions.handleAction(i.comId),
    disabled: !actions.user
  }, ' ', /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: faReply,
    size: "1x",
    color: "#a5a5a5"
  }), " Reply")))), /*#__PURE__*/React.createElement("div", {
    className: styles.userActions
  }, actions.userId === i.userId && actions.user && /*#__PURE__*/React.createElement(Popup, {
    role: "tooltip",
    trigger: /*#__PURE__*/React.createElement("button", {
      className: styles.actionsBtn
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      icon: faEllipsisV,
      size: "1x",
      color: "#b9b9b9"
    })),
    position: "right center",
    nested: true
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.actionDiv
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    className: styles.editBtn,
    onClick: () => actions.handleAction(i.comId, edit)
  }, ' ', "edit")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Popup, {
    trigger: /*#__PURE__*/React.createElement("button", {
      className: styles.deleteBtn
    }, " delete"),
    modal: true,
    nested: true
  }, close => /*#__PURE__*/React.createElement("div", {
    className: "modal",
    style: modal
  }, /*#__PURE__*/React.createElement("button", {
    className: "close",
    onClick: close,
    style: modalClose
  }, "\xD7"), /*#__PURE__*/React.createElement("div", {
    className: "header",
    style: modalHeader
  }, ' ', "Delete Comment", ' '), /*#__PURE__*/React.createElement("div", {
    className: "content",
    style: modalContent
  }, ' ', "Delete your comment permanently?"), /*#__PURE__*/React.createElement("div", {
    className: "actions",
    style: modalActions
  }, /*#__PURE__*/React.createElement("button", {
    className: "button",
    style: modalActionBtn,
    onClick: () => {
      actions.onDelete(i.comId, parentId);
      close();
    }
  }, "Delete"), /*#__PURE__*/React.createElement("button", {
    className: "button",
    style: modalDelBtn,
    onClick: () => {
      close();
    }
  }, "Cancel")))))))));
};

const DisplayComments = ({
  comments
}) => {
  const actions = useContext(ActionContext);
  return /*#__PURE__*/React.createElement("div", null, comments.map((i, index) => /*#__PURE__*/React.createElement("div", {
    key: i.comId
  }, actions.editArr.filter(id => id === i.comId).length !== 0 ? actions.customInput ? actions.customInput({
    cancellor: i.comId,
    value: i.text,
    handleCancel: actions.handleCancel,
    submit: actions.submit,
    edit: true
  }) : /*#__PURE__*/React.createElement(InputField, {
    cancellor: i.comId,
    value: i.text,
    edit: true
  }) : /*#__PURE__*/React.createElement(CommentStructure, {
    i: i,
    handleEdit: () => actions.handleAction
  }), actions.replies.filter(id => id === i.comId).length !== 0 && (actions.customInput ? actions.customInput({
    cancellor: i.comId,
    parentId: i.comId,
    submit: actions.submit,
    handleCancel: actions.handleCancel,
    edit: false
  }) : /*#__PURE__*/React.createElement(InputField, {
    cancellor: i.comId,
    parentId: i.comId
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.replySection
  }, i.replies && i.replies.map((a, index) => /*#__PURE__*/React.createElement("div", {
    key: a.comId
  }, actions.editArr.filter(id => id === a.comId).length !== 0 ? actions.customInput ? actions.customInput({
    cancellor: a.comId,
    value: a.text,
    handleCancel: actions.handleCancel,
    edit: true,
    parentId: i.comId,
    submit: actions.submit
  }) : /*#__PURE__*/React.createElement(InputField, {
    cancellor: a.comId,
    value: a.text,
    edit: true,
    parentId: i.comId
  }) : /*#__PURE__*/React.createElement(CommentStructure, {
    i: a,
    reply: true,
    parentId: i.comId,
    handleEdit: () => actions.handleAction
  }), actions.replies.filter(id => id === a.comId).length !== 0 && (actions.customInput ? actions.customInput({
    cancellor: a.comId,
    parentId: i.comId,
    child: true,
    submit: actions.submit,
    handleCancel: actions.handleCancel,
    edit: false
  }) : /*#__PURE__*/React.createElement(InputField, {
    cancellor: a.comId,
    parentId: i.comId,
    child: true
  }))))))));
};

const SignField = () => {
  const actions = useContext(ActionContext);

  const handleDivClick = e => {
    if (e.target.name === 'login') {
      window.location.href = actions.signinUrl;
    } else if (e.target.name === 'signup') {
      window.location.href = actions.signupUrl;
    }
  };

  return /*#__PURE__*/React.createElement("div", {
    className: styles.signBox
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.signLine
  }, "Log in or sign up to leave a comment"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    className: styles.loginBtn,
    name: "login",
    onClick: e => handleDivClick(e)
  }, "Log In"), /*#__PURE__*/React.createElement("button", {
    className: styles.signBtn,
    name: "signup",
    onClick: e => handleDivClick(e)
  }, "Sign Up")));
};

const Input = () => {
  const action = useContext(ActionContext);
  return action.customInput ? action.customInput({
    authorImg: action.userImg,
    main: true,
    handleCancel: action.handleCancel,
    submit: action.submit
  }) : /*#__PURE__*/React.createElement(InputField, {
    authorImg: action.userImg,
    main: true
  });
};

const CommentSection = ({
  commentsArray,
  currentUser,
  setComment,
  signinUrl,
  signupUrl,
  customInput
}) => {
  const [comments, setComments] = useState(commentsArray);
  useEffect(() => {
    setComments(commentsArray);
  }, [commentsArray]);
  return /*#__PURE__*/React.createElement(ActionProvider, {
    currentUser: currentUser,
    setComment: setComment,
    comments: comments,
    signinUrl: signinUrl,
    signupUrl: signupUrl,
    customInput: customInput
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.section
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.inputBox
  }, signupUrl && !currentUser ? /*#__PURE__*/React.createElement(SignField, null) : /*#__PURE__*/React.createElement(Input, null)), /*#__PURE__*/React.createElement("div", {
    className: styles.displayComments
  }, /*#__PURE__*/React.createElement(DisplayComments, {
    comments: comments
  }))));
};

export { CommentSection };
//# sourceMappingURL=index.modern.js.map
