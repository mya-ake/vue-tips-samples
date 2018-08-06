import computedFilter from './computed-filter';
import i18n from './i18n';
import sampleVuexModal from './sample-vuex-modal';
import sampleVuexTransitionProbrem from './sample-vuex-transition-probrem';

export default paths => {
  i18n(paths);
  computedFilter(paths);
  sampleVuexModal(paths);
  sampleVuexTransitionProbrem(paths);
};
