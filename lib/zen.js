'use babel';

import { CompositeDisposable } from 'atom';
import Utils from './utils';

export default {
    subscriptions: null,
    isActive: false,
    wasInFullscreen:  false,

    init() {
      this.subscriptions = new CompositeDisposable();
    },

    activate() {
      console.log('activate');
      Utils.addClassToAtom('zenmode');
      this.enterFullscreenIfNeed();
    },

    enterFullscreenIfNeed() {
      if (Utils.config('fullscreen')) {
        this.wasInFullscreen = Utils.isFullscreenOn();
        if (!this.wasInFullscreen) {
          atom.setFullScreen(true);
        }
      }
    },

    leaveFullscreenIfNeed() {
      if (Utils.config('fullscreen') && !this.wasInFullscreen) {
        atom.setFullScreen(false);
      }
    },

    deactivate() {
      console.log('deactivate');
      Utils.removeClassFromAtom('zenmode');
      this.leaveFullscreenIfNeed();
    },

    toggle() {
      console.log('Zen  mode was toggled!');
      this.isActive = !this.isActive;
      this.isActive ? this.activate() : this.deactivate();
    },

  };
