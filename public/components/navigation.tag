<navigation>
    <div class="topbar">
        <a href="" onclick={goToHome.bind(this)} class="glyphicon glyphicon-home" title="Etusivu"></a>
        <yield />
    </div>

    <script>

        goToHome() {
            location.assign('/');
        }


    </script>

    <style scoped>
        .topbar {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1000;
            text-align: center;
            width: 100%;
            opacity: 0.7;
            color: white;
            background: #4A8DBC;
        }

        .topbar:hover {
            opacity: 1;
        }

        .glyphicon {
            display: inline-block;
            font-size: 30px;
            margin: 20px;
            cursor: pointer;
            color: white;
        }
    </style>
</navigation>