'use babel';

import { CompositeDisposable } from 'atom';
import Utils from './utils';

export default {
    subscriptions: null,
    isActive: false,
    scaleFactor: 1,

    init() {
      this.subscriptions = new CompositeDisposable();
      this.scaleFactor = Utils.config('spaceForActivePanel.scaleFactor');
    },

    activate() {
      this.scaleFactor = Utils.config('spaceForActivePanel.scaleFactor');
      this.makeResize();
      this.subscriptions.add(atom.workspace.onDidChangeActivePane(() => this.onActivePaneChange()));
      Utils.addClassToAtom('more-space');
    },

    deactivate() {
      this.subscriptions.dispose();
      this.resetPanes(atom.workspace.paneContainer.root);
      Utils.removeClassFromAtom('more-space');

    },

    increaseScaleFactor() {
      this.scaleFactor += 0.1;
      this.makeResize();
    },

    decreaseScaleFactor() {
      this.scaleFactor -= 0.1;
      this.makeResize();
    },

    onActivePaneChange() {
      this.makeResize();
    },

    makeResize() {
      this.resizePanes(atom.workspace.getActivePane());
    },

    toggle() {
      this.isActive = !this.isActive;
      this.isActive ? this.activate() : this.deactivate();
    },

    resizePanes(pane) {
      if (!pane) {
        return;
      }

      const parent = pane.getParent();
      if (parent.children) {
        parent.children.map(item => item.setFlexScale(1));
        console.log(parent.children.length * this.scaleFactor);
        pane.setFlexScale(parent.children.length * this.scaleFactor);
        this.resizePanes(parent);
      }

    },

    resetPanes(pane) {
      pane.setFlexScale(1);
      if (pane.children) {
        pane.children.map((i) => this.resetPanes(i));
      }
    },

  };
