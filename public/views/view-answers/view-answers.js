import riot from 'riot';
import api from '../../api';
import groupBy from 'lodash/'
import './view-answers.tag';

export default function viewAnswers(id) {
    
    const content = api.answers.get(id+'')
        .then(function(result) {
            var grouped = _.groupBy(result, 'answer_set');
            return grouped;
        });

    const formInfo = api.form.getInfo(id+'');
    
    

    riot.mount('answers', { id, content, formInfo });
};