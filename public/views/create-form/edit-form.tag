<edit-form>

    <navigation>
        <a href="" 
            onclick={parent.save.bind(parent)} class={glyphicon: true, 'glyphicon-floppy-disk': !parent.isSaved, 'glyphicon-floppy-saved': parent.isSaved } 
            title="Tallenna"></a>

        <a href="" if={parent.opts.formId}
            onclick={parent.goToAnswers.bind(parent)}
            class="glyphicon glyphicon-check"
            title="Valmis"></a>

    </navigation>


    <div class="container">
        <div class="content" id={getId()}></div>
        <iframe src={preview} class="preview"></iframe>
    </div>

    <script>

        this.isSaved = !!this.opts.formId;

        this.on('mount', function(){
            var vm = this,
                id = vm.getId();

            var editor = this.editor = ace.edit(id);
            editor.setTheme('ace/theme/dawn');
            editor.getSession().setMode('ace/mode/jsx');

            //Disable warning about scrolling 
            editor.$blockScrolling = Infinity;

            if(vm.opts.content) {
                vm.opts.content.then(function(template){
                    editor.setValue(template);
                });
            }

            var debounced = _.debounce(change, 5000);

            editor.on('change', function(){
                if(vm.isSaved) {
                    vm.isSaved = false;
                    vm.update();
                }
                debounced();
            });


            function change() {
                if (vm.opts.formId) {
                    vm.save().then(function(){
                        vm.preview = '/forms/' + vm.opts.formId;
                        vm.isSaved = true;
                        vm.update();
                        var iframe = $('iframe', vm.root);
                        iframe.attr('src', iframe.attr('src'));
                    });
                }
            }

        });

        save() {
            var content = this.editor.getValue();
            if(this.opts.save) return this.opts.save(content);
        }

        getId() {
            return this.hasOwnProperty('_id') ? this._id : (this._id = _.uniqueId('form-editor'));
        }

        goToAnswers() {
            var id = this.opts.formId;
            location.assign('/forms/' + id + '/answers');
        }

    </script>
    <style scoped>
        .container {
            margin-top: 150px;
        }
        .content {
            display: inline-block;
            width: 45%;
            min-height: 500px;
            margin-right: 5%;
            height: 90%;
        }
        .preview {
            display: inline-block;
            min-height: 500px;
            width: 45%;
            height: 90%;
            border: 0;
        }
    </style>


</edit-form>