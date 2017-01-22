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

    console.log(moreSpaceToActive);
    moreSpaceToActive.init();

  },

  deactivate() {
    this.subscriptions.dispose();
    moreSpaceToActive.deactivate();

  },

};
