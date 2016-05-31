<pagelist>
    <div class="wrapper">
        <ul class="pagination">
            <li each={ pages } class={ getClass(number) }>
                <a href={ '?page=' + number }>{number}</a>
            </li>
        </ul>
    </div>

    <script>
        this.pages = [];
        this.page = 1;
        
        var vm = this,
            i = (vm.opts.min && parseInt(vm.opts.min, 10)) || 1,
            n = (vm.opts.max && parseInt(vm.opts.max, 10)) || 1;
        
        while(i <= n){
            vm.pages.push({
                number: i
            });
            i++;
        }

        riot.route(function(collection, id, action){
            var q = riot.route.query();
            vm.page = parseInt(q.page || 1, 10);
            vm.update();
        });

        getClass(number) {
            return vm.page === number ? 'active' : '';
        }

    </script>

    <style scoped>
        .wrapper {
            clear: both;
        }
    </style>
</pagelist>