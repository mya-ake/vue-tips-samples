import computedFilter from './computed-filter';
import form from './form';
import i18n from './i18n';
import sampleVuexModal from './sample-vuex-modal';
import sampleVuexTransitionProbrem from './sample-vuex-transition-probrem';

export default paths => {
  computedFilter(paths);
  form(paths);
  i18n(paths);
  sampleVuexModal(paths);
  sampleVuexTransitionProbrem(paths);
};
