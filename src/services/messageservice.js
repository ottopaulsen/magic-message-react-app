const magicServerUrl = import.meta.env.VITE_MAGIC_SERVER_URL;

class MessageService {
  constructor(auth) {
    this.auth = auth;
  }

  getScreens = () => {
    // Return promse with array of screens
    const self = this;
    return new Promise(function (resolve, reject) {
      const getScreensUrl = magicServerUrl + "/screens?dummy=" + Date.now();
      const token = self.auth.getToken();
      const headers = {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + token,
      };

      fetch(getScreensUrl, { headers: headers })
        .then(function (rsp) {
          resolve(rsp.json());
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  sendMessage = (screenId, message, lifetime) => {
    const postMessageUrl =
      magicServerUrl + "/screens/" + screenId + "/messages";
    const token = this.auth.getToken();
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: "Bearer " + token,
    };

    const body = {
      message: message,
      sentBy: this.auth.userEmail(),
      sentTime: new Date(),
      lifetime: lifetime,
    };

    fetch(postMessageUrl, {
      headers: headers,
      method: "POST",
      body: JSON.stringify(body),
      mode: "cors",
    })
      .then((rsp) => rsp.json())
      .then((rsp) => {
      })
      .catch((error) => {
      });
  };

  deleteMessage = (path) => {
    const deleteMessageUrl = magicServerUrl + "/" + path;
    const token = this.auth.getToken();
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: "Bearer " + token,
    };

    fetch(deleteMessageUrl, { headers: headers, method: "DELETE" })
      // .then(rsp => rsp.json())
      .then((rsp) => {
      })
      .catch((error) => {
      });
  };
}

export default MessageService;
