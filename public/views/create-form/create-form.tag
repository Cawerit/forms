<create-form>

    <div class="container">
        <input class="name" placeholder="Kyselyn nimi" maxlength="40" for="form-name"/>
    </div>

    <edit-form api={opts.api} compiler={opts.compiler} save={this.save.bind(this)} content={getContent()}></edit-form>

    <script>
        var vm = this;

        save(content){
            var name = $('input[for="form-name"]', vm.root).val();

            return this.opts.api.form.post({
                template: content,
                name: name || ''
            }).then(function (form) {
                window.location.assign('/forms/' + form.id + '/edit');
                return form;
            });
        }

        getContent(){
            return new Promise(function(resolve){
                resolve('<survey>\n' +
                    '    <page number="1">\n' +
                    '        <label for="kysymys1">Kysymys</label>\n' +
                    '        <input type="text" name="kysymys1" class="form-control" />\n' +
                    '    </page>\n' +
                    '    <page number="2">\n' +
                    '        <input type="submit" class="form-control" value="Tallenna"/>\n' +
                    '    </page>\n' +
                    '    <pagelist min="1" max="2"></pagelist>\n' +
                    '</survey>');
            });
        }
    </script>

    <style>
        .container {
            margin-top: 80px;
        }
        .name {
            font-size: 200%;
            margin: 50px;
            width: auto;
            border: 0;
        }

        .name:focus {
            outline: none;
        }

    </style>

</create-form>