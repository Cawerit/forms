<edit-form>
    <div>
        <div class="content" id={getId()}></div>
        <iframe src={preview} class="preview"></iframe>
        <button onclick={save} if={!opts.formId}>Tallenna</button>
    </div>

    <script>

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

            editor.on('change', _.debounce(change, 5000));


            function change() {
                console.log('change');
                if (vm.opts.formId) {
                    vm.save().then(function(){
                        vm.preview = '/forms/' + vm.opts.formId;
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

    </script>
    <style scoped>
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