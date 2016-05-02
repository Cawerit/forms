<edit-form>

    <textarea class="content"></textarea>

    <script>
        if(this.opts.promise){
            this.on('mount', function(){
                var vm = this;
                vm.opts.promise.then(function(template){
                    $('.content', vm.root).val(template);
                });
            });
        }
    </script>
    <style>
        textarea {
            width: 50%;
            height: 80%;
            position: absolute;
        }
    </style>


</edit-form>