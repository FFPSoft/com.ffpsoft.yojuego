import ApiService from '../services/ApiService';
import SessionConstants from '../constants/SessionConstants';
import SessionStore from '../stores/SessionStore';
import Dispatcher from '../dispatcher/Dispatcher';
// var LogHelper = require('../utilities/LogHelper');

var SessionActions = {
  setSession(session) {
    Dispatcher.handleViewAction({
      actionType: SessionConstants.SET_SESSION,
      payload: session
    });

    if (!session.player) {
      ApiService.getPlayerByToken(session.token)
        .then((player) => {
          Dispatcher.handleServerAction({
            actionType: SessionConstants.SET_PLAYER,
            payload: player
          });
        }, () => {
          Dispatcher.handleServerAction({
            actionType: SessionConstants.SET_PLAYER,
            payload: null
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  setPlayer(nickname, birthday, state, adminState) {
    Dispatcher.handleViewAction({
      actionType: SessionConstants.SETTING_PLAYER,
      payload: null
    });

    // ApiService.setPlayerInfo(nickname, birthday, state, adminState, SessionStore.getToken())
    //   .then((player) => {
    //     Dispatcher.handleServerAction({
    //       actionType: SessionConstants.SET_PLAYER,
    //       payload: player
    //     });
    //   }, () => {
    //     Dispatcher.handleServerAction({
    //       actionType: SessionConstants.SET_PLAYER,
    //       payload: null
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }
};

module.exports = SessionActions;
