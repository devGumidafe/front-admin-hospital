export interface Menu {
  title: string;
  icon: string;
  submenu: Submenu[];
}

interface Submenu {
  title: string;
  url: string;
}
