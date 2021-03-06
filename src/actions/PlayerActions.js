import ApiService from '../services/ApiService';
import PlayerConstants from '../constants/PlayerConstants';
import PlayerStore from '../stores/PlayerStore';
import SessionStore from '../stores/SessionStore';
import Dispatcher from '../dispatcher/Dispatcher';

export default class PlayerActions {
  static createPlayer(nickname, birthday, state, adminState) {
    Dispatcher.handleServerAction({
      actionType: PlayerConstants.CREATE_PLAYER
    });

    ApiService.setPlayerInfo(nickname, birthday, state, adminState, SessionStore.getToken())
      .then((player) => {
        PlayerActions.setPlayer(player);
      }, (cause) => {
        PlayerActions.setPlayer(null);
      })
      .catch((error) => {

      });
  }

  static getPlayer() {
    Dispatcher.handleServerAction({
      actionType: PlayerConstants.GET_PLAYER,
      payload: player
    });

    ApiService.getPlayerByToken(SessionStore.getToken())
      .then((player) => {
        PlayerActions.setPlayer(player);
      }, (cause) => {
        LogHelper.warning("SessionActions.getPlayer(rejected)", cause);
        PlayerActions.setPlayer(null);
      })
      .catch((error) => {
        LogHelper.error("SessionActions.getPlayer(catch)", error);
      });
  }

  static setPlayer(player) {
    Dispatcher.handleServerAction({
      actionType: PlayerConstants.SET_PLAYER,
      payload: player
    });
  }
};