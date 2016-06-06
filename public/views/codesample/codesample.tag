<codesample>
    <div>
        <div class="pull-left">
            <pre id={getId()} class="editor"></pre>
        </div>
        <div class="pull-right description">
            <i><b>{description}</b></i>
        </div>

    </div>


    <script>

        var timeout;
        var self = this;

        this.on('mount', function(){
            var editor = this.editor = ace.edit(this.getId());
            var codesamples = [
                '<pagelist></pagelist>',
                '<survey></survey>',
                '<page></page>'
            ];
            var descriptions = [
                'Tee navigoinnista helppoa',
                'Luo kyselyitä',
                'Jaa sisältö sivuiksi'
            ];
            var currentChar;
            var currentSample = 0;
            var content = '';


            editor.setTheme('ace/theme/tomorrow_night_bright');
            var session = editor.getSession().setMode('ace/mode/jsx');

        //Disable warning about scrolling 
            editor.$blockScrolling = Infinity;

            editor.setValue('');
            editor.renderer.setShowGutter(false);


            animate();

            function animate() {
                currentChar++;
                if (currentChar < codesamples[currentSample].length) {
                    content += codesamples[currentSample][currentChar];
                    editor.setValue(content);
                    editor.getSession().selection.clearSelection();
                    timeout = setTimeout(animate, 100);
                } else {
                    content = '';
                    currentChar = -1;
                    currentSample++;
                    if (currentSample === codesamples.length) {
                        currentSample = 0;
                    }

                    timeout = setTimeout(function(){
                        var el = $('.description', self.root);
                        el.fadeOut(400, function(){
                            self.description = descriptions[currentSample];
                            self.update();
                            animate();
                            el.fadeIn(600);
                        });
                    }, 2500);
                }
            };



        });

        this.on('unmount', function(){
            if(timeout) {
                clearTimeout(timeout);
            }
        });

        
        getId() {
            return this.id || (this.id = _.uniqueId('codesample-'));
        }

    </script>

    <style scoped>
        .editor {
            width: 400px;
            height: 30px;
            pointer-events: none;
            font-size: 14px;
        }

    </style>

</codesample>