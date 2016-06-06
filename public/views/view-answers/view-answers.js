import riot from 'riot';
import api from '../../api';
import groupBy from 'lodash/'
import './view-answers.tag';

export default function viewAnswers(id) {
    
    const content = api.answers.get(id+'')
        .then(function(result) {
            result = _.groupBy(result, 'answer_set');
            console.log(result);
            return result;
        });
    
    

    riot.mount('answers', { id, content });
};