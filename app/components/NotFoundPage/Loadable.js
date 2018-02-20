/**
 * Asynchronously loads the component for NotFoundPage
 */
import Loadable from 'react-loadable';

import Loading from '../Loading/index';

export default Loadable({
  loader: () => import('./index'),
  loading: Loading,
});
