'use babel';

import { CompositeDisposable } from 'atom';

export default {
    subscriptions: null,
    isActive: false,
    scaleFactor: 1,

    init() {
      this.subscriptions = new CompositeDisposable();
    },

    activate() {
      console.log('activate');
      this.makeResize();
      this.subscriptions.add(atom.workspace.onDidChangeActivePane(() => this.onActivePaneChange()));
    },

    deactivate() {
      console.log('deactivate');
      this.subscriptions.dispose();
      this.resetPanes(atom.workspace.paneContainer.root);
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
      console.log('onActivePaneChange');
      this.makeResize();
    },

    makeResize() {
      this.resizePanes(atom.workspace.getActivePane());
    },

    toggle() {
      console.log('MoreSpaceToActive was toggled!');
      this.isActive = !this.isActive;
      this.isActive ? this.activate() : this.deactivate();
    },

    resizePanes(pane) {
      if (!pane) {
        return;
      }

      console.log('resizePanes');
      const parent = pane.getParent();
      if (parent.children) {
        parent.children.map(item => item.setFlexScale(1));
        console.log(parent.children.length * this.scaleFactor);
        pane.setFlexScale(parent.children.length * this.scaleFactor);
        this.resizePanes(parent);
      }

    },

    resetPanes(pane) {
      console.log('Reset panes');
      pane.setFlexScale(1);
      if (pane.children) {
        pane.children.map((i) => this.resetPanes(i));
      }
    },

  };
