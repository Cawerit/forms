
import riot from 'riot';
import createForm from './views/create-form/create-form';

riot.route.base('/');
riot.route.start(true);

riot.route('/forms/create', createForm);