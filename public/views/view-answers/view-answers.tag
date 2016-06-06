<answers>

    <navigation>
        <a href="" class="glyphicon glyphicon-pencil" onclick={parent.goToEdit.bind(parent)} title="Muokkaa"></a>
    </navigation>

    <div class="header"><h1>Kysely {name}</h1></div>
    <hr />
    <div class="header-link"><i class="glyphicon glyphicon-link"></i>&nbsp;
        <input value={url} size={url ? url.length : 1} readonly/>
    </div>

    <div class="header"><h1>Vastauksia {(answerCount || 0) + ''}</h1></div>

    <div each={name, value in content} class="answer-set">
        <table class="table">
            <thead>
                <tr><th>Kysymys</th><th>Vastaus</th></tr>
            </thead>
            <tbody>
                <tr each={value}>
                    <td>{name}</td>
                    <td>{value_text}</td>
                </tr>
            </tbody>

        </table>
    </div>

    <script>

        var self = this;
        self.content = {};
        self.url = location.href.replace('/answers', '');
        self.answerCount = 0;

        this.on('mount', function(){
            $('.header-link input', self.root).select();
        });

        this.opts.content.then(function(result){
            self.content = result;
            self.answerCount = result ? _.keys(result).length : 0;
            var first = result && result[0];
            self.update();
        });

        this.opts.formInfo.then(function(result){
            result = _.first(result);
            if(result) {
                self.name = _.capitalize(result.name);
                self.update();
            }
        });

        goToEdit() {
            location.assign(location.href.replace('/answers', '/edit'));
        }

    </script>


    <style scoped>
        .header {
            text-align: center;
            margin-top: 100px;
        }
        .answer-set {
            font-size: 120%;
            margin: 20px;
        }
        .header-link {
            font-size: 30px;
            text-align: center;
            margin-left: 30px;
        }
        .header-link input {
            border: 0;
            display: inline-block;
        }

    </style>
    

</answers>
