import riot from 'riot';
import api from '../../api';
import './edit-form.tag';

export default function editForm(formId) {
    var content = api.template.get(formId+'');
    var save = newTemplate => api.template.post(formId, newTemplate);
    riot.mount('edit-form', { api, content, save, formId });
};