import Vue from "vue";

import "./styles/quasar.scss";
import "@quasar/extras/material-icons/material-icons.css";
import { Quasar, Loading, Dialog } from "quasar";

Vue.use(Quasar, {
  config: {
    loading: {
      /* look at QUASARCONFOPTIONS from the API card (bottom of page)
       * https://quasar.dev/quasar-plugins/loading */
    }
  },
  components: {
    /* not needed if importStrategy is not 'manual' */
  },
  directives: {
    /* not needed if importStrategy is not 'manual' */
  },
  plugins: { Loading, Dialog }
});
