<page>
    <div show={ page == opts.number } >
    <yield />
    </div>

    <script>
        var self = this;
        self.page = 1;
        riot.route(function(collection, id, action){
            var q = riot.route.query();
            self.page = parseInt(q.page || 1, 10);
            self.update();
        });
    </script>
</page>
