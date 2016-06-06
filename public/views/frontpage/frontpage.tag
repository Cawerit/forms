<frontpage>
    <div class="bg-wrap"></div>
    <div class="container">
        <div class="wrapper">
            <i class="logo glyphicon glyphicon-question-sign"></i>
            <h1>Luo sinunlaisiasi lomakkeita</h1>
        </div>
        <div class="card">
            <h3>Päästä luovuutesi valloilleen</h3>
            <p class="pitch">
            <p>
            Luo ja muokkaa juuri sellaisia kyselyjä joita haluat, tai tarkastele muiden käyttäjien julkisia kyselyjä. 
            <br>
            Tarjoamme työkalut toteuttaa suunnitelmasi täydellisestä kyselystä juuri niin kuin haluat.
            Kyselyn luonti onnistuu pienelläkin ohjelmoinnin osaamisella ja antaa täyden kontrollin sisältöön.
            </p>

            <p>
            Ei rikkinäisiä suunnittelusovelluksia, ei odottamattomia tuloksia. Sinun ohjelmasi. Sinun asiakkaillesi.
            </p>

            <p class="space-before">
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

        p {
            font-size: 17px;
        }

        .space-before {
            margin-top: 40px;
        }

        h1 {
            color: white;
            font-weight: bold;
            font-size: 60px;
            text-align: center;
            padding-bottom: 60px;
            padding-top: 25%;
        }

        h3 {
            font-weight: bold;
        }

        .bg-wrap {
            z-index: 500;
            position: fixed;
            width: 100%;
            height: 100%;
            background-image: url('/assets/background.jpg');
        }
        .container {
            z-index: 1000;
            position: absolute;
            width: 100%;
            padding: 0;

        }
        .card {
            min-width: 100%;
            display: block;
            padding: 50px;
            margin: 0;
            background-color: white;
        }

        .card:first-of-type {
            -webkit-box-shadow: 0px 0px 106px 19px rgba(0,0,0,0.67);
            -moz-box-shadow: 0px 0px 106px 19px rgba(0,0,0,0.67);
            box-shadow: 0px 0px 106px 19px rgba(0,0,0,0.67);
        }

        .wrapper {
            padding-top: 50px;
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

        .wrapper {
            text-align: center;
        }
        .logo {
            font-size: 200px;
            color: #043659;
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