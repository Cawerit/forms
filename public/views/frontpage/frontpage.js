import riot from 'riot';
import api from '../../api';
import './frontpage.tag';
import '../codesample/codesample.tag';



export default function frontpage() {

    const forms = api.form.get().then(function(data) {
        return _.map(data, d => _.assign(d, { created: formatDate(d.created) }));
    });

    riot.mount('frontpage', { forms });

}



function formatDate(str) {
    var d = new Date(str);
    return d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();
}