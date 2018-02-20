/**
 *
 * Asynchronously loads the component
 *
 */
import Loadable from 'react-loadable';

export default Loadable({
  loader: async () => await import('./index'),
  loading: () => null,
});
