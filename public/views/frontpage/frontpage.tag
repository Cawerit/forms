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

    </script>




</frontpage>