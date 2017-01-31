import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/Dispatcher';
import assign from 'object-assign';
import HomeConstants from '../constants/HomeConstants';

const CHANGE_EVENT = 'change';
let _showMenu = false;
let _showCreateMatch = false;
let _showMatchDetail = false;
let _match = null;
let _isLoadingMatches = false;
let _matches = null;
let _errorLoadingMatches = null;

let HomeStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    return this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  mustShowMenu() {
    return _showMenu;
  },

  mustShowCreateMatch() {
    return _showCreateMatch;
  },

  mustShowMatchDetail() {
    return _showMatchDetail;
  },

  getMatch() {
    return _match;
  },

  isLoadingMatches() {
    return _isLoadingMatches;
  },

  getMatches() {
    return _matches;
  },

  getErrorLoadingMatches() {
    return _errorLoadingMatches;
  }
});

HomeStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case HomeConstants.SHOW_HOME_MENU:
      _showMenu = true;
      _showCreateMatch = false;
      _showMatchDetail = false;
      _idMatch = null;
      _isLoadingMatches = false;
      _errorLoadingMatches = null;
      HomeStore.emitChange();
      break;

    case HomeConstants.HIDE_HOME_MENU:
      _showMenu = false;
      _showCreateMatch = false;
      _showMatchDetail = false;
      _idMatch = null;
      _isLoadingMatches = false;
      _errorLoadingMatches = null;
      HomeStore.emitChange();
      break;

    case HomeConstants.CREATE_MATCH:
      _showMenu = false;
      _showCreateMatch = true;
      _showMatchDetail = false;
      _idMatch = null;
      _isLoadingMatches = false;
      _errorLoadingMatches = null;
      HomeStore.emitChange();
      break;

    case HomeConstants.SHOW_MATCH_DETAIL:
      _showMenu = false;
      _showCreateMatch = false;
      _showMatchDetail = true;
      _match = action.payload;
      _isLoadingMatches = false;
      _errorLoadingMatches = null;
      HomeStore.emitChange();
      break;

    case HomeConstants.LOADING_MATCHES:
      _isLoadingMatches = true;
      _errorLoadingMatches = null;
      HomeStore.emitChange();
      break;

    case HomeConstants.MATCHES_LOADED:
      _isLoadingMatches = false;
      _errorLoadingMatches = null;
      _matches = action.payload;
      HomeStore.emitChange();
      break;

    case HomeConstants.ERROR_LOADING_MATCHES:
      _isLoadingMatches = false;
      _errorLoadingMatches = action.payload;
      HomeStore.emitChange();
      break;

    default:
      break;
  }
});

module.exports = HomeStore;