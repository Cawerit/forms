<create-form>

    <edit-form promise={getPromise()} api={opts.api} save={this.save.bind(this)}></edit-form>

    <script>
        getPromise(){
            return new Promise(function(resolve){
               resolve('keh keh');
            });
        }
        save(content){
            return this.opts.api.form.post(content).then(function (form) {
                //riot.route('/forms/' + form.id);
                window.location.pathname = '/forms/' + form.id;
            });
        }
    </script>

</create-form>