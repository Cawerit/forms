
import riot from 'riot';
import './components/navigation.tag';
import createForm from './views/create-form/create-form';
import editForm from './views/create-form/edit-form';
import viewAnswers from './views/view-answers/view-answers';
import frontPage from './views/frontpage/frontpage';


riot.route.base('/');
riot.route.start(true);

riot.route('/forms/create', createForm);
riot.route('/forms/*/edit', editForm);
riot.route('/forms/*/answers', viewAnswers);
riot.route('/', frontPage);