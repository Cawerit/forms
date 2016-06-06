<answers>
    <div class="header"><h1>Vastaukset kyselyyn {opts.id}</h1></div>

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
        this.opts.content.then(function(result){
            self.content = result;
            console.log(result);
            self.update();
        });

    </script>


    <style scoped>
        .header {
            text-align: center;
        }
        .answer-set {
            font-size: 120%;
            margin: 20px;
        }

    </style>
    

</answers>
