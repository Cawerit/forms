<page>
    <div show={ page == opts.number } >
        <yield />
    </div>

    var self = this;
    self.page = 1;
    riot.route(function(collection, id, action){
        var q = riot.route.query();
        self.page = parseInt(q.page || 1, 10);
        self.update();
    });
</page>

<pagelist>
     <span each={ pages }>
        <button onclick={ changePage.bind(this, number) } >{number}</button>
    </span>

    <script>
        this.pages = [];
        for(var i = this.opts.min; i <= this.opts.max; i++){
            this.pages.push({
                number: i
            });
        }

        changePage(number){
            riot.route(location.pathname + '?page=' + number);
        }
    </script>
</pagelist>