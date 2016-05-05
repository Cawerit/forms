import riot from 'riot';
import api from '../../api';
import './create-form.tag';
import './edit-form.tag';

export default function createForm() {
	riot.mount('create-form', { api });
};