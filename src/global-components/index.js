import Litepicker from "./litepicker/Main.vue";
import Tippy from "./tippy/Main.vue";
import TippyContent from "./tippy-content/Main.vue";
import LoadingIcon from "./loading-icon/Main.vue";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "./modal";
import TomSelect from "./tom-select/Main.vue";
import Dropzone from "./dropzone/Main.vue";
import "zoom-vanilla.js/dist/zoom-vanilla.min.js";
import {
  PreviewComponent
} from "./preview-component";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
  DropdownHeader,
  DropdownFooter,
  DropdownDivider,
} from "./dropdown";
import LucideIcons from "./lucide";

export default (app) => {
  app.component("Tippy", Tippy);
  app.component("TippyContent", TippyContent);
  app.component("Litepicker", Litepicker);
  app.component("Modal", Modal);
  app.component("ModalHeader", ModalHeader);
  app.component("ModalBody", ModalBody);
  app.component("ModalFooter", ModalFooter);
  app.component("Dropdown", Dropdown);
  app.component("DropdownToggle", DropdownToggle);
  app.component("DropdownMenu", DropdownMenu);
  app.component("DropdownContent", DropdownContent);
  app.component("DropdownItem", DropdownItem);
  app.component("DropdownHeader", DropdownHeader);
  app.component("DropdownFooter", DropdownFooter);
  app.component("DropdownDivider", DropdownDivider);
  app.component("LoadingIcon", LoadingIcon);
  app.component("TomSelect", TomSelect);
  app.component("Dropzone", Dropzone);
  app.component("PreviewComponent", PreviewComponent);
  for (const [key, icon] of Object.entries(LucideIcons)) {
    app.component(key, icon);
  }
};
