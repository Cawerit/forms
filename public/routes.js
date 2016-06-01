
import riot from 'riot';
import './components/navigation.tag';
import createForm from './views/create-form/create-form';
import editForm from './views/create-form/edit-form';

riot.route.base('/');
riot.route.start(true);

riot.route('/forms/create', createForm);
riot.route('/forms/*/edit', editForm);