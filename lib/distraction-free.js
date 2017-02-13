'use babel';

import { CompositeDisposable } from 'atom';
import moreSpaceToActive  from './more-space-to-active';
import  zen from  './zen';
import  Utils from './utils';

export default {
  subscriptions: null,
  active: true,
  scaleFactor: 1,

  config: {
    fullscreen: {
      type: 'boolean',
      default: true,
      order: 1,
      description: 'Switch to fullscreen after activation Zen mode',
    },

    scaleFactor: {
      type: 'number',
      default: 1,
      order: 2,
      description: 'Default scale factor for More Space for Active panel mode',
    },
  },

  activate(state) {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'distraction-free:more-space-to-active-toggle': () => moreSpaceToActive.toggle(),
      'distraction-free:more-space-to-active-increase': () => moreSpaceToActive.increaseScaleFactor(),
      'distraction-free:more-space-to-active-decrease': () => moreSpaceToActive.decreaseScaleFactor(),
      'distraction-free:zen-toggle': () => zen.toggle(),
    }));

    moreSpaceToActive.init();

  },

  deactivate() {
    this.subscriptions.dispose();
    moreSpaceToActive.deactivate();

  },

};
