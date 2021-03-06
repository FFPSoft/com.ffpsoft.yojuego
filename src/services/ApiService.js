const BASEURL = 'http://192.168.0.4:8089';
const WSURL = 'ws://192.168.0.4:8092';

let ws = null;

export default class ApiService {
  static login(email, password) {
    let _headers = new Headers();
    _headers.append('Content-Type', 'application/json');

    let form = {
      "email": email,
      "password": password
    };

    return ApiService._fetch('post', _headers, form, '/login/yojuego');
  }

  static renewToken(token) {
    let _headers = new Headers();
    _headers.append('Content-Type', 'application/json');

    let form = {
      "token": token
    };
    return ApiService._fetch('post', _headers, form, '/login/renewtoken');
  }

  static getUserInfo(token) {
    return ApiService._fetch('get', ApiService._getHeader(token), null, '/auth/info');
  }

  static createMatch(title, date, fromTime, toTime, location, matchType, pendingPlayers, token) {
    let form = {
      "title": title,
      "date": date,
      "fromTime": fromTime,
      "toTime": toTime,
      "location": location,
      "matchType": matchType,
      "pendingPlayers": pendingPlayers
    };

    return ApiService._fetch('put', ApiService._getHeader(token), form, '/match');
  }

  static signUp(email, password) {
    let _headers = new Headers();
    _headers.append('Content-Type', 'application/json');

    let form = {
      "email": email,
      "password": password
    };

    return ApiService._fetch('post', _headers, form, '/signup/yojuego');
  }

  static completeProfileInfo(firstName, lastName, nickName, token) {
    let form = {
      "firstName": firstName,
      "lastName": lastName,
      "nickName": nickName
    };

    return ApiService._fetch('put', ApiService._getHeader(token), form, '/player/create');
  }

  static getUpcomingPlayerMatches(token) {
    return ApiService._fetch('get', ApiService._getHeader(token), null, '/match/upcoming');
  }

  static saveNewFriend(email, token) {
    let form = {
      "email": email
    };

    return ApiService._fetch('put', ApiService._getHeader(token), form, '/friendship');
  }

  static saveNewGroup(description, players, photo, token) {
    let form = {
      "description": description,
      "players": players,
      "photo": photo
    };

    return ApiService._fetch('put', ApiService._getHeader(token), form, '/group');
  }

  static getMyFriends(token) {
    return ApiService._fetch('get', ApiService._getHeader(token), null, '/friendship');
  }

  static getMyGroups(token) {
    return ApiService._fetch('get', ApiService._getHeader(token), null, '/group');
  }

  static getAllFriendshipRequest(token) {
    return ApiService._fetch('get', ApiService._getHeader(token), null, '/friendshiprequest');
  }

  static getFriendshipRequest(id, token) {
    return ApiService._fetch('get', ApiService._getHeader(token), null, '/friendshiprequest/' + id);
  }

  static getMatchInvitations(token) {
    return ApiService._fetch('get', ApiService._getHeader(token), null, '/matchinvitation');
  }

  static acceptFriendshipRequest(id, token) {
    return ApiService._fetch('post', ApiService._getHeader(token), null, '/friendshiprequest/' + id + '/accept');
  }

  static rejectFriendshipRequest(id, token) {
    return ApiService._fetch('post', ApiService._getHeader(token), null, '/friendshiprequest/' + id + '/reject');
  }

  static acceptMatchInvitation(id, token) {
    let form = { "matchId": id };

    return ApiService._fetch('post', ApiService._getHeader(token), form, '/match/confirmPlayer');
  }

  static rejectMatchInvitation(id, token) {
    let form = { "matchId": id };

    return ApiService._fetch('post', ApiService._getHeader(token), form, '/match/rejectPlayer');
  }

  static markAsReadFriendshipRequest(id, token) {
    return ApiService._fetch('post', ApiService._getHeader(token), form, '/friendshiprequest/' + id + '/markasread')
  }

  static markAsReadMatchInvitation(id, token) {
    let form = {
      "id": id
    };

    return ApiService._fetch('post', ApiService._getHeader(token), form, '/notifications/matchinvitation/markasread')
  }

  static logOut(token) {
    return ApiService._fetch('post', ApiService._getHeader(token), null, '/logout')
  }

  static updateAccount(firstName, lastName, nickName, photo, phone, token) {
    let form = {
      firstName,
      lastName,
      nickName,
      photo,
      phone
    };

    return ApiService._fetch('post', ApiService._getHeader(token), form, '/player/update')
  }

  static editGroup(id, description, photo, token) {
    let form = {
      description,
      photo
    };

    return ApiService._fetch('post', ApiService._getHeader(token), form, '/group/' + id)
  }

  static editMatch(id, title, date, fromTime, toTime, matchType, token) {
    let form = {
      title,
      date,
      fromTime,
      toTime,
      matchType
    };

    return ApiService._fetch('post', ApiService._getHeader(token), form, '/match/' + id)
  }

  static deleteGroup(groupId, token) {
    return ApiService._fetch('delete', ApiService._getHeader(token), null, '/group/' + groupId)
  }

  static deleteFriend(friendId, token) {
    return ApiService._fetch('delete', ApiService._getHeader(token), null, '/friendship/' + friendId)
  }

  static exitGroup(groupId, token) {
    return ApiService._fetch('post', ApiService._getHeader(token), null, '/group/' + groupId + '/exit')
  }

  static addPlayers(groupId, players, token) {
    let form = {
      players
    }
    return ApiService._fetch('post', ApiService._getHeader(token), form, '/group/' + groupId + '/players')
  }

  static removePlayer(groupId, playerId, token) {
    return ApiService._fetch('delete', ApiService._getHeader(token), null, '/group/' + groupId + '/player/' + playerId)
  }

  static makeAdminPlayer(groupId, playerId, token) {
    let form = {
      playerId
    }
    return ApiService._fetch('post', ApiService._getHeader(token), form, '/group/' + groupId + '/makeadmin')
  }

  static exitMatch(matchId, token) {
    return ApiService._fetch('post', ApiService._getHeader(token), null, '/match/' + matchId + '/exit')
  }

  static cancelMatch(matchId, token) {
    return ApiService._fetch('post', ApiService._getHeader(token), null, '/match/' + matchId + '/cancel')
  }

  static invitePlayersToMatch(matchId, players, token) {
    let form = {
      players
    }
    return ApiService._fetch('post', ApiService._getHeader(token), form, '/match/' + matchId + '/invite')
  }

  static removePlayerFromGroup(matchId, playerId, token) {
    return ApiService._fetch('delete', ApiService._getHeader(token), null, '/match/' + matchId + '/player/' + playerId)
  }

  static openWebSocket(token, onopen, onmessage, onerror, onclose) {
    return ApiService._openWebSocket('/' + token)
      .then(ws => {
        ws = ws;
        ws.onopen = onopen;
        ws.onmessage = onmessage;
        ws.onerror = onerror;
        ws.onclose = onclose;
        return Promise.resolve(ws);
      });
  }

  static sendMessageToGroup(groupId, message, token) {
    let form = { message }
    return ApiService._fetch('put', ApiService._getHeader(token), form, '/group/' + groupId + '/message')
  }

  static sendCommentToMatch(comment, matchId, token) {
    let form = { comment }
    return ApiService._fetch('put', ApiService._getHeader(token), form, '/match/' + matchId + '/comment')
  }

  static registerDevice(deviceId, type, token) {
    let form = { deviceid: deviceId }
    return ApiService._fetch('put', ApiService._getHeader(token), form, '/user/device/' + type)
  }

  static updateDevice(oldDeviceId, newDeviceId, type, token) {
    let form = { olddeviceid: oldDeviceId, newdeviceid: newDeviceId }
    return ApiService._fetch('post', ApiService._getHeader(token), form, '/user/device/' + type)
  }

  static _fetch(method, headers, body, url) {
    let fetchBody = body ? JSON.stringify(body) : null;

    return fetch(BASEURL + url, {
      method,
      headers,
      body: fetchBody
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
            .then((responseData) => {
              return responseData;
            });
        }

        return response.json().
          then((error) => {
            console.log(error);
            return Promise.reject(error);
          });
      })
  }

  static _openWebSocket(url) {
    return new Promise((resolve, reject) => {
      return resolve(new WebSocket(WSURL + url));
    });
  }

  static _getHeader(token) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', "Bearer " + token);

    return headers;
  }
}