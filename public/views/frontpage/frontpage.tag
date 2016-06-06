<frontpage>
    <div class="container">
        <div class="wrapper">
            <h1>Luo sinunlaisiasi lomakkeita</h1>
        </div>
        <div class="card">
            <h3>Päästä luovuutesi valloilleen</h3>
            <p class="pitch">
            Palvelumme tarjoaa joustavan mutta helppokäyttöisen alustan erilaisten kyselyjen
            toteuttamiseksi.
            </p>

            <p>
                <codesample></codesample>
            </p>

        </div>
        <div class="card">
            <h3>Selaa muiden luomuksia</h3>

            <ul class="list-group">
                <li each={forms} class="list-group-item">
                    <a href="" onclick={goTo.bind(null, id)}>
                        <span>{name}</span>
                        <span class="created-col">{created}</span>
                    </a>
                </li>
            </ul>

        </div>

        <div class="card create-new">
            <button class="btn" onclick={createNew} role="button">
                <i class="glyphicon glyphicon-plus"></i>&nbsp; Luo uusi kysely
            </button>
        </div>
    </div>



    <style scoped>
        .card {
            min-width: 100%;
            padding: 50px;
        }

        .wrapper {
            padding-top: 50px;
            padding-bottom: 60%;
        }

        .created-col {
            float: right;
        }

        a {
            color: #043659;
        }

        .pitch {
            font-size: 115%;
        }

        .create-new {
            text-align: center;
        }

        .create-new > button {
            color: white;
            background-color: #4A8DBC;
            text-align: center;
            font-size: 150%;
        }

    </style>


    <script>

        var self = this;
        this.opts.forms.then(function(data) {
            self.forms = data;
            self.update();
        });


        goTo(id) {
            location.assign('/forms/' + id);
        }

        createNew() {
            location.assign('/forms/create');
        }

    </script>




</frontpage>