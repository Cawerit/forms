<edit-form>

    <div>
        <div class="content" id={getId()}></div>
        <button onclick={save}>Tallenna</button>
    </div>

    <script>

        this.on('mount', function(){
            var vm = this,
                id = vm.getId();

            var editor = ace.edit(id);
            editor.setTheme('ace/theme/dawn');
            editor.getSession().setMode('ace/mode/jsx');

            //Disable warning about scrolling 
            editor.$blockScrolling = Infinity;

            if(vm.opts.content) {
                vm.opts.content.then(function(template){
                    editor.setValue(template);
                });
            }
        });

        save() {
            var content = $('.content', this.root).val();
            if(this.opts.save) this.opts.save(content);
        }

        getId() {
            return this.hasOwnProperty('_id') ? this._id : (this._id = _.uniqueId('form-editor'));
        }

    </script>
    <style scoped>
        .content {
            width: 100%;
            min-height: 500px;
            height: 90%;
        }
    </style>


</edit-form>