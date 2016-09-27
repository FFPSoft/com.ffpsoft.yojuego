import { EventEmitter } from 'events';
import assign from 'object-assign';
import AppConstants from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/Dispatcher';
import SessionConstants from '../constants/SessionConstants';
import PlayerConstants from '../constants/PlayerConstants';

var CHANGE_EVENT = 'change';
var _token = null;
var _player = null;

var SessionStore = assign({}, EventEmitter.prototype, {
  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function (callback) {
    return this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  getToken() {
    return _token;
  },
  getPlayer() {
    return _player;
  }
});

SessionStore.dispatchToken = AppDispatcher.register(function (action) {
  switch (action.actionType) {
    case SessionConstants.SET_SESSION:
      _token = action.payload.token;
      _player = action.payload.player;
      SessionStore.emitChange();
      break;

    case PlayerConstants.SET_PLAYER:
      _player = action.payload;
      SessionStore.emitChange();
      break;
  }
});

module.exports = SessionStore;
