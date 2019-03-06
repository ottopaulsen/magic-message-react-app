const magicServerUrl = process.env.REACT_APP_MAGIC_SERVER_URL

class MessageService {

    constructor(auth) {
        this.auth = auth
    }


    getScreens = () => {
        // Return promse with array of screens
        const self = this
        return new Promise(function (resolve, reject) {
            const getScreensUrl = magicServerUrl + '/screens?dummy=' + Date.now()
            const token = self.auth.getToken()
            const headers = {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + token
            }

            fetch(getScreensUrl, { headers: headers })
                .then(function (rsp) { resolve(rsp.json()) })
                .catch(error => {
                    reject(error)
                })
        })
    }


    sendMessage = (screenId, message, lifetime) => {
        const postMessageUrl = magicServerUrl + '/screens/' + screenId + '/messages'
        const token = this.auth.getToken()
        const headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer ' + token,
        }

        const body = {
            message: message,
            sentBy: this.auth.userEmail(),
            sentTime: new Date(),
            lifetime: lifetime,
        }

        console.log('Sending message "', message, '" to ', postMessageUrl, ' using token ', token)
        console.log(body)

        fetch(postMessageUrl, { headers: headers, method: 'POST', body: JSON.stringify(body) })
            .then(rsp => rsp.json())
            .then(rsp => {
                console.log('Got response: ', rsp)
            })
            .catch(error => {
                console.log('Error sending message: ', error)
            })

    }

    deleteMessage = (path) => {
        const deleteMessageUrl = magicServerUrl + '/' + path
        const token = this.auth.getToken()
        const headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer ' + token,
        }

        console.log('Deleting message ', deleteMessageUrl, ' using token ', token)

        fetch(deleteMessageUrl, { headers: headers, method: 'DELETE' })
            // .then(rsp => rsp.json())
            .then(rsp => {
                console.log('Got response: ', rsp)
            })
            .catch(error => {
                console.log('Error deleting message: ', error)
            })
    }

}

export default MessageService