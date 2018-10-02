import { matchRoutes } from 'react-router-config';
import routes from 'config/routes';
import { store } from '../';

const loadBranchData = (pathname: string) => {
  const branch = matchRoutes(routes, pathname);

  const promises = branch
    .filter(({ route }) => {
      const { shouldLoad } = route as any;

      return shouldLoad ? shouldLoad() : true;
    })
    .map(({ route, match }) => {
      const { component } = route;
      const { loadData } = component as any;
      return loadData ? loadData({ match, store }) : Promise.resolve(null);
    });

  return Promise.all(promises);
};

export default loadBranchData;
