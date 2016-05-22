<edit-form>

    <div>
        <textarea class="content"></textarea>
        <button onclick={save}>Tallenna</button>
    </div>

    <script>
        if(this.opts.content){
            this.on('mount', function(){
                var vm = this;
                vm.opts.content.then(function(template){
                    $('.content', vm.root).val(template);
                });
            });
        }

        save() {
            var content = $('.content', this.root).val();
            if(this.opts.save) this.opts.save(content);
        }

    </script>
    <style scoped>
        textarea {
            width: 50%;
            height: 400px;
        }
    </style>


</edit-form>