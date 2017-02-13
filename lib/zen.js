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
      Utils.addClassToAtom('zenmode');
      if (Utils.config('zenMode.hideGutter')) {
        Utils.addClassToAtom('zenmode--hidegutter');
      }

      this.enterFullscreenIfNeed();
    },

    enterFullscreenIfNeed() {
      if (Utils.config('zenMode.fullscreen')) {
        this.wasInFullscreen = Utils.isFullscreenOn();
        if (!this.wasInFullscreen) {
          atom.setFullScreen(true);
        }
      }
    },

    leaveFullscreenIfNeed() {
      if (Utils.config('zenMode.fullscreen') && !this.wasInFullscreen) {
        atom.setFullScreen(false);
      }
    },

    deactivate() {
      Utils.removeClassFromAtom('zenmode');
      this.removeAllModeClasses();
      this.leaveFullscreenIfNeed();
    },

    removeAllModeClasses() {
      const modes = ['hidegutter'];
      modes.map((mode) =>  Utils.removeClassFromAtom(`zenmode--${mode}`));
    },

    toggle() {
      console.log('Zen  mode was toggled!');
      this.isActive = !this.isActive;
      this.isActive ? this.activate() : this.deactivate();
    },

  };
