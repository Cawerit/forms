<navigation>
    <div class="topbar">
        <a href="" onclick={goToHome.bind(this)} class="glyphicon glyphicon-home" title="Etusivu"></a>
        <a href="" onclick={goToView.bind(this)} class="glyphicon glyphicon-list-alt" title="Vastaa"></a>
        <a href="" onclick={goToEdit.bind(this)} class="glyphicon glyphicon-pencil" title="Muokkaa"></a>
    </div>

    <script>

        goToHome() {
            location.replace(location.href.replace('/edit', ''));
        }

        goToEdit() {
            riot.route('edit');
        }

        goToView() {
            var route;
            riot.route(function(){
                console.log('jee', arguments);
            riot.route(currentRoute.collection + '/' + currentRoute.id);
            });
            riot.route.exec(function(){
                console.log('AAAA', arguments);
            });
        }

    </script>

    <style scoped>
        .topbar {
            position: relative;
            text-align: center;
            width: 100%;
            opacity: 0.5;
        }

        .topbar:hover {
            opacity: 1;
        }

        .glyphicon {
            display: inline-block;
            color: black;
            font-size: 30px;
            margin: 20px;
            cursor: pointer;
        }

        .glyphicon:hover {
            color: #64048D;
        }
    </style>
</navigation>