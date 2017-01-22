'use babel';

import Settings from './settings';

export default{
  config(prop) {
    return atom.config.get(`${Settings.getPackageName()}.${prop}`);
  },

  getBody() {
    return document.getElementsByTagName('body')[0];
  },

  isFullscreenOn() {
    return this.getBody().classList.contains('fullscreen');
  },

  addClassToAtom(cls) {
    cls  = this.createPackageCls(cls);
    atom.views.getView(atom.workspace).classList.add(cls);
  },

  removeClassFromAtom(cls) {
    cls = this.createPackageCls(cls);
    atom.views.getView(atom.workspace).classList.remove(cls);
  },

  createPackageCls(cls) {
    return `${Settings.getClsPrefix()}${Settings.getClsDelimiter()}${cls}`;
  },
};
