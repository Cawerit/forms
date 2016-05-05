<create-form>

    <edit-form api={opts.api} save={this.save.bind(this)}></edit-form>

    <script>
        save(content){
            return this.opts.api.form.post(content).then(function (form) {
                //riot.route('/forms/' + form.id);
                window.location.pathname = '/forms/' + form.id;
            });
        }
    </script>

</create-form>