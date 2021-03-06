import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/Dispatcher';
import assign from 'object-assign';
import FriendshipRequestConstants from '../constants/FriendshipRequestConstants';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';
let _isSaving = false;
let _errorSaving = null;

let FriendshipRequestStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    return this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  isSaving() {
    return _isSaving;
  },

  getErrorSaving() {
    return _errorSaving;
  }
});

FriendshipRequestStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case FriendshipRequestConstants.ACCEPT_INTENT:
      _isSaving = true;
      _errorSaving = null;
      FriendshipRequestStore.emitChange();
      break;

    case FriendshipRequestConstants.ACCEPT_RESOLVED:
      _isSaving = false;
      _errorSaving = null;
      FriendshipRequestStore.emitChange();
      break;

    case FriendshipRequestConstants.ACCEPT_FAILED:
      _isSaving = false;
      _errorSaving = action.payload.message;
      FriendshipRequestStore.emitChange();
      break;

    case FriendshipRequestConstants.REJECT_INTENT:
      _isSaving = true;
      _errorSaving = null;
      FriendshipRequestStore.emitChange();
      break;

    case FriendshipRequestConstants.REJECT_RESOLVED:
      _isSaving = false;
      _errorSaving = null;
      FriendshipRequestStore.emitChange();
      break;

    case FriendshipRequestConstants.REJECT_FAILED:
      _isSaving = false;
      _errorSaving = action.payload.message;
      FriendshipRequestStore.emitChange();
      break;

    case AppConstants.RESET_APP:
      _isSaving = false;
      _errorSaving = null;
      // FriendshipRequestStore.emitChange();
      break;

    default:
      break;
  }
});

module.exports = FriendshipRequestStore;