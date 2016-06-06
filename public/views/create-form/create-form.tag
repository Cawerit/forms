<create-form>

    <edit-form api={opts.api} compiler={opts.compiler} save={this.save.bind(this)}></edit-form>

    <script>
        save(content){
            return this.opts.api.form.post(content).then(function (form) {
                window.location.assign('/forms/' + form.id + '/edit');
                return form;
            });
        }
    </script>

</create-form>